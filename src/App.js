import logo from './logo.svg';
import './App.css';
import { useState, useEffect } from 'react';

function App() {
  
  // const COMMENTS_API_URL = 'http://localhost:5000/comments'
  const COMMENTS_API_URL = 'https://bagpyp-api.herokuapp.com/comments'

  function Comments() {
    const [comments, setComments] = useState({})
    const getComments = async () => {
      const res = await fetch(COMMENTS_API_URL)
      const json_res = await res.json()
      setComments(json_res)
    }
    useEffect(() => {
      getComments()
    }, [])

    function CommentForm() {
      const [comment_data, setComment_data] = useState({})
      const postComment = async (data) => {
        const options = {
          method: 'POST',
          body: JSON.stringify(data)
        }
        const res = await fetch(COMMENTS_API_URL, options)
        const json_res = await res.json()
        setComments(json_res)
      }
      useEffect(() => {
        if (Object.keys(comment_data).length !== 0) {
          postComment(comment_data)
        }
      }, [comment_data])
  
      const handleClick = async (event) => {
        event.preventDefault()
        setComment_data({
          "name":event.target.name.value,
          "comment":event.target.comment.value
        })
      }
      
      return (
        <div className="CommentForm">
          <form id="commentForm" onSubmit={handleClick}>
            <input className="CommentForm-name" type="text" id="name" defaultValue="name"></input><br />
            <textarea className="CommentForm-comment" id="comment" defaultValue="comment"></textarea><br />
            <input className="CommentForm-submit" type="submit" value="post"></input>
          </form>
        </div>
      )
    }

    return (
      <div className="Comments">
        {Object.keys(comments).map((key, index) => (
          <div key={index}>
            <div className = "Comments-name">{comments[key]["name"]}</ div>
            <div className ="Comments-comment">{comments[key]["comment"]}</ div>
            <div className = "Comments-created_date">{new Date(Date.parse(comments[key]["created_date"])).toLocaleString(navigator.language)}</div>
          </div>
        ))}
      <CommentForm />
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
      {/* <CommentForm /> */}
    </div>
  );
}

export default App;
