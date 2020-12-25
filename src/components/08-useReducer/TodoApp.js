import React, {useReducer, useEffect} from 'react'
import './styles.css'
import { todoReducer } from './todoReducer'
import { useForm } from './useForm'

const init = () => {

    return JSON.parse(localStorage.getItem('todos')) || []
    // return [{
    //     id:new Date().getTime(),
    //     desc:'Aprender React',
    //     done:false}]
}

export const TodoApp =()  =>{

    const [todos, dispatch ] = useReducer(todoReducer, [] , init)

    const [ {description}, handleInputChange, reset ] =useForm({
        description:''})

    useEffect(() => {
        localStorage.setItem('todos', JSON.stringify(todos))
       
    }, [todos])

    const handleDelete = (todoId) => {

        const action = {
            type: 'delete',
            payload: todoId}

        dispatch(action)
    }

    const handleToggle = ( todoId) =>{

        dispatch({
            type:'toogle',
            payload:todoId
        })
    }
    const handleSubmit = (e) => {
        e.preventDefault();

        if(description.trim().length<= 1){
            return;
        }
        console.log('Nueva tarea')

        const newTodo = {
            id: new Date().getTime(),
            desc: description,
            done: false}

        const action = {
            type: 'add',
            payload: newTodo}

        dispatch(action)
        reset()
    }
    return (
        <div>
            <h1>TodoApp</h1>
            <hr/>
            <div className='row'>
                <div className='col-lg-7 col-xs-12'>
                    <ul className='list-group list-group-flush'>
                    {
                        todos.map( (todo, i) => (
                            <li
                                key={todo.id}
                                className="list-group-item d-flex justify-content-between align-items-center"
                            > 
                                <p className={`${todo.done && 'complete'} mr-1`} onClick={ () => handleToggle(todo.id)}>{i+1}. { todo.desc}</p>
                                <button className='btn btn-danger d-flex mr-1' onClick={ () => {handleDelete(todo.id)}}>Borrar</button>
                            </li>
                        ))
                    }
                    </ul>
                </div>
                <div className='col-lg-5 col-xs-12'>
                    <h6>Agregar Todo</h6>
                    <hr/>
                    <form onSubmit={handleSubmit}>
                        <input
                            type='text'
                            name='description'
                            className='form-control'
                            placeholder='Ingresa una tarea aquí...'
                            autoComplete='off'
                            value={description}
                            onChange={ handleInputChange}
                        />
                        <button
                            type='submit' 
                            className='btn btn-outline-primary mt-2 btn-block'
                        >
                            Agregar
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}


