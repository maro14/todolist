import{ useEffect, useState} from 'react'

const API = "http://localhost:3001"

function App() {

  const [todos, setTodos] = useState([])
  const [newTodo, setNewTodo] = useState("")

  useEffect(() => {
    GetTodos()
  })

  const GetTodos = () => {
    fetch(API + '/todos')
    .then(res => res.json())
    .then(data => setTodos(data))
    .catch(err => console.error("Error", err))
  }

  const addTodo = async() => {
    const data = await fetch(API + "/todo/add", )
  }

  return (
    <div className="App">
      <h1>Welcome, Friends</h1>
      <h4>Your Task </h4>

      <div className='todos'>

        <div className='todo'>
          <div className='text'>Get todo on list</div>

          <div className='delete-todo'></div>
        </div>
        
      </div>
      
    </div>
  );
}

export default App;
