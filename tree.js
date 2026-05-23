class TreeNode {

    constructor(value){

        this.value = value;

        this.left = null;

        this.right = null;

        this.x = 0;

        this.y = 0;

    }

}

let root = null;

let isAnimating = false;

const tree = document.getElementById("tree");

const svg = document.getElementById("tree-lines");

const valueInput = document.getElementById("tree-value");

const searchInput = document.getElementById("search-value");

const insertBtn = document.getElementById("insert-btn");

const deleteBtn = document.getElementById("delete-btn");

const searchBtn = document.getElementById("search-btn");

const inorderBtn = document.getElementById("inorder-btn");

const preorderBtn = document.getElementById("preorder-btn");

const postorderBtn = document.getElementById("postorder-btn");

const infoBtn = document.getElementById("info-btn");

const complexityPanel = document.getElementById("complexity-panel");

const message = document.getElementById("message");


// INSERT

insertBtn.addEventListener("click", () => {

    if(isAnimating) return;

    message.className = "";

    const value = Number(valueInput.value);

    if(!valueInput.value){

        message.classList.add("error");

        message.innerText = "Enter a value";

        return;

    }

    if(searchNode(root, value)){

        message.classList.add("error");

        message.innerText = "Duplicate values not allowed";

        return;

    }

    root = insertNode(root, value);

    renderTree();

    if(root.value === value){

        message.classList.add("success");

        message.innerText = `${value} inserted as Root Node`;

    }

    else{

        message.classList.add("success");

        message.innerText = `${value} inserted`;

    }

    valueInput.value = "";

});


// INSERT LOGIC

function insertNode(node, value){

    if(node === null){

        return new TreeNode(value);

    }

    if(value < node.value){

        node.left = insertNode(node.left, value);

    }

    else{

        node.right = insertNode(node.right, value);

    }

    return node;

}


// SEARCH NODE

function searchNode(node, value){

    if(node === null) return false;

    if(node.value === value) return true;

    if(value < node.value){

        return searchNode(node.left, value);

    }

    return searchNode(node.right, value);

}


// RENDER TREE
function renderTree(){

    tree.innerHTML = "";

    svg.innerHTML = "";

    if(root === null){

        const emptyRoot = document.createElement("div");

        emptyRoot.classList.add("node");

        emptyRoot.style.left = "50%";

        emptyRoot.style.top = "40px";

        emptyRoot.style.transform = "translateX(-50%)";

        emptyRoot.style.opacity = "0.3";

        tree.appendChild(emptyRoot);

        return;

    }

    const centerX = tree.offsetWidth / 2 - 30;

    drawTree(root, centerX, 40, 220);

}

// DRAW TREE

function drawTree(node, x, y, gap){

    if(node === null) return;

    node.x = x;

    node.y = y;

    // NODE DIV

    const nodeDiv = document.createElement("div");

    nodeDiv.classList.add("node");

    nodeDiv.innerText = node.value;

    nodeDiv.style.left = `${x}px`;

    nodeDiv.style.top = `${y}px`;

    nodeDiv.id = `node-${node.value}`;

    tree.appendChild(nodeDiv);

    // LEFT

    if(node.left){

        drawLine(x + 30, y + 30, x - gap + 30, y + 120);

        drawTree(node.left, x - gap, y + 120, gap / 1.6);

    }

    // RIGHT

    if(node.right){

        drawLine(x + 30, y + 30, x + gap + 30, y + 120);

        drawTree(node.right, x + gap, y + 120, gap / 1.6);

    }

}


// DRAW LINE

function drawLine(x1, y1, x2, y2){

    const line = document.createElementNS("http://www.w3.org/2000/svg", "line");

    line.setAttribute("x1", x1);

    line.setAttribute("y1", y1);

    line.setAttribute("x2", x2);

    line.setAttribute("y2", y2);

    line.setAttribute("stroke", "#a3e635");

    line.setAttribute("stroke-width", "3");

    svg.appendChild(line);

}


// SLEEP

function sleep(ms){

    return new Promise(resolve => setTimeout(resolve, ms));

}


// TRAVERSAL

async function animateTraversal(list){

    isAnimating = true;

    for(let value of list){

        const node = document.getElementById(`node-${value}`);

        node.classList.add("active");

        await sleep(700);

        node.classList.remove("active");

    }

    message.className = "warning";

    message.innerText = "Traversal Completed";

    isAnimating = false;

}


// INORDER

inorderBtn.addEventListener("click", async () => {

    if(isAnimating) return;

    if(root === null){

        message.className = "error";

        message.innerText = "Tree is Empty";

        return;

    }

    const result = [];

    inorder(root, result);

    animateTraversal(result);

});

function inorder(node, result){

    if(node){

        inorder(node.left, result);

        result.push(node.value);

        inorder(node.right, result);

    }

}


// PREORDER

preorderBtn.addEventListener("click", async () => {

    if(isAnimating) return;

    const result = [];

    preorder(root, result);

    animateTraversal(result);

});

function preorder(node, result){

    if(node){

        result.push(node.value);

        preorder(node.left, result);

        preorder(node.right, result);

    }

}


// POSTORDER

postorderBtn.addEventListener("click", async () => {

    if(isAnimating) return;

    const result = [];

    postorder(root, result);

    animateTraversal(result);

});

function postorder(node, result){

    if(node){

        postorder(node.left, result);

        postorder(node.right, result);

        result.push(node.value);

    }

}


// SEARCH

searchBtn.addEventListener("click", async () => {

    if(isAnimating) return;

    const value = Number(searchInput.value);

    let current = root;

    isAnimating = true;

    while(current){

        const nodeDiv = document.getElementById(`node-${current.value}`);

        nodeDiv.classList.add("active");

        await sleep(700);

        if(current.value === value){

            nodeDiv.classList.remove("active");

            nodeDiv.classList.add("found");

            message.className = "success";

            message.innerText = `Element ${value} Found`;

            isAnimating = false;

            return;

        }

        nodeDiv.classList.remove("active");

        if(value < current.value){

            current = current.left;

        }

        else{

            current = current.right;

        }

    }

    message.className = "error";

    message.innerText = "Element Not Found";

    isAnimating = false;

});


// DELETE LEAF NODE ONLY

deleteBtn.addEventListener("click", () => {

    if(isAnimating) return;

    const value = Number(valueInput.value);

    root = deleteLeaf(root, value);

    renderTree();

});

function deleteLeaf(node, value){

    if(node === null){

        message.className = "error";

        message.innerText = "Value Not Found";

        return null;

    }

    if(value < node.value){

        node.left = deleteLeaf(node.left, value);

    }

    else if(value > node.value){

        node.right = deleteLeaf(node.right, value);

    }

    else{

        // LEAF NODE

        if(node.left === null && node.right === null){

            message.className = "success";

            message.innerText = `Deleted ${value}`;

            return null;

        }

        else{

            message.className = "error";

            message.innerText = "Can only delete leaf nodes";

        }

    }

    return node;

}


// INFO PANEL

infoBtn.addEventListener("click", () => {

    complexityPanel.classList.toggle("hidden");

});