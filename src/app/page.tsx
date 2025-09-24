// app/page.tsx
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Image from 'next/image';

import AuthForm from '@/app/components/auth/loginForm';
import '@/styles/login.scss';
import { Stack } from '@mui/material';

export default function HomePage() {
    return (
        <div className='page'>
            <main>
                <Grid
                    container
                    spacing={2}
                    sx={{ minHeight: '100%', alignItems: 'stretch' }}
                >
                    {/* 8/12 — форма */}
                    <Grid size={{ md: 7, sm: 12 }}>
                        <Stack
                            justifyContent='center'
                            alignContent='center'
                            className='h-100'
                        >
                            <AuthForm />
                        </Stack>
                    </Grid>

                    <Grid
                        size={{ md: 5 }}
                        sx={{ display: { xs: 'none', md: 'block' } }}
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
                                alt='Иллюстрация авторизации'
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
