import Head from 'next/head';
import { Box, Divider } from '@mui/material';
import AppLayout from '@/components/layouts/appLayout.tsx';
import { QuestionsTopics } from '@/components/common/questions/questionTopics';
import QuestionsSuggest from '@/components/common/questions/questionsSuggest';

function Questions() {

    return (
        <AppLayout>
            <Head>
                <title>
                    Tópicos
                </title>
            </Head>
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    py: 4
                }}
            >
                <div className='px-[5%]'>
                    <QuestionsTopics />                    
                    <div className="pt-8" />
                    <QuestionsSuggest />
                </div>
            </Box>
        </AppLayout>
    );
}

export default Questions;
