var cols, rows, w;
var grid, neighbors;
var goal, goali, goalj;
var closedSet = [], openSet = [];

var blockcolor = 'rgba(0,0,0,0.4)';
var backgcolor = 'rgba(255,255,255,1)';
var opencolor = 'rgba(255,255,100,0.6)';
var closedcolor = 'rgba(255,0,0,0.3)';
var pathcolor = 'rgba(100,255,100,1)';

function setup(){
    var csize = 600;
    cols = 30;
    rows = 30;
    w = csize/rows;
    goali = rows-1;
    goalj = cols-1;

    createCanvas(csize, csize);

    grid = new Array(rows);
    for(let i = 0; i < rows; i++){
        grid[i] = new Array(cols);
        for(let j = 0; j < cols; j++){
            grid[i][j] = new node(i, j);
        }
    }

    grid[0][0].g = 0;
    grid[0][0].f = 0;
    openSet.push(grid[0][0]);
    goal = grid[rows-1][cols-1];
    goal.block = false;
}

function draw(){
    if(openSet.length > 0){
        var bf = 0;
        for(let i = 0; i < openSet.length; i++){
            bf = openSet[i].f < openSet[bf].f ? i : bf;
        }

        var bestF = openSet.splice(bf, 1)[0];
        neighbors = bestF.neighbors();


        background(backgcolor);
        for(let i = 0; i < rows; i++){
            for(let j = 0; j < cols; j++){
                grid[i][j].show();
            }
        }

        for(let i = 0; i < openSet.length; i++){
            openSet[i].open();
        }
        for(let i = 0; i < closedSet.length; i++){
            closedSet[i].closed();
        }

        for(let i = 0; i < neighbors.length; i++){
            if(neighbors[i] != goal){
                if((neighbors[i].g > (bestF.g + 1)) || (neighbors[i].f == -1)){
                    neighbors[i].g = bestF.g + 1;
                    neighbors[i].f = neighbors[i].h + neighbors[i].g;
                    neighbors[i].parent = bestF;
                }
                if(closedSet.indexOf(neighbors[i]) == -1 && openSet.indexOf(neighbors[i]) == -1){
                    openSet.push(neighbors[i]);
                }
            } else {
                neighbors[i].parent = bestF;
                pathTo(neighbors[i]);
                noLoop();
            }
        }
        closedSet.push(bestF);
        pathTo(bestF);
    } else {
        background(backgcolor);
        noLoop();
    }
}
