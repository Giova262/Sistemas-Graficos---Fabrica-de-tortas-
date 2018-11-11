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
       test_objeto = null;

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
        //var cubo_geometria = new Rectangulo(gl, 1.0, 1.0, 1.0, [1.0, 0.0, 0.0]);
		//this.test_objeto = new Objeto3D(cubo_geometria);
		
		//var esfera_geometria = new Esfera(gl, 50, 50, 1.0);
		//this.test_objeto = new Objeto3D(esfera_geometria);
		
		var copito_geometria = new Copito(gl);
		this.test_objeto = new Objeto3D(copito_geometria);
		
		test_objeto.trasladar([0.0,0.0,-10.0]);
        test_objeto.rotar(t, [1.0, 0.0, 0.0]);
        	
        
        //superficie  = new Superficie();
        //maquina_a = new Maquina_A();   
        //maquina_b = new Maquina_B();
        //maquina_d = new Maquina_D();      
    }

//Dibujo la escena
    function drawScene() {
        
       gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

       //Perspectiva.
       var u_proj_matrix = gl.getUniformLocation(glProgram, "uPMatrix");
       mat4.perspective(pMatrix, 45,1200/800, 1, 2000.0);
       gl.uniformMatrix4fv(u_proj_matrix, false, pMatrix);
       
       //Acciones
       //maquina_b.moverBrazo();
       //maquina_d.moverBrazo();

       //Vista
       camara.eventHandlerView();
       camara.update();

       //Dibujo Objetos
       /*superficie.dibujar();
       maquina_a.dibujar();
       maquina_b.dibujar();
       maquina_d.dibujar();*/
       
       this.test_objeto.dibujar();

       //Time
        t = t + 0.01;	
    }


