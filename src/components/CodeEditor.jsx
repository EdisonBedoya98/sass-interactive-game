import CodeMirror from '@uiw/react-codemirror';
import { sass } from '@codemirror/lang-sass';
import { oneDark } from '@codemirror/theme-one-dark';

export default function CodeEditor({ value, onChange, language = 'scss' }) {
  return (
    <div className="code-editor">
      <CodeMirror
        value={value}
        height="100%"
        theme={oneDark}
        extensions={[sass()]}
        onChange={onChange}
        basicSetup={{
          lineNumbers: true,
          foldGutter: true,
          autocompletion: true,
          bracketMatching: true,
          closeBrackets: true,
          indentOnInput: true,
          tabSize: 2,
        }}
      />
    </div>
  );
}
