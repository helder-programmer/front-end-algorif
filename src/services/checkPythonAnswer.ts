import axios from "axios";

type Test = {
    input: string;
    output: string;
}

interface ICheckPythonAnswerParams {
    functionName: string;
    function: string;
    tests: Test[];
}

interface ICheckCodeResponse {
    result: string | boolean;
}

export const checkPythonAnswerService = {
    checkCode: async (data: ICheckPythonAnswerParams) => {
        const response = await axios.post<ICheckCodeResponse>('https://pycoderunner.onrender.com/codes', data);
        return response.data;
    }
}