const inputBar = document.querySelector('#input-bar');
const createFirstTaskBtn = document.querySelector('.create-first-task-btn');
const moonIcon = document.querySelector('.moon-icon');
const sunIcon = document.querySelector('.sun-icon');
const dateEl = document.querySelector('.date-el');
const itemsLeft = document.querySelector('.items-left');
const counter = document.querySelector('.counter');
const todoList = document.querySelector('.todo-list');
const filterFooter = document.querySelector('.filter-footer');
const clearCompletedBtn = document.querySelector('.clear-completed-btn');
const emptyState = document.querySelectorAll('.empty-state');
const filters = document.querySelectorAll('.filters');
const HTML = document.documentElement;


// Focuses User Keyboard on Text Input Field
createFirstTaskBtn.addEventListener('click', () => {
    inputBar.focus();
})

// Theme togglers
moonIcon.addEventListener('click', () => {
    HTML.classList.toggle('dark')
})
sunIcon.addEventListener('click', () => {
    HTML.classList.toggle('dark')
})

let todos = [];
let currentFilter = 'All';

filters.forEach((filter) => {
    filter.addEventListener('click', function() {
        currentFilter = filter.innerHTML;
        renderTodos();
    })
})


inputBar.addEventListener('keypress', e => {
    if (e.key === 'Enter') addTodo(inputBar.value);
})

clearCompletedBtn.addEventListener('click', clearCompleted);

function addTodo() {
    if (inputBar.value === '') return;
    else {
        const todo = {
            id: Date.now(),
            text: inputBar.value,
            completed: false
        }

        todos.push(todo);
        saveTodos();
        renderTodos();
        inputBar.value = ''
    }
}

function saveTodos() {
    localStorage.setItem('todos', JSON.stringify(todos));
    updateItemsCount();
    checkEmptyState();
}

function updateItemsCount() {
    const uncompletedTodos = todos.filter(todo => !todo.completed);
    itemsLeft.textContent = `${uncompletedTodos.length} item${uncompletedTodos.length !== 1 ? "s" : ''} left` 
}

function clearCompleted() {}


function deleteTodo(id) {
    todos = todos.filter((todo) => todo.id !== id);
    saveTodos();
    renderTodos();
}

function checkEmptyState() {
    if (todos.length === 0) {
        emptyState.forEach(state => {
            state.classList.remove('hidden');
            state.classList.add('flex');
        });
        counter.classList.add('hidden');
        counter.classList.remove('flex');
        filterFooter.classList.add('hidden');
        filterFooter.classList.remove('flex');
    }
    else {
        emptyState.forEach(state => {
            state.classList.add('hidden');
            state.classList.remove('flex');
        });
        counter.classList.remove('hidden')
        counter.classList.add('flex');
        filterFooter.classList.remove('hidden');
        filterFooter.classList.add('flex');
    }
};

function filterTodos(currentFilter) {
    switch(currentFilter) {
        case 'Active':
            return todos.filter(todo => !todo.completed);
        case 'Completed':
            return todos.filter(todo => todo.completed);
        default:
            return todos;
    }
}

function renderTodos() {
    todoList.innerHTML = ``
    
    const filteredTodos = filterTodos(currentFilter);
    console.log(filteredTodos);
    

    filteredTodos.forEach(todo => {
        let checked = false;
        const li = document.createElement('li');
        li.dataset.id = todo.id;
        li.dataset.completed = todo.completed;
        const completed = todo.completed
        
        li.classList.add('flex', 'py-5', 'justify-between', 'items-center', 'active-task', 'px-5')
        li.innerHTML = `
                    <div class="flex gap-3 items-center">
                        <!-- Checkbox -->
                        <div class="check-box ${completed? 'checked-bg': 'unchecked-bg'} inline-flex flex-shrink-0 w-6 h-6 rounded-full items-center justify-center">
                            <img src="images/icon-check.svg" alt="" class="tick ${completed ? 'opacity-100' : 'opacity-0'}">
                        </div>

                        <!-- Todo Title -->
                        <p class="${completed? 'complete': ''} task-title">${todo.text}</p>
                    </div>

                    <!-- Remove Button -->
                    <button class="remove-btn text-2xl">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" class="w-6 hover:scale-110 hover:stroke-red-500 dark:hover:stroke-red-500 stroke-gray-500 dark:stroke-gray-600">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                    </svg>
                    </button>
        `
        todoList.appendChild(li);

        const dividerLine = document.createElement('div');
        dividerLine.classList.add('divider-line', 'flex', 'relative', 'w-full', 'border-b', 'border-b-gray-300', 'dark:border-b-[#383A4F]', 'transition-all', 'duration-300', 'ease-in-out')
        dividerLine.innerHTML = `<h3> </h3>`
        todoList.appendChild(dividerLine);
    })
}

todoList.addEventListener('click', function (e) {
    const li = e.target.closest('li');
    if (!li) return;
    const id = parseInt(li.dataset.id);


    const checkbox = li.querySelector('.check-box');
    const taskTitle = li.querySelector('.task-title');
    const removeBtn = e.target.closest('.remove-btn');
    const tick = li.querySelector('.tick');
    const dividerLine = todoList.querySelector('.divider-line');
    
    // Checkbox Logic
    if (e.target.closest('.check-box') || e.target.closest('.task-title') || e.target.closest('.tick')) {
            taskTitle.classList.toggle('complete');
            checkbox.classList.toggle("checked-bg");
            tick.classList.toggle("opacity-0");

            const todo = todos.find(todo => todo.id === id);

            if (todo) {
                todo.completed = taskTitle.classList.contains('complete');
                saveTodos();
            }
        }
    if (removeBtn) {
        const li = removeBtn.closest('li');
        const id = Number(li.dataset.id);
        deleteTodo(id);
        if (dividerLine && dividerLine.classList.contains('divider-line')){
            dividerLine.remove();
        }
        return
    }
});

window.addEventListener('DOMContentLoaded', function () {
    loadTodos()
});
window.addEventListener('DOMContentLoaded', function () {
    checkEmptyState();
});

function loadTodos() {
    const storedTodos = localStorage.getItem('todos');
    if (storedTodos) todos = JSON.parse(storedTodos);
    renderTodos()
}

function toggleTodo(){
    todos = todos.map(todo => {

    })
}