const graph = document.getElementById("graph");

const svg = document.getElementById("graph-lines");

const nodeInput = document.getElementById("node-value");

const fromInput = document.getElementById("from-node");

const toInput = document.getElementById("to-node");

const addNodeBtn = document.getElementById("add-node-btn");

const addEdgeBtn = document.getElementById("add-edge-btn");

const bfsBtn = document.getElementById("bfs-btn");

const dfsBtn = document.getElementById("dfs-btn");

const infoBtn = document.getElementById("info-btn");

const complexityPanel = document.getElementById("complexity-panel");

const message = document.getElementById("message");

let nodes = {};

let adjacencyList = {};

let isAnimating = false;

/* CENTERED POSITIONS */

let positions = [

    [520,120],
    [720,120],

    [420,260],
    [620,260],
    [820,260],

    [520,380],
    [720,380],

    [620,70]

];

let positionIndex = 0;


// ADD NODE

addNodeBtn.addEventListener("click", () => {

    if(isAnimating) return;

    const value = nodeInput.value;

    if(value === ""){

        showMessage("Enter node value", "error");

        return;

    }

    if(nodes[value]){

        showMessage("Node already exists", "error");

        return;

    }

    if(positionIndex >= positions.length){

        showMessage("Maximum nodes reached", "error");

        return;

    }

    const [x,y] = positions[positionIndex];

    positionIndex++;

    const node = document.createElement("div");

    node.classList.add("node");

    node.innerText = value;

    node.style.left = `${x}px`;

    node.style.top = `${y}px`;

    node.id = `node-${value}`;

    graph.appendChild(node);

    nodes[value] = {x,y};

    adjacencyList[value] = [];

    showMessage(`Node ${value} added`, "success");

    nodeInput.value = "";

});


// ADD EDGE

addEdgeBtn.addEventListener("click", () => {

    if(isAnimating) return;

    const from = fromInput.value;

    const to = toInput.value;

    // NODE EXIST CHECK

    if(!nodes[from] || !nodes[to]){

        showMessage("Node does not exist", "error");

        return;

    }

    // DUPLICATE EDGE

    if(adjacencyList[from].includes(to)){

        showMessage("Edge already exists", "error");

        return;

    }

    adjacencyList[from].push(to);

    adjacencyList[to].push(from);

    drawLine(from, to);

    showMessage(`Edge ${from} - ${to} added`, "success");

    fromInput.value = "";

    toInput.value = "";

});


// DRAW LINE

function drawLine(from, to){

    const node1 = document.getElementById(`node-${from}`);

    const node2 = document.getElementById(`node-${to}`);

    if(!node1 || !node2) return;

    // NODE CENTER

    const x1 =
        node1.offsetLeft +
        node1.offsetWidth / 2;

    const y1 =
        node1.offsetTop +
        node1.offsetHeight / 2;

    const x2 =
        node2.offsetLeft +
        node2.offsetWidth / 2;

    const y2 =
        node2.offsetTop +
        node2.offsetHeight / 2;

    // CREATE SVG LINE

    const line = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "line"
    );

    line.setAttribute("x1", x1);

    line.setAttribute("y1", y1);

    line.setAttribute("x2", x2);

    line.setAttribute("y2", y2);

    line.setAttribute("stroke", "#a3e635");

    line.setAttribute("stroke-width", "4");

    svg.appendChild(line);

}


// BFS

bfsBtn.addEventListener("click", async () => {

    if(isAnimating) return;

    const start = Object.keys(nodes)[0];

    if(!start){

        showMessage("Graph is Empty", "error");

        return;

    }

    isAnimating = true;

    resetNodes();

    let queue = [start];

    let visited = {};

    visited[start] = true;

    while(queue.length){

        let current = queue.shift();

        const node =
            document.getElementById(`node-${current}`);

        node.classList.add("active");

        await sleep(700);

        node.classList.remove("active");

        node.classList.add("visited");

        for(let neighbor of adjacencyList[current]){

            if(!visited[neighbor]){

                visited[neighbor] = true;

                queue.push(neighbor);

            }

        }

    }

    showMessage(
        "BFS Traversal Completed",
        "warning"
    );

    isAnimating = false;

});


// DFS

dfsBtn.addEventListener("click", async () => {

    if(isAnimating) return;

    const start = Object.keys(nodes)[0];

    if(!start){

        showMessage("Graph is Empty", "error");

        return;

    }

    isAnimating = true;

    resetNodes();

    let visited = {};

    await dfs(start, visited);

    showMessage(
        "DFS Traversal Completed",
        "warning"
    );

    isAnimating = false;

});


// DFS FUNCTION

async function dfs(nodeValue, visited){

    visited[nodeValue] = true;

    const node =
        document.getElementById(`node-${nodeValue}`);

    node.classList.add("active");

    await sleep(700);

    node.classList.remove("active");

    node.classList.add("visited");

    for(let neighbor of adjacencyList[nodeValue]){

        if(!visited[neighbor]){

            await dfs(neighbor, visited);

        }

    }

}


// RESET

function resetNodes(){

    document.querySelectorAll(".node").forEach(node => {

        node.classList.remove("active");

        node.classList.remove("visited");

    });

}


// MESSAGE

function showMessage(text, type){

    message.className = type;

    message.innerText = text;

}


// SLEEP

function sleep(ms){

    return new Promise(resolve => setTimeout(resolve, ms));

}


// INFO PANEL

infoBtn.addEventListener("click", () => {

    complexityPanel.classList.toggle("hidden");

});