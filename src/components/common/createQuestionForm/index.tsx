import { Box, Button, ButtonGroup, TextField, Typography } from "@mui/material";
import { useFormik } from "formik";
import { useCallback, useEffect, useState } from "react";
import { ViewUpdate } from "@uiw/react-codemirror";
import * as Yup from 'yup';

import CustomTextField from "@/components/common/customTextField";
import CodeEditor from "@/components/common/codeEditor";
import { QuestionTopicService } from "@/services/questionTopic";
import { IQuestionTopic } from "@/domain/IQuestionTopic";
import { IQuestionDifficulty } from "@/domain/IQuestionDifficulty";
import { QuestionDifficultyService } from "@/services/questionDifficulty";
import { QuestionService } from "@/services/question";
import Router from "next/router";


const codePython = "def main():\n    # Seu código Python aqui\n    return\n\nprint(main())";
const codeJs = "function main(/*variáveisDeEntradas*/) {\n    return\n} \n\nconsole.log(main())";

function CreateQuestionForm() {
    const [isPython, setPython] = useState(false);
    const [topics, setTopics] = useState<IQuestionTopic[]>([]);
    const [difficulties, setDifficulties] = useState<IQuestionDifficulty[]>([]);
    const [result, setResult] = useState('');


    const formik = useFormik({
        initialValues: {
            topicId: '',
            title: '',
            description: '',
            codeJs: '',
            codePython: '',
            detailedDescription: '',
            difficultyId: '',
            tests: [
                { input: '', output: '' }
            ],
        },
        validateOnBlur: false,
        validateOnChange: false,
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
                alert('Questão cadastrada com sucesso!');
                Router.push('/');
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

    const handleCodeEditorChange = useCallback((value: string, viewUpdate: ViewUpdate) => {
        if (isPython) {
            formik.setValues({ ...formik.values, codePython: value });
        } else {
            formik.setValues({ ...formik.values, codeJs: value });
        }
    }, [formik, isPython]);


    let consoleWritten: any[] = [];
    const handleRun = () => {
        console.log = (...args) => {
            consoleWritten.push(...args);
        };
        outputResult();
    };

    const outputResult = () => {
        try {
            const code = formik.values.codeJs;
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
        formik.setValues({ ...formik.values, codeJs, codePython });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);


    return (
        <form onSubmit={formik.handleSubmit} autoComplete="off">
            <Box>
                <Box className='grid grid-cols-2 gap-x-4'>
                    <TextField
                        label="Tópico da questão"
                        name="topicId"
                        margin="normal"
                        variant="outlined"
                        fullWidth
                        error={Boolean(formik.touched.topicId && formik.errors.topicId)}
                        helperText={formik.touched.topicId && formik.errors.topicId}
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        select
                        SelectProps={{ native: true }}
                    >
                        <option value=""></option>
                        {topics.map(topic => (
                            <option value={topic.topicId} key={topic.topicId}>
                                {topic.name}
                            </option>
                        ))}
                    </TextField>
                    <TextField
                        label="Títilo da questão"
                        name="title"
                        margin="normal"
                        variant="outlined"
                        fullWidth
                        error={Boolean(formik.touched.title && formik.errors.title)}
                        helperText={formik.touched.title && formik.errors.title}
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        value={formik.values.title}
                    />
                    <TextField
                        label="Dificuldade da questão"
                        type="text"
                        name="difficultyId"
                        margin="normal"
                        variant="outlined"
                        fullWidth
                        error={Boolean(formik.touched.difficultyId && formik.errors.difficultyId)}
                        helperText={formik.touched.difficultyId && formik.errors.difficultyId}
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        select
                        SelectProps={{ native: true }}
                    >
                        <option value=""></option>
                        {difficulties.map(difficulty => (
                            <option value={difficulty.difficultyId} key={difficulty.difficultyId}>
                                {difficulty.name}
                            </option>
                        ))}
                    </TextField>
                    <TextField
                        label="Decrição da questão"
                        type="text"
                        name="description"
                        margin="normal"
                        variant="outlined"
                        fullWidth
                        error={Boolean(formik.touched.description && formik.errors.description)}
                        helperText={formik.touched.description && formik.errors.description}
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        value={formik.values.description}
                    />
                </Box>
                <TextField
                    label="Descrição detalhada da questão"
                    type="text"
                    name="detailedDescription"
                    margin="normal"
                    variant="outlined"
                    fullWidth
                    error={Boolean(formik.touched.detailedDescription && formik.errors.detailedDescription)}
                    helperText={formik.touched.detailedDescription && formik.errors.detailedDescription}
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    value={formik.values.detailedDescription}
                    rows={10}
                    multiline
                />

                <Typography
                    className='mt-4'
                    color="primary.text"
                    variant="h5"
                >
                    Dados da função
                </Typography>

                <div className='flex mt-2'>

                    <CodeEditor
                        isPython={isPython}
                        onChange={handleCodeEditorChange}
                        width="60vw"
                        height="518px"
                        value={isPython ? formik.values.codePython : formik.values.codeJs}
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
                        <TextField
                            label={`${index + 1}° entrada dos dados`}
                            type="text"
                            name={`tests.${index}.input`}
                            margin="normal"
                            variant="outlined"
                            fullWidth
                            required
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            value={test.input}
                        />
                        <TextField
                            label={`${index + 1}° saída dos dados`}
                            type="text"
                            name={`tests.${index}.output`}
                            margin="normal"
                            variant="outlined"
                            fullWidth
                            required
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            value={test.output}
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
    );
}

export default CreateQuestionForm;