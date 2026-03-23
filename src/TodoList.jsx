import {useTodo} from "./store/todoStore.js";
import {Todo} from "./Todo.jsx";
import {useMemo, useState} from "react";

export const TodoList = () => {

    const { todo , removeTodo , createTodo  } = useTodo()

    const [name , setName] = useState("");
    const [description, setDescription] = useState("");

    const [modal , setModal] = useState(false);

    const createTodos = () => {
        if ( !name || !description ) {
            alert("Please enter a inputs");
            return
        }
        createTodo(name,description)
        setName("");
        setDescription("");
        setModal(false)
    }

    const [search  , setSearch] = useState("");

    const filterData = useMemo(() => {
        return todo.filter((t) => t.name.toLowerCase().includes(search.toLowerCase()))
    }, [todo , search])

    return (

        <>
        <h1>TodoList</h1>
            <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search..."
            />
            <button onClick={() => setModal(prev => !prev)}>{ modal ? 'закрыть': 'createTodo' }</button>
            { modal && (
                <div className="modal">
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="name...."
                    />
                    <input
                        type="text"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="description...."
                    />
                    <button disabled={!name || !description} onClick={createTodos}>create</button>
                </div>
            ) }
            <div className="card">
                { filterData.length === 0 && <p>пусто</p> }
                <ul>
                    { filterData?.map((t) => <li key={t.id}>name: {t.name} || description: { t.description }
                        <button onClick={() => removeTodo(t.id)}>remove</button></li>) }
                </ul>
            </div>


        </>
    )
}