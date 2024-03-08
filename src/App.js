import './App.css';
import { useEffect, useMemo, useState } from 'react';
import TodoListItem from './TodoListItem';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@material-ui/core';


//var count = 1
var todoCount = 0
function App() 
{
  const [todo, setTodo] = useState([])
  const [editingFlag, setEditingFlag] = useState(-1)
  const [open, setOpen] =useState(false);
  

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const openDailog =()=>
  {
    handleClickOpen()
  }
  const INCOMPLETE = "incomplete"
  const COMPLETED ="completed"
  const ALL ="all"
  const [filter,setFilter] =useState(INCOMPLETE)

  const addTodo = () =>
  {
    console.log("addTodo")
    var todoInput = document.getElementById("todoInput").value
    
    if(todoInput === "")
    {
      alert("Todo can't be blank!!!!!")
    }
    else
    {
      fetch("/addTodo?title="+todoInput)
      .then((res)=>res.json())
      .then((data)=>
      {
        if(data.status === "Success")
        {
          setTodo(data.todoList)
          document.getElementById("todoInput").value = ""
          handleClose();
        }
        else
        {
          alert(data.message)
        }
      })
    }
    //console.log("Todo text :" + todoInput)
    //console.log("Todo Array :" + todo)

    // const todoTempObject =
    // {
    //   id: count,
    //   text: todoInput,
    //   completed: false
    // }
    // count++
    // todo.push(todoTempObject)
    // setTodo([...todo])
    // console.log(todo)
    
  }


  const deleteTodo = (tempId) =>
 {
    console.log("deleteTodo")
    console.log("tempId :" + tempId)

     todo.map((todoTemp) =>
     {
      if (todoTemp.id === tempId) 
      {
        fetch("/deleteTodo?id="+tempId)
        .then((res)=>res.json())
        .then((data)=>
        {
          if(data.status === "Success")
          {
            setTodo(data.todoList)
          }
          else
          {
            alert(data.message)
          }
        })
      }
      return todoTemp
    })
   // setTodo([...todoUpdate])
  }
  const checkedChange = (todoTemp) =>
 {
    console.log(todoTemp)
    todo.map((element) =>
    {
      if (todoTemp.id === element.id)
      {
        fetch("/completeTodo?id="+todoTemp.id+"&status="+!todoTemp.status)
        .then((res)=>res.json())
        .then((data)=>
        {
          if(data.status === "Success")
          {
            setTodo([...data.todoList])
          }
          else 
          {
            alert(data.message)
          }
        })
        //element.completed = !element.completed
      }
      return element
    })
    
  }
  

  const editingTodo = (id) =>
  {
    setEditingFlag(id)
  }

  const saveTodo =(obj) =>
  {
    todo.map((element)=>
    {
     if(obj.id === element.id)
     {
       //element.text = document.getElementById("editingTodo").value
       fetch("/editTodo?id="+obj.id+"&title="+document.getElementById("editingTodo").value)
       .then((res)=> res.json())
       .then((data)=>
       {
        if(data.status === "Success")
        {
          setTodo([...data.todoList])
          setEditingFlag(-1)
        }
        else
        {
          alert(data.message)
        }
       })
     }
      return element
    })
    
   }
 
 const handleFilter=(filter)=>
 {
    switch (filter) {
      case INCOMPLETE:
        todoCount=0
        todo.map(todoTemp=>
          {
            if(!todoTemp.completed)
            {
              todoCount+=1
            }
          })
        setFilter(INCOMPLETE)
        break;
      case COMPLETED:
        todoCount=0
        todo.map(todoTemp =>
          {
            if(todoTemp.completed)
            {
              todoCount+=1
            }
          })
        setFilter(COMPLETED)
        break;
       case ALL:
        todoCount=0
        todoCount = todo.length
        setFilter(ALL)
        break; 
      default:
        break;
    }
 }
 useMemo(()=>
 {
    handleFilter("incomplete")
 }, [])

 const getTodoCount =()=>
 {
  return todoCount
 }
 useEffect(()=>
 {
  fetch("/allTodos")
  .then((res)=>res.json())
  .then((data)=>setTodo(data.todoList))
 }, [todo])

 return (

  <div class="body">
    <h1>Todo App</h1>
    {
          todo.length >0 ?
          <>
            <div style={{textAlign: "center"}}>
              <div style={{margin:"6px", display:"inline-block"}}>
              Total To-Do count:{getTodoCount()}
              </div>
              <div class="option">
                {filter === INCOMPLETE ?
                <label class="label" onClick={()=>handleFilter("incomplete")}><b>INCOMPLETE</b></label> :
                <label class="label1" onClick={()=>handleFilter("incomplete")}>INCOMPLETE</label>
                }
                |
                {filter === COMPLETED ?
                <label class="label" onClick={()=>handleFilter("completed")}><b>Completed</b></label>:
                <label class="label1" onClick={()=>handleFilter("completed")}>Completed</label>
                }
                |
                {filter === ALL ?
                <label class="label" onClick={()=>handleFilter("all")}><b>ALL</b></label>: 
                <label class="label1" onClick={()=>handleFilter("all")}>ALL</label>
                }
              </div>
              <div style={{margin :"6px",display: "inline-block"}}>
                <button class="addtodobutton" onClick={openDailog}>Add Todo</button>
              </div>
            </div>
          </> :
          <div></div>
        }
        {
            todo.length === 0 ? 
            <div class="option1">
              <div>
                <div style={{margin: "5px",}}>
                  <h2 style={{textAlign: "center", display: "block",}}>No Todo's added yet<br/></h2> 
                </div>
                <div class="addtododiv">
                  <button class="addtodobutton" onClick={openDailog}> +Add todo</button>
                </div>
              </div>
            </div> :
            <div></div>
          }
      <div>
     <div style={{textAlign: "center"}}>
          <Dialog
            open={open}
            onClose={handleClose}
            PaperProps={{
              component: 'form',
            //   onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
            //     event.preventDefault();
            //     const formData = new FormData(event.currentTarget);
            //     const formJson = Object.fromEntries((formData as any).entries());
            //     const email = formJson.email;
            //     console.log(email);
                // handleClose();
            //  },
            }}
          >
            <DialogTitle>Add New To-do</DialogTitle>
            <DialogContent>
              {/* <DialogContentText>
                Todo
              </DialogContentText> */}
              <TextField
                autoFocus
                required
                margin="dense"
                id="todoInput"
                name="todo"
                label="Todo"
                type="text"
                fullWidth
                variant="standard"
              />
            </DialogContent>
            <DialogActions>
               <Button class="addtodobutton" onClick={addTodo}>Add Todo</Button>
               <Button class="addtodobutton" onClick={handleClose}>Cancel</Button>
            </DialogActions>
          </Dialog>
       </div>
        {/* <input class="enter"
            id='todoInput'
            type='text'
            placeholder='Enter todo' /> */}
        {/* <button onClick={openDailog} class="addtodo">Add Todo</button> */}
      </div>
    {/* {todoCount =0} */}
    <div class="filter">
      {todo.map((todoTemp) => 
        {
          let returnComponent
          
          switch (filter) {
            case INCOMPLETE:
              if(!todoTemp.status)
              {
                returnComponent = <TodoListItem
                key={todoTemp.id}
                todoObject={todoTemp} 
                checkedChange={checkedChange}
                deleteTodo={deleteTodo}
                saveTodo={saveTodo}
                editingTodo={editingTodo}
                editingFlag={editingFlag}
                />
              }
              break;
              case COMPLETED:
              if(todoTemp.status)
              {
                returnComponent = <TodoListItem
                key={todoTemp.id}
                todoObject={todoTemp} 
                checkedChange={checkedChange}
                deleteTodo={deleteTodo}
                saveTodo={saveTodo}
                editingTodo={editingTodo}
                editingFlag={editingFlag}
                />
              }
              break;
              case ALL:
                returnComponent = <TodoListItem
                key={todoTemp.id}
                todoObject={todoTemp} 
                checkedChange={checkedChange}
                deleteTodo={deleteTodo}
                saveTodo={saveTodo}
                editingTodo={editingTodo}
                editingFlag={editingFlag}
                />

              break;
            default:
              break;
          }
          return returnComponent
        })}
    </div>
     
  </div>
);
}

export default App;
