import { Camera } from './Camera.js';
import { drawCircle, drawLine, newFrame, drawText } from './Renderer.js';
import { Vector2 } from './Vector2.js';
import { Random } from './Random.js'

class Node{
    id;
    position;
    value;
    color;
    constructor(id, position){
        this.id = id;
        this.position = position;
        this.value = 0;
    }
}

export class Tree{
    nodes = [];
    adj = [];
    root;

    constructor(amount, seed){
        for(let i = 0; i < amount; i++){
            this.adj.push([]);
        }
        this.root = -1;
        this.seed = seed;
        this.build(amount);    
    }

    build(mnt){
        let edges = [];
        let parent = [];
        let height = [];
        let size = 5 * mnt;

        let find_set = (i) => {
            if(parent[i] == i) return i;
            return parent[i] = find_set(parent[i]);
        };
        let union_set = (i, j) => {
            i = find_set(i);
            j = find_set(j);
            if(height[j] > height[i]){
                let t = i;
                i = j;
                j = t;
            }
            if(i!=j){
                parent[j] = i;
                if(height[i] == height[j]) height[i] += 1;
            }
        };

        this.rng = new Random(this.seed);

        for(let i = 0; i < mnt; i++){
            this.nodes.push(new Node(i, new Vector2(0, Math.sqrt(this.rng()) * size).rotate(this.rng() * Math.PI * 2)));
            parent.push(-1);
            height.push(0);
            parent[i] = i
        }
        for(let u = 0; u < mnt; u++){
            for(let v = u+1; v < mnt; v++){
                edges.push([u,v]);
            }
        }

        edges.sort((a, b) => {
            return Vector2.distance(this.nodes[a[0]].position, this.nodes[a[1]].position) - Vector2.distance(this.nodes[b[0]].position, this.nodes[b[1]].position);
        });

        let e = 0;
        for(let i = 0; i < mnt-1; i++){
            while (find_set(edges[e][0]) == find_set(edges[e][1])){
                e++;
            }
            this.adj[edges[e][0]].push(edges[e][1]);
            this.adj[edges[e][1]].push(edges[e][0]);
            union_set(edges[e][0], edges[e][1]);
        }
    }

    drawTree(){
        this.drawEdges(Math.max(this.root, 0), -1);
        this.drawVerts(Math.max(this.root, 0), -1);
    }

    drawEdges(u, p){
        for(let i = 0; i < this.adj[u].length; i++){
            let v = this.adj[u][i];
            if(v == p) continue;
            if(i == 0){
                drawLine(this.nodes[u].position, this.nodes[v].position, 10, 3, this.nodes[v].color);
            }
            else{
                drawLine(this.nodes[u].position, this.nodes[v].position, 5, 0.5);
            }
            this.drawEdges(v, u);
        }
    }

    drawVerts(u, p) {
        if (u == this.root){
            drawCircle(this.nodes[u].position, 20, "rgb(25.5,25.5,25.5)", "#FF0066");
        }
        else{
            drawCircle(this.nodes[u].position, 20, "rgb(25.5,25.5,25.5)", "#CCCCCC");
        }

        drawText(this.nodes[u].position, 20, this.nodes[u].id)

        for (let i = 0; i < this.adj[u].length; i++) {
            let v = this.adj[u][i];
            if (v == p) continue;
            this.drawVerts(v, u);
        }
    }

}