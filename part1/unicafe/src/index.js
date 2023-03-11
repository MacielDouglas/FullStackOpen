import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';

const Button = (props) => (
  <button onClick={props.handleClick}>{props.text}</button>
);

const Statistics = (props) => {
  const { good, neutral, bad } = props;
  const Statistic = (props) => (
    <tr>
      <td>{props.text}</td>
      <td>{props.value}</td>
    </tr>
  );
  if (good || neutral || bad !== 0) {
    return (
      <>
        <Statistic text="Good: " value={good} />
        <Statistic text="Neutral: " value={neutral} />
        <Statistic text="Bad: " value={bad} />
        <Statistic text="All: " value={good + neutral + bad} />
        <Statistic
          text="Average: "
          value={(good - bad) / (good + neutral + bad)}
        />
        <Statistic
          text="Positive: "
          value={(good * 100) / (good + neutral + bad) + ' %'}
        />
      </>
    );
  }

  return (
    <>
      <Statistic text="Good: " value={good} />
      <Statistic text="Neutral: " value={neutral} />
      <Statistic text="Bad: " value={bad} />
      <Statistic text="All: " value={good + neutral + bad} />
    </>
  );
};

const App = (props) => {
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
      <table>
        <tbody>
          <Statistics good={good} neutral={neutral} bad={bad} />
        </tbody>
      </table>
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <>
    <App />
  </>
);
