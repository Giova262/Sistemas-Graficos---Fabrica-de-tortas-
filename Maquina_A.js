class Maquina_A{

    constructor(){

        //Geometrias
        var rectangulo1 = new Rectangulo(gl,2,2,3.5,[0.2,0.2,0.85]);
        var rectangulo2 = new Rectangulo(gl,10,2,0.25,[0.2,0.2,0.51]);
        var rectangulo3 = new Rectangulo(gl,0.2,0.2,1,[0,1,0]);
        var cilindro = new Cilindro(gl,0.6,0.08,[1.0,1.0,1.0]);
        var masa = new Masa(gl,0.5,0.5,3, 0.1);
        var cremaGeometria = new Crema(gl, 40, 0.45, 2, 0.04);
        
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
                //Aca crearia las tortas
                this.torta1 = new NodoContenedor();
                    this.masa1 = new Objeto3D( masa); 
                         this.crema1 = new Objeto3D(cremaGeometria);
                    this.plato1 = new Objeto3D(cilindro);
                this.torta2 = new NodoContenedor();
                    this.masa2 = new Objeto3D( masa); 
                         this.crema2 = new Objeto3D(cremaGeometria);
                    this.plato2 = new Objeto3D(cilindro);
               

        //Agrego hijos a algun objeto
        this.maquinaA.agregarHijo(this.caja1);
        this.maquinaA.agregarHijo(this.caja2);
            this.caja2.agregarHijo(this.caja3);
            this.caja2.agregarHijo(this.caja4);
            this.caja2.agregarHijo(this.caja5);
            this.caja2.agregarHijo(this.caja6);
            this.caja2.agregarHijo(this.caja7);
            this.caja2.agregarHijo(this.caja8);
            
            this.caja2.agregarHijo(this.torta1);
                this.torta1.agregarHijo(this.masa1);
                        this.masa1.agregarHijo(this.crema1);
                this.torta1.agregarHijo(this.plato1);

            this.caja2.agregarHijo(this.torta2);
                 this.torta2.agregarHijo(this.masa2);
                        this.masa2.agregarHijo(this.crema2);
                 this.torta2.agregarHijo(this.plato2);

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

      this.torta1.trasladar([-1,0,0.3]);
      this.torta2.trasladar([3,0,0.3]);

      this.crema1.trasladar([0,0,0.5]);
      this.crema2.trasladar([0,0,0.5]);
    }

    tortaDeCereza(cantidad){
        var alfaPaso = 360 / cantidad ;
        var alfa = 0.0   ;

       /* for(var i = 0 ; i < cantidad ; i++ ){
            console.log(alfa);
            var cereza = this.crearCereza();
            cereza.trasladar([0.3*Math.cos(alfa*(180/(Math.PI))),0.3*Math.sin(alfa*(180/(Math.PI))),0.5]);
            alfa = alfa + alfaPaso ;
            this.masa1.agregarHijo(cereza);
            
        }*/
        for(var i = 0 ; i < cantidad ; i++ ){
            console.log(alfa);
            var cereza = this.crearCereza();
            cereza.trasladar([0.3*Math.cos(alfa*((Math.PI)/180)),0.3*Math.sin(alfa*((Math.PI)/180)),0.5]);
            alfa = alfa + alfaPaso ;
            this.masa1.agregarHijo(cereza);
            
        }
    }

    crearCereza(){
        var esfera = new Esfera(gl,40,40,0.05);
        var  cerezaTemp= new Objeto3D(esfera);
        return cerezaTemp ;
    }

    dibujar(){
      this.maquinaA.dibujar();
      
    }
}