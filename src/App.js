import logo from './logo.svg';
import './App.css';
import { useState, useEffect } from 'react';


function App() {

  function Comments() {
    // CHANGE TO api.bagpyp.net after pointed
    const COMMENTS_API_URL = 'https://cors-anywhere.herokuapp.com/' 
      + 'https://bagpyp-api.herokuapp.com/comments'
    const [comments, setComments] = useState({})

    const getComments = async () => {
      const res = await fetch(COMMENTS_API_URL)
      const json_res = await res.json()
      setComments(json_res)
    }

    useEffect(() => {
      getComments()
    }, [comments])

    return (
      <div className="Comments">
        {Object.keys(comments).map((key, index) => (
          <div key={index}>
            <h3>{comments[key]["name"]}</h3>
            <p>{comments[key]["comment"]}</p>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header>
      <Comments />
    </div>
  );
}

export default App;
