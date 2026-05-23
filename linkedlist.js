const linkedList = [];

let isAnimating = false;

const listContainer = document.getElementById("linked-list");

const valueInput = document.getElementById("ll-value");

const searchInput = document.getElementById("search-value");

const insertBtn = document.getElementById("insert-btn");

const deleteBtn = document.getElementById("delete-btn");

const searchBtn = document.getElementById("search-btn");

const traverseBtn = document.getElementById("traverse-btn");

const message = document.getElementById("message");

const infoBtn = document.getElementById("info-btn");

const complexityPanel = document.getElementById("complexity-panel");


// RENDER LIST

function renderList(){

    listContainer.innerHTML = "";

    linkedList.forEach((value, index) => {

        const wrapper = document.createElement("div");

        wrapper.classList.add("node-wrapper");

        const node = document.createElement("div");

        node.classList.add("node");

        // DATA

        const dataBox = document.createElement("div");

        dataBox.classList.add("data-box");

        dataBox.innerText = value;

        // POINTER

        const pointerBox = document.createElement("div");

        pointerBox.classList.add("pointer-box");

        if(index === linkedList.length - 1){

            pointerBox.innerText = "NULL";

        }

        else{

            pointerBox.innerText = "•";

        }

        node.appendChild(dataBox);

        node.appendChild(pointerBox);

        wrapper.appendChild(node);

        // ARROW

        if(index !== linkedList.length - 1){

            const arrow = document.createElement("div");

            arrow.classList.add("arrow");

            arrow.innerText = "→";

            wrapper.appendChild(arrow);

        }

        listContainer.appendChild(wrapper);

    });

}


// INSERT

insertBtn.addEventListener("click", () => {

    message.className = "";

    const value = valueInput.value;

    if(value === ""){

        message.classList.add("error");

        message.innerText = "Enter a value";

        return;

    }

    linkedList.push(value);

    renderList();

    message.classList.add("success");

    message.innerText = `Inserted ${value}`;

    valueInput.value = "";

});


// DELETE END

deleteBtn.addEventListener("click", () => {

    if(isAnimating) return;

    message.className = "";

    if(linkedList.length === 0){

        message.classList.add("error");

        message.innerText = "Linked List is Empty";

        return;

    }

    isAnimating = true;

    const nodes = document.querySelectorAll(".node");

    const lastNode = nodes[nodes.length - 1];

    lastNode.classList.add("delete-animation");

    const removedValue = linkedList.pop();

    message.classList.add("success");

    message.innerText = `Deleted ${removedValue}`;

    setTimeout(() => {

        renderList();

        isAnimating = false;

    }, 500);

});


// SEARCH

searchBtn.addEventListener("click", async () => {

    if(isAnimating) return;

    isAnimating = true;

    message.className = "";

    const value = searchInput.value;

    const nodes = document.querySelectorAll(".node");

    let found = false;

    // RESET

    nodes.forEach((node) => {

        node.classList.remove("traverse");

        node.classList.remove("found");

    });

    for(let i = 0; i < linkedList.length; i++){

        nodes[i].classList.add("traverse");

        await sleep(600);

        if(linkedList[i] == value){

            nodes[i].classList.remove("traverse");

            nodes[i].classList.add("found");

            found = true;

            break;

        }

        nodes[i].classList.remove("traverse");

    }

    if(found){

        message.classList.add("success");

        message.innerText = `Element ${value} Found`;

    }

    else{

        message.classList.add("error");

        message.innerText = "Element Not Found";

    }

    isAnimating = false;

});


// TRAVERSE

traverseBtn.addEventListener("click", async () => {

    if(isAnimating) return;

    if(linkedList.length === 0){

        message.className = "error";

        message.innerText = "Linked List is Empty";

        return;

    }

    isAnimating = true;

    const nodes = document.querySelectorAll(".node");

    nodes.forEach((node) => {

        node.classList.remove("traverse");

        node.classList.remove("found");

    });

    for(let i = 0; i < linkedList.length; i++){

        nodes[i].classList.add("traverse");

        await sleep(600);

        nodes[i].classList.remove("traverse");

    }

    message.className = "warning";

    message.innerText = "Traversal Completed";

    isAnimating = false;

});


// INFO PANEL

infoBtn.addEventListener("click", () => {

    complexityPanel.classList.toggle("hidden");

});


// SLEEP

function sleep(ms){

    return new Promise(resolve => setTimeout(resolve, ms));

}