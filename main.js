            
//Declaro variables globales
          var gl = null,
          canvas = null,
       glProgram = null,
  fragmentShader = null,
    vertexShader = null,
               t = 0.0;
         maquina = null;
       superficie= null;

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
                  
//3- Agregamos objetos a la escena
    function AddObjectScene(){
        
        superficie  = new Superficie();
        maquina = new Maquina();
        
    }

         
//4-Dibujo la escena
    function drawScene() {
        
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
        var u_proj_matrix = gl.getUniformLocation(glProgram, "uPMatrix");
        gl.uniformMatrix4fv(u_proj_matrix, false, pMatrix);
               
        //Preparamos una matriz de perspectiva.
        mat4.perspective(pMatrix, 45, 640.0/480.0, 0.1, 50.0);

       //Dibujo Objetos
       superficie.dibujar();
       maquina.dibujar();


        t = t + 0.01;	
    }


