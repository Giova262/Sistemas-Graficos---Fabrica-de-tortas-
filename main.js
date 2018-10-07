//Variables globales
var           gl = null,
          canvas = null,
       glProgram = null,
  fragmentShader = null,
    vertexShader = null,
         maquina = null;
       superficie= null;
               t = 0.0; 

 var mvMatrix = mat4.create();
 var pMatrix = mat4.create();
 
//Inicio
    function initWebGL()  {    
        initGL();
        initShaders();
        SceneObject();     
        setInterval(drawScene, 10);           
     }
              
//Agregamos objetos a la escena
    function SceneObject(){   
        camara = new Camara();
        superficie  = new Superficie();
        maquina = new Maquina();   
    }
//Dibujo la escena
    function drawScene() {
        
       gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

       //Perspectiva.
       var u_proj_matrix = gl.getUniformLocation(glProgram, "uPMatrix");
       mat4.perspective(pMatrix, 45,1200/800, 1, 2000.0);
       gl.uniformMatrix4fv(u_proj_matrix, false, pMatrix);
       
       //Vista
       camara.eventHandlerView();
       camara.update();

       //Dibujo Objetos
       superficie.dibujar();
       maquina.dibujar();

       //Time
        t = t + 0.01;	
    }


