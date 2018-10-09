class Maquina_B{

    constructor(){

        //Geometrias
        var rectangulo1 = new Rectangulo(gl,0.5,0.5,1.5,[0.2,0.2,0.85]);
        var rectangulo2 = new Rectangulo(gl,0.5,0.2,3.5,[0.2,0.2,0.51]);
        var rectangulo3 = new Rectangulo(gl,0.5,0.2,2,[0,1,0]);
       
        //Creo objetos
        this.maquinaB = new NodoContenedor();
        this.caja1 = new Objeto3D(rectangulo1);
        this.caja2 = new Objeto3D(rectangulo2);
        this.caja3 = new Objeto3D(rectangulo3);

        this.maquinaC = new NodoContenedor();//Luego lo sigo falta superficie cilindrica
            
        //Agrego hijos a algun objeto
        this.maquinaB.agregarHijo(this.caja1);
        this.maquinaB.agregarHijo(this.caja2);
        this.maquinaB.agregarHijo(this.caja3);
            
        //Configuro posiciones
        this.configurarEscena();
        
    }

    configurarEscena(){

      this.caja2.trasladar([0,0.3,0]);
      this.caja3.trasladar([0,0.2,3]);
      this.caja3.rotar(1.55,[1,0,0]);
     
      this.maquinaB.trasladar([0,-3.5,0]);   
    }

    dibujar(){
      this.maquinaB.dibujar();     
    }
}