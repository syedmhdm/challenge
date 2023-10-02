import { Children, useState } from "react";
import "./App.css";

// `https://api.frankfurter.app/latest?amount=100&from=EUR&to=USD`

export default function App() {
  const [inputCurrency, setInputCurrency] = useState("");
  const [output, setOutput] = useState("");
  const [from, setFrom] = useState("USD");
  const [to, setTo] = useState("EUR");

  async function handleChangeInputCurrency(e) {
    setInputCurrency(() => {
      setOutputFunction(e.target.value, from, to);
      return e.target.value;
    });
  }

  function handleChangeFrom(e) {
    setFrom(() => {
      setOutputFunction(inputCurrency, e.target.value, to);
      return e.target.value;
    });
  }
  function handleChangeTo(e) {
    setTo(() => {
      setOutputFunction(inputCurrency, from, e.target.value);
      return e.target.value;
    });
  }

  async function setOutputFunction(amount, from, to) {
    if (from === to) {
      setOutput("Not Applicable");
      return;
    }

    const res = await fetch(
      `https://api.frankfurter.app/latest?amount=${amount}&from=${from}&to=${to}`
    );

    const data = await res.json();

    setOutput(data.rates[to]);
  }

  return (
    <div>
      <input
        type='text'
        value={inputCurrency}
        onChange={handleChangeInputCurrency}
      />
      <select value={from} onChange={handleChangeFrom}>
        <option value='USD'>USD</option>
        <option value='EUR'>EUR</option>
        <option value='CAD'>CAD</option>
        <option value='INR'>INR</option>
      </select>
      <select value={to} onChange={handleChangeTo}>
        <option value='USD'>USD</option>
        <option value='EUR'>EUR</option>
        <option value='CAD'>CAD</option>
        <option value='INR'>INR</option>
      </select>
      <p>{output}</p>
    </div>
  );
}
