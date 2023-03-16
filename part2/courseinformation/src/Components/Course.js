import React from 'react';

const Header = () => <h1>Web development curriculum</h1>;

const Total = ({ course }) => {
  const total = course
    .map((zfg) => zfg.parts.map((x) => x.exercises).reduce((sum, i) => sum + i))
    .reduce((sum, i) => sum + i);
  // console.log(total);
  return (
    <p>
      <b>Total of exercises {total}</b>
    </p>
  );
};

const Part = ({ item }) => {
  return item.parts.map((part) => (
    <p key={part.id}>
      {part.name} {part.exercises}
    </p>
  ));
};

const Content = ({ course }) => {
  return (
    <>
      {course.map((item) => (
        <div key={item.id}>
          <h2>{item.name}</h2>
          <Part item={item} />
        </div>
      ))}
    </>
  );
};

const Course = ({ course }) => {
  return (
    <div>
      <Header />
      <Content course={course} />
      <Total course={course} />
    </div>
  );
};

export default Course;
