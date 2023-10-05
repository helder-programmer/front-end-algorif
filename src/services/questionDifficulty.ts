import { IQuestionDifficulty } from "@/domain/IQuestionDifficulty";
import { Api } from "./api"


export const QuestionDifficultyService = {
    getAll: async () => {
        const response = await Api.get<IQuestionDifficulty[]>('/questionDifficulties');
        return response.data;
    }
}