import Head from 'next/head';
import NextLink from 'next/link';
import * as Yup from 'yup';
import { Box, Button, Container, Link, TextField, Typography } from '@mui/material';
import { useFormik } from 'formik';

import { Logo } from '../components/common/logo';
import { useAuth } from '@/contexts/auth';

const Login = () => {
    const auth = useAuth();


    const formik = useFormik({
        initialValues: {
            email: '',
            password: ''
        },
        validateOnChange: false,
        validateOnBlur: false,
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
        onSubmit: async () => {
            try {
                const { email, password } = formik.values;
                await auth.signIn(email, password);
            } catch (err: any) {
                console.log(err);
            }
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
                <Container maxWidth="xs">
                    <form onSubmit={event => formik.handleSubmit(event)}>
                        <Box sx={{ my: 3 }}>
                            <Typography
                                color="textPrimary"
                                variant="h4"
                            >
                                <div className='flex justify-center'>
                                    <Logo viewWidth={850} width={500} height={135} imageWidth={850} />
                                    {/* viewWidth={1660} width={552} height={150} imageWidth={800} */}
                                </div>
                            </Typography>
                            <Typography
                                variant="h6"
                                textAlign='center'
                                color={theme => theme.palette.text.secondary}
                                className="mt-2 tracking-tight"
                            >
                                Faça login na plataforma do AlgorIF
                            </Typography>
                        </Box>
                        <TextField
                            label="Endereço de e-mail"
                            type="text"
                            name="email"                        
                            variant="outlined"
                            margin="dense"
                            fullWidth
                            error={Boolean(formik.touched.email && formik.errors.email)}
                            helperText={formik.touched.email && formik.errors.email}
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            value={formik.values.email}                            
                        />
                        <TextField
                            label="Senha"
                            type="password"
                            name="password"                            
                            variant="outlined"
                            margin="dense"
                            fullWidth
                            error={Boolean(formik.touched.password && formik.errors.password)}
                            helperText={formik.touched.password && formik.errors.password}
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            value={formik.values.password}
                        />


                        <Button
                            color="primary"
                            disabled={formik.isSubmitting}
                            fullWidth
                            size="large"
                            type="submit"
                            variant="contained"
                            className="mb-2 mt-2"
                        >
                            Entrar
                        </Button>

                        <Typography
                            color={theme => theme.palette.text.secondary}
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