import "./App.css";
import "./customBlocks/custom_Blocks";
import React, { useState, useEffect } from "react";
import { BlocklyWorkspace } from "react-blockly";
import Blockly from "blockly";
import ImagePreview from "./ImagePreview"
import toolboxConfig from "./toolbox.js"
import {workspaceRunner, workspaceEnvironment} from "./workspaceEnvironment"
import defaultWorkspace from "./defaultWorkspace";

export default function App() {
  const [xml, setXml] = useState("");
  const [javascriptCode, setJavascriptCode] = useState("");

  function workspaceDidChange(workspace) {
    Blockly.JavaScript.addReservedWords("image");
    window.LoopTrap = 1000;
    Blockly.JavaScript.INFINITE_LOOP_TRAP = 'if(--window.LoopTrap == 0) throw "Infinite loop.";\n';
    const code = workspaceEnvironment + Blockly.JavaScript.workspaceToCode(workspace) + workspaceRunner;
    setJavascriptCode(code);
  }

  function runCode(code) {
    try {
      eval(code);
    } catch (e) {
      alert(e);
      //throw e;
    }    
  }

  return (
    <>
      <textarea
        id="code"
        style={{ height: "200px", width: "400px" }}
        value={javascriptCode}
        readOnly
      ></textarea>
      <button onClick={() => runCode(javascriptCode)}>Run Code</button>
      <canvas id="test-canvas"></canvas>
      {/* <ImagePreview code={javascriptCode}></ImagePreview> */}
      
      <BlocklyWorkspace
        toolboxConfiguration={Blockly.utils.toolbox.convertToolboxDefToJson(toolboxConfig)}
        initialXml={initialXml}
        className="fill-height"
        workspaceConfiguration={{
          // toolbox : toolbox, 
          collapse : true, 
          comments : true, 
          disable : true, 
          maxBlocks : Infinity, 
          grid: {
            spacing: 20,
            length: 3,
            colour: '#ccc',
            snap: false
          },
          renderer: 'thrasos',
          theme: {
            'base': 'classic',
            'componentStyles': {
              'toolboxBackgroundColour': '#e6e9ef',
              'flyoutBackgroundColour': '#d2d2d2'
            },
            'fontStyle': {
              "family": "Fredoka, sans-serif",
              // "weight": "bold",
              "size": 12
            },
          },
          trashcan : true, 
          horizontalLayout : false, 
          toolboxPosition : 'start', 
          css : true, 
          media : 'https://blockly-demo.appspot.com/static/media/', 
          rtl : false, 
          scrollbars : false, 
          sounds : true, 
          oneBasedIndex : true
        }}
        onWorkspaceChange={workspaceDidChange}
        onXmlChange={setXml}
      />
      <pre id="generated-xml">{xml}</pre>

    </>
  );
}
