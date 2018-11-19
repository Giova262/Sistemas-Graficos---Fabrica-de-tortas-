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
        idInterval= null;
             fase = 1;
                t = 0.0; 

 var mvMatrix = mat4.create();
 var pMatrix = mat4.create();
 var normalMatrix = mat3.create();
  
//Inicio
    function initWebGL()  {    
        initGL();
        initShaders();
        SceneObject();     
        idInterval = setInterval(drawScene, 10);           
     }
              
//Agregamos objetos a la escena
    function SceneObject(){           
        camara = new Camara();
        //superficie  = new Superficie();

        var rectangulo1 = new Rectangulo(gl,2,2,3.5,[29.4/100,29.8/100,75.3/100]);
        this.masa = new Objeto3D( rectangulo1); 
       // maquina_a = new Maquina_A();   
       // maquina_b = new Maquina_B();
       // maquina_d = new Maquina_D();      
    }

//Dibujo la escena
    function drawScene() {
        
       gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

       /** Perspectiva */
       var u_proj_matrix = gl.getUniformLocation(glProgram, "uPMatrix");
       mat4.perspective(pMatrix, 45,1200/800, 1, 2000.0);
       gl.uniformMatrix4fv(u_proj_matrix, false, pMatrix);
       
       /** Acciones */
      /*  switch(fase){
            case 1 :{
                if( maquina_a.moverTorta(3.25) ) fase = 2 ;
                break;
            }
            case 2 :{
                if( maquina_b.colocarDecoraciones() ) fase = 3 ;
                break;
            }
            case 3 :{
                if( maquina_a.moverTorta(-1.0) ) fase = 4 ;
                break;
            }
            case 4 :{
                if( maquina_d.colocarContornos() ) fase = 5 ;
                break;
            }
            case 5 :{
                if( maquina_a.moverTorta(-4.0) ){
                    console.log("Torta Terminada") ;
                    fase = 6;
                } 
                break;
            }
            default: 
                break;
        }*/

       /**Iluminacion configuracion de localizacion e intensidad */

            /**Puntual 1 - Frente*/
       var u_light_position = gl.getUniformLocation(glProgram,"light_pos");
       gl.uniform3f(u_light_position, 0.0,-20.0,10.0);
       var u_light_intensidad = gl.getUniformLocation(glProgram,"intensidad");
       gl.uniform1f(u_light_intensidad,10.1);
            /**Puntual 2 - Atras derecha*/
        var u_light_position2 = gl.getUniformLocation(glProgram,"light2_pos");
        gl.uniform3f(u_light_position2, 20.0,20.0,10.0);
        var u_light_intensidad2 = gl.getUniformLocation(glProgram,"intensidad2");
        gl.uniform1f(u_light_intensidad2,0.1);    
            /**Puntual 3 - Atras Izquierda */
        var u_light_position3 = gl.getUniformLocation(glProgram,"light3_pos");
        gl.uniform3f(u_light_position3, -20.0,20.0,10.0);
        var u_light_intensidad3 = gl.getUniformLocation(glProgram,"intensidad3");
        gl.uniform1f(u_light_intensidad3,0.1);   

       /** Vista  */
       camara.eventHandlerView();
       camara.update();

       /** Dibujar */
       this.masa.dibujar();
       //superficie.dibujar();
      // maquina_a.dibujar();
      // maquina_b.dibujar();
      // maquina_d.dibujar();

       //Time
        t = t + 0.01;	
    }

