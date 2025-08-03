const addButton = document.getElementById('add');
const inputTitle = document.getElementById('inputtitle');
const inputDesc = document.getElementById('inputdesc');
const taskContainer = document.getElementById('taski');

addButton.addEventListener('click', function () {
    if (inputTitle.value === '' || inputDesc.value === '') {
        alert('Proszę wprowadzić tytuł i opis zadania.');
        return;
    }

    const tytul = inputTitle.value;
    const opis = inputDesc.value;

    createTaskElement(tytul, opis);
    saveTask(tytul, opis);

    inputTitle.value = '';
    inputDesc.value = '';
});

function createTaskElement(title, desc) {
    const newContainer = document.createElement('div');
    newContainer.className = 'task';

    const newTitle = document.createElement('h1');
    newTitle.className = 'tasktext';
    newTitle.textContent = title;

    const newDesc = document.createElement('p');
    newDesc.className = 'tasktext';
    newDesc.textContent = desc;

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Usuń';
    deleteButton.id = 'delete';

    deleteButton.addEventListener('click', function () {
        newContainer.remove();
        deleteTask(title, desc);
    });

    newContainer.appendChild(newTitle);
    newContainer.appendChild(newDesc);
    newContainer.appendChild(deleteButton);

    taskContainer.appendChild(newContainer);
}

function saveTask(title, desc) {
    const zadania = JSON.parse(localStorage.getItem('zadania')) || [];
    zadania.push({ title, desc });
    localStorage.setItem('zadania', JSON.stringify(zadania));
}

function deleteTask(title, desc) {
    const aktualne = JSON.parse(localStorage.getItem('zadania')) || [];
    const nowe = aktualne.filter(e => e.title !== title || e.desc !== desc);
    localStorage.setItem('zadania', JSON.stringify(nowe));
}

window.addEventListener('DOMContentLoaded', () => {
    const zapisane = JSON.parse(localStorage.getItem('zadania')) || [];
    zapisane.forEach(z => createTaskElement(z.title, z.desc));
});
