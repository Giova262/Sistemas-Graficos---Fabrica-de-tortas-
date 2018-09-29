var gl = null,
                canvas = null,
                glProgram = null,
                fragmentShader = null,
                vertexShader = null,
                t = 0.0;
				my_grid = null,
				objeto3D = null;
				objeto3DHijo = null;

            var mvMatrix = mat4.create();
            var pMatrix = mat4.create();

              // SHADERS FUNCTION
              function getShader(gl, id) {
                var shaderScript, src, currentChild, shader;

                // Obtenemos el elemento <script> que contiene el c�digo fuente del shader.
                shaderScript = document.getElementById(id);
                if (!shaderScript) {
                    return null;
                }

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
                } else {
                    return null;
                }

                // Le decimos a WebGL que vamos a usar el texto como fuente para el shader.
                gl.shaderSource(shader, src);

                // Compilamos el shader.
                gl.compileShader(shader);  
                  
                // Chequeamos y reportamos si hubo alg�n error.
                if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {  
                  alert("An error occurred compiling the shaders: " + 
                        gl.getShaderInfoLog(shader));  
                  return null;  
                }
                  
                return shader;
            }

            function initWebGL()
            {
                canvas = document.getElementById("my-canvas");  
                try{
                    gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");                    
                }catch(e){
                }
                                
                if(gl)
                {
                    setupWebGL();
                    initShaders();
                    setupBuffers();
                    setInterval(drawScene, 10);  
                }else{    
                    alert(  "Error: Your browser does not appear to support WebGL.");
                }
            }
            
            function setupWebGL()
            {
                //set the clear color
                gl.clearColor(0.1, 0.1, 0.2, 1.0);     
                gl.enable(gl.DEPTH_TEST);                              
                gl.depthFunc(gl.LEQUAL); 
                gl.clear(gl.COLOR_BUFFER_BIT|gl.DEPTH_BUFFER_BIT);
                
                gl.viewport(0, 0, canvas.width, canvas.height);
            }
            
            function initShaders()
            {
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
                  alert("Unable to initialize the shader program: " + 
                        gl.getProgramInfoLog(glProgram));
                  return null;
                }
  
                // Le decimos a WebGL que de aqu� en adelante use el programa generado.
                gl.useProgram(glProgram);
            }
            
            function makeShader(src, type)
            {
                //compile the vertex shader
                var shader = gl.createShader(type);
                gl.shaderSource(shader, src);
                gl.compileShader(shader);

                if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
                    alert("Error compiling shader: " + gl.getShaderInfoLog(shader));
                }
                return shader;
            }
            
            function setupBuffers()
            {
            	var geometria = new TrianguloGeometria(gl);
            	var posicion = [0.0, 0.0, -5.0];
                objeto3D = new Objeto3D(gl, geometria, posicion);
                
                objeto3DHijo = new Objeto3D(gl, geometria, [1.5, 0.0, 0.0]);
				objeto3D.agregarHijo(objeto3DHijo);
            }
            
            function drawScene()
            {
                gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
                var u_proj_matrix = gl.getUniformLocation(glProgram, "uPMatrix");
                // Preparamos una matriz de perspectiva.
                mat4.perspective(pMatrix, 45, 640.0/480.0, 0.1, 100.0);
                gl.uniformMatrix4fv(u_proj_matrix, false, pMatrix);
                
                objeto3D.rotarY(0.01);
                objeto3DHijo.rotarY(0.01);
                objeto3D.dibujar();
            }
