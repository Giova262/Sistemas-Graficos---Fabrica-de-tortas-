            
//Declaro variables globales
          var gl = null,
          canvas = null,
       glProgram = null,
  fragmentShader = null,
    vertexShader = null,
               t = 0.0;
	     my_grid = null,
          esfera = null;
           cajon = null;

 var mvMatrix = mat4.create();
 var pMatrix = mat4.create();

//1-Inicio
    function initWebGL()  {
        canvas = document.getElementById("my-canvas");        
        initGL(canvas);
        setupWebGL();
        initShaders();
        AddObjectScene();     
        setInterval(drawScene, 10);           
     }

     function initGL(canvas) {
         try {
             gl = canvas.getContext("experimental-webgl");           
         } catch (e) {}

         if (!gl)  alert("Could not initialise WebGL, sorry :-(");          
     }

     function setupWebGL()  {
         gl.clearColor(1.0, 1.0, 1.0, 1.0);     
         gl.enable(gl.DEPTH_TEST);                              
         gl.depthFunc(gl.LEQUAL); 
         gl.clear(gl.COLOR_BUFFER_BIT|gl.DEPTH_BUFFER_BIT);    
         gl.viewport(0, 0, canvas.width, canvas.height);
     }

//2-Configuro los shaders

     function initShaders() {
         // Obtenemos los shaders ya compilados
        var fragmentShader = getShader(gl, "shader-fs");
        var vertexShader = getShader(gl, "shader-vs");

         // Creamos un programa de shaders de WebGL.
         glProgram = gl.createProgram();

        // Asociamos cada shader compilado al programa.
         gl.attachShader(glProgram, vertexShader);
         gl.attachShader(glProgram, fragmentShader);

         // Linkeamos los shaders para generar el programa ejecutable.
         gl.linkProgram(glProgram);

        // Chequeamos y reportamos si hubo alg�n error.
         if (!gl.getProgramParameter(glProgram, gl.LINK_STATUS)) {
             alert("No se pudo inicializar los shaders: " + 
             gl.getProgramInfoLog(glProgram));
             return null;
         }
         gl.useProgram(glProgram);
                 
    }


    function getShader(gl, id) {
        var shaderScript, src, currentChild, shader;

        // Obtenemos el elemento <script> que contiene el c�digo fuente del shader.
        shaderScript = document.getElementById(id);
        if (!shaderScript)  return null;
                
        // Extraemos el contenido de texto del <script>.
        src = "";
        currentChild = shaderScript.firstChild;
        while(currentChild) {
            if (currentChild.nodeType == currentChild.TEXT_NODE) {
                src += currentChild.textContent;
             }
             currentChild = currentChild.nextSibling;
        }
        // Creamos un shader WebGL seg�n el atributo type del <script>.
         if (shaderScript.type == "x-shader/x-fragment") {
                shader = gl.createShader(gl.FRAGMENT_SHADER);
         } else if (shaderScript.type == "x-shader/x-vertex") {
                shader = gl.createShader(gl.VERTEX_SHADER);
         } else  return null;
         
        // Le decimos a WebGL que vamos a usar el texto como fuente para el shader.
        gl.shaderSource(shader, src);

        // Compilamos el shader.
         gl.compileShader(shader);  
                  
        // Chequeamos y reportamos si hubo alg�n error.
         if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {  
             alert("Ocurrio un error al compilar el shader: " + gl.getShaderInfoLog(shader));  
             return null;  
         }               
         return shader;
    }
                  
//3- Agregar objetos a la escena (cada objeto tiene su initBuffer)
    function AddObjectScene(){
        //Declaro Geometrias
        var esferaGeometria = new Esfera(gl, 50, 50, 0.1);
        var grilla = new Plano(gl,40,40);
        var rectangulo = new Rectangulo(gl,0.3,1,1,[0.50,0.2,0.65]);
        
        //Creo objetos
        esfera = new Objeto3D(gl, esferaGeometria);
        my_grid = new Objeto3D(gl,grilla);
        cajon = new Objeto3D(gl,rectangulo);

        //Agrego hijos a algun objeto
		cajon.agregarHijo(esfera);
    }

         
//4-Dibujo
    function drawScene() {
        //basicamente aca defino matrices y les digo a los objetos creados que se dibujen pasandoles la matriz
        
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
        var u_proj_matrix = gl.getUniformLocation(glProgram, "uPMatrix");
        gl.uniformMatrix4fv(u_proj_matrix, false, pMatrix);
               
        //Preparar la matriz de proyeccion
        //Preparamos una matriz de perspectiva.
        mat4.perspective(pMatrix, 45, 640.0/480.0, 0.1, 50.0);

        //Dibujo plano
       var grillaMatriz = mat4.create();
        mat4.identity(grillaMatriz);
        mat4.translate(grillaMatriz, grillaMatriz, [0.0, 0.0, -5.0]);
		mat4.rotate(grillaMatriz, grillaMatriz,5.2, [1.0, 0.0, 0.0]);
        my_grid.setMatriz(grillaMatriz);
        my_grid.dibujar();

       //Configuro matriz del cajon
       var cajonMatriz = mat4.create();
       mat4.identity(cajonMatriz);
       mat4.translate(cajonMatriz, cajonMatriz, [-1.0, 0.0, -3.0]);
       mat4.rotate(cajonMatriz, cajonMatriz,5.2, [1.0, 0.0, 0.0]);
       cajon.setMatriz(cajonMatriz);
       //Configuro matriz de la esfera
       var esferaMatriz = mat4.create();
	   mat4.identity(esferaMatriz);
       mat4.multiply(esferaMatriz,esferaMatriz, cajonMatriz );
       mat4.translate(esferaMatriz, esferaMatriz, [0.0,0.3,0.58]);
       esfera.setMatriz(esferaMatriz);

       //Dibujo Cajon  
       cajon.dibujar();
        
        t = t + 0.01;	
    }


