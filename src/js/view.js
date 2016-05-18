import {todos} from './state';
import IncrementalDOM from 'incremental-dom';

let {elementOpen, elementClose, elementVoid,text, patch}  = IncrementalDOM;

export function render() {
    return (
        <div id="todoContainer" class="todo-container">
            {renderAddTodo()}
            {renderFilterOptions()}
        </div>
    );
}

function renderAddTodo() {
    return (
        <div id="app">
            {renderInput()}
            {renderTodos()}
        </div>
    );
}


function renderInput() {
    let addTodo = ()=>{
        let todoText = document.querySelector("#todoInput").value;
        if(todoText){
            todos.dispatch({
                type: "ADD_TODO",
                text:todoText
            });
        }
    }
    return (
        <div class="todo__input">
            <input type="text" id="todoInput" class="todo__input__field" onkeyup = {(e)=>{
                    if(e.which === 13){
                        addTodo();
                    }
                }}/>
            <button id="addTodo" class="todo__action--add" onclick={addTodo}>Add</button>
        </div>
    );
}
function renderFilterOptions() {
    let state = todos.getState();
    let filterStatus = state.filterStatus;
    let options = ['all' , 'open', 'closed'];

    return (
        <div class="todo__filter">
            <div class="todo__filter__item-container">
            {options.map((v,i)=>{
                return filterOption(v,filterStatus);
            })}
            </div>
        </div>
    );
}

function filterOption(value, filterStatus){
    return (
        <label class="todo__filter__item"><input type="radio" name="filter" class="js-update-filter" checked={filterStatus === value || undefined} value={value} onclick= { ()=> {
                todos.dispatch({
                    type: "FILTER_TODO",
                    text: value
                })
            }}/>
        Show {value}
        </label>
    )
}

function renderTodos() {
    let state = todos.getState();
    const todoItems = state.todos.filter(function(v,i){
        return state.filterStatus === "all" ? true : (state.filterStatus === "open" ? v.done === false : v.done === true );
    });
    return (
        <ul class="todo">
            {todoItems.map(renderTodoItem)}
        </ul>);
}

function renderTodoItem(todo) {
    const todoClass = `todo__item todo__item--${todo.done ? 'done' : 'open'}`;
    return (
        <li class={todoClass}>
            <label class="todo__item__label">
                <input class="js_toggle_todo todo__checkbox" type="checkbox" data-id={todo.id} checked={todo.done || undefined} onclick= { ()=> {
                    todos.dispatch({
                        type: "TODO_TOGGLE_DONE",
                        id: todo.id
                    })
                }}/>
                {todo.text}
            </label>
        </li>
    );
}
