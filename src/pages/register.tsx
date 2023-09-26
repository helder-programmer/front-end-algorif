import Head from 'next/head';
import NextLink from 'next/link';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {
    Box,
    Button,
    Checkbox,
    Container,
    FormHelperText,
    Link,
    TextField,
    Typography
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useState } from 'react';
import CustomTextField from '../components/customTextField';

const Register = () => {

    const [isSubmitting, setIsSubmitting] = useState(false);

    const formik = useFormik({
        initialValues: {
            email: '',
            userName: '',
            password: '',
            city: '',
            state: '',
            teacher: false,
            policy: false
        },
        validationSchema: Yup.object({
            email: Yup
                .string()
                .email('Deve ser um e-mail válido')
                .max(255)
                .required('E-mail é obrigatório'),
            userName: Yup
                .string()
                .max(255)
                .required('Nome de usuário é obrigatório'),
            password: Yup
                .string()
                .max(255)
                .min(6, "Senha muito fraca")
                .required('A senha é obrigatória'),
            state: Yup
                .string()
                .max(255),
            city: Yup
                .string()
                .max(255),
            teacher: Yup
                .boolean(),
            policy: Yup
                .boolean()
                .oneOf(
                    [true],
                    'Este campo deve ser verificado'
                )
        }),
        onSubmit: () => {

        }
    });

    return (
        <>
            <Head>
                <title>
                    Registrar-se
                </title>
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
                    <NextLink
                        href="/"
                        passHref
                    >
                        <Button component="a" startIcon={<ArrowBackIcon fontSize="small" />}>
                            Painel inicial
                        </Button>
                    </NextLink>
                    <form onSubmit={() => formik.handleSubmit()}>
                        <Box sx={{ my: 3 }}>
                            <Typography
                                color="textPrimary"
                                variant="h4"
                            >
                                Criar uma nova conta
                            </Typography>
                            <Typography
                                color="textSecondary"
                                gutterBottom
                                variant="body2"
                            >
                                Use seu email para criar uma nova conta
                            </Typography>
                        </Box>
                        <CustomTextField
                            type="text"
                            formik={formik}
                            label="Nome de usuário"
                            name="userName"
                        />
                        <CustomTextField
                            type="email"
                            formik={formik}
                            label="Endereço de e-mail"
                            name="email"
                        />
                        <TextField
                            error={Boolean(formik.touched.password && formik.errors.password)}
                            fullWidth
                            helperText={formik.touched.password && formik.errors.password}
                            label="Senha"
                            margin="normal"
                            name="password"
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            type="password"
                            value={formik.values.password}
                            variant="outlined"
                        />
                        <div className='block sm:flex gap-3'>
                            <CustomTextField
                                type="text"
                                formik={formik}
                                label="Estado"
                                name="state"                                
                            />
                            <TextField
                                type="text"
                                error={Boolean(formik.touched.city && formik.errors.city)}
                                helperText={formik.touched.city && formik.errors.city}
                                fullWidth
                                label="Cidade"
                                margin="normal"
                                name="city"
                                onBlur={formik.handleBlur}
                                onChange={formik.handleChange}
                                value={formik.values.city}
                                variant="outlined"
                            />
                        </div>
                        <div id="error-message" className='text-red-500 p-1'></div>
                        <Box
                            sx={{
                                alignItems: 'center',
                                display: 'flex',
                                ml: -1
                            }}
                        >
                            <div>
                                <div className='flex items-center'>
                                    <Checkbox
                                        checked={formik.values.teacher}
                                        name="teacher"
                                        onChange={formik.handleChange}
                                    />
                                    <Typography
                                        color="textSecondary"
                                        variant="body2"
                                    >
                                        Você é um professor
                                    </Typography>
                                </div>

                                <div className='flex items-center'>
                                    <Checkbox
                                        checked={formik.values.policy}
                                        name="policy"
                                        onChange={formik.handleChange}
                                    />
                                    <Typography
                                        color="textSecondary"
                                        variant="body2"
                                    >
                                        Eu li os
                                        {' '}
                                        <NextLink
                                            href="#"
                                            passHref
                                        >
                                            <Link
                                                color="primary"
                                                underline="always"
                                                variant="subtitle2"
                                            >
                                                Termos e Condições
                                            </Link>
                                        </NextLink>
                                    </Typography>
                                </div>
                            </div>
                        </Box>
                        {Boolean(formik.touched.teacher && formik.errors.teacher) && (
                            <FormHelperText error>
                                {formik.errors.teacher}
                            </FormHelperText>
                        )}
                        {Boolean(formik.touched.policy && formik.errors.policy) && (
                            <FormHelperText error>
                                {formik.errors.policy}
                            </FormHelperText>
                        )}
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
                                    }, 3000);
                                }}
                            >
                                Inscreva-se agora
                            </Button>
                        </Box>
                        <Typography
                            color="textSecondary"
                            variant="body2"
                        >
                            Tem uma conta?
                            {' '}
                            <NextLink
                                href="/login"
                                passHref
                            >
                                <Link
                                    variant="subtitle2"
                                    underline="hover"
                                >
                                    Entrar
                                </Link>
                            </NextLink>
                        </Typography>
                    </form>
                </Container>
            </Box>
        </>
    );
};

export default Register;