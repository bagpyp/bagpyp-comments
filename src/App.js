import logo from './logo.svg';
import './App.css';
import { useState, useEffect } from 'react';


function App() {


  function Comments() {

    // CHANGE TO api.bagpyp.net after pointed
    // const COMMENTS_API_URL = 'http://localhost:5000/comments'
    const COMMENTS_API_URL = 'https://bagpyp-api.herokuapp.com/comments'
    const [comments, setComments] = useState({})
    const [values, setValues] = useState([])
    const getComments = async () => {
      const res = await fetch(COMMENTS_API_URL)
      const json_res = await res.json()
      setComments(json_res)
    }
    // const postComment = async (data) => {
    //   const options = {
    //     method:'POST',
    //     body: JSON.stringify(data)
    //   }
    //   const res = await fetch(COMMENTS_API_URL, options)
    // }

    useEffect(() => {
      getComments()
    }, [])



    return (
      <div className="Comments">
        {Object.keys(comments).map((key, index) => (
          <div key={index}>
            <div className = "Comments-name">{comments[key]["name"]}</ div>
            <div className ="Comments-comment">{comments[key]["comment"]}</ div>
            <div className = "Comments-created_date">{new Date(Date.parse(comments[key]["created_date"])).toLocaleString(navigator.language)}</div>
          </div>
        ))}
      </div>
    );
  }





  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1>BAGPYP</h1>
      </header>
      <Comments />
    </div>
  );
}

export default App;
