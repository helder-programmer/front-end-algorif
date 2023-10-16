import { IQuestion } from "@/domain/IQuestion";
import { QuestionService } from "@/services/question";
import { Button, ButtonGroup, Divider, Typography } from "@mui/material";
import { ViewUpdate } from "@uiw/react-codemirror";
import { Dispatch, SetStateAction, useCallback, useState } from "react";

interface IProps {
    question: IQuestion;
    userCode: string;
    isPython: boolean;
    setIsPython: Dispatch<SetStateAction<boolean>>;
}

function CodeChecker({ question, userCode, isPython, setIsPython }: IProps) {
    const [show, setShow] = useState(false);
    const [error, setError] = useState(false);
    const [isCorrectAnswer, setIsCorrectAnswer] = useState(false);
    const [testResults, setTestResults] = useState([]);
    const [result, setResult] = useState('');

    // redefinir console.log para adicionar saída ao elemento de saída
    let consoleWritten: any[] = [];
    const handleRun = async () => {
        console.log = (...args) => {
            consoleWritten.push(...args);
        };

        // if (isPython) return await  
        outputResultJs();
    }

















    const outputResultPython = async () => {

    }






    const outputResultJs = () => {
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
        checkQuestionJs();
        if (!isCorrectAnswer) return;

        await QuestionService.answerQuestion({
            questionId: question.questionId,
            code: userCode,
            isCorrectCode: isCorrectAnswer
        });

        alert('Questão respondida com sucesso!');
    }

    const checkQuestionJs = () => {
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
                <ButtonGroup
                    className='mr-2'>
                    <Button
                        onClick={() => setIsPython(false)}
                        variant={!isPython ? 'contained' : 'outlined'}
                    >
                        Javascript
                    </Button>
                    <Button
                        onClick={() => setIsPython(true)}
                        variant={isPython ? 'contained' : 'outlined'}
                    >
                        Python
                    </Button>
                </ButtonGroup>
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

            <section className='rounded-l-md shadow-lg bg-[#1F2937] border overflow-y-auto border-gray-700 lg:h-[250px] h-[200px] py-4'>

                <div className="px-4 pb-2">
                    <Typography
                        variant="h5"
                        className="m-0"
                        component='h5'
                    >
                        Saída
                    </Typography>
                </div>
                <Divider />

                <div className="p-4">
                    {result}
                </div>
            </section>


            {show || error ? (
                <div
                    className='flex rounded-l-md shadow-lg flex-wrap py-2 gap-2 bg-[#1F2937] my-2 border border-gray-700'>
                    {testResults.map((result, index) => (
                        <div key={index} className={`${result ? 'border-green-600 bg-green-700' : 'border-red-600 bg-red-700'} border p-4 m-2 `} />
                    ))}
                </div>
            ) : null}

        </section>
    );
}

export default CodeChecker;