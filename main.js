            
//Declaro variables globales
          var gl = null,
          canvas = null,
       glProgram = null,
  fragmentShader = null,
    vertexShader = null,
               t = 0.0;
	     my_grid = null,
		triangulo_1 = null;
        triangulo_2 = null;
        esfera = null;

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
         gl.clearColor(0.1, 0.1, 0.2, 1.0);     
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
         //CODIGO NUEVO            
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

        var triangulo = new TrianguloGeometria(gl);
       
        triangulo_1 = new Objeto3D(gl, triangulo);            
        triangulo_2 = new Objeto3D(gl, triangulo);
        triangulo_3 = new Objeto3D(gl, triangulo);

		triangulo_1.agregarHijo(triangulo_3);
		
		//Creo una esfera.
		var esferaGeometria = new Esfera(gl, 50, 50, 0.5);
		esfera = new Objeto3D(gl, esferaGeometria);
    }

         
//4-Dibujo
    function drawScene() {
        //basicamente aca defino matrices y les digo a los objetos creados que se dibujen pasandoles la matriz
        
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
        var u_proj_matrix = gl.getUniformLocation(glProgram, "uPMatrix");
        gl.uniformMatrix4fv(u_proj_matrix, false, pMatrix);
               
        //Preparar la matriz de proyeccion
        //Preparamos una matriz de perspectiva.
        mat4.perspective(pMatrix, 45, 640.0/480.0, 0.1, 100.0);

        //Triangulo_1 Configuro la matriz 
        var triangulo_1Matriz = mat4.create();
		mat4.identity(triangulo_1Matriz);
		mat4.translate(triangulo_1Matriz, triangulo_1Matriz, [0.0, 1.0, -5.0]);
        mat4.rotate(triangulo_1Matriz, triangulo_1Matriz, 0.01, [0.0, 1.0, 0.0]);
        triangulo_1.setMatriz(triangulo_1Matriz);
    
         //Triangulo_3 Configuro la matriz sabiendo que triangulo_1 es padre
        var triangulo_3Matriz = mat4.create();
		mat4.identity(triangulo_3Matriz);
		mat4.translate(triangulo_3Matriz, triangulo_3Matriz, [1.1, 0, -5.0]);
        mat4.rotate(triangulo_3Matriz, triangulo_3Matriz, 0.01, [0.0, 1.0, 0.0]);
        mat4.multiply(triangulo_3Matriz,triangulo_3Matriz, triangulo_1Matriz );
        triangulo_3.setMatriz(triangulo_3Matriz);

        //dibuja el 1 y el 3 como hijo 
        triangulo_1.dibujar();

        //Triangulo_2 Configuro la matriz y dibujo
        var triangulo_2Matriz = mat4.create();
		mat4.identity(triangulo_2Matriz);
		mat4.translate(triangulo_2Matriz, triangulo_2Matriz, [-0.6, 0, -5.0]);
        mat4.rotate(triangulo_2Matriz, triangulo_2Matriz, 0.01, [0.0, 1.0, 0.0]);
        triangulo_2.setMatriz(triangulo_2Matriz);
        triangulo_2.dibujar();
        
        //Dibujo esfera.
        var esferaMatriz = mat4.create();
		mat4.identity(esferaMatriz);
		mat4.translate(esferaMatriz, esferaMatriz, [0.0, 0.0, -5.0]);
		mat4.rotate(esferaMatriz, esferaMatriz, t, [0.0, 1.0, 0.0]);
        esfera.setMatriz(esferaMatriz);
        esfera.dibujar();
        
        t = t + 0.01;
		
    }


