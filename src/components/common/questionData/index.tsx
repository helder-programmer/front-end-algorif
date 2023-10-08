import { useCallback, useEffect, useState } from "react";
import { ViewUpdate } from "@uiw/react-codemirror";

import { IQuestion } from "@/domain/IQuestion";
import CodeEditor from "../codeEditor";
import CodeChecker from "./codeChecker";
import Description from "./description";

interface IProps {
    question: IQuestion;
}

function QuestionData({ question }: IProps) {
    const [code, setCode] = useState('');


    useEffect(() => { setCode(question.code) }, [question.code]);

    const handleCodeEditorChange = useCallback((value: string, viewUpdate: ViewUpdate) => {
        setCode(value);
    }, []);

    return (
        <div className="w-full flex lg:flex-row h-full">
            <div className="lg:w-[40%] p-2">
                <h2 className="mb-3">Dados da Questão</h2>
                <div className="lg:overflow-y-auto lg:h-[85vh]">
                    <Description question={question} />
                </div>
            </div>

            <div className="lg:w-[60%] w-full flex flex-col">

                <CodeEditor
                    height="520px"
                    width="100%"
                    isPython={false}
                    onChange={handleCodeEditorChange}
                    value={code}
                />

                <CodeChecker
                    userCode={code}
                    question={question}
                />
            </div>
        </div>
    );
}

export default QuestionData;