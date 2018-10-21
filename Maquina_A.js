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
                //Aca crearia las tortas
               this.torta1 = null;
                    this.masa1 = null; 
                         this.crema1 = null;   
                         this.decoraciones1 = null;
                         this.contornos1 = null;
                    this.plato1 = null;
                this.torta2 = null;
                    this.masa2 = null; 
                         this.crema2 = null;
                         this.decoraciones2 =null;
                         this.contornos2 = null;
                    this.plato2 = null;
               

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

    tortaDeCereza(cantidad){
        var alfaPaso = 360 / cantidad ;
        var alfa = 0.0   ;

        this.decoraciones1.borrarHijos();
        this.decoraciones2.borrarHijos();

        for(var i = 0 ; i < cantidad ; i++ ){
            console.log(alfa);
            var cereza = this.crearCereza();
            cereza.rotar(2 * Math.PI * i / cantidad + Math.PI / 2, [0, 0, 1]);
            cereza.trasladar([0.3*Math.cos(alfa*((Math.PI)/180)),0.3*Math.sin(alfa*((Math.PI)/180)),this.alturaTorta]);
            alfa = alfa + alfaPaso ;
            this.decoraciones1.agregarHijo(cereza);

            //para esta tiene q ser de a poco
            this.decoraciones2.agregarHijo(cereza);
            
        }
    }

    tortaDeCopitos(cantidad){
        var alfaPaso = 360 / cantidad ;
        var alfa = 0.0   ;

        this.decoraciones1.borrarHijos();
        this.decoraciones2.borrarHijos();

        for(var i = 0 ; i < cantidad ; i++ ){
            var copo = this.crearCopito();
            copo.escalar([0.1,0.1,0.1]);
            copo.trasladar([0.3*Math.cos(alfa*((Math.PI)/180)),0.3*Math.sin(alfa*((Math.PI)/180)),this.alturaTorta]);
            alfa = alfa + alfaPaso ;
            this.decoraciones1.agregarHijo(copo);

            //para esta tiene q ser de a poco
            this.decoraciones2.agregarHijo(copo);
            
        }
    }

    tortaDeManzanas(cantidad){
        var alfaPaso = 360 / cantidad ;
        var alfa = 0.0   ;

        this.decoraciones1.borrarHijos();
        this.decoraciones2.borrarHijos();

        for(var i = 0 ; i < cantidad ; i++ ){
            var manzana = this.crearManzana();
            manzana.escalar([0.15,0.15,0.15]);
		    manzana.rotar(2 * Math.PI * i / cantidad, [0, 0, 1]);
            manzana.rotar(Math.PI / 2,[1,0,0]);
            manzana.trasladar([0.3*Math.cos(alfa*((Math.PI)/180)),0.3*Math.sin(alfa*((Math.PI)/180)),this.alturaTorta]);
            alfa = alfa + alfaPaso ;
            this.decoraciones1.agregarHijo(manzana);

            //para esta tiene q ser de a poco
            this.decoraciones2.agregarHijo(manzana);
            
        }
    }

    contornoTubo(cantidad, altura){
        var alfaPaso = 360 / cantidad ;
        var alfa = 0.0   ;

        this.contornos1.borrarHijos();
        this.contornos2.borrarHijos();

        for(var i = 0 ; i < cantidad ; i++ ){
            var bastonGeometria = new Baston(gl, altura * 0.8, 0.02);
            var tubo = new Objeto3D(bastonGeometria);
            
            tubo.trasladar([0.55*Math.cos(alfa*((Math.PI)/180)),0.55*Math.sin(alfa*((Math.PI)/180)),0.1]);
            alfa = alfa + alfaPaso ;
            this.contornos1.agregarHijo(tubo);

            //para esta tiene q ser de a poco
            this.contornos2.agregarHijo(tubo);
            
        }
    }

    contornoBarra(cantidad, altura){
        var alfaPaso = 360 / cantidad ;
        var alfa = 0.0   ;

        this.contornos1.borrarHijos();
        this.contornos2.borrarHijos();

        for(var i = 0 ; i < cantidad ; i++ ){

            //var barraGeometria = new Rectangulo(gl,0.05,0.02,0.4,[0.6,-0.2,0.1]);
            var barraGeometria = new Rectangulo(gl,0.05,0.02,altura * 0.8,[0.6,-0.2,0.1]);
            var barra = new Objeto3D(barraGeometria);
          
          	barra.rotar(2 * Math.PI * i / cantidad, [0, 0, 1]);
            barra.trasladar([0.55*Math.cos(alfa*((Math.PI)/180)),0.55*Math.sin(alfa*((Math.PI)/180)),0.1]);
            alfa = alfa + alfaPaso ;
            this.contornos1.agregarHijo(barra);

            //para esta tiene q ser de a poco
            this.contornos2.agregarHijo(barra);
            
        }

    }
   
    modificarTorta(altura , ondas){
        this.alturaTorta = altura;
        var masa = new Masa(gl,altura,0.5,ondas, 0.1);
        var cilindro = new Cilindro(gl,0.6,0.08,[1.0,1.0,1.0],2*Math.PI);
        var cremaGeometria = new Crema(gl, 40, 0.45, 2, 0.04);

        this.caja2.borrarHijos();

        this.torta1 = new NodoContenedor();
            this.masa1 = new Objeto3D( masa); 
                this.crema1 = new Objeto3D(cremaGeometria);
                this.decoraciones1 = new NodoContenedor();
                this.contornos1 = new NodoContenedor();
                this.plato1 = new Objeto3D(cilindro);
        this.torta2 = new NodoContenedor();
            this.masa2 = new Objeto3D( masa); 
                this.crema2 = new Objeto3D(cremaGeometria);
                this.decoraciones2 = new NodoContenedor();
                this.contornos2 = new NodoContenedor();
                this.plato2 = new Objeto3D(cilindro);

        this.caja2.agregarHijo(this.torta1);
                this.torta1.agregarHijo(this.masa1);
                        this.masa1.agregarHijo(this.crema1);
                        this.masa1.agregarHijo(this.decoraciones1);
                        this.masa1.agregarHijo(this.contornos1);
                this.torta1.agregarHijo(this.plato1);

        this.caja2.agregarHijo(this.torta2);
                 this.torta2.agregarHijo(this.masa2);
                        this.masa2.agregarHijo(this.crema2);
                        this.masa2.agregarHijo(this.decoraciones2);
                        this.masa2.agregarHijo(this.contornos2);
                 this.torta2.agregarHijo(this.plato2);

      this.torta1.trasladar([-1,0,0.3]);
      this.torta2.trasladar([3,0,0.3]);

      this.crema1.trasladar([0,0,this.alturaTorta]);
      this.crema2.trasladar([0,0,this.alturaTorta]);

                 
    }

    crearCereza(){
        var esfera = new Esfera(gl,40,40,0.05);
        var  cerezaTemp= new Objeto3D(esfera);
        return cerezaTemp ;
    }
    crearCopito(){
        var copo = new Copito(gl);
        var  copitoTemp= new Objeto3D(copo);
        return copitoTemp ;
    }
    crearManzana(){
        var cilindro = new Cilindro(gl,0.6,0.08,[0.2,0.8,0.2],Math.PI);
        var manzana = new Objeto3D(cilindro);
        return manzana ;
    }

    dibujar(){
      this.maquinaA.dibujar();
      
    }
}
