import Head from 'next/head';
import NextLink from 'next/link';
import { useFormik } from 'formik';
import Router from 'next/router';
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
import CustomTextField from '../components/common/customTextField';
import { AuthService } from '@/services/auth';

function Register() {



    const formik = useFormik({
        initialValues: {
            email: '',
            name: '',
            password: '',
            city: '',
            state: '',
            isTeacher: false,
            policy: false
        },
        validateOnChange: false,
        validateOnBlur: false,
        validationSchema: Yup.object({
            email: Yup
                .string()
                .email('Deve ser um e-mail válido')
                .max(255)
                .required('E-mail é obrigatório'),
            name: Yup
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
            isTeacher: Yup
                .boolean(),
            policy: Yup
                .boolean()
                .oneOf(
                    [true],
                    'Este campo deve ser verificado'
                )
        }),
        onSubmit: async () => {
            try {
                await AuthService.register(formik.values);
                Router.push('/login');
            } catch (err: any) {
                console.log(err);
            }
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
                    <form onSubmit={formik.handleSubmit}>
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
                        <TextField
                            label="Nome de usuário"
                            type="text"
                            name="name"
                            margin="normal"
                            variant="outlined"
                            fullWidth
                            error={Boolean(formik.touched.name && formik.errors.name)}
                            helperText={formik.touched.name && formik.errors.name}
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            value={formik.values.name}
                        />
                        <TextField
                            label="Endereço de e-mail"
                            type="text"
                            name="email"
                            margin="normal"
                            variant="outlined"
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
                            margin="normal"
                            variant="outlined"
                            fullWidth
                            error={Boolean(formik.touched.password && formik.errors.password)}
                            helperText={formik.touched.password && formik.errors.password}
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            value={formik.values.password}
                        />
                        <div className='block sm:flex gap-3'>
                            <TextField
                                label="Estado"
                                type="text"
                                name="state"
                                margin="normal"
                                variant="outlined"
                                fullWidth
                                error={Boolean(formik.touched.state && formik.errors.state)}
                                helperText={formik.touched.state && formik.errors.state}
                                onBlur={formik.handleBlur}
                                onChange={formik.handleChange}
                                value={formik.values.state}
                            />
                            <TextField
                                label="Cidade"
                                type="text"
                                name="city"
                                margin="normal"
                                variant="outlined"
                                fullWidth
                                error={Boolean(formik.touched.city && formik.errors.city)}
                                helperText={formik.touched.city && formik.errors.city}
                                onBlur={formik.handleBlur}
                                onChange={formik.handleChange}
                                value={formik.values.city}
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
                                        checked={formik.values.isTeacher}
                                        name="isTeacher"
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
                        {Boolean(formik.touched.isTeacher && formik.errors.isTeacher) && (
                            <FormHelperText error>
                                {formik.errors.isTeacher}
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
                                disabled={formik.isSubmitting}
                                fullWidth
                                size="large"
                                type="submit"
                                variant="contained"
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
}

export default Register;