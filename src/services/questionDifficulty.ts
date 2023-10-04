import { IQuestionDifficulty } from "@/domain/IQuestionDifficulty";
import { Api } from "./api"


export const QuestionDifficulty = {
    getAll: async () => {
        const response = await Api.get<IQuestionDifficulty[]>('/questionDifficulties');
        return response.data;
    }
}