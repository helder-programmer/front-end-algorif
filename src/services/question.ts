import { Api } from "./api";


interface ICreateQuestionParams {
    title: string;
    description?: string;
    detailedDescription: string;
    code: string;
    topicId: string;
    difficultyId: string;
    classId?: string;
}


export const QuestionService = {
    create: async (data: ICreateQuestionParams) => {
        const response = await Api.post('/questions', data);
        return response.data;
    }
}