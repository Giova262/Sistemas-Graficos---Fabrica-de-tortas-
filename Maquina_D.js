class Maquina_D{

    constructor(){
        this.brazoPos = 1.5 ;
        this.cond = true ;

        //Geometrias
        var rectangulo1 = new Rectangulo(gl,0.74,0.7,2,[72.5/100,28.2/100,79.6/100]);
        var rectangulo2 = new Rectangulo(gl,0.1,0.2,0.8,[94.1/100,68.6/100,42.0/100]);
        var rectangulo3 = new Rectangulo(gl,0.3,0.5,0.05,[94.1/100,68.6/100,42.0/100]);
       
        //Creo objetos
        this.maquinaD = new NodoContenedor();
                this.caja1 = new Objeto3D(rectangulo1);
                this.maquinaE = new NodoContenedor();
                        this.caja2 = new Objeto3D(rectangulo2);
                        this.caja3 = new Objeto3D(rectangulo3);
            
        //Agrego hijos a algun objeto
        this.maquinaD.agregarHijo(this.caja1);
        this.maquinaD.agregarHijo(this.maquinaE);
                this.maquinaE.agregarHijo(this.caja2);
                this.maquinaE.agregarHijo(this.caja3);
            
        //Configuro posiciones
        this.configurarEscena();
        
    }

    configurarEscena(){
        this.caja2.trasladar([0,0,2]);
        this.caja3.trasladar([0,0.05 ,2.8]);

        this.maquinaE.trasladar([0,this.brazoPos,1.4]);
        this.maquinaE.escalar([0.8,0.8,0.8]);
        this.maquinaE.rotar(1.55,[1,0,0]);

        this.maquinaD.trasladar([-4,-3.4,0]);  
    }

    dibujar(){
      this.maquinaD.dibujar();     
    }

    moverBrazo(){
        if( this.brazoPos > 1.6 ){ this.cond = false  }  
        if( this.brazoPos < 1.3 ){ this.cond = true  }  

        if(this.cond){   
            this.brazoPos+= 0.01;
        } 
        else {
            this.brazoPos-= 0.01;
        }

        this.maquinaE.trasladar([0,this.brazoPos,1.4]);
    }
}