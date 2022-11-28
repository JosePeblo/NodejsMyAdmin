fetch('./db').then(res => res.json()).then(db => refreshDatabases(db));
const a = {db: 1, mundo: 'tres'};
const res = new URLSearchParams(a).toString();
console.log(res);

const refreshDatabases = (databases) => {
    let list = document.querySelectorAll('nav')[0];
    createList(databases, list, populateTables);
};

const populateTables = (elem) => {
    elem.addEventListener('click', ev => {
        ev.stopPropagation();
        fetch(`./db?db=${elem.id}`).then(res => res.json()).then(res => {createList(res, elem)});
    });
};


const createList = (objs, element, clickListener) => {
    const list = document.createElement('ul');
    objs.forEach(elem => {
        const value = elem[Object.keys(elem)[0]];
        const innerElem = document.createElement('li');
        innerElem.id = value;
        innerElem.innerText = value;
        if(clickListener)
            clickListener(innerElem);
        list.appendChild(innerElem);
    });
    element.appendChild(list);
};

