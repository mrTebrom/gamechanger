'use client';

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

export default function RegisterForm() {
    return (
        <Stack
            className='register-form form'
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
                Регистрация
            </Typography>

            <FormControl fullWidth>
                <FormLabel htmlFor='email' sx={{ mb: 0.5 }}>
                    Email
                </FormLabel>
                <OutlinedInput
                    id='email'
                    type='email'
                    placeholder='name@company.com'
                    autoComplete='email'
                    required
                />
            </FormControl>

            <FormControl fullWidth>
                <FormLabel htmlFor='username' sx={{ mb: 0.5 }}>
                    Username
                </FormLabel>
                <OutlinedInput
                    id='username'
                    type='text'
                    placeholder='Введите имя пользователя'
                    autoComplete='username'
                    required
                />
            </FormControl>

            <FormControl fullWidth>
                <FormLabel htmlFor='password' sx={{ mb: 0.5 }}>
                    Password
                </FormLabel>
                <OutlinedInput
                    id='password'
                    type='password'
                    placeholder='Введите пароль'
                    autoComplete='new-password'
                    required
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
                />
            </FormControl>

            <Button variant='contained' size='large'>
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
