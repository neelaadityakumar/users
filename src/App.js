import { useState, useEffect } from "react";
import "./App.css";
import SocialCard from "./SocialCard";
import AddIcon from "@mui/icons-material/Add";
import FormDialog from "./form-dialog";
function App() {
  const [allUsers, setAllUsers] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    (async () => {
      let userData;
      try {
        const response = await fetch("https://randomuser.me/api/?results=10");
        userData = await response.json();
      } catch (error) {
        console.log(error);
        userData = [];
      }
      setAllUsers(userData.results);
      setUsers(userData.results);
    })();
  }, []);

  const filterCards = (event) => {
    const value = event.target.value.toLowerCase();
    if (value === "") {
      setUsers(allUsers);
      return;
    }
    const filteredUsers = users.filter((user) =>
      `${user.name.first} ${user.name.last}`.toLowerCase().includes(value)
    );
    setUsers(filteredUsers);
  };

  const addUser = (user) => {
    setUsers([...users, user]);
    setAllUsers([...allUsers, user]);
  };

  const deleteUser = (id) => {
    const filteredUsers = users.filter((user) => user.login.uuid !== id);
    setUsers(filteredUsers);
    setAllUsers(filteredUsers);
  };

  return (
    <div className="App">
      <div className="header">
        <h1>User List Cards</h1>
        <FormDialog addUser={addUser} />
      </div>

      <input
        className="search-box"
        onInput={filterCards}
        placeholder="Search..."
      />
      <div className="cards-container">
        {users.map((user, index) => (
          <SocialCard key={index} userData={user} deleteUser={deleteUser} />
        ))}
      </div>
    </div>
  );
}

export default App;
