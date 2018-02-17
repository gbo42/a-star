function node(i, j){
    this.i = i;
    this.j = j;

    this.f = -1;
    this.g = -1;
    this.h = Math.sqrt((this.i-goali)*(this.i-goali) + (this.j-goalj)*(this.j-goalj));

    this.parent;

    this.block = random(100) > 70 ? true : false;

    this.show = function(){
        if(this.block){
            fill(0);
        } else {
            noFill();
        }
        stroke(255);
        rect(this.i*w, this.j*w, w, w);
    }

    this.open = function(){
        fill(0,255,0);
        rect(this.i*w, this.j*w, w, w);
    }

    this.closed = function(){
        fill(255,0,0);
        rect(this.i*w, this.j*w, w, w);
    }

    this.highlight = function(){
        fill(255,0,0);
        rect(this.i*w, this.j*w, w, w);
    }

    this.neighbors = function(){
        var neighbors = [];

        for(let i = -1; i < 2; i++){
            for(let j = -1; j < 2; j++){
                if(i != 0 || j != 0){
                    if(grid[this.i+i] && grid[this.i+i][this.j+j]){
                        if(!grid[this.i+i][this.j+j].block){
                            neighbors.push(grid[this.i+i][this.j+j]);
                        }
                    }
                }
            }
        }

        return neighbors;
    }
}

function pathTo(current){
    stroke(180);
    strokeWeight(10);
    while(current.parent){
        line(current.i*w+w/2, current.j*w+w/2, current.parent.i*w+w/2, current.parent.j*w+w/2);
        current = current.parent;
    }
    strokeWeight(1);
}
