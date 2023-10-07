import { Box, Typography } from "@mui/material";
import Head from "next/head";

import AppLayout from "@/components/layouts/appLayout.tsx";
import CreateQuestionForm from "@/components/common/createQuestionForm";


function CreateQuestion() {

    return (
        <AppLayout>
            <Head>
                <title>
                    Criar Questão
                </title>
            </Head>

            <div className='px-[5%]'>
                <Box component="main" sx={{ flexGrow: 1, py: 4 }}>
                    <Typography
                        color="primary.text"
                        variant="h4"
                    >
                        Criar nova questão
                    </Typography>
                    <CreateQuestionForm />
                </Box>
            </div>
        </AppLayout>
    );
};


export default CreateQuestion;