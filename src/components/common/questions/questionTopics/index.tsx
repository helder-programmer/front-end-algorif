import { Card, CardContent, Grid, Typography } from '@mui/material';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Box } from '@mui/system';

import Loader from '../../loader';
import { QuestionTopicService } from '@/services/questionTopic';

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
                            <button key={`${topic.topicId}`}>
                                <Link href={`/tasks/${topic}`}>
                                    <Typography className='border p-3 border-gray-500 hover:border-green-500 bg-transparent'>
                                        {topic.name}
                                    </Typography>
                                </Link>
                            </button>
                        ))}
                    </Grid>
                    : <Loader />
                }
            </CardContent>
        </Card>
    )
}