'use client';

import Stack from '@mui/material/Stack';
import {
    Typography,
    FormControl,
    FormLabel,
    OutlinedInput,
    Box,
    Button,
    Divider,
} from '@mui/material';
import Link from 'next/link';

export default function AuthForm() {
    return (
        <Stack
            className='login-form form'
            sx={{
                width: '100%',
                maxWidth: 390,
                gap: 2,
                margin: '0 auto',
            }}
        >
            <Typography variant='h4' align='center'>
                ЛОГОТИП
            </Typography>
            <Typography variant='h5' align='center'>
                Авторизация
            </Typography>

            <FormControl fullWidth>
                <FormLabel htmlFor='email' sx={{ mb: 0.5 }}>
                    Почта
                </FormLabel>
                <OutlinedInput
                    id='email'
                    type='email'
                    placeholder='name@company.com'
                    autoComplete='username'
                    required
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
                    autoComplete='current-password'
                    required
                />
            </FormControl>

            <Button variant='contained' size='large'>
                Вход
            </Button>

            <Divider
                sx={{
                    color: '#AEAEAE',
                    '&::before, &::after': {
                        borderColor: '#AEAEAE',
                    },
                }}
            >
                <span className='fs-1'>ИЛИ</span>
            </Divider>

            <Link href='/register' className='text-center'>
                Регистрация
            </Link>
        </Stack>
    );
}
