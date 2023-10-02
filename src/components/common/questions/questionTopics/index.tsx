import { Card, CardContent, Grid, Typography } from '@mui/material';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Box } from '@mui/system';

import Loader from '../../loader';
import { QuestionTopicService } from '@/services/questionTopic';
import { theme } from '@/styles';

export const QuestionsTopics = () => {
    const [topics, setTopics] = useState<IQuestionTopic[]>([]);


    const getTopics = async () => {
        const topics = await QuestionTopicService.getAll();
        setTopics(topics);
    }

    useEffect(() => {
        getTopics();
    }, []);

    return (
        <Card sx={{ backgroundColor: theme => theme.palette.background.paper }}>
            <CardContent>
                <Grid
                    container
                    width="100%"
                    sx={{ justifyContent: 'space-between' }}
                >
                    <Typography
                        sx={{ pb: 3 }}
                        color="textPrimary"
                        variant="h6"
                    >
                        Selecione um Tópico
                    </Typography>
                </Grid>

                {topics ?
                    <Grid className='sm:grid-cols-2 grid-cols-1' sx={{ display: 'grid', justifyContent: 'space-between', gap: 1 }} width="100%">
                        {topics.map(topic => (
                            <div key={`${topic.topicId}`} className='border border-gray-500 border-solid flex justify-center w-full p-3 hover:border-green-500'>
                                <Link href={`/tasks/${topic}`}>
                                    <Typography sx={{color: theme => theme.palette.text.primary}}>
                                        {topic.name}
                                    </Typography>
                                </Link>
                            </div>
                        ))}
                    </Grid>
                    : <Loader />
                }
            </CardContent>
        </Card>
    );
}