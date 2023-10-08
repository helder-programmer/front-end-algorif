import Link from 'next/link';
import { Box, Card, CardContent, Grid, Typography } from '@mui/material';
import { useState } from 'react';
import { useEffect } from 'react';

import { QuestionService } from '@/services/question';
import { IQuestion } from '@/domain/IQuestion';
import Loader from '../../loader';



function QuestionsSuggest() {
    const [unansweredQuestions, setUnansweredQuestions] = useState<IQuestion[] | null>([]);

    const getQuestions = async () => {
        const questions = await QuestionService.getUnansweredQuestions();
        setUnansweredQuestions(questions);
    }

    useEffect(() => {
        getQuestions();
    }, []);

    return (
        <Card component='section' sx={{ backgroundColor: theme => theme.palette.background.paper }}>
            <CardContent>
                <Grid container width="100%" sx={{ justifyContent: 'space-between' }}>
                    <Typography className="pb-4" variant="h6">
                        Recomendações
                    </Typography>
                </Grid>
                {unansweredQuestions?.length === 0 ? (
                    <div className='flex justify-center items-center h-full text-gray-500 text-xl'>Todas as questões foram respondidas</div>
                ) : (
                    <Grid
                        className="grid-cols-1"
                        sx={{ display: 'grid', justifyContent: 'space-between' }}
                        width="100%"
                    >
                        {unansweredQuestions ? (
                            unansweredQuestions.map((question, i) => {
                                return (
                                    <Link href={`/questions/${question.topicId}/${question.questionId}`} key={`${question.title}-${i}`}>
                                        <div className="group">
                                            <div className="p-4 cursor-pointer border mb-3 border-solid border-gray-500 group-hover:border-green-500 w-full rounded">
                                                <div className="font-semibold">
                                                    <div className="p-2">
                                                        <div className="group-hover:text-green-500 flex text-[20px]">
                                                            {question.title}
                                                        </div>
                                                        <div className="text-[16px] flex">
                                                            <div className="flex">
                                                                <div>Nível:&nbsp;</div>
                                                                <div className="text-green-500">
                                                                    {question.difficulty?.name}
                                                                </div>
                                                            </div>
                                                            {/* <div>, Taxa de Acerto: {question.successRate}</div> */}
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="font-semibold block lg:justify-between lg:flex lg:items-center w-full">
                                                    <div className="text-left text-gray-400 p-2 lg:w-[60%]">
                                                        {question.description}
                                                    </div>
                                                    <button className="bg-transparent p-3 m-2 lg:m-0 border border-solid text-center border-gray-300 group-hover:bg-green-500 group-hover:border-green-500 text-gray-300 group-hover:text-[#1F2937] rounded-lg lg:w-[20%] ">
                                                        Resolver Desafio
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                );
                            })
                        )
                            : <Loader />
                        }
                    </Grid>
                )}
            </CardContent>
        </Card>
    );
}


export default QuestionsSuggest;