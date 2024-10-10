import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import Navbar from "./components/Navbar";
import { v4 as uuidv4 } from 'uuid';

function App() {
  const [todo,setTodo] = useState("");
  const [todos,setTodos] = useState([]);
  const [showFinished, setshowFinished] = useState(true)



  useEffect(() => {
    let todoString= localStorage.getItem("todos");
    if(todoString){
      let todos = JSON.parse(localStorage.getItem("todos"));
    setTodos(todos);
    }  
  }, [])
  

  const saveToLocalStorage = () => {
    localStorage.setItem("todos", JSON.stringify(todos))
  }

  const toggleFinished = (params) => {
      setshowFinished(!showFinished)
  }
  

  const handleEdit = (e,id) => {
    let t=todos.filter(item => item.id=== id);
    setTodo(t[0].todo);
    let newTodos = todos.filter(item => {
      return item.id!==id;
    });
    setTodos(newTodos);
    saveToLocalStorage();
  }

  const handleDelete = (e,id) => {
    // console.log(id);
    // let index = todos.findIndex(item => {
    //   return item.id === id;
    // });
    // console.log(index)
    let newTodos = todos.filter(item => {
      return item.id!==id;
    });
    setTodos(newTodos);
    saveToLocalStorage();
    
  }

  const handleAdd = () => {
    setTodos([...todos,{ id:uuidv4(),todo,isCompleted:false}] );
    setTodo("");
    saveToLocalStorage();
  }

  const handleChange = (e) => {
    setTodo(e.target.value);

  }

  const handleCheckbox = (e) => {
    console.log(e,e.target)
    let id = e.target.name;
    console.log(id)
    let index = todos.findIndex(item => {
      return item.id === id;
    });
    console.log(index)
    let newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    setTodos(newTodos);
    saveToLocalStorage();
  }

  return (
    <>
      <Navbar />
      <div className="md:container mx-5 md:mx-auto my-5 rounded-xl p-5 bg-rose-400 min-h-[80vh] md:w-[90%]">
      <h1 className="font-bold text-center text-2xl font-mono">Manage  your TODO's</h1>
         <div className="addTodo my-5 flex flex-col gap-4">
         <h1 className="text-xl font-extrabold font-mono">Add a Todo</h1>
              <div className="flex">
              <input onChange={handleChange} value={todo} type="text" name="" id="" className=" rounded-md p-2 w-full  " placeholder="Add your task"/>
              <button onClick={handleAdd} disabled={todo.length<=3} className=" bg-white rounded-md px-4  hover:bg-gray-400 mx-2  font-mono disabled:bg-gray-200 disabled:line-through ">Save</button>
              </div>
         </div>
         <div className="flex text-center gap-3">
         <input type="checkbox" className="mb-6" onChange={toggleFinished} checked={showFinished}/><span className="font-mono mb-6 ">Show Finished</span>
         </div>
          
         <h2 className="text-lg font-bold font-mono">Your Todos</h2> 
          <div className="todos">
            {todos.length === 0 && <div className="my-2 font-mono border-2 w-fit p-3 border-rose-800 outline-none rounded-md">No Todos to display</div>}
            {todos.map(item => {

           return (showFinished || !item.isCompleted) && <div key={item.id} className="todo flex my-3 justify-between">
            <div className="flex gap-5">
              <input onChange={handleCheckbox} type="checkbox" checked={item.isCompleted} name={item.id} id="" />
              <div className={item.isCompleted ? "line-through":""}>{item.todo}</div>
            </div>
                
                <div className="buttons flex h-full">
                  <button onClick={(e)=>handleEdit(e,item.id)} className="ml-5 bg-white py-1 px-3 rounded-md hover:bg-gray-400 hover:text-white font-mono">Edit</button>
                  <button onClick={(e)=> {handleDelete(e,item.id)}} className="ml-5 bg-white py-1 px-3 rounded-md hover:bg-gray-400 hover:text-white font-mono">Delete</button>
                </div>
            </div>
            })}
          </div>
      </div>
    </>
  );
}

export default App;
