import { createStore} from 'redux';
import {storage} from './lib/storage';

let taskList = storage("taskList1");
let taskItems = Array.from(objToArr(taskList.getItem()));

const initialState = {
    todos: [
        {
            id: 0,
            text: 'Take a look at the application',
            done: true
        },
        {
            id: 1,
            text: 'Add ability to filter todos',
            done: false
        },
        {
            id: 2,
            text: 'Filter todos by status',
            done: false
        },
        {
            id: 3,
            text: 'Filter todos by text',
            done: false
        },
    ],
    filterStatus : 'all'
};

let updatedInitialState = initialState;

if(taskItems.length){
    updatedInitialState = Object.assign({}, initialState, {
        todos : taskItems
    })
} else {
    initialState.todos.forEach((v,i)=>{
        taskList.addItem(v,i);
    })
}

function* objToArr(obj) {
    for (let prop of Object.keys(obj)){
        yield obj[prop];
    }
}

// reducer takes 2 params state and action and return a new state
const todoChangeHandler = (state = updatedInitialState, action) => {

    switch (action.type) {
        case 'ADD_TODO':
            let item = {
                id: state.todos.length,
                text: action.text,
                done: false
            }
            taskList.addItem(item, state.todos.length);
            state.todos.push(item);
            document.querySelector("#todoInput").value = "";
            document.querySelector("#todoInput").focus();
            return state;
        case 'TODO_TOGGLE_DONE':
            let todos = state.todos, index = action.id;
            let  updatedTodo = Object.assign({}, todos[index], {done : !todos[index].done});
            taskList.updateItem(updatedTodo, index)
            return Object.assign({}, state, {
                todos : [
                    ...todos.slice(0, index),
                    updatedTodo,
                    ...todos.slice(index + 1)
                  ]
            });
        case 'FILTER_TODO':
            return Object.assign({}, state, {
                filterStatus : action.text
            });
        default:
            return state;
    }
}


export const todos = createStore(todoChangeHandler);
