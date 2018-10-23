class Maquina_B{

    constructor(){
        this.brazoPos = -1.5;
        this.cond = true;

        //Geometrias
        var rectangulo1 = new Rectangulo(gl,0.5,0.5,1.5,[58.8/100,32.9/100,82.4/100]);
        var rectangulo2 = new Rectangulo(gl,0.5,0.2,3.5,[73.7/100,28.2/100,81.2/100]);
        var rectangulo3 = new Rectangulo(gl,0.5,0.2,2,[89.0/100,65.9/100,43.1/100]);
        var rectangulo4 = new Rectangulo(gl,0.3,0.08,0.5,[32.5/100,58.4/100,82.0/100]);
        var rectangulo5 = new Rectangulo(gl,0.3,0.05,0.2,[74.1/100,87.8/100,85.5/100]);
        var cilindro = new Cilindro(gl,0.08,1,[74.1/100,87.8/100,85.5/100],2*Math.PI);
       
        //Creo objetos
        this.maquinaB = new NodoContenedor();
            this.caja1 = new Objeto3D(rectangulo1);
            this.caja2 = new Objeto3D(rectangulo2);
            this.caja3 = new Objeto3D(rectangulo3);
            this.maquinaC = new NodoContenedor();
                 this.tubo = new Objeto3D(cilindro);
                 this.caja4 = new Objeto3D(rectangulo4);
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
            
        //Configuro posiciones
        this.configurarEscena();
        
    }

    configurarEscena(){

      this.caja2.trasladar([0,0.3,0]);
        
        
      this.caja3.trasladar([0,0.2,3]);
      this.caja3.rotar(1.55,[1,0,0]);
     
      this.maquinaB.trasladar([0.3  ,-3.5,0]);  
 
      this.maquinaC.rotar(1.5,[0,0,1]); 
      this.maquinaC.trasladar([0,this.brazoPos,2.1]); 
        this.caja4.rotar(1.55,[1,0,0]);
        this.caja4.trasladar([0,0.25,0]);
        this.caja5.trasladar([0,0.1,-0.18]);
        this.caja6.trasladar([0,-0.1,-0.18]);

    }

    

    manzanas(){
        var cilindro = new Cilindro(gl,0.6,0.08,[63.1/100,76.9/100,50.2/100],Math.PI);
        var manzana = new Objeto3D(cilindro);
        
        manzana.escalar([0.2,0.2,0.2]);
        manzana.rotar(1.5,[1,0,0]);
        manzana.trasladar([0,-0.32,1.6]);

        this.caja2.agregarHijo(manzana);
    }

    cerezas(){
        var esfera = new Esfera(gl,40,40,0.1);
        var cereza = new Objeto3D(esfera);
        
        cereza.trasladar([0,-0.32,1.6]);

        this.caja2.agregarHijo(cereza);
    }

    copos(){
        var copo = new Copito(gl);
        var copito = new Objeto3D(copo);
        
        copito.escalar([0.1,0.1,0.1]);
        copito.trasladar([0,-0.32,1.5]);

        this.caja2.agregarHijo(copito);
    }

    dibujar(){
      this.maquinaB.dibujar();     
    }

    moverBrazo(){
        if( this.brazoPos > 0 ){ this.cond = false  }  
        if( this.brazoPos < -1.5 ){ this.cond = true  }  

        if(this.cond){   
            this.brazoPos+= 0.01;
        } 
        else {
            this.brazoPos-= 0.01;
        }

        this.maquinaC.trasladar([0,this.brazoPos,2.1]);
    }

    clean(){
        this.caja2.borrarHijos();
    }
}