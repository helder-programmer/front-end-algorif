import Head from 'next/head';
import { Box } from '@mui/material';
import AppLayout from '@/components/layouts/appLayout.tsx';
import { QuestionsTopics } from '@/components/common/questions/questionTopics';

function Topics() {

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
                    {/* <SearchQuestion /> */}
                    <div className='pt-8' />
                    {/* <QuestionsSuggest /> */}

                </div>
            </Box>
        </AppLayout>
    );
}

export default Topics;
