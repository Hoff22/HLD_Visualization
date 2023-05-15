import {Vector2} from "./Vector2.js"
import { program } from '../Program.js'

export class Camera{
    constructor() {
        /** @type {Vector2} */
        this.position = new Vector2(0,0);

        /** @type {Number} */
        this.size = 1;

        this.resizeCanvas();
    }

    /**
     * @param {Vector2} position 
     */
    worldToScreenPosition(position) {
        return position.sub(this.position).scale(1 / this.size).add(new Vector2(program.canvas.width, program.canvas.height).scale(0.5));
    }

    screenToWorldPosition(position) {
        return position.sub(new Vector2(program.canvas.width, program.canvas.height).scale(0.5)).scale(this.size).add(this.position);
    }

    worldToScreenLength(length) {
        return length / this.size;
    }

    applyZoom(amount, position = new Vector2(0,0)) {
        this.position = this.position.add(this.position.sub(position).scale(amount-1));
        this.size *= amount;
        // just rebuild
    }
    
    translate(offset) {
        this.position = this.position.add(offset);
    }
    
    resizeCanvas() {
        program.canvas.width = window.innerWidth;
        program.canvas.height = window.innerHeight;
    }
}