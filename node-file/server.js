var express = require('express')
var app =express();

var server =app.listen(8082,function()
{
   var port = server.address().port
   console.log("hello, node server is listening to http://localhost:%s",port)
})



// ///-=-----------------Todo links--------
var todo = 
[

]
let count = 0

app.get('/addTodo',function(request,response)
{
    let title =request.query.title

    if(title === "")
    {
        response.json(
            {
                status:"Failure",
                message:"please provide valid todo title!!!"
            })
    }
    else
    {
        
        let todoPreviousLength = todo.length
        todo.push(getNewTodo(title))

        if(todoPreviousLength + 1 === todo.length)
        {
            response.json(
                {
                    status :"Success",
                    message: "Todo added !!",
                    todoList: todo
                })
        }
        else 
        {
            response.json(
                {
                    status: "Failure",
                    message: "todo could not be added!!"
                })
        }
    }
})
app.get('/allTodos',function(request,response)
{
    response.json(
        {
            status: "Success",
            todoList : todo
            
        }
    )
})

app.get('/editTodo', function(request,response)
{
    const id = request.query.id
    const title = request.query.title

    if(id === "" || title ==="")
    {
        response.json(
            {
                status: "Failure",
                message: "ID or title can't be blank !!"
            })
    }
    else
    {
        if(todo.length === 0)
        {
            response.json(
                {
                    status : "Failure",
                    message: "No todo exist in the list"
                })
        }
        else
        {
            let flagFound= 0
            todo = todo.map(todoTemp =>
                {
                    if(todoTemp.id === parseInt(id))
                    {
                        flagFound =1
                        todoTemp.title =title
                        return todoTemp
                    }
                    else
                    {
                        return todoTemp
                    }
                })
                if(flagFound === 0)
                {
                    response.json(
                        {
                            status: "Failure",
                            message: "Todo not found"
                        })
                }
                else
                {
                    response.json(
                        {
                            status : "Success",
                            message: "Succesfully update the todo",
                            todoList : todo
                        })
                }
        }
    }
})

app.get('/deleteTodo', function(request,response)
{
    const id =request.query.id
    if(id === "")
    {
        response.json(
            {
                status: "Failure",
                message: "Id can't be blank"
            })
    }
    else
    {
        let flagFound =0
        todo =todo.filter(todoTemp =>
            {
                if(parseInt(id) === todoTemp.id)
                {
                    flagFound =1
                    return false
                }
                else
                {
                    return true
                }
            })

            if(flagFound === 0)
            {
                response.json(
                    {
                        status: "Failure",
                        message: "Todo can't be found",
                        todoList: todo
                    }
                )
            }
            else
            {
                response.json(
                    {
                        status: "Success",
                        message: "Successfully deleted the todo",
                        todoList: todo
                    }
                )
            }
    }
})



app.get('/completeTodo',function(request,response)
{
    const id = request.query.id
    const status = request.query.status
    if(todo.length === 0)
    {
        response.json(
            {
                status: "Failure",
                message: "Please add some todo frist"
            }
        )
    }
    else if(id ==="" || status === "")
    {
        response.json(
            {
                status : "Failure",
                message : "please provide valid ID & status"
            })
    }
    else
    {
        let flagFound =0
        todo = todo.map(tempTodo =>
            {
                if(tempTodo.id === parseInt(id))
                {
                    flagFound=1
                    tempTodo.status =  status === "true" 
                    return tempTodo
                }
                else
                {
                    return tempTodo
                }
            })
            if(flagFound === 0)
            {
                response.json(
                    {
                        status: "Failure",
                        message: "Todo not found!!"
                    }
                )
            }
            else
            {
                response.json(
                    {
                        status: "Success",
                        message: "Todo update succesfully!!!",
                        todoList: todo
                    })    
            }
        
    }
    
})

function getNewTodo(title)
{
    let todoObject= {
        id: count++,
        title: title,
        status: false
    }

    return todoObject;
}

