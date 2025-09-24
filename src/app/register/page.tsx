import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Image from 'next/image';
import { Stack } from '@mui/material';

import RegisterForm from '../components/auth/regiterForm';
import '@/styles/login.scss';

export default function RegisterPage() {
    return (
        <div className='page'>
            <main>
                <Grid
                    container
                    spacing={2}
                    sx={{ minHeight: '100%', alignItems: 'stretch' }}
                    justifyContent='center'
                >
                    {/* 7/12 — форма */}
                    <Grid size={{ md: 7, sm: 12, xs: 12 }}>
                        <Stack
                            justifyContent='center'
                            alignContent='center'
                            className='h-100'
                        >
                            <RegisterForm />
                        </Stack>
                    </Grid>

                    <Grid
                        size={{ md: 5, sm: 0 }}
                        sx={{
                            display: { xs: 'none', sm: 'none', md: 'block' },
                        }}
                    >
                        <Box
                            sx={{
                                position: 'relative',
                                width: '100%',
                                height: '100%',
                            }}
                        >
                            <Image
                                src='/auth-illustration.png'
                                alt='Иллюстрация регистрации'
                                fill
                                style={{ objectFit: 'cover' }}
                                priority
                            />
                        </Box>
                    </Grid>
                </Grid>
            </main>
        </div>
    );
}
