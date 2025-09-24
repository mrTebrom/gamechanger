'use client';

import { useEffect, useState } from 'react';
import Stack from '@mui/material/Stack';
import {
    Typography,
    FormControl,
    FormLabel,
    OutlinedInput,
    Button,
    Divider,
} from '@mui/material';
import Link from 'next/link';

import { validateEmail, validatePassword } from '@/lib/validateAuth';

export default function RegisterForm() {
    const [form, setForm] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
    });
    const [error, setError] = useState<null | string>(null);

    const onSubmit = () => {
        fetch('/api/auth/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(form),
        });
    };

    const isValid =
        // Имя не пустое
        form.username.trim().length > 0 &&
        // Корректный email
        validateEmail(form.email) &&
        // Пароль: ≥6 символов, есть заглавная и цифра
        validatePassword(form.password) &&
        // Повтор пароля совпадает
        form.password === form.confirmPassword;

    return (
        <Stack
            className='register-form form'
            sx={{
                width: '100%',
                gap: 2,
                margin: '0 auto',
            }}
        >
            <Typography variant='h4' align='center'>
                ЛОГОТИП
            </Typography>
            <Typography variant='h5' align='center'>
                Регистрация
            </Typography>

            <FormControl fullWidth>
                <FormLabel htmlFor='email' sx={{ mb: 0.5 }}>
                    Email
                </FormLabel>
                <OutlinedInput
                    id='email'
                    type='email'
                    placeholder='Введите вашу почту'
                    autoComplete='email'
                    required
                    onChange={(value) =>
                        setForm({
                            ...form,
                            email: value.target.value.toLocaleLowerCase(),
                        })
                    }
                />
            </FormControl>

            <FormControl fullWidth>
                <FormLabel htmlFor='username' sx={{ mb: 0.5 }}>
                    Имя
                </FormLabel>
                <OutlinedInput
                    id='username'
                    type='text'
                    placeholder='Введите ваше имя'
                    autoComplete='username'
                    required
                    onChange={(value) =>
                        setForm({
                            ...form,
                            username: value.target.value.toLocaleLowerCase(),
                        })
                    }
                />
            </FormControl>

            <FormControl fullWidth>
                <FormLabel htmlFor='password' sx={{ mb: 0.5 }}>
                    Пароль
                </FormLabel>
                <OutlinedInput
                    id='password'
                    type='password'
                    placeholder='Введите пароль'
                    autoComplete='new-password'
                    required
                    onChange={(value) =>
                        setForm({
                            ...form,
                            password: value.target.value,
                        })
                    }
                />
            </FormControl>

            <FormControl fullWidth>
                <FormLabel htmlFor='confirmPassword' sx={{ mb: 0.5 }}>
                    Повторите пароль
                </FormLabel>
                <OutlinedInput
                    id='confirmPassword'
                    type='password'
                    placeholder='Повторите пароль'
                    autoComplete='new-password'
                    required
                    onChange={(value) =>
                        setForm({
                            ...form,
                            confirmPassword: value.target.value,
                        })
                    }
                />
            </FormControl>

            <Button
                variant='contained'
                size='large'
                onClick={onSubmit}
                disabled={!isValid}
            >
                Регистрация
            </Button>

            <Divider
                sx={{
                    color: '#AEAEAE',
                    fontSize: 16,
                    '&::before, &::after': {
                        borderColor: '#AEAEAE',
                    },
                }}
            >
                ИЛИ
            </Divider>

            <Link href='/' className='text-center'>
                Авторизация
            </Link>
        </Stack>
    );
}
