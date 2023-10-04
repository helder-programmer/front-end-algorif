import { Box, Button, ButtonGroup, Typography } from "@mui/material";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import * as Yup from 'yup';
import Head from "next/head";
import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import { dracula } from '@uiw/codemirror-theme-dracula';
import { StreamLanguage } from "@codemirror/language";

import AppLayout from "@/components/layouts/appLayout.tsx";
import CustomTextField from "@/components/common/customTextField";
import { QuestionTopicService } from "@/services/questionTopic";
import { QuestionsTopics } from "@/components/common/questions/questionTopics";
import { IQuestionTopic } from "@/domain/IQuestionTopic";
import { IQuestionDifficulty } from "@/domain/IQuestionDifficulty";




const codePython = "def main():\n    # Seu código Python aqui\n    return\n\nprint(main())";
const codeJs = "function main(/*variáveisDeEntradas*/) {\n    return\n} \n\nconsole.log(main())";

function CreateQuestion() {
    const [isPython, setPython] = useState(false);
    const [topics, setTopics] = useState<IQuestionTopic[]>([]);
    const [difficulties, setDifficulties] = useState<IQuestionDifficulty[]>([]);


    const formik = useFormik({
        initialValues: {
            topic: '',
            title: '',
            description: '',
            detailedDescription: '',
            difficulty: '',
            tests: [
                { inputTest: '', outputTest: '' },
            ],
        },
        validationSchema: Yup.object({
            topic: Yup
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
            difficulty: Yup
                .string()
                .max(255)
                .required('Dificuldade é obrigatório'),
            tests: Yup.array().of(
                Yup.object({
                    inputTest: Yup
                        .string()
                        .max(255)
                        .required('Teste de entrada é obrigatório'),
                    outputTest: Yup
                        .string()
                        .required('Teste de saída é obrigatório'),
                })
            ),
        }),
        onSubmit: async () => {

        }
    });



    const getTopics = async () => {
        const topics = await QuestionTopicService.getAll();
        setTopics(topics);
    }


    const getDifficulties = async () => {
        const difficulties = await QUestion
    }

    useEffect(() => {
        QuestionsTopics
    }, []);

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
                        py: 8
                    }}
                >
                    <form onSubmit={formik.handleSubmit}
                        autoComplete="off"
                        noValidate
                    >
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
                                    name="topic"
                                    options={[]}
                                    required
                                    select
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
                                    name="difficulty"
                                    options={[]}
                                    required
                                    select
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

                                <CodeMirror
                                    theme={dracula}
                                    value={isPython ? codePython : codeJs}
                                    width="50vw"                                
                                    height="518px"
                                    extensions={[javascript()]}
                                />

                                <div className='w-[40%]'>
                                    <div className='px-1 py-1 flex justify-end bg-[#1F2937] border border-gray-700'>
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
                                        // onClick={handleRun}
                                        >
                                            Executar
                                        </Button>
                                    </div>
                                    <div id="output"
                                        className='bg-[#1F2937] border border-gray-700 h-[467.5px] overflow-y-auto p-6'
                                    />
                                </div>
                            </div>

                            {formik.values.tests && formik.values.tests.map((test, index) => (
                                <Box
                                    className='grid grid-cols-2 gap-x-4'
                                    key={`${test}-${index}`}
                                >
                                    <CustomTextField
                                        type="text"
                                        formik={formik}
                                        label={`${index + 1}° entrada dos dados`}
                                        name={`tests.${index}.inputTest`}
                                        value={test.inputTest}
                                        required
                                    />

                                    <CustomTextField
                                        type="text"
                                        formik={formik}
                                        label={`${index + 1}° saída dos dados`}
                                        name={`tests.${index}.outputTest`}
                                        value={test.outputTest}
                                        required
                                    />
                                </Box>
                            ))}

                            <Box className='flex flex-row gap-4 mt-4 mb-6'>
                                <Button
                                    sx={{ width: "50%" }}
                                    // onClick={addTest}
                                    variant='outlined'
                                    type='button'
                                >
                                    Adicionar caso de teste
                                </Button>

                                <Button
                                    sx={{ width: "50%" }}
                                    // onClick={removeTest}
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