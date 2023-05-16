import { program } from "../Program.js";
import { Vector2 } from "./Vector2.js";

export class Controller
{
    static m1 = null;
    static m2 = null;
    static m3 = null;

    static lastMousePos = new Vector2();

    static inputLoops(){
        if (Controller.m1){

        }
        if (Controller.m3){

        }
    }

    static setListeners(){

        program.canvas.addEventListener("mousedown", function(e){
            switch (e.button) {
                case 0:
                    Controller.m1 = Date.now();
                    break;
                case 1:
                    Controller.m2 = Date.now();
                    break;
                case 2:
                    Controller.m3 = Date.now();
                    break;
                default:
                    break;
            }
        });

        program.canvas.addEventListener("click", function (e){
            if (Date.now() - Controller.m1 < 200){
                
                const worldPos = program.camera.screenToWorldPosition(new Vector2(e.offsetX, e.offsetY));

                // code here
                console.log("click");
                program.selectNode(worldPos);
            }

            Controller.m1 = null;
        });

        document.addEventListener("mouseup", function(e){
            if (e.button == 1){
                Controller.m2 = null;
            }
        });

        // document.addEventListener("mouseup", function(e){
        //     if (e.button == 0){
        //         Controller.m1 = null;
        //     }
        // });

        document.addEventListener("mousemove", function(e){
            if (Controller.m2){
                let offset = new Vector2(e.x, e.y).sub(Controller.lastMousePos).scale(-program.camera.size);
                program.camera.translate(offset);
            }
            Controller.lastMousePos = new Vector2(e.x, e.y);
        });

        program.canvas.addEventListener("wheel", function(e){
            const worldPos = program.camera.screenToWorldPosition(new Vector2(e.offsetX, e.offsetY));

            if (e.wheelDeltaY < 1){
                program.camera.applyZoom(1.1, worldPos);
            } else {
                program.camera.applyZoom(0.9, worldPos);
            }
        });

        program.canvas.addEventListener("contextmenu", function(e){
            e.preventDefault();
            const worldPos = program.camera.screenToWorldPosition(new Vector2(e.offsetX, e.offsetY));

            // code here
            Controller.m3 = null;
        });

        document.addEventListener("keypress", (e) => {

        });

        document.addEventListener("mouseleave", (e) => {
            this.m1 = null;
            this.m2 = null;
            this.m3 = null;
        });

        document.addEventListener("keydown", (e) => {
            // if (e.code == "F2"){
            //     program.camera.saveScreenshot();
            // }
        });

    }

}