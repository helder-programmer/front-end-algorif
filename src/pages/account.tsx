import Head from 'next/head';
import { Avatar, Box, Button, Card, CardActions, CardContent, CardHeader, Container, Divider, Grid, Typography } from '@mui/material';
import { useAuth } from '@/contexts/auth';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import AppLayout from '@/components/layouts/appLayout.tsx';
import CustomTextField from '@/components/common/customTextField';
import { AuthService } from '@/services/auth';
import Router from 'next/router';

const Account = () => {
    const { user, setUser } = useAuth();


    const formik = useFormik({
        initialValues: {
            name: user?.name || '',
            email: user?.email || '',
            phone: user?.phone || '',
            state: user?.state || '',
            city: user?.city || ''
        },
        validationSchema: Yup.object({
            name: Yup
                .string()
                .required()
                .max(255)
                .required('Usuário é obrigatório'),
            state: Yup
                .string()
                .nullable()
                .max(255),
            city: Yup
                .string()
                .nullable()
                .max(255),
            phone: Yup
                .string()
                .nullable()
                .max(11)
        }),
        onSubmit: async () => {
            try {
                const { name, email, phone, state, city } = formik.values;
                const updatedUser = await AuthService.update({ name, email, phone, state, city });
                setUser(updatedUser);
                Router.push('/questions');
            } catch (err: any) {
                console.log(err);
            }
        }
    });

    return (
        <AppLayout>
            <Head>
                <title>
                    Conta
                </title>
            </Head>
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    py: 4
                }}
            >
                <Container maxWidth="lg">
                    <Typography
                        sx={{ mb: 3 }}
                        variant="h4"
                    >
                        Conta
                    </Typography>
                    <Grid
                        container
                        spacing={3}
                    >
                        <Grid
                            item
                            lg={4}
                            md={6}
                            xs={12}
                        >
                            <Card sx={{ backgroundColor: 'background.paper' }}>
                                <CardContent>
                                    <Box
                                        sx={{
                                            alignItems: 'center',
                                            display: 'flex',
                                            flexDirection: 'column',
                                        }}
                                    >

                                        <Avatar
                                            sx={{
                                                height: 64,
                                                mb: 2,
                                                width: 64
                                            }}
                                        />

                                        <Typography
                                            gutterBottom
                                            variant="h5"
                                        >
                                            {user?.name}
                                        </Typography>
                                        <Typography variant="body2">
                                            {`${user?.city ?? ''} - ${user?.state ?? ''}`}
                                        </Typography>
                                    </Box>
                                </CardContent>
                                <Divider />
                                {/* <CardActions>
                                    <Button
                                        fullWidth
                                        color="primary"
                                        variant="text"
                                        component="label"
                                    >
                                        Carregar foto
                                        <input
                                            onChange={handleFileUpload}
                                            hidden
                                            type="file"
                                        />
                                    </Button>
                                </CardActions> */}


                            </Card>
                        </Grid>
                        <Grid
                            item
                            lg={8}
                            md={6}
                            xs={12}
                        >
                            <form onSubmit={formik.handleSubmit} autoComplete="off" noValidate>
                                <Card>
                                    <CardHeader
                                        subheader="As informações podem ser editadas"
                                        title="Perfil"
                                    />
                                    <Divider />
                                    <CardContent>
                                        <Grid
                                            container
                                            spacing={0.5}
                                        >
                                            <Grid
                                                item
                                                md={12}
                                                xs={12}
                                            >
                                                <CustomTextField
                                                    type="text"
                                                    formik={formik}
                                                    required
                                                    helperText="Por favor especifique o nome completo"
                                                    label="Nome completo"
                                                    name="name"
                                                />
                                            </Grid>
                                            <Grid
                                                item
                                                md={6}
                                                xs={12}
                                            >
                                                <CustomTextField
                                                    type="text"
                                                    disabled
                                                    label="Endereço de e-mail"
                                                    name="email"
                                                    formik={formik}
                                                />
                                            </Grid>
                                            <Grid
                                                item
                                                md={6}
                                                xs={12}
                                            >
                                                <CustomTextField
                                                    label="Número de telefone"
                                                    name="phone"
                                                    type="number"
                                                    formik={formik}
                                                />
                                            </Grid>
                                            <Grid
                                                item
                                                md={6}
                                                xs={12}
                                            >
                                                <CustomTextField
                                                    type="text"
                                                    label="Estado"
                                                    name="state"
                                                    formik={formik}
                                                />
                                            </Grid>
                                            <Grid
                                                item
                                                md={6}
                                                xs={12}
                                            >
                                                <CustomTextField
                                                    type="text"
                                                    label="Cidade"
                                                    name="city"
                                                    formik={formik}
                                                />
                                            </Grid>
                                        </Grid>
                                    </CardContent>
                                    <Divider />
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            justifyContent: 'flex-end',
                                            p: 2
                                        }}
                                    >
                                        <Button
                                            disabled={formik.isSubmitting}
                                            type="submit"
                                            color="primary"
                                            variant="contained"
                                        >
                                            Salvar detalhes
                                        </Button>
                                    </Box>
                                </Card>
                            </form>
                        </Grid>
                    </Grid>
                </Container>
            </Box>
        </AppLayout>
    )
}

export default Account;
