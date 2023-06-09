import "./App.css";
import { Configuration, OpenAIApi } from "openai";
import OptionSelection from "./components/OptionSelection";
import Translation from "./components/Translation";
import { arrayItems } from "./AIOptions";
import { useState } from "react";
import { apikey } from "../../openai.config";

function App() {
  const configuration = new Configuration({
    apiKey: apikey,
  });
  const openai = new OpenAIApi(configuration);
  const [option, setOption] = useState({});
  const [result, setResult] = useState("");
  const [input, setInput] = useState("");
  const selectOption = (option) => {
    setOption(option);
  };

  const doStuff = async () => {
    let object = {model:"text-davinci-003", prompt:input , max_tokens: 100};
    

    const response = await openai.createCompletion(object);

    setResult(response.data.choices[0].text);
  };

  return (
    <div className="App">
      {Object.values(option).length === 0 ? (
        <OptionSelection arrayItems={arrayItems} selectOption={selectOption} />
      ) : (
        <Translation doStuff={doStuff} setInput={setInput} result={result} />
      )}
    </div>
  );
}

export default App;
