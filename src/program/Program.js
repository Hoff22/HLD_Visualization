import React, {useEffect, useRef} from 'react'
import { Camera } from './classes/Camera.js';
import { Controller } from './classes/Controller.js';
import { drawCircle, drawLine, newFrame } from './classes/Renderer.js';
import { Tree } from './classes/Tree.js';
import {Vector2} from './classes/Vector2.js';
import { HLD } from './classes/HLD.js'
import "./Program.css"

class Program{
    static initialized = false;
    /** @type {HTMLCanvasElement} */
    canvas;
    /** @type {CanvasRenderingContext2D} */
    ctx;
    /**@type {Camera} */
    camera;

    currentTree;

    init(canvas){
        Program.initialized = true;
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        
        this.start();
        const requestUpdate = () => {
            this.update()
            requestAnimationFrame(requestUpdate);
        }
        requestUpdate();
    }

    start(){
        Controller.setListeners();
        this.currentTree = new Tree(1000, "victor");
        this.camera = new Camera();
    }
    
    update(){
        this.camera.resizeCanvas();
        newFrame("rgb(25.5,25.5,25.5)");
        this.currentTree.drawTree();
    }

    selectNode(position){
        let selectedNode = -1;
        let selectedDist = Infinity;
        for(let i = 0; i < this.currentTree.nodes.length; i++){
            let worldDist = Vector2.distance(position, this.currentTree.nodes[i].position);
            let screenDist = this.camera.worldToScreenLength(worldDist);
            if(Math.min(worldDist, screenDist) < 25){
                if (selectedDist > Math.min(worldDist, screenDist)){
                    selectedNode = this.currentTree.nodes[i].id;
                    selectedDist = Math.min(worldDist, screenDist);
                }
            }
        }
        if (selectedNode != -1){
            this.currentTree.root = selectedNode;
            this.hld = new HLD(this.currentTree);
        }
    }
}

/**@type {Program} */
export let program = new Program();

export function ProgramComponent() {
    
    const canvas = useRef();

    useEffect(() => {
        if(!Program.initialized){
            program.init(canvas.current);
        }
    },[]);

    return (
        <canvas id="canvas" 
        ref={canvas} 
        width={window.innerWidth} 
        height={window.innerHeight}></canvas>
    )
}