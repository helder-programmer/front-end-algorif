import Head from 'next/head';
import NextLink from 'next/link';
import Router from 'next/router';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Box, Button, Container, Link, Typography } from '@mui/material';
import { useState } from 'react';
import { Logo } from '../components/logo';
import CustomTextField from '../components/customTextField';

const Login = () => {
    const [isSubmitting, setIsSubmitting] = useState(false);

    const formik = useFormik({
        initialValues: {
            email: '',
            password: ''
        },
        validationSchema: Yup.object({
            email: Yup
                .string()
                .email('O e-mail deve ser válido!')
                .max(255)
                .required('O e-mail é obrigatório!'),
            password: Yup
                .string()
                .max(255)
                .required('A senha é obrigatória!')
        }),
        onSubmit: () => {
        }
    });

    return (
        <>
            <Head>
                <title>Algorif</title>
            </Head>
            <Box
                component="main"
                sx={{
                    alignItems: 'center',
                    display: 'flex',
                    flexGrow: 1,
                    minHeight: '100%'
                }}
            >
                <Container maxWidth="sm">
                    <form>
                        <Box sx={{ my: 1 }}>
                            <Typography
                                color="textPrimary"
                                variant="h4"
                            >
                                <div className='flex'>
                                    <Logo viewWidth={1660} width={552} height={150} imageWidth={800} />
                                </div>
                            </Typography>
                            <Typography
                                color="textSecondary"
                                gutterBottom
                                variant="body2"
                            >
                                Faça Login no Plataforma do AlgorIF
                            </Typography>
                        </Box>
                        <CustomTextField
                            label="Enderço de e-mail"
                            name="email"
                            onBlur={formik.handleBlur}
                            type="email"
                            formik={formik}
                        />
                        <CustomTextField
                            label="Senha"
                            name="password"
                            onBlur={formik.handleBlur}
                            type="password"
                            formik={formik}
                        />
                        <div id="error-message" className='text-red-500 p-1'></div>
                        <Box sx={{ py: 2 }}>
                            <Button
                                color="primary"
                                disabled={isSubmitting}
                                fullWidth
                                size="large"
                                type="submit"
                                variant="contained"
                                onClick={() => {
                                    formik.handleSubmit();
                                    setIsSubmitting(true);
                                    setTimeout(() => {
                                        setIsSubmitting(false);
                                    }, 2000);
                                }}
                            >
                                Entrar
                            </Button>
                        </Box>
                        <Typography
                            color="textSecondary"
                            variant="body2"
                        >
                            Ainda não tem conta?
                            {' '}
                            <NextLink href="/register">
                                <Link
                                    href="/register"
                                    variant="subtitle2"
                                    underline="hover"
                                    sx={{
                                        cursor: 'pointer'
                                    }}
                                >
                                    Registre-se
                                </Link>
                            </NextLink>
                        </Typography>
                    </form>
                </Container>
            </Box>
        </>
    );
};

export default Login;