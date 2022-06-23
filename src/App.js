import React, { useState, useEffect } from "react";
import ToDo from "./ToDo";
import "./App.css";
import axios from "axios";

function App() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");

  const addTodo = (e) => {
    e.preventDefault(); //This prevents a refresh
    setTodos([...todos, input.charAt(0).toUpperCase() + input.slice(1)]);
    setInput("");
  };
  const hitEnter = (event) => {
    if (event.key === "Enter") {
      addTodo();
    }
  };

  const deleteItem = (item) => {
    setTodos(todos.filter((todo) => todo !== item));
  };

  const editItem = (index, item) => {
    const newTodos = todos.map((element, indexOfEl) => {
      if (indexOfEl === index) {
        return item;
      }
      return element;
    });
    setTodos(newTodos);
    //setTodos(todos.replace(before, item));
    console.log(todos);
  };

  const [textData, setTextData] = useState("");
  const [authorData, setAuthorData] = useState("");

  useEffect(() => {
    async function getAPI() {
      await axios.get("https://type.fit/api/quotes").then((res) => {
        let dataLoaded = res.data;
        const values = Object.values(dataLoaded);
        const randomValue = values[parseInt(Math.random() * values.length)];
        setTextData(randomValue.text);
        setAuthorData(randomValue.author);
      });
    }
    getAPI();
  }, []);

  return (
    <div className="App">
      <h1 className="h1">Welcome to my To Do List</h1>
      <div className="App__motto">
        <p className="motto">"{textData}"</p>
        <p>{authorData}</p>
      </div>
      <form>
        <input
          className="input"
          value={input}
          placeholder="Enter something fun to do"
          onChange={(e) => setInput(e.target.value)}
          type="text"
          onKeyDown={hitEnter}
        />
        <button type="submit" onClick={addTodo}>
          Add to do
        </button>
      </form>
      <h2 className="h2">List of to do's</h2>
      {todos.map((todo, index) => (
        <ToDo
          key={index - 1}
          item={todo}
          deleteI={deleteItem}
          editI={editItem}
          index={index}
        />
      ))}
    </div>
  );
}

export default App;
