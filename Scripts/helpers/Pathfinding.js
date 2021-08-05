var astar = {
    init: function (grid) {
        for (var x = 0; x < grid.length; x++) {
            for (var y = 0; y < grid[x].length; y++) {
                //  grid[x][y].y = x;
                //  grid[x][y].x = y;
                grid[x][y].f = 0;
                grid[x][y].g = 0;
                grid[x][y].h = 0;
                grid[x][y].visited = false;
                grid[x][y].closed = false;
                grid[x][y].debug = "";
                grid[x][y].parent = null;
            }
        }
    },
    search: function (grid, start, end, heuristic) {
        astar.init(grid);
        heuristic = heuristic || astar.manhattan;

        var openList = [];
        openList.push(start);

        while (openList.length > 0) {

            // Grab the lowest f(x) to process next
            var lowInd = 0;
            for (var i = 0; i < openList.length; i++) {
                if (openList[i].f < openList[lowInd].f) { lowInd = i; }
            }
            var currentNode = openList[lowInd];

            // End case -- result has been found, return the traced path
            if (currentNode == end) {
                var curr = currentNode;
                var ret = [];
                while (curr.parent) {
                    ret.push(curr);
                    curr = curr.parent;
                }
                return ret.reverse();
            }

            // Normal case -- move currentNode from open to closed, process each of its neighbors
            openList.remove(lowInd);
            currentNode.closed = true;

            var neighbors = astar.neighbors(grid, currentNode);
            for (var i = 0; i < neighbors.length; i++) {
                var neighbor = neighbors[i];

                if (neighbor.closed || neighbor.isWall()) {
                    // not a valid node to process, skip to next neighbor
                    continue;
                }

                // g score is the shortest distance from start to current node, we need to check if
                //   the path we have arrived at this neighbor is the shortest one we have seen yet
                var gScore = currentNode.g + 1; // 1 is the distance from a node to it's neighbor
                var gScoreIsBest = false;

                if (!neighbor.visited) {
                    // This the the first time we have arrived at this node, it must be the best
                    // Also, we need to take the h (heuristic) score since we haven't done so yet

                    gScoreIsBest = true;
                    neighbor.h = heuristic(neighbor.pos, end.pos);
                    neighbor.visited = true;
                    openList.push(neighbor);
                }
                else if (gScore < neighbor.g) {
                    // We have already seen the node, but last time it had a worse g (distance from start)
                    gScoreIsBest = true;
                }

                if (gScoreIsBest) {
                    // Found an optimal (so far) path to this node.  Store info on how we got here and
                    //  just how good it really is...
                    neighbor.parent = currentNode;
                    neighbor.g = gScore;
                    neighbor.f = neighbor.g + neighbor.h;
                    neighbor.debug = "F: " + neighbor.f + "<br />G: " + neighbor.g + "<br />H: " + neighbor.h;
                }
            }
        }

        // No result was found -- empty array signifies failure to find path
        return [];
    },
    manhattan: function (pos0, pos1) {
        // See list of heuristics: http://theory.stanford.edu/~amitp/GameProgramming/Heuristics.html

        var d1 = Math.abs(pos1.x - pos0.x);
        var d2 = Math.abs(pos1.y - pos0.y);
        return d1 + d2;
    },
    neighbors: function (grid, node) {
        var ret = [];
        var x = node.x;
        var y = node.y;

        if (grid[x - 1] && grid[x - 1][y]) {
            ret.push(grid[x - 1][y]);
        }
        if (grid[x + 1] && grid[x + 1][y]) {
            ret.push(grid[x + 1][y]);
        }
        if (grid[x][y - 1] && grid[x][y - 1]) {
            ret.push(grid[x][y - 1]);
        }
        if (grid[x][y + 1] && grid[x][y + 1]) {
            ret.push(grid[x][y + 1]);
        }
        return ret;
    }
};

if (!Array.prototype.indexOf) {
    Array.prototype.indexOf = function (elt /*, from*/) {
        var len = this.length;
        var from = Number(arguments[1]) || 0;
        from = (from < 0) ? Math.ceil(from) : Math.floor(from);
        if (from < 0) {
            from += len;
        }
        for (; from < len; ++from) {
            if (from in this && this[from] === elt) {
                return from;
            }
        }
        return -1;
    };
}

if (!Array.prototype.remove) {
    Array.prototype.remove = function (from, to) {
        var rest = this.slice((to || from) + 1 || this.length);
        this.length = from < 0 ? this.length + from : from;
        return this.push.apply(this, rest);
    };
}

var GraphNodeType = { OPEN: 0, WALL: 1 };
function Graph(grid) {
    this.elements = grid;
    var nodes = [];

    var row, rowLength, len = grid.length;
    for (var x = 0; x < len; ++x) {
        row = grid[x];
        rowLength = row.length;
        nodes[x] = new Array(rowLength); // optimum array with size
        for (var y = 0; y < rowLength; ++y) {
            nodes[x][y] = new GraphNode(x, y, row[y]);
        }
    }
    this.nodes = nodes;
}
Graph.prototype.toString = function () {
    var graphString = "\n";
    var nodes = this.nodes;
    var rowDebug, row, y, l;
    for (var x = 0, len = nodes.length; x < len;) {
        rowDebug = "";
        row = nodes[x++];
        for (y = 0, l = row.length; y < l;) {
            rowDebug += row[y++].type + " ";
        }
        graphString = graphString + rowDebug + "\n";
    }
    return graphString;
};

function GraphNode(x, y, type) {
    this.data = {};
    this.x = x;
    this.y = y;
    this.pos = { x: x, y: y };
    this.type = type;
}
GraphNode.prototype.toString = function () {
    return "[" + this.x + " " + this.y + "]";
};
GraphNode.prototype.isWall = function () {
    return this.type == GraphNodeType.WALL;
};


function BinaryHeap(scoreFunction) {
    this.content = [];
    this.scoreFunction = scoreFunction;
}

BinaryHeap.prototype = {
    push: function (element) {
        // Add the new element to the end of the array.
        this.content.push(element);
        // Allow it to sink down.
        this.sinkDown(this.content.length - 1);
    },

    pop: function () {
        // Store the first element so we can return it later.
        var result = this.content[0];
        // Get the element at the end of the array.
        var end = this.content.pop();
        // If there are any elements left, put the end element at the
        // start, and let it bubble up.
        if (this.content.length > 0) {
            this.content[0] = end;
            this.bubbleUp(0);
        }
        return result;
    },
    remove: function (node) {

        var i = this.content.indexOf(node);

        // When it is found, the process seen in 'pop' is repeated
        // to fill up the hole.
        var end = this.content.pop();
        if (i !== this.content.length - 1) {
            this.content[i] = end;
            if (this.scoreFunction(end) < this.scoreFunction(node))
                this.sinkDown(i);
            else
                this.bubbleUp(i);
        }
    },

    size: function () {
        return this.content.length;
    },

    rescoreElement: function (node) {
        this.sinkDown(this.content.indexOf(node));
    },
    sinkDown: function (n) {
        // Fetch the element that has to be sunk.
        var element = this.content[n];
        // When at 0, an element can not sink any further.
        while (n > 0) {
            // Compute the parent element's index, and fetch it.
            var parentN = ((n + 1) >> 1) - 1,
                parent = this.content[parentN];
            // Swap the elements if the parent is greater.
            if (this.scoreFunction(element) < this.scoreFunction(parent)) {
                this.content[parentN] = element;
                this.content[n] = parent;
                // Update 'n' to continue at the new position.
                n = parentN;
            }
            // Found a parent that is less, no need to sink any further.
            else {
                break;
            }
        }
    },

    bubbleUp: function (n) {
        // Look up the target element and its score.
        var length = this.content.length,
            element = this.content[n],
            elemScore = this.scoreFunction(element);

        while (true) {
            // Compute the indices of the child elements.
            var child2N = (n + 1) << 1, child1N = child2N - 1;
            // This is used to store the new position of the element,
            // if any.
            var swap = null;
            // If the first child exists (is inside the array)...
            if (child1N < length) {
                // Look it up and compute its score.
                var child1 = this.content[child1N],
                    child1Score = this.scoreFunction(child1);
                // If the score is less than our element's, we need to swap.
                if (child1Score < elemScore)
                    swap = child1N;
            }
            // Do the same checks for the other child.
            if (child2N < length) {
                var child2 = this.content[child2N],
                    child2Score = this.scoreFunction(child2);
                if (child2Score < (swap === null ? elemScore : child1Score))
                    swap = child2N;
            }

            // If the element needs to be moved, swap it, and continue.
            if (swap !== null) {
                this.content[n] = this.content[swap];
                this.content[swap] = element;
                n = swap;
            }
            // Otherwise, we are done.
            else {
                break;
            }
        }
    }
};