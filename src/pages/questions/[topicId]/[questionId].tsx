import { useEffect, useState } from "react"
import { Box } from "@mui/system"
import { useRouter } from "next/router"
import Head from "next/head"

import Loader from "@/components/common/loader"
import QuestionData from "@/components/common/questionData"
import { IQuestion } from "@/domain/IQuestion"
import { QuestionService } from "@/services/question"
import AppLayout from "@/components/layouts/appLayout.tsx"

function Question() {
    const router = useRouter();
    const [currentQuestion, setCurrentQuestion] = useState<IQuestion>({} as IQuestion);
    const questionId = String(router.query['questionId']);

    const getOneQuestion = async () => {
        const question = await QuestionService.getOne(questionId);
        setCurrentQuestion(question);
    }

    useEffect(() => {
        if (!router.isReady) return;
        getOneQuestion();
    }, [questionId]);

    return (
        <AppLayout>
            <Head>
                <title>
                    Algorif
                </title>
            </Head>
            <Box component="main" sx={{ flexGrow: 1, }}>
                <QuestionData question={currentQuestion} />
            </Box>
        </AppLayout>
    );
    // return <Loader />
}


export default Question;