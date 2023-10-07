import { Api } from "./api";


type Test = {
    input: string;
    output: string;
}

interface ICreateQuestionParams {
    title: string;
    description?: string;
    detailedDescription: string;
    code: string;
    topicId: string;
    difficultyId: string;
    classId?: string;
    tests: Test[];
}


export const QuestionService = {
    create: async (data: ICreateQuestionParams) => {
        const response = await Api.post('/questions', data);
        return response.data;
    },
    getUnansweredQuestions: async () => {
        const response = await Api.get('/questions/getUnansweredQuestions');
        return response.data;
    }
}