import { Card, CardContent, Grid, Typography } from '@mui/material';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Box } from '@mui/system';

import Loader from '../../loader';
import { QuestionTopicService } from '@/services/questionTopic';
import { theme } from '@/styles';
import { IQuestionTopic } from '@/domain/IQuestionTopic';

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
        <Card component='section' sx={{ backgroundColor: theme => theme.palette.background.paper }}>
            <CardContent>
                <Grid
                    container
                    width="100%"
                    sx={{ justifyContent: 'space-between' }}
                >
                    <Typography
                        className="pb-4"
                        color="textPrimary"
                        variant="h6"
                    >
                        Selecione um Tópico
                    </Typography>
                </Grid>

                {topics.length ?
                    <Grid className='sm:grid-cols-2 grid-cols-1' sx={{ display: 'grid', justifyContent: 'space-between', gap: 1 }} width="100%">
                        {topics.map(topic => (
                            <Link href={`/questions/${topic.topicId}`} key={`${topic.topicId}`}>
                                <div className='cursor-pointer border border-gray-500 border-solid flex justify-center w-full p-3 hover:border-green-500'>
                                    <Typography sx={{ color: theme => theme.palette.text.primary }}>
                                        {topic.name}
                                    </Typography>
                                </div>
                            </Link>
                        ))}
                    </Grid>
                    : <Loader />
                }
            </CardContent>
        </Card>
    );
}