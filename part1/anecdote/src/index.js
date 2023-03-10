import React from 'react';
import ReactDOM from 'react-dom/client';

import { useState } from 'react';

const App = () => {
  const anecdotes = [
    'Se fazer algo dói, faça isso com mais frequência.',
    'Contratar mão de obra para um projeto de software que já está atrasado, faz com que se atrase mais ainda!',
    'Os primeiros 90% do código correspondem aos primeiros 10% do tempo de desenvolvimento... Os outros 10% do código correspondem aos outros 90% do tempo de desenvolvimento.',
    'Qualquer tolo escreve código que um computador consegue entender. Bons programadores escrevem código que humanos conseguem entender.',
    'Otimização prematura é a raiz de todo o mal.',
    'Antes de mais nada, depurar é duas vezes mais difícil do que escrever o código. Portanto, se você escrever o código da forma mais inteligente possível, você, por definição, não é inteligente o suficiente para depurá-lo.',
    'Programar sem o uso extremamente intenso do console.log é o mesmo que um médico se recusar a usar raio-x ou testes sanguíneos ao diagnosticar pacientes.',
    'A única maneira de ir rápido é ir bem.',
  ];

  const Button = (props) => (
    <button onClick={props.handleClick}>{props.text}</button>
  );

  const [selected, setSelected] = useState(0);
  const [points, setPoints] = useState([4, 2, 9, 2, 12, 3, 7, 1]);

  const setToAnecdotes = (nvl) => {
    if (nvl < anecdotes.length) {
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
      <h1>Anecdote of day</h1>
      <div>{anecdotes[selected]}</div>
      <p>has {copy[selected]} votes</p>
      <Button handleClick={() => voteAnecdotes(selected)} text="VOTE" />
      <Button
        handleClick={() => setToAnecdotes(selected + 1)}
        text="NEXT Anecdote"
      />
      <div>
        <h2>Anecdote with most votes</h2>
        <div>{anecdotes[maior]}</div>
      </div>
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
