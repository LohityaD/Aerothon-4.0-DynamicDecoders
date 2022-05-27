import Header from "./Components/Header";
// import DropDown from "./Components/DropDown";
// import CodeArea from "./Components/CodeArea";
import OutputArea from "./Components/OutputArea";
import "./App.css";
import React, { useState } from "react";
import axios from "axios";

function App() {
  const [codeOutput, setCodeOutput] = useState("");
  const [language, setLanguage] = useState("Python");
  const [code, setCode] = useState("");
  const getOutput = () => {
    console.log(code);
    axios
      .post(`http://localhost:2022/runCode/`, {
        language: language,
        code: code,
      })
      .then((response) => {
        setCodeOutput(response.data.output);
      });
  };

  const updateCode = (event) => {
    setCode(event.target.value);
  };

  const updateLanguage = (event) => {
    setLanguage(event.target.value);
  };

  return (
    <div className="App">
      <header>
        <Header />
      </header>
      {/* <DropDown /> */}
      {/* <CodeArea /> */}
      <select value={language} onChange={updateLanguage}>
        <option value="C">C</option>
        <option value="C++">C++</option>
        <option value="Python">Python</option>
      </select>
      <div className="codeArea">
        <div className="inputArea">
          <span>Write code here!</span>
          <textarea value={code} onChange={updateCode} />
        </div>
        <div className="outputArea">
          <button onClick={getOutput}>RunCode</button>
          <span>Output</span>
          <OutputArea output={codeOutput} />
        </div>
      </div>
    </div>
  );
}

export default App;
