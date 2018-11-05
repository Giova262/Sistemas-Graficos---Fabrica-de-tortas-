//Variables globales
var           gl = null,
          canvas = null,
       glProgram = null,
  fragmentShader = null,
    vertexShader = null,
        maquina_a = null;
        maquina_b = null;
        maquina_d = null;
       superficie = null;

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
        maquina_a = new Maquina_A();   
        maquina_b = new Maquina_B();
        maquina_d = new Maquina_D();      
    }

//Dibujo la escena
    function drawScene() {
        
       gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

       //Perspectiva.
       var u_proj_matrix = gl.getUniformLocation(glProgram, "uPMatrix");
       mat4.perspective(pMatrix, 45,1200/800, 1, 2000.0);
       gl.uniformMatrix4fv(u_proj_matrix, false, pMatrix);
       
       //Acciones
       if( maquina_a.moverFase1() ){
           
           if( maquina_b.colocarDecoraciones() ){
               console.log("Termine de colocar cosas en la etapa 1");
           }
       }

       //Vista
       camara.eventHandlerView();
       camara.update();

       //Dibujo Objetos
       superficie.dibujar();
       maquina_a.dibujar();
       maquina_b.dibujar();
       maquina_d.dibujar();

       //Time
        t = t + 0.01;	
    }


