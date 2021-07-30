const addBtn = document.querySelector('.list-submit');
const list = document.querySelector('.shopping-list');
const resetBtn = document.querySelector('.resetBtn');
// localStorage.clear();
let removeBtns;
let elements;
if(!localStorage.getItem('elements')) {
    const elementArray = [];
    localStorage.setItem('elements', JSON.stringify(elementArray));
    elements = JSON.parse(localStorage.getItem('elements'));
    elements = elementArray;
} else {
    elements = JSON.parse(localStorage.getItem('elements'));
}

addBtn.addEventListener('click', addNewElement);
resetBtn.addEventListener('click', clearItems);


elements.forEach(element => addElementsToList(element));

function addElementsToList(name) {
    let text = name;
    var newListElement = document.createElement('li');
    var newSpanElement = document.createElement('span');
    var newBtn = document.createElement('button');
    var newDelElement = '<svg><use xlink:href="icons/trash-can.svg#delete"></use><svg>';
    newListElement.classList.add('list-element');
    newSpanElement.classList.add('element-name');
    newSpanElement.textContent = text;
    newListElement.appendChild(newSpanElement);
    newBtn.classList.add('element-delete');
    newBtn.innerHTML = newDelElement;
    newListElement.appendChild(newBtn);
    list.appendChild(newListElement);
    document.querySelector('.list-input').value = '';
    checkBtn();
}

function addNewElement() {
    let name = document.querySelector('.list-input').value;
    elements.push(name);
    localStorage.setItem('elements', JSON.stringify(elements));
    elements = JSON.parse(localStorage.getItem('elements'));
    addElementsToList(name);
    checkBtn();
}

function clearItems() {
    list.innerHTML = "";
    localStorage.clear();
    const elementArray = [];
    localStorage.setItem('elements', JSON.stringify(elementArray));
    elements = JSON.parse(localStorage.getItem('elements'));
    elements = elementArray;
    checkBtn();
}

function checkBtn() {
    if(document.querySelectorAll('.element-delete')) {
        removeBtns = document.querySelectorAll('.element-delete');
        removeBtns.forEach(btn => btn.addEventListener('click', removeThisElement));
    }
}
checkBtn();

function removeThisElement(e) {
    let el = e.target;
    let thisLi;
    if(el.localName == 'use') {
        thisLi = e.target.parentNode.parentNode.parentNode;
    } else if (el.localName == 'svg') {
        thisLi = e.target.parentNode.parentNode;
    } else if (el.localName == 'button') {
        thisLi = e.target.parentNode;
    }
    let name = thisLi.innerText;
    elements = elements.filter(elem => {if(elem != name) {return elem;}});
    list.removeChild(thisLi);
    localStorage.setItem('elements', JSON.stringify(elements));
    elements = JSON.parse(localStorage.getItem('elements'));
    checkBtn();
}