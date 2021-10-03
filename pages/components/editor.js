import React from 'react'
import AceEditor from 'react-ace'
import 'brace/theme/monokai'
import 'brace/mode/html'
import 'brace/mode/css'
import 'brace/mode/javascript'
import styles from './editor.module.css'

function Editor({ mode, title, height, value, onChange}) {
    return (
        <div className={styles.container}>
            <div className={styles.title}>
                {title}
            </div>
            <AceEditor 
                mode={mode}
                theme="monokai"
                name={title}
                fontSize={14}
                width={"100%"}
                height={height}
                onChange={onChange}
                value={value}
                showPrintMargin={true}
                showGutter={true}
                tabSize={2}
                setOptions={{ useWorker:false }}
            />
        </div>
    )
}

export default Editor