const stack = [];

const MAX_SIZE = 6;

let isPopping = false;

const stackContainer = document.getElementById("stack");

const valueInput = document.getElementById("stack-value");

const pushBtn = document.getElementById("push-btn");

const popBtn = document.getElementById("pop-btn");

const peekBtn = document.getElementById("peek-btn");

const emptyBtn = document.getElementById("empty-btn");

const message = document.getElementById("message");

const infoBtn = document.getElementById("info-btn");

const complexityPanel = document.getElementById("complexity-panel");


// PUSH

pushBtn.addEventListener("click", () => {

    message.className = "";

    const value = valueInput.value;

    // EMPTY INPUT

    if(value === ""){

        message.classList.add("error");

        message.innerText = "Enter a value";

        return;

    }

    // OVERFLOW

    if(stack.length >= MAX_SIZE){

        message.classList.add("error");

        message.innerText = "Stack Overflow";

        return;

    }

    // PUSH VALUE

    stack.push(value);

    // CREATE ELEMENT

    const element = document.createElement("div");

    element.classList.add("stack-element");

    element.innerText = value;

    // ADD TO STACK

    stackContainer.appendChild(element);

    // SUCCESS MESSAGE

    message.classList.add("success");

    message.innerText = `Pushed ${value}`;

    // CLEAR INPUT

    valueInput.value = "";

});


// POP

popBtn.addEventListener("click", () => {

    // PREVENT SPAM CLICKING

    if(isPopping) return;

    message.className = "";

    // UNDERFLOW

    if(stack.length === 0){

        message.classList.add("error");

        message.innerText = "Stack Underflow";

        return;

    }

    isPopping = true;

    const elements = document.querySelectorAll(".stack-element");

    // TOP ELEMENT

    const topElement = elements[elements.length - 1];

    // POP ANIMATION

    topElement.classList.add("pop-animation");

    // REMOVE FROM ARRAY

    const removedValue = stack.pop();

    // MESSAGE

    message.classList.add("success");

    message.innerText = `Popped ${removedValue}`;

    setTimeout(() => {

        topElement.remove();

        isPopping = false;

    }, 500);

});


// PEEK

peekBtn.addEventListener("click", () => {

    message.className = "";

    // EMPTY STACK

    if(stack.length === 0){

        message.classList.add("error");

        message.innerText = "Stack is Empty";

        return;

    }

    const elements = document.querySelectorAll(".stack-element");

    // REMOVE OLD HIGHLIGHTS

    elements.forEach((element) => {

        element.classList.remove("peek-highlight");

    });

    // HIGHLIGHT TOP

    const topElement = elements[elements.length - 1];

    topElement.classList.add("peek-highlight");

    // MESSAGE

    message.classList.add("warning");

    message.innerText = `Top Element : ${stack[stack.length - 1]}`;

});


// isEmpty

emptyBtn.addEventListener("click", () => {

    message.className = "";

    if(stack.length === 0){

        message.classList.add("warning");

        message.innerText = "TRUE → Stack is Empty";

    }

    else{

        message.classList.add("warning");

        message.innerText = "FALSE → Stack is NOT Empty";

    }

});


// INFO PANEL

infoBtn.addEventListener("click", () => {

    complexityPanel.classList.toggle("hidden");

});