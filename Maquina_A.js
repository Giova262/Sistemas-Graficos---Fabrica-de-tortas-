class Maquina_A{

    constructor(){

        //Geometrias
        var rectangulo1 = new Rectangulo(gl,2,2,3.5,[0.2,0.2,0.85]);
        var rectangulo2 = new Rectangulo(gl,10,2,0.25,[0.2,0.2,0.51]);
        var rectangulo3 = new Rectangulo(gl,0.2,0.2,1,[0,1,0]);
  
        //Creo objetos
        this.maquinaA = new NodoContenedor();
        this.caja1 = new Objeto3D(rectangulo1);
        this.caja2 = new Objeto3D(rectangulo2);
            //patas
            this.caja3 = new Objeto3D(rectangulo3);
            this.caja4 = new Objeto3D(rectangulo3);
            this.caja5 = new Objeto3D(rectangulo3);
            this.caja6 = new Objeto3D(rectangulo3);
            this.caja7 = new Objeto3D(rectangulo3);
            this.caja8 = new Objeto3D(rectangulo3);

        //Agrego hijos a algun objeto
        this.maquinaA.agregarHijo(this.caja1);
        this.maquinaA.agregarHijo(this.caja2);
            this.caja2.agregarHijo(this.caja3);
            this.caja2.agregarHijo(this.caja4);
            this.caja2.agregarHijo(this.caja5);
            this.caja2.agregarHijo(this.caja6);
            this.caja2.agregarHijo(this.caja7);
            this.caja2.agregarHijo(this.caja8);

        //Configuro posiciones
        this.configurarEscena();
        
    }

    configurarEscena(){

      this.caja2.trasladar([-6,0,1]);

      this.caja3.trasladar([-3.5,0,-1]);
      this.caja4.trasladar([-2,0,-1]);
      this.caja5.trasladar([-0.5,0,-1]);
      this.caja6.trasladar([1,0,-1]);
      this.caja7.trasladar([2.5,0,-1]);
      this.caja8.trasladar([4,0,-1]);
      
      this.maquinaA.trasladar([3,-5,0]);
      this.maquinaA.rotar(0,[0,0,1]);
    }

    dibujar(){
      this.maquinaA.dibujar();
      
    }
}