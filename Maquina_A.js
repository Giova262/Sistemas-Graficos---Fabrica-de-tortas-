class Maquina_A{

    constructor(){

        //Variables Utiles
        this.tortaPos = 6 ;
        this.rotacionPaso= 0;
        this.rotarTorta=0;
        this.setCantidadDecoraciones= 0;
        this.cantidadTotal = 0;
        this.setCantidadContornos= 0;
        this.cantidadTotalCont = 0;
        this.decoracion= null;
        this.contorno = null ;
        this.indice = 0;
        this.indice2 = 0;
        this.alfaPaso = 0 ;
        this.alfa = 0   ;
        this.alfaPaso2 = 0 ;
        this.alfa2 = 0   ;
        this.tipoDeco=-1;
        this.tipoContor=-1;
        this.anguloAct=0;
        this.primera=true;

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
        this.alfa = 0.0 ;
    }

    setCantidadDeContornos(cantidad){
        this.setCantidadContornos= cantidad;
        this.cantidadTotalCont = cantidad;
        this.alfaPaso2 = 360 / this.cantidadTotalCont ;
        this.rotacionPaso=this.alfaPaso2*((Math.PI)/180);
        this.alfa2 = 0.0   ;
    }

    barras()  { this.tipoContor = 0 ; }

    tubos()   { this.tipoContor = 1 ; }

    manzanas(){ this.tipoDeco = 0 ;   }

    cerezas() { this.tipoDeco = 1 ;   }

    copos()   { this.tipoDeco = 2 ;   }

    moverAposicion( origen , destino ){
        if(origen < destino){
            origen += 0.005 ;      
            if( origen >= destino ) origen = destino;
            
        }else if(origen > destino){
            origen-= 0.005 ;
            if( origen <= destino ) origen = destino;
     
        }
        return origen;
    }

    rotarTorta1(){  
       this.torta1.rotar(-this.rotarTorta,[0,0,1]);
       
       if(this.primera) {
           this.primera = false;
           return true;
       }

       this.rotarTorta += 0.01

       if(this.rotarTorta >= (this.anguloAct+this.rotacionPaso)){
        this.anguloAct= this.rotarTorta ;
        return true
       } 

       return false;
    }

    colocarContorno(){
        this.indice2++;
        this.contornos1.borrarHijos();
        this.alfa2 = 0;

        for(var i = 0 ; i < this.indice2 ; i++ ){
 
            if(this.tipoContor == 0){
                this.contorno = this.crearBarra();
            	this.contorno.rotar(2 * Math.PI * i / this.cantidadTotalCont, [0, 0, 1]);
                this.contorno.trasladar([(this.radioTorta+0.05)*Math.cos(this.alfa2*((Math.PI)/180)+1.5708),(this.radioTorta+0.05)*Math.sin(this.alfa2*((Math.PI)/180)+1.5708),0.1]);
          
            } 
            if(this.tipoContor == 1){
                this.contorno = this.crearTubo();
                this.contorno.trasladar([(this.radioTorta+0.05)*Math.cos(this.alfa2*((Math.PI)/180)+1.5708),(this.radioTorta+0.05)*Math.sin(this.alfa2*((Math.PI)/180)+1.5708),0.1]);
           
            } 

            this.alfa2 = this.alfa2 + this.alfaPaso2 ;
            this.contornos1.agregarHijo(this.contorno);
        }

        if(this.indice2 == this.cantidadTotalCont) this.indice2 = this.cantidadTotalCont;

    }

    agregarDecoracion(){
        this.indice++;
        this.decoraciones1.borrarHijos();
        this.alfa = 0;

        for(var i = 0 ; i < this.indice ; i++ ){
            if(this.tipoDeco == 0){
                this.decoracion = this.crearManzana();
                this.decoracion.escalar([0.15,0.15,0.15]);
                this.decoracion.rotar(2 * Math.PI * i / this.cantidadTotal, [0, 0, 1]);
                this.decoracion.rotar(Math.PI / 2,[1,0,0]);
            } 
            if(this.tipoDeco == 1) this.decoracion = this.crearCereza();
            if(this.tipoDeco == 2) this.decoracion = this.crearCopito();

            this.decoracion.trasladar([0.6*this.radioTorta*Math.cos(this.alfa*((Math.PI)/180)),0.6*this.radioTorta*Math.sin(this.alfa*((Math.PI)/180)),this.alturaTorta]);
            this.alfa = this.alfa + this.alfaPaso ;
            this.decoraciones1.agregarHijo(this.decoracion);
        }

        if(this.indice == this.cantidadTotal) this.indice = this.cantidadTotal;
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
  
    }

    moverTorta(destinoX){
        if( this.tortaPos < destinoX ){ 
            return true;
        }      
        this.tortaPos-= 0.01;   
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
    crearTubo(){
        var bastonGeometria = new Baston(gl, this.alturaTorta * 0.8, 0.02);
        var tubo = new Objeto3D(bastonGeometria);
        return tubo ;
    }
    crearBarra(){
        var barraGeometria = new Rectangulo(gl,0.05,0.02,this.alturaTorta * 0.8,[100.0/100,50.6/100,100.0/100]);
        var barra = new Objeto3D(barraGeometria);
        return barra ;
    }

    reset(){
        this.tortaPos = 6.0;
        this.decoraciones1.borrarHijos();
        this.indice=0;
        this.indice2=0;
        this.primera = true;
        this.rotarTorta=0;
        this.anguloAct = 0;
    }

    dibujar(){
      this.maquinaA.dibujar();
      
    }
}
