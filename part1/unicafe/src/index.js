import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
];

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

  const [selected, setSelected] = useState(0);
  const [points, setPoints] = useState([4, 2, 9, 2, 12, 3]);

  const setToGood = (newValue) => {
    setGood(newValue);
  };
  const setToNeutral = (newValue) => {
    setNeutral(newValue);
  };
  const setToBad = (newValue) => {
    setBad(newValue);
  };

  const setToAnecdotes = (nvl) => {
    if (nvl < props.anecdotes.length) {
      setSelected(nvl);
    } else {
      setSelected(0);
    }
  };

  const copy = [...points];
  const max = Math.max(...copy);
  const maior = copy.indexOf(max);

  const voteAnecdotes = (selected) => {
    copy[selected] += 1;
    setPoints([...copy]);
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
      <div>{props.anecdotes[selected]}</div>
      <p>has {copy[selected]} votes</p>
      <Button handleClick={() => voteAnecdotes(selected)} text="VOTE" />
      <Button
        handleClick={() => setToAnecdotes(selected + 1)}
        text="NEXT Anecdote"
      />
      <div>
        <h2>Anecdote with most votes</h2>
        <div>{props.anecdotes[maior]}</div>
      </div>
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <>
    <App anecdotes={anecdotes} />
  </>
);
