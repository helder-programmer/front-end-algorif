import React, { useContext, useEffect, useRef, useState } from 'react';
import { Button } from '@mui/material';
import { UpdateContext } from '../../contexts/updateFirebase';
import { SetContext } from '../../contexts/setFirebase';
import 'codemirror/mode/javascript/javascript'
import 'codemirror/addon/edit/closebrackets';
import 'codemirror/addon/edit/closetag';
import 'codemirror/lib/codemirror.css'
import 'codemirror/theme/dracula.css'
import CodeMirror from 'codemirror';



const CodeEditor = ({ descriptionData, nameQuestion, taskSolved }) => {
    const [show, setShow] = useState(false);
    const [error, setError] = useState(false);
    const [solved, setSolved] = useState(false);
    const [verificationTask, setVerificationTask] = useState(false);
    const [testResults, setTestResults] = useState([]);
    const codeEditorRef = useRef(null);

    const updateContext = useContext(UpdateContext);
    const setContext = useContext(SetContext);

    useEffect(() => {
        if (codeEditorRef.current) {
            return
        }
        const codeEditor = CodeMirror.fromTextArea(document.getElementById('code-editor'), {
            mode: "javascript",
            theme: 'dracula',
            lineNumbers: true,
            autoCloseTags: true,
            autoCloseBrackets: true
        });
        codeEditor.setSize("100%", 520)
        codeEditor.setValue(`${descriptionData.code}`)

        codeEditorRef.current = codeEditor;
    }, []);

    const outputResult = () => {
        try {
            eval(codeEditorRef.current.getValue()); // executar o código
            output.innerHTML = consoleWritten.map(line => line + "<br>").join("\n");
            consoleWritten = []
        } catch (error) {
            output.textContent = error.toString();
        }
    };

    // redefinir console.log para adicionar saída ao elemento de saída
    let consoleWritten = [];
    const handleRun = () => {
        console.log = (...args) => {
            consoleWritten.push(...args);
        };
        outputResult();
    };

    const checkQuestion = () => {
        setVerificationTask(!verificationTask);

        let testsPassed = "\n let passedTests = []"
        let passed = "\n let passed = true"

        const testArray = descriptionData["test"].map((test) => {
            const input = test.input.split(",").map((item) => {
                // Verifica se o item é uma string que contém apenas letras
                const isStringOnlyLetters = /^[a-zA-ZáéíóúÁÉÍÓÚâêîôûÂÊÎÔÛÀàèìòùÈÌÒÙÇçÃãÕõ]+$/.test(item.trim());
                if (isStringOnlyLetters) {
                    return `"${item.trim()}"`;
                } else {
                    return item.trim();
                }
            }).join(", ");
            return (
                `
      var b = main(${input});
      if(b == "${test.output}"){
        passedTests.push(true)
      } else {
        passed = false
        passedTests.push(false)
      }
      setTestResults(passedTests)
      `
            )
        });

        let tests = codeEditorRef.current.getValue();

        tests = tests + testsPassed + passed

        testArray.forEach(test => {
            tests = tests + test
        });

        let testsDone = `
    if (passed === true) {
      setShow(true)
    } else {
      setError(true)
    }
    `
        tests += testsDone
        console.log(tests);
        try {
            eval(tests)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        //Confere se a questão já foi respondida corretamente
        if (!solved) {
            const isCompleted = taskSolved[nameQuestion]?.["completed"];
            if (show && !isCompleted) {
                setSolved(true);
                setContext.taskSolved(nameQuestion, descriptionData.topic, descriptionData.difficulty, true, codeEditorRef.current.getValue());
                updateContext.updateScore();
            } else if (error && !isCompleted) {
                setContext.taskSolved(nameQuestion, descriptionData.topic, descriptionData.difficulty, false, codeEditorRef.current.getValue());
            }
        }
    }, [verificationTask]);

    return (
        <>
            <textarea id='code-editor'></textarea>
            <div className='px-4 py-2 flex gap-4 justify-end'>
                <Button variant='outlined' href="#output"
                    onClick={handleRun}>Executar</Button>

                <Button variant='outlined' href="#Verificado"
                    onClick={checkQuestion}>Verificar Resposta</Button>
            </div>

            <div id="output"
                className='bg-[#1F2937] border overflow-y-auto border-gray-700 lg:h-[280px] h-[200px] p-6' />

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
        </>

    )
};

export default CodeEditor
