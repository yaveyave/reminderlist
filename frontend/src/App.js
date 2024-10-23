import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";
import ListToDoLists from "./ListTodoLists";
import ToDoList from "./ToDoList";


function App() {
  const [listSummaries, setListSummaries] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    reloadData().catch(console.error);
  }, []);

  axios.defaults.baseURL = "http://localhost:8000";
  
  async function reloadData() {
    const response = await axios.get("/api/lists");
    const data = await response.data;
    setListSummaries(data);
  }

  useEffect(() => {
    axios.get('/api/lists')
      .then(response => {
        console.log(response.data); 
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);
  
  
  function handleNewToDoList(newName) {
    const updateData = async () => {
      const newListData = {
        name: newName,
      };

      await axios.post(`/api/lists`, newListData);
      reloadData().catch(console.error);
    };
    updateData();
  }

  function handleDeleteToDoList(id) {
    const updateData = async () => {
      await axios.delete(`/api/lists/${id}`);
      reloadData().catch(console.error);
    };
    updateData();
  }

  function handleSelectList(id) {
    console.log("Selecting item", id);
    setSelectedItem(id);
  }

  function backToList() {
    setSelectedItem(null);
    reloadData().catch(console.error);
  }

  if (selectedItem === null) {
    return (
      <div className="App">
        <ListToDoLists
          listSummaries={listSummaries}
          handleSelectList={handleSelectList}
          handleNewToDoList={handleNewToDoList}
          handleDeleteToDoList={handleDeleteToDoList}
        />
      </div>
    );
  } else {
    return (
      <div className="App">
        <ToDoList listId={selectedItem} handleBackButton={backToList} />
      </div>
    );
  }
}


export default App;