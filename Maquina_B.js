class Maquina_B{

    constructor(){

        //Geometrias
        var rectangulo1 = new Rectangulo(gl,0.5,0.5,1.5,[0.2,0.2,0.85]);
        var rectangulo2 = new Rectangulo(gl,0.5,0.2,3.5,[0.2,0.2,0.51]);
        var rectangulo3 = new Rectangulo(gl,0.5,0.2,2,[0,1,0]);
        var rectangulo4 = new Rectangulo(gl,0.3,0.08,0.5,[0,1,0]);
        var rectangulo5 = new Rectangulo(gl,0.3,0.05,0.2,[0,1,0]);
        var cilindro = new Cilindro(gl,0.08,1,[0.6,1.0,0.2]);
        var esfera = new Esfera(gl,40,40,0.1);
       
        //Creo objetos
        this.maquinaB = new NodoContenedor();
            this.caja1 = new Objeto3D(rectangulo1);
            this.caja2 = new Objeto3D(rectangulo2);
                 this.cereza = new Objeto3D(esfera);
            this.caja3 = new Objeto3D(rectangulo3);
            this.maquinaC = new NodoContenedor();
                 this.tubo = new Objeto3D(cilindro);
                 this.caja4 = new Objeto3D(rectangulo4);
                 this.caja5 = new Objeto3D(rectangulo5);
                 this.caja6 = new Objeto3D(rectangulo5);

        //Agrego hijos a algun objeto
        this.maquinaB.agregarHijo(this.caja1);
        this.maquinaB.agregarHijo(this.caja2);
            this.caja2.agregarHijo(this.cereza);
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
        this.cereza.trasladar([0,-0.32,1.6]);
        
      this.caja3.trasladar([0,0.2,3]);
      this.caja3.rotar(1.55,[1,0,0]);
     
      this.maquinaB.trasladar([0.3  ,-3.5,0]);  
 
      this.maquinaC.rotar(1.5,[0,0,1]); 
      this.maquinaC.trasladar([0,-1.5,2.1]); 
        this.caja4.rotar(1.55,[1,0,0]);
        this.caja4.trasladar([0,0.25,0]);
        this.caja5.trasladar([0,0.1,-0.18]);
        this.caja6.trasladar([0,-0.1,-0.18]);

    }

    dibujar(){
      this.maquinaB.dibujar();     
    }
}