import { Box, Button, ButtonGroup, Typography } from "@mui/material";
import { useFormik } from "formik";
import { useCallback, useEffect, useState } from "react";
import { ViewUpdate } from "@uiw/react-codemirror";
import * as Yup from 'yup';
import Head from "next/head";

import AppLayout from "@/components/layouts/appLayout.tsx";
import CustomTextField from "@/components/common/customTextField";
import CodeEditor from "@/components/common/codeEditor";
import { QuestionTopicService } from "@/services/questionTopic";
import { IQuestionTopic } from "@/domain/IQuestionTopic";
import { IQuestionDifficulty } from "@/domain/IQuestionDifficulty";
import { QuestionDifficultyService } from "@/services/questionDifficulty";
import { QuestionService } from "@/services/question";

const codePython = "def main():\n    # Seu código Python aqui\n    return\n\nprint(main())";
const codeJs = "function main(/*variáveisDeEntradas*/) {\n    return\n} \n\nconsole.log(main())";



function CreateQuestion() {
    const [isPython, setPython] = useState(false);
    const [topics, setTopics] = useState<IQuestionTopic[]>([]);
    const [difficulties, setDifficulties] = useState<IQuestionDifficulty[]>([]);
    const [result, setResult] = useState('');


    const formik = useFormik({
        initialValues: {
            topicId: '',
            title: '',
            description: '',
            code: isPython ? codePython : codeJs,
            detailedDescription: '',
            difficultyId: '',
            tests: [
                { input: '', output: '' }
            ],
        },
        validationSchema: Yup.object({
            topicId: Yup
                .string()
                .max(255)
                .required('Tópico da questão é obrigatório'),
            title: Yup
                .string()
                .max(255)
                .required('Título é obrigatório'),
            description: Yup
                .string(),
            detailedDescription: Yup
                .string()
                .required('Descrição detalhada é obrigatório'),
            difficultyId: Yup
                .string()
                .max(255)
                .required('Dificuldade é obrigatório'),
            tests: Yup.array().of(
                Yup.object({
                    input: Yup
                        .string()
                        .max(255)
                        .required('Teste de entrada é obrigatório'),
                    output: Yup
                        .string()
                        .required('Teste de saída é obrigatório'),
                })
            ),
        }),
        onSubmit: async () => {
            try {
                await QuestionService.create(formik.values);
                console.log('Deu certo');
            } catch (err: any) {
                console.log(err);
            }
        }
    });


    const addTest = () => {
        formik.setValues({
            ...formik.values,
            tests: [...formik.values.tests, { input: '', output: '' }]
        });
    }

    const removeTest = () => {
        const updatedTests = [...formik.values.tests];
        updatedTests.pop();
        formik.setValues({ ...formik.values, tests: updatedTests });
    }

    const getTopics = async () => {
        const topics = await QuestionTopicService.getAll();
        setTopics(topics);
    }


    const getDifficulties = async () => {
        const difficulties = await QuestionDifficultyService.getAll();
        setDifficulties(difficulties);
    }

    const codeEditorHandleChange = useCallback((value: string, viewUpdate: ViewUpdate) => {
        formik.setValues({ ...formik.values, code: value });
    }, []);


    let consoleWritten: any[] = [];
    const handleRun = () => {
        console.log = (...args) => {
            consoleWritten.push(...args);
        };
        outputResult();
    };

    const outputResult = () => {
        try {
            const code = formik.values.code;
            eval(code);
            const result = consoleWritten.map(line => line).join("\n");
            consoleWritten = [];
            setResult(result);
        } catch (err: any) {
            console.log(err);
        }
    }

    useEffect(() => {
        getTopics();
        getDifficulties();
    }, []);


    useEffect(() => {
        formik.setValues({ ...formik.values, code: isPython ? codePython : codeJs });
    }, [isPython]);

    return (
        <AppLayout>
            <Head>
                <title>
                    Criar Questão
                </title>
            </Head>

            <div className='px-[5%]'>
                <Box
                    component="main"
                    sx={{
                        flexGrow: 1,
                        py: 4
                    }}
                >
                    <form onSubmit={formik.handleSubmit} autoComplete="off" noValidate>
                        <Box>
                            <Typography
                                color="primary.light"
                                variant="h4"
                            >
                                Criar nova questão
                            </Typography>

                            <Box className='grid grid-cols-2 gap-x-4'>
                                <CustomTextField
                                    formik={formik}
                                    label="Selecione o tópico"
                                    name="topicId"
                                    options={topics}
                                    required
                                    select
                                    selectKey="topicId"
                                    selectLabel="name"
                                />
                                <CustomTextField
                                    type="text"
                                    formik={formik}
                                    label="Título da questão"
                                    name="title"
                                    required
                                />
                                <CustomTextField
                                    type="text"
                                    formik={formik}
                                    label="Selecione a dificuldade"
                                    name="difficultyId"
                                    options={difficulties}
                                    required
                                    select
                                    selectKey="difficultyId"
                                    selectLabel="name"
                                />
                                <CustomTextField
                                    formik={formik}
                                    label="Descrição da questão"
                                    name="description"
                                />
                            </Box>

                            <CustomTextField
                                formik={formik}
                                label="Descrição detalhada da questão"
                                name="detailedDescription"
                                rows={10}
                                required
                                multiline
                            />

                            <Typography
                                className='mt-4'
                                color="primary.light"
                                variant="h5"
                            >
                                Dados da função
                            </Typography>

                            <div className='flex mt-2'>

                                <CodeEditor
                                    isPython={isPython}
                                    onChange={codeEditorHandleChange}
                                    width="60vw"
                                    height="518px"
                                    value={formik.values.code}
                                />

                                <div className='w-[40%]'>
                                    <div className='px-1 pt-2 flex justify-center bg-[#1F2937] border border-gray-700'>
                                        <ButtonGroup
                                            className='mr-2'>
                                            <Button
                                                onClick={() => setPython(false)}
                                                variant={!isPython ? 'contained' : 'outlined'}
                                            >
                                                Javascript
                                            </Button>
                                            <Button
                                                onClick={() => setPython(true)}
                                                variant={isPython ? 'contained' : 'outlined'}
                                            >
                                                Python
                                            </Button>
                                        </ButtonGroup>

                                        <Button
                                            variant='outlined'
                                            type='button'
                                            onClick={() => handleRun()}
                                        >
                                            Executar
                                        </Button>
                                    </div>
                                    <div className='bg-[#1F2937] border border-gray-700 h-[467.5px] overflow-y-auto p-6'>
                                        <p>{result}</p>
                                    </div>
                                </div>
                            </div>

                            {formik.values.tests && formik.values.tests.map((test, index) => (
                                <Box className='grid grid-cols-2 gap-x-4' key={`${test}-${index}`}>
                                    <CustomTextField
                                        type="text"
                                        formik={formik}
                                        label={`${index + 1}° entrada dos dados`}
                                        name={`tests.${index}.inputTest`}
                                        value={test.input}
                                        required
                                    />

                                    <CustomTextField
                                        type="text"
                                        formik={formik}
                                        label={`${index + 1}° saída dos dados`}
                                        name={`tests.${index}.outputTest`}
                                        value={test.output}
                                        required
                                    />
                                </Box>
                            ))}

                            <Box className='flex flex-row gap-4 mt-4 mb-6'>
                                <Button
                                    sx={{ width: "50%" }}
                                    onClick={addTest}
                                    variant='outlined'
                                    type='button'
                                >
                                    Adicionar caso de teste
                                </Button>

                                <Button
                                    sx={{ width: "50%" }}
                                    onClick={removeTest}
                                    variant='outlined'
                                    type='button'
                                >
                                    Remover caso de teste
                                </Button>
                            </Box>
                        </Box>

                        <Button
                            fullWidth
                            type='submit'
                            color="primary"
                            variant="contained"
                            disabled={formik.isSubmitting}
                        >
                            Cadastrar questão
                        </Button>
                    </form>
                </Box>
            </div>
        </AppLayout>
    );
};


export default CreateQuestion;