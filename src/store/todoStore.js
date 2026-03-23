import {create} from "zustand";
import {persist} from "zustand/middleware";

export const useTodo = create(persist((set) => ({
    todo: [],
    createTodo: (name,description) => set((state) => ({
        todo: [
            ...state.todo,
            {
                name: name,
                description: description,
                id: Date.now(),
                completed: false,
            }
        ]
    })),
    removeTodo: (id) => set((state) => ({todo: state.todo.filter((t) => t.id !== id)})),

}),{name: 'todo-app'}))