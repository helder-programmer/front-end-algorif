import { TextField } from "@mui/material";


type Props = {
    formik?: any;
    name: string;
    type: string;
    label?: string;
    value?: string;
    helperText?: string;
    select?: boolean;
    options?: any[];
    multiline?: boolean;
    rows?: number;
    readOnly?: boolean;
    disabled?: boolean;
    onBlur?: any;
    required?: boolean;
}

const CustomTextField = ({ formik, label, name, value, helperText, select, options, multiline, rows, readOnly, disabled, type, onBlur, required }: Props) => (
    <TextField
        error={Boolean(formik.touched[name] && formik.errors[name])}
        helperText={helperText || (formik.touched[name] && formik.errors[name])}
        fullWidth
        label={label}
        name={name}
        onChange={formik.handleChange}
        required={required}
        margin="normal"
        disabled={disabled}
        type={type}
        onBlur={onBlur}
        select={select}
        SelectProps={select ? { native: true } : {}}
        value={value || formik.values[name]}
        variant="outlined"
        multiline={multiline || false}
        rows={rows}
        InputProps={{
            readOnly: readOnly,
        }}  
    >
        {select ? options!.map((option) => (
            <option
                key={option.label}
                value={option.label}
            >
                {option.label}
            </option>
        )) : null}
    </TextField>
);

export default CustomTextField;