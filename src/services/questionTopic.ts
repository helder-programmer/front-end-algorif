import { IQuestionTopic } from "@/domain/IQuestionTopic";
import { Api } from "./api"



export const QuestionTopicService = {
    getAll: async () => {
        const response = await Api.get<IQuestionTopic[]>('/questionTopics');
        return response.data;
    }
}