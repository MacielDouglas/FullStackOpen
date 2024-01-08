import React, { useEffect, useState } from "react";
import { createDiary, getAllDiaries } from "./services/diaryService";
import { Diary } from "./type";

function App() {
  const [diaries, setDiaries] = useState<Diary[]>([]);
  const [newDate, setNewDate] = useState("");
  const [newWeather, setNewWeather] = useState("");
  const [newVisibility, setNewVisibility] = useState("");
  const [newComment, setNewComment] = useState("");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchDiaries();
  }, []);

  const fetchDiaries = async () => {
    try {
      const data = await getAllDiaries();
      setDiaries(data || []);  // Defina um array vazio se data for undefined
      setError(null);
    } catch (error) {
      setError("Failed to fetch diary entries");
    }
  };

  const diaryCreation = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    const addNewDiary: Diary = {
      id: diaries.length + 1,
      date: newDate,
      weather: newWeather,
      visibility: newVisibility,
      comment: newComment,
    };

    try {
      const createdDiary = await createDiary(addNewDiary);

      if (createdDiary) {
        setDiaries([...diaries, createdDiary]);
        setNewDate("");
        setNewComment("");
        setNewVisibility("");
        setNewWeather("");
        setError(null);
      } else {
        setError("Failed to create diary entry");
      }
    } catch (error) {
      setError("Failed to create diary entry");
    }
  };

  return (
    <div>
      <h1>Add new entry</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={diaryCreation}>
        Date: <input value={newDate} type="date" onChange={(event) => setNewDate(event.target.value)} /> <br />
        <div>
    <span>Weather:</span>
    <label>
      <input
        type="radio"
        name="weather"
        value="sunny"
        checked={newWeather === "sunny"}
        onChange={(e) => setNewWeather(e.target.value)}
      />
      Sunny
    </label>
    <label>
      <input
        type="radio"
        name="weather"
        value="rainy"
        checked={newWeather === "rainy"}
        onChange={(e) => setNewWeather(e.target.value)}
      />
      Rainy
    </label>
    <label>
      <input
        type="radio"
        name="weather"
        value="cloudy"
        checked={newWeather === "cloudy"}
        onChange={(e) => setNewWeather(e.target.value)}
      />
      Cloudy
    </label>
    <label>
      <input
        type="radio"
        name="weather"
        value="stormy"
        checked={newWeather === "stormy"}
        onChange={(e) => setNewWeather(e.target.value)}
      />
      Stormy
    </label>
    <label>
      <input
        type="radio"
        name="weather"
        value="windy"
        checked={newWeather === "windy"}
        onChange={(e) => setNewWeather(e.target.value)}
      />
      Windy
    </label>

  </div>
  <div>
    <span>Visibility:</span>
    <label>
      <input
        type="radio"
        name="visibility"
        value="great"
        checked={newVisibility === "great"}
        onChange={(e) => setNewVisibility(e.target.value)}
      />
      Great
    </label>
    <label>
      <input
        type="radio"
        name="visibility"
        value="good"
        checked={newVisibility === "good"}
        onChange={(e) => setNewVisibility(e.target.value)}
      />
      Good
    </label>
    <label>
      <input
        type="radio"
        name="visibility"
        value="ok"
        checked={newVisibility === "ok"}
        onChange={(e) => setNewVisibility(e.target.value)}
      />
      Ok
    </label>
    <label>
      <input
        type="radio"
        name="visibility"
        value="poor"
        checked={newVisibility === "poor"}
        onChange={(e) => setNewVisibility(e.target.value)}
      />
      Poor
    </label>
  </div>
        Comment: <input value={newComment} onChange={(event) => setNewComment(event.target.value)} /> <br />
  <button type="submit">Add</button>
    
      </form>
      <h1>Diary entries</h1>
      {diaries.map((dry) => (
        <li key={dry.id} style={{ listStyle: "none" }}>
          <h2>{dry.date}</h2>
          <p>visibility: {dry.visibility}</p>
          <p>weather: {dry.weather}</p>
        </li>
      ))}
    </div>
  );
}

export default App;