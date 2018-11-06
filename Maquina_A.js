class Maquina_A{

    constructor(){

        this.tortaPos = 6 ;
        this.cond = false ;
        this.setCantidadDecoraciones= 0;
        this.cantidadTotal = 0;
        this.decoracion= null;
        this.indice = 0;
        this.alfaPaso = 0 ;
        this.alfa = 0   ;
        this.arrayDecoraciones = [];
        this.tipoDeco=-1;

        //Geometrias
        var rectangulo1 = new Rectangulo(gl,2,2,3.5,[29.4/100,29.8/100,75.3/100]);
        var rectangulo2 = new Rectangulo(gl,10,2,0.25,[45.5/100,45.5/100,45.5/100]);
        var rectangulo3 = new Rectangulo(gl,0.2,0.2,1,[15.3/100,60.4/100,14.5/100]);
        
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
                    this.masa1 = null; 
                         this.crema1 = null;   
                         this.decoraciones1 = new NodoContenedor();
                         this.contornos1 = new NodoContenedor();
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

    setCantidadDeDecoraciones(cantidad){
        this.setCantidadDecoraciones = cantidad;
        this.cantidadTotal = cantidad;
        this.alfaPaso = 360 / this.cantidadTotal ;
        this.alfa = 0.0   ;

        for(var i = 0 ; i < cantidad ; i ++){
            var deco = this.decoracion;
            this.arrayDecoraciones.push(deco);
        }
    }

    manzanas(){
        this.tipoDeco = 0 ;    
    }

    cerezas(){
        this.tipoDeco = 1 ;
    }

    copos(){
        this.tipoDeco = 2 ;
    }

    agregarDecoracion(){

        this.indice++;
        this.decoraciones1.borrarHijos();
        this.alfa = 0;

        for(var i = 0 ; i < this.indice ; i++ ){

            if(this.tipoDeco == 0){
                var copo = this.crearManzana();
                copo.escalar([0.15,0.15,0.15]);
                copo.rotar(2 * Math.PI * i / this.cantidadTotal, [0, 0, 1]);
                copo.rotar(Math.PI / 2,[1,0,0]);
            } 
            if(this.tipoDeco == 1) var copo = this.crearCereza();
            if(this.tipoDeco == 2) var copo = this.crearCopito();

            copo.trasladar([0.6*this.radioTorta*Math.cos(this.alfa*((Math.PI)/180)),0.6*this.radioTorta*Math.sin(this.alfa*((Math.PI)/180)),this.alturaTorta]);
            this.alfa = this.alfa + this.alfaPaso ;
            this.decoraciones1.agregarHijo(copo);
        }

        if(this.indice == this.cantidadTotal) this.indice = this.cantidadTotal;

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
            cereza.trasladar([0.6*this.radioTorta*Math.cos(alfa*((Math.PI)/180)),0.6*this.radioTorta*Math.sin(alfa*((Math.PI)/180)),this.alturaTorta]);
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
            copo.trasladar([0.6*this.radioTorta*Math.cos(alfa*((Math.PI)/180)),0.6*this.radioTorta*Math.sin(alfa*((Math.PI)/180)),this.alturaTorta]);
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
            manzana.trasladar([0.55*this.radioTorta*Math.cos(alfa*((Math.PI)/180)),0.55*this.radioTorta*Math.sin(alfa*((Math.PI)/180)),this.alturaTorta]);
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
            
            tubo.trasladar([(this.radioTorta+0.05)*Math.cos(alfa*((Math.PI)/180)),(this.radioTorta+0.05)*Math.sin(alfa*((Math.PI)/180)),0.1]);
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
            var barraGeometria = new Rectangulo(gl,0.05,0.02,altura * 0.8,[100.0/100,50.6/100,100.0/100]);
            var barra = new Objeto3D(barraGeometria);
          
          	barra.rotar(2 * Math.PI * i / cantidad, [0, 0, 1]);
            barra.trasladar([(this.radioTorta+0.05)*Math.cos(alfa*((Math.PI)/180)),(this.radioTorta+0.05)*Math.sin(alfa*((Math.PI)/180)),0.1]);
            alfa = alfa + alfaPaso ;
            this.contornos1.agregarHijo(barra);

            //para esta tiene q ser de a poco
            this.contornos2.agregarHijo(barra);        
        }

    }
   
    crearTorta(tipo,radio,altura,amplitud,ondas,torciones ){
        this.alturaTorta = altura;
        this.radioTorta = radio;

        //--------------------------------
        //Creo geometrias
        var masa = new Masa(gl,altura,radio,ondas, amplitud);
        var cilindro = new Cilindro(gl,this.radioTorta+0.2,0.08,[84.3/100,92.2/100,77.6/100],2*Math.PI);
        var cremaGeometria = new Crema(gl, 40, radio*0.9 , torciones, 0.04);

        //--------------------------------
        //Limpio
        this.torta1.borrarHijos();

        //--------------------------------
        //Creo torta + contenedores 
        this.torta1 = new NodoContenedor();
            this.masa1 = new Objeto3D( masa); 
                this.decoraciones1 = new NodoContenedor();
                this.contornos1 = new NodoContenedor();
                this.crema1 = new Objeto3D(cremaGeometria);
            this.plato1 = new Objeto3D(cilindro);
        
        //--------------------------------
        //Agrego hijos      
        this.caja2.agregarHijo(this.torta1);
            this.torta1.agregarHijo(this.masa1);
                    this.masa1.agregarHijo(this.crema1);
                    this.masa1.agregarHijo(this.decoraciones1);
                    this.masa1.agregarHijo(this.contornos1);
            this.torta1.agregarHijo(this.plato1);

        //--------------------------------
        //Posicion
        this.torta1.trasladar([6,0,0.3]);
        this.crema1.trasladar([0,0,this.alturaTorta]);

        this.cond = true ;   

    }

    moverFase1(){
        if( this.tortaPos < 3.25 ){
            this.cond = false ; 
            return true;
        }      
        if(this.cond)  this.tortaPos-= 0.01;
        
        this.torta1.trasladar([this.tortaPos,0,0.3]);
        return false;
    }

    crearCereza(){
        var esfera = new Esfera(gl,40,40,0.05);
        var  cerezaTemp= new Objeto3D(esfera);
        return cerezaTemp ;
    }
    crearCopito(){
        var copo = new Copito(gl);
        var  copitoTemp= new Objeto3D(copo);
        copitoTemp.escalar([0.1,0.1,0.1]);
        return copitoTemp ;
    }
    crearManzana(){
        var cilindro = new Cilindro(gl,0.6,0.08,[63.1/100,76.9/100,50.2/100],Math.PI);
        var manzana = new Objeto3D(cilindro);
        return manzana ;
    }

    reset(){
        this.tortaPos = 6.0;
        this.cond = true ;
        this.decoraciones1.borrarHijos();
        this.indice=0;
    }

    dibujar(){
      this.maquinaA.dibujar();
      
    }
}
