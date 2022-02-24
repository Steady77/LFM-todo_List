export const UI_ELEMS = {
    FORMS: document.querySelectorAll('.todo__add'),
    ADD_BTNS: document.querySelectorAll('.todo__add-btn'),
    TASK_INPUTS: document.querySelectorAll('.todo__add-input'),
    STATUS_HANDLERS: document.querySelectorAll('.todo__list-checkbox'),
    LIST_HIGH: document.querySelector('.todo__list-high'),
    LIST_LOW: document.querySelector('.todo__list-low'),
};

export const STATUS = {
    TO_DO: 'To Do',
    DONE: 'Done',
};

export const PRIORITY = {
    LOW: 'low',
    HIGH: 'high',
};

export function createHTML(task) {
    return `
        <li class="todo__list-item  ${task.status === STATUS.DONE ? 'todo__list-item--done' : ''}">
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
