import React from 'react';
import ReactDOM from 'react-dom/client';

const Header = (props) => {
  return (
    <header>
      <h1>{props.course.name}</h1>
    </header>
  );
};

const Content = ({ course }) => {
  const item = course.parts;

  return (
    <>
      {item.map((part) => (
        <p key={part.name}>
          {part.name} {part.exercises}
        </p>
      ))}
    </>
  );
};

const Total = ({ course }) => {
  const exercises = course.parts
    .map(({ exercises }) => exercises)
    .reduce((a, b) => a + b);

  return (
    <div>
      <p>Number of exercises {exercises}</p>
    </div>
  );
};

const App = () => {
  const course = {
    name: 'Half Stack application development',

    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
      },
      {
        name: 'State of a component',
        exercises: 14,
      },
    ],
  };

  return (
    <div>
      <Header course={course} />
      <Content course={course} />
      <Total course={course} />
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <>
    <App />
  </>
);
