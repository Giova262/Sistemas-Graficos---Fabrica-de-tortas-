
var previousClientX = 0,
    previousClientY = 0,
    radio = 10,
    alfa = 0.1, 
    beta = 0.1, 
    factorVelocidad = 0.01;

    mouseX=0;
    mouseY=0;
    isMouseDown = false;

class Camara{

    constructor(){

    }

    eventHandlerView(){
        $("#my-canvas").mousemove(function(e){     
            mouseX = e.clientX || e.pageX; 
            mouseY = e.clientY || e.pageY;
        });
        
        $('#my-canvas').mousedown(function(event){	   	
            isMouseDown = true;
               
        });
    
        $('body').mouseup(function(event){
            isMouseDown = false;	 
             
        });
    
        $('body').on("keydown",function(event){
            if (event.keyCode==67) {  alert ("presionaron la tecla C !!!") }        
        });

        if(isMouseDown) {

            var deltaX = mouseX - previousClientX;
            var deltaY = mouseY - previousClientY;

            previousClientX = mouseX;
            previousClientY = mouseY;

            alfa = alfa + deltaX * factorVelocidad;
            beta = beta + deltaY * factorVelocidad;

		    if (alfa<0) alfa=0.01;
            if (alfa>Math.PI) alfa=Math.PI;

            //Muestra la posicion del mouse en el canvas
            $('#valorDeltaX').html(deltaX);
            $('#valorDeltaY').html(deltaY);

            $('#valorAlfa').html(alfa);
            $('#valorBeta').html(beta); 
        }

    }

    update(){
        
        //Paso la matriz de vista al shader
        var ubicacion_ViewMatrix = gl.getUniformLocation(glProgram, "uViewMatrix");
        var viewMatrix = mat4.create();
        mat4.identity(viewMatrix);

        var x = radio * Math.sin(alfa) * Math.cos(beta);
        var y = radio * Math.cos(alfa);
        var z = radio * Math.sin(alfa) * Math.sin(beta);

        mat4.lookAt(viewMatrix, [x, y, z], [0, 0, 0], [0, 1, 0]);
        gl.uniformMatrix4fv(ubicacion_ViewMatrix, false, viewMatrix);
    }
}