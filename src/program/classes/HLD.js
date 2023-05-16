import { Tree } from './Tree.js';
import { Vector2 } from './Vector2.js';
import { Random } from './Random.js'

export class HLD{
    currentTree;
    heavy_node = [];
    parent = [];
    tin = [];
    sz = [];
    timer;

    constructor(tree){
        this.currentTree = tree;
        this.heavy_node = new Array(tree.nodes.length).fill(-1);
        this.parent = new Array(tree.nodes.length).fill(-1);
        this.tin = new Array(tree.nodes.length).fill(0);
        this.sz = new Array(tree.nodes.length).fill(0);
        this.timer = 0;

        this.rng = new Random(tree.seed);

        this.build_heavy_paths(tree.root);
        this.color_heavy_paths(tree.root);
    }

    build_heavy_paths(u, p = -1){
        this.parent[u] = p;
        this.sz[u] = 1;
        
        let heavy = -1;
        let heavy_v = 0;
        for(let i = 0; i < this.currentTree.adj[u].length; i++){
            let v = this.currentTree.adj[u][i];
            if(v == p) continue;
            this.build_heavy_paths(v, u);
            if(this.sz[v] > heavy_v){
                heavy_v = this.sz[v];
                heavy = i;
            }
            this.sz[u] += this.sz[v];
        }

        if(heavy != -1){
            let t = this.currentTree.adj[u][0]
            this.currentTree.adj[u][0] = this.currentTree.adj[u][heavy];
            this.currentTree.adj[u][heavy] = t;
        }
    }   

    color_heavy_paths(u, p = -1, c = "#FF0066"){
        this.currentTree.nodes[u].color = c;

        for (let i = 0; i < this.currentTree.adj[u].length; i++) {
            let v = this.currentTree.adj[u][i];
            if (v == p) continue;
            if(i > 0){
                c = "HSL(" + Math.round(this.rng() * 360).toString() + ",100%,50%)";
            }
            this.color_heavy_paths(v,u,c);
        }
    }
    

}