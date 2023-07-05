import { useEffect, useState } from "react";
import "./App.css";
import { Characters } from "./components/Characters";

function App() {
  const [characters, setCharacters] = useState([]);

  function getCharacters(pageNumber = 1) {
    const res = fetch("https://rickandmortyapi.com/api/character/?page=19")
      .then((response) => response.json())
      .then(({ results, info }) => {
        return { results };
      })
      .catch(() => {
        return [];
      });
    return res;
  }

  async function fetchCharacters() {
    const resp = await getCharacters();
    setCharacters(resp.results);
  }

  useEffect(() => {
    fetchCharacters();
  }, []);

  return (
    <div className="App">
      <header className="Header">
        <img className="Logo" src="logo.jpg" alt="" />
        <h1 className="Terms">Terms + Conditions</h1>
      </header>
      <div className="Hero">
        <h1>Rick and Morty</h1>
        <h2>See all the characters and more</h2>
      </div>
      <main>
        <div className="main-title-container">
          <h1 className="main-title">Characters List</h1>
        </div>
        <hr />
        <div className="card-container">
          {characters.map((character) => (
            <Characters key={character.id} character={character} />
          ))}
        </div>
      </main>
      <footer></footer>
    </div>
  );
}

export default App;
