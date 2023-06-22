// Variables
let main = document.querySelector('main');
let questionMove = document.querySelector('.containerQuestion');
let nameTask = document.querySelector('#nameTask');
let btnMoveTodo = document.querySelector('.btnMoveTodo');
let btnMoveDoing = document.querySelector('.btnMoveDoing');
let taskInput = document.querySelector('.input-task');
let btnAdd = document.querySelector('.btnAdd');
let boxTasks = document.querySelectorAll('.box');
let alertAdd = document.querySelector('.alert-add');
let listTasks = [];
let interval;

// Functions
function inList(text) {
    if (listTasks.includes(text)) {
        return true;
    } else {
        listTasks.push(text);
        return false;
    }
}

function createTask(text, box) {
    let task = document.createElement('li');
    task.classList.add('task');
    boxTasks[box].appendChild(task);

    let optionEl = document.createElement('label');
    optionEl.innerText = text;
    task.appendChild(optionEl);

    if (box <= 1) {
        let btnDoing = document.createElement('button');
        btnDoing.classList.add('btnDoing');
        if (box == 0) {
            btnDoing.innerHTML = `<ion-icon class="todo" name="arrow-redo"></ion-icon>`;
        } else {
            btnDoing.innerHTML = `<ion-icon class="doing" name="checkbox-outline"></ion-icon>`;
        }
        task.appendChild(btnDoing);
    }

    if (box == 2) {
        task.style.backgroundColor = '#07145A';
        let btnMove = document.createElement('button');
        btnMove.classList.add('btnMove');
        btnMove.innerHTML = `<ion-icon class="done" name="arrow-undo"></ion-icon>`;
        task.appendChild(btnMove);
    }

    let btnDel = document.createElement('button');
    btnDel.classList.add('btnDel');
    btnDel.innerHTML = `<ion-icon class="delete" name="trash"></ion-icon>`;
    task.appendChild(btnDel);
}

function showAlert(alert, n, sh) {
    clearInterval(interval);
    if (sh == 'show') {
        alert.style.opacity= 1;
        alert.style.transform = 'translateY(0)';
        if (n == 1) {
            alert.textContent = 'This task already exists in the list.';
        }
        if (n == 2) {
            alert.textContent = 'Maximum active tasks should be 7.';
        }
        if (n == 3) {
            alert.textContent = "Can't add a task without a name.";
        }
    } else {
        alert.style.transform = 'translateY(-20px)';
        alert.style.opacity= 0;
    }
    interval = setInterval(() => {
        alert.style.transform = 'translateY(-20px)';
        alert.style.opacity= 0;
    }, 5000);
}

// Events
btnAdd.addEventListener('click', () => {
    let taskTextInput = taskInput.value.trim();
    if (taskTextInput) {
        showAlert(alertAdd, 3, 'hidden');
        if (listTasks.length < 7) {
            showAlert(alertAdd, 2, 'hidden');
            if (inList(taskTextInput) == true) {
                showAlert(alertAdd, 1, 'show');
            } else {
                showAlert(alertAdd, 1, 'hidden');
                createTask(taskTextInput, 0);
                taskInput.value = '';
            }
            taskInput.focus();
        } else {
            showAlert(alertAdd, 2, 'show');
        }
    } else {
        showAlert(alertAdd, 3, 'show');
    }
})

document.addEventListener('click', (e) => {
    let elementClick = e.target;
    let parentElement = elementClick.closest('li');

    if (elementClick.classList.contains('todo')) {
        let textEl = parentElement.children[0].innerText;
        parentElement.remove();
        createTask(textEl, 1);
    }
    
    if (elementClick.classList.contains('doing')) {
        let textEl = parentElement.children[0].innerText;
        parentElement.remove();
        createTask(textEl, 2);
    }

    if (elementClick.classList.contains('done')) {
        let textEl = parentElement.children[0].innerText;
        questionMove.style.display = 'flex';
        setTimeout(() => {
            questionMove.style.transform = 'scale(1)';
        }, 100)
        nameTask.textContent = `${textEl}`;
        parentTask = parentElement;
    }
    
    if (elementClick.classList.contains('btnMoveTodo')) {
        parentTask.remove();
        createTask(nameTask.textContent, 0);
        questionMove.style.transform = 'scale(0)';
        setTimeout(() => {
            questionMove.style.display = 'none';
        }, 500)
    }

    if (elementClick.classList.contains('btnMoveDoing')) {
        parentTask.remove();
        createTask(nameTask.textContent, 1);
        questionMove.style.transform = 'scale(0)';
        setTimeout(() => {
            questionMove.style.display = 'none';
        }, 500)
    }
    
    if (elementClick.classList.contains('delete')) {
        const textEl = parentElement.children[0].value;
        parentElement.remove();
        let index = listTasks.indexOf(`${textEl}`);
        listTasks.splice(index, 1);
    }
})

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
