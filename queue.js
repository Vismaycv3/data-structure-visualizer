const queue = [];

const MAX_SIZE = 6;

let isDequeuing = false;

const queueContainer = document.getElementById("queue");

const valueInput = document.getElementById("queue-value");

const enqueueBtn = document.getElementById("enqueue-btn");

const dequeueBtn = document.getElementById("dequeue-btn");

const peekBtn = document.getElementById("peek-btn");

const emptyBtn = document.getElementById("empty-btn");

const message = document.getElementById("message");

const infoBtn = document.getElementById("info-btn");

const complexityPanel = document.getElementById("complexity-panel");


// ENQUEUE

enqueueBtn.addEventListener("click", () => {

    message.className = "";

    const value = valueInput.value;

    if(value === ""){

        message.classList.add("error");

        message.innerText = "Enter a value";

        return;

    }

    // OVERFLOW

    if(queue.length >= MAX_SIZE){

        message.classList.add("error");

        message.innerText = "Queue Overflow";

        return;

    }

    queue.push(value);

    const element = document.createElement("div");

    element.classList.add("queue-element");

    element.innerText = value;

    queueContainer.appendChild(element);

    message.classList.add("success");

    message.innerText = `Enqueued ${value}`;

    valueInput.value = "";

});


// DEQUEUE

dequeueBtn.addEventListener("click", () => {

    if(isDequeuing) return;

    message.className = "";

    // UNDERFLOW

    if(queue.length === 0){

        message.classList.add("error");

        message.innerText = "Queue Underflow";

        return;

    }

    isDequeuing = true;

    const elements = document.querySelectorAll(".queue-element");

    const frontElement = elements[0];

    frontElement.classList.add("dequeue-animation");

    const removedValue = queue.shift();

    message.classList.add("success");

    message.innerText = `Dequeued ${removedValue}`;

    setTimeout(() => {

        frontElement.remove();

        isDequeuing = false;

    }, 500);

});


// PEEK

peekBtn.addEventListener("click", () => {

    message.className = "";

    if(queue.length === 0){

        message.classList.add("error");

        message.innerText = "Queue is Empty";

        return;

    }

    const elements = document.querySelectorAll(".queue-element");

    elements.forEach((element) => {

        element.classList.remove("peek-highlight");

    });

    elements[0].classList.add("peek-highlight");

    message.classList.add("warning");

    message.innerText = `Front Element : ${queue[0]}`;

});


// isEmpty

emptyBtn.addEventListener("click", () => {

    message.className = "";

    if(queue.length === 0){

        message.classList.add("warning");

        message.innerText = "TRUE → Queue is Empty";

    }

    else{

        message.classList.add("warning");

        message.innerText = "FALSE → Queue is NOT Empty";

    }

});


// INFO PANEL

infoBtn.addEventListener("click", () => {

    complexityPanel.classList.toggle("hidden");

});