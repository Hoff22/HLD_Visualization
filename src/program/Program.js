import React, {useEffect, useRef} from 'react'
import { Camera } from './classes/Camera.js';
import { Controller } from './classes/Controller.js';
import { drawCircle, drawLine, newFrame } from './classes/Renderer.js';
import { Tree } from './classes/Tree.js';
import {Vector2} from './classes/Vector2.js';
import "./Program.css"

class Program{
    static initialized = false;
    /** @type {HTMLCanvasElement} */
    canvas;
    /** @type {CanvasRenderingContext2D} */
    ctx;
    /**@type {Camera} */
    camera;

    nodes = [];

    tr;

    init(canvas){
        Program.initialized = true;
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.camera = new Camera();
        this.start();
    }

    start(){

        Controller.setListeners();
        this.tr = new Tree(1000, "victor");

        const requestUpdate = () => {
            this.update()
            requestAnimationFrame(requestUpdate);
        }
        requestUpdate();
    }
    
    update(){
        this.camera.resizeCanvas();
        newFrame("rgb(25.5,25.5,25.5)");
        this.tr.drawTree();
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