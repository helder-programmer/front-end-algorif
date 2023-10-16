import { Api } from "./api";


type Test = {
    input: string;
    output: string;
}

interface ICreateQuestionParams {
    title: string;
    description?: string;
    detailedDescription: string;
    codeJs: string;
    codePython: string;
    topicId: string;
    difficultyId: string;
    classId?: string;
    tests: Test[];
}


interface IAnswerQuestionParams {
    questionId: string;
    isCorrectCode: boolean;
    code: string;
}


export const QuestionService = {
    create: async (data: ICreateQuestionParams) => {
        const response = await Api.post('/questions', data);
        return response.data;
    },
    getUnansweredQuestions: async () => {
        const response = await Api.get('/questions/getUnansweredQuestions');
        return response.data;
    },
    getOne: async (questionId: string) => {
        const response = await Api.get(`/questions/${questionId}`);
        return response.data;
    },
    answerQuestion: async ({ questionId, code, isCorrectCode }: IAnswerQuestionParams) => {
        const response = await Api.put(`/questions/answer/${questionId}`, { code, isCorrectCode });
        return response.data;
    }
}