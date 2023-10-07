import { IQuestionDifficulty } from "./IQuestionDifficulty";
import { IQuestionTest } from "./IQuestionTest";

export interface IQuestion {
    questionId: string;
    title: string;
    description: string;
    detailedDescription: string;
    code: string;
    createdAt: Date;
    updatedAt: Date;
    classId: string;
    topicId: string;
    difficultyId: string;
    userCreatorId: string;
    difficulty?: IQuestionDifficulty;
    tests?: IQuestionTest[];
}