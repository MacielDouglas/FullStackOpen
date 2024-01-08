import { useEffect, useState } from "react";
import { createDiary, getAllDiaries } from "./services/diaryService";
import { Diary } from './type';


function App() {
  const [diaries, setDiaries] = useState<Diary[]>([]);
  const [newDate, setNewDate] = useState('');
  const [newWeather, setNewWeather] = useState('');
  const [newVisibility, setNewVisibility] = useState('');
  const [newComment, setNewComment] = useState('');

  useEffect(() => {
    getAllDiaries().then(data => {
      setDiaries(data)
    })
  }, [])

  const diaryCreation = (event: React.SyntheticEvent) => {
    event.preventDefault();
    const addNewDiary = {
      id: Number(diaries.length) +1,
      date: newDate,
      weather: newWeather,
      visibility: newVisibility,
      comment: newComment
    }
    createDiary(addNewDiary).then(data => {
      setDiaries(diaries.concat(data))
    })
    setNewDate('');
    setNewComment('')
    setNewVisibility('')
    setNewWeather('')
  };

  return (
    <div>
      <h1>Add new entry</h1>
      <form onSubmit={diaryCreation}>
        Date: <input value={newDate}  type="date"  onChange={(event) => setNewDate(event.target.value)}/> <br />
        Weather: <input value={newWeather}  onChange={(event) => setNewWeather(event.target.value)}/> <br />
        Visibility: <input value={newVisibility}  onChange={(event) => setNewVisibility(event.target.value)}/> <br />
        Comment: <input value={newComment}  onChange={(event) => setNewComment(event.target.value)}/> <br />
        <button type="submit">Add</button>
      </form>
      <h1>Diary entries</h1>
      {diaries.map(dry => <li key={dry.id} style={{'listStyle':'none'}}>
        <h2>{dry.date}</h2>
        <p>visibility: {dry.visibility}</p>
        <p>weather: {dry.weather}</p>
      </li>)}
    </div>
  )
}

export default App
