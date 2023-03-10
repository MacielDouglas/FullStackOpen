import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';

const Button = (props) => (
  <button onClick={props.handleClick}>{props.text}</button>
);

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const setToGood = (newValue) => {
    setGood(newValue);
  };
  const setToNeutral = (newValue) => {
    setNeutral(newValue);
  };
  const setToBad = (newValue) => {
    setBad(newValue);
  };

  return (
    <div>
      <h1>Give Feedback</h1>
      <Button handleClick={() => setToGood(good + 1)} text="Good" />
      <Button handleClick={() => setToNeutral(neutral + 1)} text="Neutral" />
      <Button handleClick={() => setToBad(bad + 1)} text="Bad" />

      <h2>Statistics</h2>
      <p>Good: {good}</p>
      <p>Neutral: {neutral}</p>
      <p>Bad: {bad}</p>
      <p>All: {good + neutral + bad}</p>
      <p>Average: {(good - bad) / (good + neutral + bad)}</p>
      <p>Positive: {(good * 100) / (good + neutral + bad) + ' %'}</p>
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <>
    <App />
  </>
);
