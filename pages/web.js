import React from 'react'
import SplitPane from 'react-split-pane'

function WebCompiler(){
    return(
        <SplitPane split="horizontal" minSize={"50%"}>
            <SplitPane split="vertical" minSize={"33%"}>
                <div>1</div>
                <SplitPane split="vertical" minSize={"50%"}>
                    <div>2</div>
                    <div>3</div>
                </SplitPane>
            </SplitPane>
            <div>4</div>
        </SplitPane>
    )
}
export default WebCompiler