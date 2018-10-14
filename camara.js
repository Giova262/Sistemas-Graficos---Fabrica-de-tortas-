
var previousClientX = 0,
    previousClientY = 0,
    radio = 20,
    alfa = 0, 
    beta = 0, 
    factorVelocidad = 0.01;

    mouseX=0;
    mouseY=0;
    isMouseDown = false;

    deltaX = 0;
    deltaY = 0;

    fristTime = true ;

    tipoCamara= 0;

class Camara{

    constructor(){}

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
            fristTime = true ;   
        });

        //ZOOM con teclas "+" y "-"
        window.addEventListener("keydown", function (e) {
            if ( e.keyCode == 107) {
                radio = radio - 0.001;
                if (radio < 1) radio =1;
            }
            if ( e.keyCode == 109) {
                radio = radio + 0.001;
                if(radio > 50 ) radio = 50 ;
            }
            if ( e.keyCode == 81) {
                tipoCamara = 0 ;        
            }
            if ( e.keyCode == 87) {
                tipoCamara = 1 ;        
            }
            if ( e.keyCode == 69) {
                tipoCamara = 2 ;        
            }
            if ( e.keyCode == 82) {
                tipoCamara = 3 ;        
            }
            if ( e.keyCode == 84) {
                tipoCamara = 4 ;        
            }
            if ( e.keyCode == 89) {
                tipoCamara = 5 ;        
            }
            
        }, true);

        if(isMouseDown) {

            if(fristTime){

                previousClientX = mouseX;
                previousClientY = mouseY;   
                fristTime = false;
            }

            deltaX = mouseX - previousClientX;
            deltaY = mouseY - previousClientY;
           
            previousClientX = mouseX;
            previousClientY = mouseY;

            alfa = alfa - deltaX * factorVelocidad;
            beta = beta - deltaY * factorVelocidad;

		    if (alfa<0) alfa=Math.PI*2;
            if (alfa>Math.PI*2) alfa=0;

            if (beta<-Math.PI/2) beta=-Math.PI/2;
            if (beta>Math.PI/2) beta=Math.PI/2;

            //Muestra la posicion del mouse en el canvas
            $('#valorDeltaX').html(deltaX);
            $('#valorDeltaY').html(deltaY);

            $('#valorAlfa').html(alfa);
            $('#valorBeta').html(beta); 
        } 
    }

    update(){
        //Tipos de camara
        if(tipoCamara == 0) this.orbitalCamara();
        if(tipoCamara == 1) this.orbitalCentroEscena();
        if(tipoCamara == 2) this.orbitalCentroTortaEstacion1();
        if(tipoCamara == 3) this.orbitalCentroTortaEstacion2();
        if(tipoCamara == 4) this.vistaOrtograficaLateral();
        if(tipoCamara == 5) this.vistaOrtograficaSuperior();
    }

    orbitalCamara(){
        //Paso la matriz de vista al shader
        var ubicacion_ViewMatrix = gl.getUniformLocation(glProgram, "uViewMatrix");
        var viewMatrix = mat4.create();
     
        var x = radio * Math.cos(alfa) ;
        var y = radio * Math.sin(alfa);
        var z = radio * Math.sin(alfa) * Math.sin(beta)  ;

        if(z < 0.25)  z = 0.25 ;

        mat4.lookAt(viewMatrix, [x, y, z], [0, 0, 0], [0,0,1]);

        gl.uniformMatrix4fv(ubicacion_ViewMatrix, false, viewMatrix);
    }

    orbitalCentroEscena(){

        //Paso la matriz de vista al shader
        var ubicacion_ViewMatrix = gl.getUniformLocation(glProgram, "uViewMatrix");
        var viewMatrix = mat4.create();
     
        var x = radio * Math.cos(alfa)+3 ;
        var y = radio * Math.sin(alfa)-5;
        var z = radio ;

        mat4.lookAt(viewMatrix, [x, y, z], [3,-5,0], [0,0,1]);

        gl.uniformMatrix4fv(ubicacion_ViewMatrix, false, viewMatrix);
    }

    orbitalCentroTortaEstacion1(){

        //Paso la matriz de vista al shader
        var ubicacion_ViewMatrix = gl.getUniformLocation(glProgram, "uViewMatrix");
        var viewMatrix = mat4.create();
     
        var x = 2 * Math.cos(alfa);
        var y = 2 * Math.sin(alfa) - 5;
        var z = 4 ;

        mat4.lookAt(viewMatrix, [x, y, z], [0,-5,2], [0,0,1]);

        gl.uniformMatrix4fv(ubicacion_ViewMatrix, false, viewMatrix);
    }

    orbitalCentroTortaEstacion2(){

        //Paso la matriz de vista al shader
        var ubicacion_ViewMatrix = gl.getUniformLocation(glProgram, "uViewMatrix");
        var viewMatrix = mat4.create();
     
        var x = 2 * Math.cos(alfa) - 4;
        var y = 2 * Math.sin(alfa) - 5;
        var z = 4   ;

        mat4.lookAt(viewMatrix, [x, y, z], [-4,-5,2], [0,0,1]);

        gl.uniformMatrix4fv(ubicacion_ViewMatrix, false, viewMatrix);
    }

    vistaOrtograficaLateral(){
        //Paso la matriz de vista al shader
        var ubicacion_ViewMatrix = gl.getUniformLocation(glProgram, "uViewMatrix");
        var viewMatrix = mat4.create();

        mat4.lookAt(viewMatrix, [-2, -12, 3], [-2,-5,3], [0,0,1]);

        gl.uniformMatrix4fv(ubicacion_ViewMatrix, false, viewMatrix);
    }

    vistaOrtograficaSuperior(){
        //Paso la matriz de vista al shader
        var ubicacion_ViewMatrix = gl.getUniformLocation(glProgram, "uViewMatrix");
        var viewMatrix = mat4.create();

        mat4.lookAt(viewMatrix, [-2, -6, 9], [-2,-5,3], [0,0,1]);

        gl.uniformMatrix4fv(ubicacion_ViewMatrix, false, viewMatrix);
    }
}