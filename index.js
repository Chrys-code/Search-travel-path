// Define a city:
class Node {
    constructor(name) {
        this.name = name;
        this.adjacentNodes = new Set();
    }
}

// Define the graph:
class Graph {
    constructor(edges) {
        this.nodeGraph = new Map();
        this.edges = edges;
    }

    // Introducing cities to adjacent ones
    connectNodes(startNode, endNode) {
        this.nodeGraph.get(startNode).adjacentNodes.add(endNode);
        this.nodeGraph.get(endNode).adjacentNodes.add(startNode);
    }

    // Build graph using edges
    // If an edge endpoints(citites) are not in graph: add
    // If city is present, introduce endpoints(citites)
    build() {
        this.edges.forEach((edge) => {
            if (!this.nodeGraph.has(edge.startNode)) {
                this.nodeGraph.set(edge.startNode, new Node(edge.startNode))
            }
            if (edge.endNode == null) return
            if (!this.nodeGraph.has(edge.endNode)) {
                this.nodeGraph.set(edge.endNode, new Node(edge.endNode))
            }
            this.connectNodes(edge.startNode, edge.endNode);
        })
        console.log(this.nodeGraph)
    }

    // If path loading is ended, build path array
    buildPath(path, currentNode, result = []) {
        const source = path.get(currentNode)
        if (!currentNode || !source) return
        result.push({ from: source, to: currentNode })
        this.buildPath(path, path.get(currentNode), result)
        return console.log(result.reverse())
    }

    search(startNode, endNode) {
        if (!this.nodeGraph.has(startNode) || !this.nodeGraph.has(endNode)) return "Wrong input"
        const queue = [startNode];
        const visited = new Set();
        const path = new Map();
        ////////////////////////////////////////////////////////////////////
        while (queue.length > 0) {
            const currentNode = queue.shift();
            if (currentNode === endNode) {
                return this.buildPath(path, currentNode)
            }
            this.nodeGraph.get(currentNode).adjacentNodes.forEach((nextNode) => {
                if (visited.has(nextNode)) {
                    return;
                }
                if (!queue.includes(nextNode)) {
                    path.set(nextNode, currentNode);
                    queue.push(nextNode);
                }
            })
            visited.add(currentNode);
        }
        ////////////////////////////////////////////////////////////////////
        return null
    }
}

const graph = new Graph([
    { startNode: 'Glasgow', endNode: 'Edinburgh' },
    { startNode: 'Edinburgh', endNode: 'London' },
    { startNode: 'Glasgow', endNode: 'London' },
    { startNode: 'London', endNode: 'Cardiff' },
    { startNode: 'Aberdeen', endNode: 'Edinburgh' },
    { startNode: 'Belfast', endNode: null },
])

graph.build();
graph.search('Aberdeen', 'Cardiff');
