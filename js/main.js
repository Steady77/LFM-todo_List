import { UI_ELEMS } from './view.js';

const STATUS = {
    TO_DO: 'To Do',
    DONE: 'Done',
};

const PRIORITY = {
    LOW: 'low',
    HIGH: 'high',
};

const DEFAULT_STATUS = STATUS.TO_DO,
    DEFAULT_PRIORITY = PRIORITY.HIGH;

let list = [
    {
        name: 'Вот вам и супер интересная тема. Вы наверняка заметили что ваши файлы с кодом становятся все объемнее, что хочется вынести некоторые вещи куда-то за пределы основной программы.',
        status: STATUS.TO_DO,
        priority: PRIORITY.HIGH,
    },
    {
        name: 'Сверстать этот TODO list',
        status: STATUS.TO_DO,
        priority: PRIORITY.HIGH,
    },
    {
        name: 'Начать делать задачу',
        status: STATUS.DONE,
        priority: PRIORITY.HIGH,
    },
    {
        name: 'Посмотреть ютубчик',
        status: STATUS.TO_DO,
        priority: PRIORITY.LOW,
    },
];

function addTask(name, status = DEFAULT_STATUS, priority = DEFAULT_PRIORITY) {
    list.push({
        name,
        status,
        priority,
    });
}

function deleteTask() {
    UI_ELEMS.DELETE_BTNS = document.querySelectorAll('.todo__list-closebtn');

    UI_ELEMS.DELETE_BTNS.forEach((btn, i) => {
        btn.addEventListener('click', () => {
            list.splice(i, 1);
            renderTaskList();
        });
    });
}

function changeStatus() {
    UI_ELEMS.STATUS_HANDLERS = document.querySelectorAll('.todo__list-checkbox');
    UI_ELEMS.TASK_ITEM = document.querySelectorAll('.todo__list-item');

    UI_ELEMS.STATUS_HANDLERS.forEach((handler, i) => {
        handler.addEventListener('change', event => {
            if (event.target.checked) {
                UI_ELEMS.TASK_ITEM[i].classList.add('todo__list-item--done');
                list[i].status = STATUS.DONE;
            } else {
                UI_ELEMS.TASK_ITEM[i].classList.remove('todo__list-item--done');
                list[i].status = STATUS.TO_DO;
            }
        });
    });
}

function filterTaskList() {
    const filteredByHigh = list.filter(item => item.priority === PRIORITY.HIGH);
    const filteredByLow = list.filter(item => item.priority === PRIORITY.LOW);

    list = filteredByHigh.concat(filteredByLow);
}

function createHTML(task) {
    return `
        <li class="todo__list-item ${task.status === STATUS.DONE ? 'todo__list-item--done' : ''}">
            <label class="todo__list-label">
                <input class="todo__list-checkbox" type="checkbox" ${task.status === STATUS.DONE ? 'checked' : ''}>
                <span class="todo__checkbox-style"></span>
            </label>
            <p class="todo__item-text">
                ${task.name}
            </p>
            <button class="todo__list-closebtn"></button>
        </li>
    `;
}

function renderTaskList() {
    UI_ELEMS.LIST_HIGH.innerHTML = '';
    UI_ELEMS.LIST_LOW.innerHTML = '';

    filterTaskList();

    list.filter(task => {
        if (task.priority === PRIORITY.HIGH) {
            UI_ELEMS.LIST_HIGH.innerHTML += createHTML(task);
        }
        if (task.priority === PRIORITY.LOW) {
            UI_ELEMS.LIST_LOW.innerHTML += createHTML(task);
        }
    });

    deleteTask();
    changeStatus();
}

UI_ELEMS.FORMS.forEach((form, i) => {
    form.addEventListener('submit', event => {
        event.preventDefault();

        const target = event.target;
        const taskText = UI_ELEMS.TASK_INPUTS[i].value;

        if (taskText) {
            if (target.classList.contains('todo__add-high')) {
                addTask(taskText);
            }

            if (target.classList.contains('todo__add-low')) {
                addTask(taskText, STATUS.TO_DO, PRIORITY.LOW);
            }

            UI_ELEMS.TASK_INPUTS[i].value = '';
            renderTaskList();
        }
    });
});

renderTaskList();
