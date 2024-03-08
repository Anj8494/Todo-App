import './App.css';
import './todoListItem.css'
import './img/Delete.icon.png'
import { Delete, Edit } from '@material-ui/icons';

const TodoListItem = (props)=>
{
  return<div class="list">
    {
      props.editingFlag !== props.todoObject.id ?
      <div class="list1">
        {
          props.todoObject.status ?
          <div class="check-input">{props.todoObject.status ?
          <input class="check" type='checkbox' onChange={()=>props.checkedChange(props.todoObject)} checked/> :
          <input  class="check" type='checkbox' onChange={()=>props.checkedChange(props.todoObject)}/>}
          <label class="text"><s>{props.todoObject.title}</s></label></div> :
          <div class="check-input">{props.todoObject.status ?
          <input  class="check" type='checkbox' onChange={()=>props.checkedChange(props.todoObject)} checked/> :
          <input  class="check" type='checkbox' onChange={()=>props.checkedChange(props.todoObject)}/>}
          <label class="text">{props.todoObject.title}</label>
          </div>
        }
        <div class="list2">
          <Delete class="delete" onClick={() => props.deleteTodo(props.todoObject.id)}/>
          <Edit class="edit" onClick={() => props.editingTodo(props.todoObject.id)}/>
        {/* <button class="delete" onClick={() => props.deleteTodo(props.todoObject.id)}>Delete </button> */}
        {/* <img src='./img/Delete.icon.png' onClick={() => props.deleteTodo(props.todoObject.id)}></img> */}
        {/* <input type='image' src="./img/Delete.icon.png" onClick={() => props.deleteTodo(props.todoObject.id)} /> */}
        {/* <button class="edit" onClick={() => props.editingTodo(props.todoObject.id)}>Edit</button> */}
        </div>
      </div>
      :
      <div>
        <input id='editingTodo' type='text' placeholder='Edit todo' Value={props.todoObject.title} />
         <button class="delete" onClick={() => props.deleteTodo(props.todoObject.id)}>Delete</button>
         <button class="edit" onClick={() => props.saveTodo(props.todoObject)}>Save Todo</button>
      </div>
    }

  </div>
}







// {
  
//     return<div class="list">
//     {
//       props.todoObject.status ?
//       <input class="input" type='checkbox' onChange={() => props.checkedChange(props.todoObject)} checked /> :
//       <input class="input" type='checkbox' onChange={() => props.checkedChange(props.todoObject)}/>
//     }
//     {
//       props.editingFlag !== props.todoObject.id ?
//       <>
//         {props.todoObject.status ?
//           <label><s>{props.todoObject.title}</s></label> :
//           <label>{props.todoObject.title}</label> 
//       }
//         <button class="delete" onClick={() => props.deleteTodo(props.todoObject.id)}>Delete </button>
//         <button class="edit" onClick={() => props.editingTodo(props.todoObject.id)}>Edit</button>
//       </>
//       :
//       <>
//         <input id='editingTodo' type='text' placeholder='Edit todo' Value={props.todoObject.title} />
//         <button class="delete" onClick={() => props.deleteTodo(props.todoObject.id)}>Delete</button>
//         <button class="edit" onClick={() => props.saveTodo(props.todoObject)}>Save Todo</button>
//       </>
//     }
//     </div>
// }
export default TodoListItem;