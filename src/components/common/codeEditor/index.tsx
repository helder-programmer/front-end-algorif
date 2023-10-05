import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import { dracula } from '@uiw/codemirror-theme-dracula';
import { python } from '@codemirror/lang-python';
import { ViewUpdate } from '@uiw/react-codemirror';



interface IProps {
    isPython: boolean,
    width: string;
    height: string;
    onChange(value: string, viewUpdate: ViewUpdate): void;
    value: string;
}


function CodeEditor({ isPython, width, height, onChange, value }: IProps) {

    return (
        <CodeMirror
            theme={dracula}
            value={value}
            width={width}
            height={height}
            extensions={[isPython ? python() : javascript()]}
            onChange={onChange}
        />
    );
}


export default CodeEditor;