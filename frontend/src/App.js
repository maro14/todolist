import{ useEffect, useState} from 'react'

const API = "http://localhost:3000"

function App() {

  const [todos, setTodos] = useState([])
  const [popupActive , SetPopupActive] = useState(false)
  const [newTodo, setNewTodo] = useState("")

  useEffect(() => {
    GetTodos()
  }, [])

  const GetTodos = () => {
    fetch(API + '/todo/all')
    .then(res => res.json())
    .then(data => setTodos(data))
    .catch(err => console.error("Error", err))
  }

  const addTodo = async() => {
    const data = await fetch(API + "/todo/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        text: newTodo
      })
    }).then(res => res.json())

    setTodos([...todos, data])
    SetPopupActive(false)
    setNewTodo("")
  }

  const completeTodo = async id => {
    const data = await fetch(API + '/todo/complete/' + id).then(res => res.json())

    setTodos(todos => todos.map(todo => {
      if (todo._id === data._id) {
        todo.complete = data.complete
      }

      return todo
    }))
  }
  

  return (
    <div className="App">
      <h1>Welcome, Friends</h1>
      <h4>Your Task </h4>

      <div className='todos'>
        {todos.map( todo => (
        <div className={'todo' + todo.complete ? "is-complete": ""} key={ todo._id } onClick={ () => completeTodo(todo._id)}>
          <div className="checkbox"></div>
          <div className='text'>{ todo.text }</div>

          <div className='delete-todo'></div>
        </div>
        ))}
        </div>
      <div className="addPopup" onClick={() => SetPopupActive(true)}>+</div>

      {popupActive ? (
        <div className="popup">
          <div className="closePopup" onClick={() => SetPopupActive(false)}>X</div>
          <div className="content">
            <h3>add Task</h3>
            <input type="text" className="add-todo-input" onChange={e => setNewTodo(e.target.value)} value={newTodo} />
						<div className="button" onClick={addTodo}>Create Task</div>
          </div>
        </div>
      ): ''}
    </div>
  );
}

export default App;
