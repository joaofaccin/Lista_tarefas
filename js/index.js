const form = document.querySelector('#todo-form');
const taskTitleInpunt = document.querySelector('#task-title-input');
const todoListUl = document.querySelector('#todo-list');

let tasks = [];

function renderTaskOnHtml(taskTitle, done = false){
    
    const li = document.createElement('li');

    const input = document.createElement('input');
    input.setAttribute('type', 'checkbox');

    input.addEventListener('change', (event) => {

        const liToToggle = event.target.parentElement;

        const spanToToggle = liToToggle.querySelector('span')
        const done = event.target.checked;

        if(done){
           spanToToggle.style.textDecoration = 'line-through'         
        }
        else{
            spanToToggle.style.textDecoration = 'none'
        }

        tasks = tasks.map(task => {
            if(task.title === spanToToggle.textContent){
                return{
                    title: task.title,
                    done: !task.done
                }              
            }
            return task
        })

        localStorage.setItem('tasks', JSON.stringify(tasks))
    });
    input.checked = done;

    const span = document.createElement('span');
    span.textContent = taskTitle;

    if(done){
        span.style.textDecoration = 'line-through'
    }

    const buttonRemove = document.createElement('button');
    buttonRemove.textContent = 'Remove';
    buttonRemove.addEventListener('click', (event) => {

        const liRemove = event.target.parentElement;
         
        const titleRemove = liRemove.querySelector('span').textContent

        tasks = tasks.filter(task => task.title !== titleRemove)
        
        todoListUl.removeChild(liRemove)
        localStorage.setItem('tasks', JSON.stringify(tasks))
    }) 
    
    li.appendChild(input)
    li.append(span)
    li.append(buttonRemove)

    todoListUl.appendChild(li)
}

window.onload = () => { 
    const tasksOnLocalStore = localStorage.getItem('tasks')
    
    if(!tasksOnLocalStore) return
    
    tasks = JSON.parse(tasksOnLocalStore)

    tasks.forEach(task =>{ renderTaskOnHtml(task.title, task.done)})
}

form.addEventListener('submit', (event) => {
    event.preventDefault()

    const taskTitle = taskTitleInpunt.value;

    if(taskTitle.length < 5){
        alert('Sua tarefa precisa ser mais explicita!');
        return;
    }
    tasks.push({
        title: taskTitle,
        done: false
    });

    localStorage.setItem('tasks', JSON.stringify(tasks))
    renderTaskOnHtml(taskTitle)

    taskTitleInpunt.value = '';
})