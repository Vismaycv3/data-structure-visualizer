// array.js

const createBtn = document.getElementById("create-btn");

const sizeInput = document.querySelector(".create-array input");

const indexRow = document.getElementById("index-row");

const valueRow = document.getElementById("value-row");

const addressRow = document.getElementById("address-row");

const insertBtn = document.getElementById("insert-btn");

const indexInput = document.getElementById("index-input");

const valueInput = document.getElementById("value-input");

const deleteBtn = document.getElementById("delete-btn");

const searchBtn = document.getElementById("search-btn");

const searchInput = document.getElementById("search-input");

const infoBtn = document.getElementById("info-btn");

const complexityPanel = document.getElementById("complexity-panel");

const traverseBtn = document.getElementById("traverse-btn");

let arr = [];

// CREATE ARRAY

createBtn.addEventListener("click", () => {

    const size = Number(sizeInput.value);

    if (size <= 0) {

        alert("Enter valid array size");

        return;
    }

    arr = new Array(size).fill("");

    generateArray(size);

});

// GENERATE ARRAY UI

function generateArray(size) {

    // clear previous rows

    indexRow.innerHTML = `<div class="label">Index</div>`;

    valueRow.innerHTML = `<div class="label">Value</div>`;

    addressRow.innerHTML = `<div class="label">Addr</div>`;

    for (let i = 0; i < size; i++) {

        // INDEX CELLS

        const indexCell = document.createElement("div");

        indexCell.classList.add("cell");

        indexCell.innerText = i;

        indexRow.appendChild(indexCell);

        // VALUE BOXES

        const valueBox = document.createElement("div");

        valueBox.classList.add("box");

        valueBox.setAttribute("data-index", i);

        valueRow.appendChild(valueBox);

        // ADDRESS CELLS

        const addressCell = document.createElement("div");

        addressCell.classList.add("address");

        addressCell.innerText = 100 + (i * 4);

        addressRow.appendChild(addressCell);

    }

}

// INSERT ELEMENT

insertBtn.addEventListener("click", () => {

    const index = Number(indexInput.value);

    const value = valueInput.value;

    // VALIDATION

    if (index < 0 || index >= arr.length) {

        alert("Array Index Out Of Bound");

        return;
    }

    // UPDATE ARRAY

    arr[index] = value;

    // GET ALL BOXES

    const boxes = document.querySelectorAll(".box");

    // UPDATE SPECIFIC BOX

    boxes[index].innerText = value;

    boxes[index].classList.add("insert-animation");

    setTimeout(() => {

        boxes[index].classList.remove("insert-animation");

    }, 500);

    // CLEAR INPUTS

    indexInput.value = "";

    valueInput.value = "";

});

deleteBtn.addEventListener("click", () => {

    const index = Number(indexInput.value);

    // OUT OF BOUND

    if (index < 0 || index >= arr.length) {

        alert("Array Index Out Of Bound");

        return;
    }

    // EMPTY CHECK

    if (arr[index] === "") {

        alert("Nothing To Delete");

        return;
    }

    // DELETE

    arr[index] = "";

    const boxes = document.querySelectorAll(".box");

    boxes[index].classList.add("delete-animation");

    setTimeout(() => {

        boxes[index].innerText = "";

        boxes[index].classList.remove("delete-animation");

    }, 400);

    indexInput.value = "";

});

function sleep(ms) {

    return new Promise(resolve => setTimeout(resolve, ms));

}

searchBtn.addEventListener("click", async () => {

    const value = searchInput.value;

    const boxes = document.querySelectorAll(".box");

    let found = false;

    // RESET PREVIOUS SEARCH

    boxes.forEach((box) => {

        box.classList.remove("active");

        box.classList.remove("found");

    });

    // TRAVERSAL

    for (let i = 0; i < arr.length; i++) {

        boxes[i].classList.add("active");

        await sleep(600);

        if (arr[i] == value) {

            boxes[i].classList.remove("active");

            boxes[i].classList.add("found");

            found = true;

            break;

        }

        boxes[i].classList.remove("active");

    }

    if (!found) {

        alert("Element Not Found");

    }

});

infoBtn.addEventListener("click", () => {

    complexityPanel.classList.toggle("hidden");

});

traverseBtn.addEventListener("click", async () => {

    const boxes = document.querySelectorAll(".box");

    // reset old states

    boxes.forEach((box) => {

        box.classList.remove("traverse");

    });

    // traversal animation

    for(let i = 0; i < arr.length; i++){

        boxes[i].classList.add("traverse");

        await sleep(500);

        boxes[i].classList.remove("traverse");

    }

});