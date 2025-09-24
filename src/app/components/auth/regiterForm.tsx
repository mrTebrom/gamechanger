'use client';

import { useState } from 'react';
import Stack from '@mui/material/Stack';
import { Typography, FormControl, FormLabel, OutlinedInput, Button, Divider } from '@mui/material';
import Link from 'next/link';
import { validateEmail, validatePassword } from '@/lib/validateAuth';

// Типизируем где ошибка
type Field = 'username' | 'email' | 'password' | 'confirmPassword';

export default function RegisterForm() {
    // форма
    const [form, setForm] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
    });

    // ошибки, пришедшие с сервера (например, email уже занят)
    const [serverErrors, setServerErrors] = useState<Partial<Record<Field, string>>>({});

    // пометки о взаимодействии с полями
    const [touched, setTouched] = useState<Record<Field, boolean>>({
        username: false,
        email: false,
        password: false,
        confirmPassword: false,
    });

    // ===== Клиентские (live) ошибки на основе текущего состояния формы
    const clientErrors: Partial<Record<Field, string>> = {};
    if (!form.username.trim()) clientErrors.username = 'Укажите имя';
    if (!validateEmail(form.email)) clientErrors.email = 'Некорректный email';
    if (!validatePassword(form.password)) {
        clientErrors.password = 'Минимум 6 символов, одна заглавная буква и одна цифра';
    }
    if (form.confirmPassword && form.password !== form.confirmPassword) {
        clientErrors.confirmPassword = 'Пароли не совпадают';
    }

    const isValid = Object.keys(clientErrors).length === 0;

    const markTouched = (field: Field) => setTouched((t) => ({ ...t, [field]: true }));

    const onSubmit = async () => {
        // если есть клиентские ошибки — подсветить всё и не отправлять
        if (!isValid) {
            setTouched({
                username: true,
                email: true,
                password: true,
                confirmPassword: true,
            });
            return;
        }
        setServerErrors({});

        try {
            const res = await fetch('/api/auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    username: form.username, // оставляем регистр имени
                    email: form.email.toLowerCase(), // email нормализуем
                    password: form.password,
                }),
            });
            const data = await res.json();

            if (!res.ok) {
                // если сервер указал проблемное поле/поля — подсветим их
                if (data.label) {
                    if (Array.isArray(data.label)) {
                        const fe: Partial<Record<Field, string>> = {};
                        data.label.forEach((f: Field) => (fe[f] = data.message));
                        setServerErrors(fe);
                        const touchedAll = { ...touched };
                        data.label.forEach((f: Field) => (touchedAll[f] = true));
                        setTouched(touchedAll);
                    } else {
                        setServerErrors({
                            [data.label as Field]: data.message,
                        });
                        setTouched((t) => ({
                            ...t,
                            [data.label as Field]: true,
                        }));
                    }
                }
                return;
            }

            // успех → редирект
            window.location.href = '/dashboard';
        } catch (e: any) {
            console.log(e);
        }
    };

    // хелпер для выбора текста ошибки: приоритет серверной, иначе клиентская
    const errText = (field: Field) => serverErrors[field] || clientErrors[field];
    const hasError = (field: Field) => Boolean(touched[field] && errText(field));

    return (
        <Stack className='register-form form' sx={{ width: '100%', gap: 2, maxWidth: 390, margin: '0 auto' }}>
            <Typography variant='h4' align='center'>
                ЛОГОТИП
            </Typography>
            <Typography variant='h5' align='center'>
                Регистрация
            </Typography>

            <FormControl fullWidth error={hasError('email')}>
                <FormLabel htmlFor='email'>Email</FormLabel>
                <OutlinedInput
                    id='email'
                    type='email'
                    placeholder='Введите вашу почту'
                    autoComplete='email'
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    onBlur={() => markTouched('email')}
                />
                {hasError('email') && (
                    <Typography color='error' variant='caption'>
                        {errText('email')}
                    </Typography>
                )}
            </FormControl>

            <FormControl fullWidth error={hasError('username')}>
                <FormLabel htmlFor='username'>Имя</FormLabel>
                <OutlinedInput
                    id='username'
                    type='text'
                    placeholder='Введите ваше имя'
                    autoComplete='username'
                    value={form.username}
                    onChange={(e) => setForm({ ...form, username: e.target.value })}
                    onBlur={() => markTouched('username')}
                />
                {hasError('username') && (
                    <Typography color='error' variant='caption'>
                        {errText('username')}
                    </Typography>
                )}
            </FormControl>

            <FormControl fullWidth error={hasError('password')}>
                <FormLabel htmlFor='password'>Пароль</FormLabel>
                <OutlinedInput
                    id='password'
                    type='password'
                    placeholder='Введите пароль'
                    autoComplete='new-password'
                    value={form.password}
                    onChange={(e) => setForm({ ...form, password: e.target.value })}
                    onBlur={() => markTouched('password')}
                />
                {hasError('password') && (
                    <Typography color='error' variant='caption'>
                        {errText('password')}
                    </Typography>
                )}
            </FormControl>

            <FormControl fullWidth error={hasError('confirmPassword')}>
                <FormLabel htmlFor='confirmPassword'>Повторите пароль</FormLabel>
                <OutlinedInput
                    id='confirmPassword'
                    type='password'
                    placeholder='Повторите пароль'
                    autoComplete='new-password'
                    value={form.confirmPassword}
                    onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })}
                    onBlur={() => markTouched('confirmPassword')}
                />
                {hasError('confirmPassword') && (
                    <Typography color='error' variant='caption'>
                        {errText('confirmPassword')}
                    </Typography>
                )}
            </FormControl>

            <Button variant='contained' size='large' onClick={onSubmit} disabled={!isValid}>
                Регистрация
            </Button>

            <Divider>ИЛИ</Divider>
            <Link href='/' className='text-center'>
                Авторизация
            </Link>
        </Stack>
    );
}
