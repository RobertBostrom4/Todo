import { createTodo } from "./createTodo";

export function createForm() {

    const form = document.createElement('form');
    form.style.display = 'flex';
    form.style.flexDirection = 'column';

    const buttonSection = document.createElement('div');
    buttonSection.style.display = 'flex';
    buttonSection.style.justifyContent = 'space-between';

    const input = document.createElement('input');
    input.type = "text";
    input.required = true

    form.appendChild(input);

    const addButton = document.createElement('input');
    addButton.type = 'button';
    addButton.value = 'Add';
    addButton.className = 'add-button'
    addButton.style.width = '49%';

    const cancelButton = document.createElement('button');
    cancelButton.textContent = 'Cancel'
    cancelButton.type = 'button';
    cancelButton.className = 'cancel-button';
    cancelButton.style.width = '49%';







    buttonSection.appendChild(addButton);
    buttonSection.appendChild(cancelButton);
    form.appendChild(buttonSection);








    return form;
}