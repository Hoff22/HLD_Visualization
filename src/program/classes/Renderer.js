import {program} from '../Program.js'
import {Vector2} from './Vector2.js'

export function drawCircle(position, radius, fillColor = "rgb(25.5,25.5,25.5)", strokeColor = "rgb(204,204,204)", strokeWidth = 1){  
    const sPos = program.camera.worldToScreenPosition(position);
    const sLen = program.camera.worldToScreenLength(radius);
    
    program.ctx.lineWidth = Math.min(3, program.camera.worldToScreenLength(strokeWidth));
    program.ctx.strokeStyle = strokeColor;
    program.ctx.fillStyle = fillColor;
    program.ctx.beginPath();
    program.ctx.arc(sPos.x, sPos.y, sLen, 0, 7);
    program.ctx.fill();
    program.ctx.stroke();
}

export function newFrame(bgColor){
    program.ctx.clearRect(0,0,program.canvas.width, program.canvas.height);
    program.ctx.fillStyle = bgColor;
    program.ctx.fillRect(0,0,program.canvas.width, program.canvas.height);
}