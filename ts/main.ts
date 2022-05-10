import { UI_ELEMS, PRIORITY, STATUS, createHTML } from './view.js';

const DEFAULT_STATUS: string = STATUS.TO_DO;
const DEFAULT_PRIORITY: string = PRIORITY.HIGH;

let taskList: Array<{ name: string; status: string; priority: string }> = [];

function addTask(name: string, status = DEFAULT_STATUS, priority = DEFAULT_PRIORITY): void {
  taskList.push({
    name,
    status,
    priority,
  });
}

function deleteTask(): void {
  const deleteButtons = document.querySelectorAll(
    '.todo__list-closebtn'
  ) as NodeListOf<HTMLButtonElement>;

  deleteButtons.forEach((btn, i) => {
    btn.addEventListener('click', () => {
      taskList.splice(i, 1);
      renderTaskList();
    });
  });
}

function changeStatus(): void {
  const statusHandlers = document.querySelectorAll(
    '.todo__list-checkbox'
  ) as NodeListOf<HTMLInputElement>;
  const taskItems = document.querySelectorAll('.todo__list-item') as NodeListOf<HTMLLIElement>;

  statusHandlers.forEach((handler, i) => {
    handler.addEventListener('change', () => {
      const isChecked: boolean = handler.checked;

      if (isChecked) {
        taskItems[i].classList.add('todo__list-item--done');
        taskList[i].status = STATUS.DONE;
      } else {
        taskItems[i].classList.remove('todo__list-item--done');
        taskList[i].status = STATUS.TO_DO;
      }
    });
  });
}

function filterTaskList(): void {
  const filteredByHigh = taskList.filter((item) => item.priority === PRIORITY.HIGH);
  const filteredByLow = taskList.filter((item) => item.priority === PRIORITY.LOW);

  taskList = filteredByHigh.concat(filteredByLow);
}

function renderTaskList(): void {
  UI_ELEMS.LIST_HIGH.innerHTML = '';
  UI_ELEMS.LIST_LOW.innerHTML = '';

  filterTaskList();

  taskList.filter((task) => {
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
  form.addEventListener('submit', (event) => {
    event.preventDefault();

    const target = event.target as HTMLElement;
    const taskText: string = UI_ELEMS.TASK_INPUTS[i].value;
    const isEmpty: boolean = !taskText || taskText.trim() === '';

    try {
      if (isEmpty) {
        throw 'Введите текст задачи';
      } else {
        if (target.classList.contains('todo__add-high')) {
          addTask(taskText);
        }

        if (target.classList.contains('todo__add-low')) {
          addTask(taskText, STATUS.TO_DO, PRIORITY.LOW);
        }

        renderTaskList();
      }
    } catch (err) {
      alert(err);
    }

    UI_ELEMS.TASK_INPUTS[i].value = '';
  });
});

renderTaskList();
