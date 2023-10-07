import { useState } from "react";
import { TextField, Grid, Button } from "@mui/material";
import { IQuestion } from "@/domain/IQuestion";


interface IProps {
    question: IQuestion;
}

const Description = ({ question }: IProps) => {

    return (
        <>
            <TextField
              fullWidth
              multiline
              disabled
              value={question.detailedDescription}
            />

            <Grid container spacing={2} mt={2}>
                <Grid item xs={6}>
                    <TextField
                      fullWidth
                      multiline
                      disabled
                      label="Valor da Entrada"
                      value={question.tests ? question.tests[0].input: ''}
                    />
                </Grid>
                <Grid item xs={6}>
                    <TextField
                      fullWidth
                      multiline
                      disabled
                      label="Valor da Saída"
                      value={question.tests ? question.tests[0].output: ''}
                    />
                </Grid>
            </Grid>

        </>
    );
};

export default Description
