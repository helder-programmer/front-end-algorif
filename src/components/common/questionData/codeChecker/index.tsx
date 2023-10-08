import { IQuestion } from "@/domain/IQuestion";
import { QuestionService } from "@/services/question";
import { Button } from "@mui/material";
import { ViewUpdate } from "@uiw/react-codemirror";
import { useCallback, useState } from "react";

interface IProps {
    question: IQuestion;
    userCode: string;
}

function CodeChecker({ question, userCode }: IProps) {
    const [show, setShow] = useState(false);
    const [error, setError] = useState(false);
    const [solved, setSolved] = useState(false);
    const [isCorrectAnswer, setIsCorrectAnswer] = useState(false);
    const [testResults, setTestResults] = useState([]);
    const [result, setResult] = useState('');

    // redefinir console.log para adicionar saída ao elemento de saída
    let consoleWritten: any[] = [];
    const handleRun = () => {
        console.log = (...args) => {
            consoleWritten.push(...args);
        };
        outputResult();
    }

    const outputResult = () => {
        try {
            eval(userCode); // executar o código
            const result = consoleWritten.map(line => line).join("\n");
            consoleWritten = [];
            setResult(result);
        } catch (err: any) {
            console.log(err);
        }
    };

    const submitQuestionAnswer = async () => {
        checkQuestion();
        if (!isCorrectAnswer) return;

        await QuestionService.answerQuestion({
            questionId: question.questionId,
            code: userCode,
            isCorrectCode: isCorrectAnswer
        });

        alert('Questão respondida com sucesso!');
    }


    const checkQuestion = () => {
        // setVerificationTask(!verificationTask);

        let testsPassed = "\n let passedTests = []";
        let passed = "\n let passed = true";

        const testArray = question.tests!.map((test) => {
            const input = test.input.split(",").map((item) => {
                // Verifica se o item é uma string que contém apenas letras
                const isStringOnlyLetters = /^[a-zA-ZáéíóúÁÉÍÓÚâêîôûÂÊÎÔÛÀàèìòùÈÌÒÙÇçÃãÕõ]+$/.test(item.trim());
                if (isStringOnlyLetters) {
                    return `"${item.trim()}"`;
                } else {
                    return item.trim();
                }
            }).join(", ");

            return (`
                var functionResult = main(${input});
                if(functionResult == "${test.output}"){
                    passedTests.push(true);
                } else {
                    passed = false;
                    passedTests.push(false);
                }
                setTestResults(passedTests);
            `
            );
        });

        let mainCode = userCode + testsPassed + passed;

        testArray.forEach(test => {
            mainCode += test;
        });

        let testsDone = `
            setIsCorrectAnswer(passed);
            if (passed === true) {
                setShow(true);
            } else {
                setError(true);
            }
        `
        mainCode += testsDone;
        try {
            eval(mainCode);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <section>
            <div className='px-4 py-2 flex gap-4 justify-end'>
                <Button
                    variant='outlined'
                    onClick={handleRun}
                >
                    Executar
                </Button>

                <Button
                    variant='outlined'
                    href="#Verificado"
                    onClick={submitQuestionAnswer}
                >
                    Enviar Resposta
                </Button>
            </div>

            <div id="output" className='bg-[#1F2937] border overflow-y-auto border-gray-700 lg:h-[250px] h-[200px] p-6'>
                {result}
            </div>

            <div id="Verificado">
                {show || error ? (
                    <div
                        className='flex flex-wrap py-2 gap-2 bg-[#1F2937] my-2 border border-gray-700'>
                        {testResults.map((result, index) => (
                            <div key={index} className={`${result ? 'border-green-600 bg-green-700' : 'border-red-600 bg-red-700'} border p-4 m-2 `} />
                        ))}
                    </div>
                ) : null}
            </div>
        </section>
    );
}

export default CodeChecker;