class Maquina_B{

    constructor(){

        //Variables utiles
        this.brazoPos = -1.5;
        this.brazoPosZ = 2.63;
        this.brazoEscZ = 1;
        this.cond = 0;
        this.cond2 = true;
        this.cond3 = true;
        this.cantidadDecoraciones = 0;
        this.decoracion = null ;
        this.tortaRadio = null;
        this.tortaAltura= null;

        //Geometrias
        var rectangulo1 = new Rectangulo(gl,1.4,0.5,1.5,[58.8/100,32.9/100,82.4/100]);
        var rectangulo2 = new Rectangulo(gl,1.4,0.2,3.5,[73.7/100,28.2/100,81.2/100]);
        var rectangulo3 = new Rectangulo(gl,1.4,0.255,2,[89.0/100,65.9/100,43.1/100]);
        var rectangulo4 = new Rectangulo(gl,0.3,0.08,0.5,[32.5/100,58.4/100,82.0/100]);
        var rectangulo5 = new Rectangulo(gl,0.3,0.05,0.2,[74.1/100,87.8/100,85.5/100]);
        var cilindro = new Cilindro(gl,0.08,0.5,[74.1/100,87.8/100,85.5/100],2*Math.PI);
       
        //Creo objetos
        this.maquinaB = new NodoContenedor();
            this.caja1 = new Objeto3D(rectangulo1);
            this.caja2 = new Objeto3D(rectangulo2);
            this.caja3 = new Objeto3D(rectangulo3);
            this.maquinaC = new NodoContenedor();
                 this.tubo = new Objeto3D(cilindro);
                 this.caja4 = new Objeto3D(rectangulo4);
                 this.decoracionTemporal = new NodoContenedor();
                 this.caja5 = new Objeto3D(rectangulo5);
                 this.caja6 = new Objeto3D(rectangulo5);             

        //Agrego hijos a algun objeto
        this.maquinaB.agregarHijo(this.caja1);
        this.maquinaB.agregarHijo(this.caja2);
        this.maquinaB.agregarHijo(this.caja3);
        this.maquinaB.agregarHijo(this.maquinaC);
            this.maquinaC.agregarHijo(this.tubo);
            this.maquinaC.agregarHijo(this.caja4);
            this.maquinaC.agregarHijo(this.caja5);
            this.maquinaC.agregarHijo(this.caja6);
            this.maquinaC.agregarHijo(this.decoracionTemporal);
            
        //Configuro posiciones
        this.configurarEscena();
        
    }

    configurarEscena(){

      this.caja2.trasladar([0,0.3,0]);
               
      this.caja3.trasladar([0,0.2,3]);
      this.caja3.rotar(1.55,[1,0,0]);
     
      this.maquinaB.trasladar([0.3  ,-3.5,0]);  

      this.decoracionTemporal.trasladar([0,0.32,-1.75]);
 
      this.maquinaC.rotar(1.5,[0,0,1]); 
      this.maquinaC.trasladar([0,this.brazoPos,this.brazoPosZ]); 
        this.caja4.rotar(1.55,[1,0,0]);
        this.caja4.trasladar([0,0.25,0]);
        this.caja5.trasladar([0,0.1,-0.18]);
        this.caja6.trasladar([0,-0.1,-0.18]);

    }

    setCantidadDeDecoraciones(cantidad){
        this.cantidadDecoraciones = cantidad;
    }

    manzanas(){
        var cilindro = new Cilindro(gl,0.6,0.08,[63.1/100,76.9/100,50.2/100],Math.PI);
        this.decoracion  = new Objeto3D(cilindro);
        
        this.decoracion.escalar([0.2,0.2,0.2]);
        this.decoracion.rotar(1.5,[1,0,0]);
        this.decoracion.trasladar([0,-0.32,1.6]);

        this.caja2.agregarHijo(this.decoracion );
    }

    cerezas(){
        var esfera = new Esfera(gl,40,40,0.1);
        this.decoracion = new Objeto3D(esfera);
        
        this.decoracion.trasladar([0,-0.32,1.6]);

        this.caja2.agregarHijo(this.decoracion );
    }

    copos(){
        var copo = new Copito(gl);
        this.decoracion  = new Objeto3D(copo);
        
        this.decoracion.escalar([0.2,0.2,0.2]);
        this.decoracion.trasladar([0,-0.32,1.5]);

        this.caja2.agregarHijo(this.decoracion );
    }

    colocarDecoraciones(){
  
        //Con esto controlo la cantidad de etapas/ciclos
        if( this.cantidadDecoraciones == 0 ){
            return true;
        }
        this.moverBrazo();
        return false;
    }

    dibujar(){
      this.maquinaB.dibujar();     
    }

    moverBrazo(){

        //Llega al fondo
        if( this.brazoPos > 0 ){
       
            if( this.agarrarDecoracion() ){
                this.cond = 2; 
            } else  this.cond = 1 ;

         }  

        //Llega al extremo 
        if( this.brazoPos < -1.5 ){ 

            if( this.soltarDecoracion() ){
                this.cond = 2; 
            } else  this.cond = 0 ;
 
        }  

        //Movimiento para un lado u otro  
        if(this.cond == 0){   
            this.brazoPos+= 0.01;
        } 
        else if(this.cond == 1){
            this.brazoPos-= 0.01;
        }

        this.maquinaC.trasladar([0,this.brazoPos,this.brazoPosZ]);
    }

    agarrarDecoracion(){
       
        if(this.brazoEscZ > 2.7 ) {
         
            this.brazoEscZ =2.7;   
            this.brazoPosZ -=0.005;
             
            this.cond2 = false;
        }

        if(this.brazoEscZ < 1.0 ) {
           this.cond2 = true;
           this.brazoEscZ = 1.0;
          this.brazoPosZ +=0.005;
           return false;
        }


        if(this.cond2 ){ 
            this.brazoEscZ +=0.01;   
            this.brazoPosZ-=0.005;
            this.tubo.escalar([1,1,this.brazoEscZ]);
        } 
        else {

            //Aca tengo q poner la decoracion en el brazo
            this.decoracionTemporal.agregarHijo(this.decoracion);

            this.brazoEscZ -=0.01;   
            this.brazoPosZ+=0.005;
            this.tubo.escalar([1,1,this.brazoEscZ]);
        }
        
        return true;
        
    }

    soltarDecoracion(){

        if(this.brazoEscZ > ((-1.75*this.tortaAltura)+3.275 ) ) {
           
            //Aca pasar la decoracion a la torta
            this.decoracionTemporal.borrarHijos(this.decoracion);
            //Llamar metodo para agregar decoraciones
            maquina_a.agregarDecoracion();
          

            this.brazoEscZ =((-1.75*this.tortaAltura)+3.275 );   
            this.brazoPosZ -=0.005;
             
            this.cond3 = false;
        }

        if(this.brazoEscZ < 1.0 ) {
           
           this.brazoEscZ = 1.0;
           this.brazoPosZ +=0.005;

           this.cantidadDecoraciones-= 1;

           this.cond3 = true;
           return false;
        }


        if(this.cond3 ){   
            this.brazoEscZ +=0.01;   
            this.brazoPosZ-=0.005;
            this.tubo.escalar([1,1,this.brazoEscZ]);
        } 
        else {
            this.brazoEscZ -=0.01;   
            this.brazoPosZ+=0.005;
            this.tubo.escalar([1,1,this.brazoEscZ]);
        }
        
        return true;
    }

    setTortaParametros(radio,altura){
        this.tortaRadio = radio;
        this.tortaAltura= altura;
    }

    clean(){
        this.caja2.borrarHijos();
        this.cond = 0;
        this.cond2 = true;
        this.cond3 = true;
    }
}