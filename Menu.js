
var obj = {

    //Cuadro para ingresar numeros
    Decoraciones: 10,
    Contornos: 10 ,
    AlturaMasa:0.5,
    OndasTorta: 3 ,

    //Seleccionador
    TipoDecoracion: 'Copito',
    TipoContorno: 'Barra',

    //Botones 
    Generar: function () {

        //maquina_a.clean();
        maquina_a.modificarTorta(this.AlturaMasa,this.OndasTorta);
        
       if(this.TipoDecoracion == 'Copito' ){
            maquina_a.tortaDeCopitos(this.Decoraciones);
            maquina_b.copos();
       }
       if(this.TipoDecoracion == 'Cereza' ){
            maquina_a.tortaDeCereza(this.Decoraciones);
       }
       if(this.TipoDecoracion == 'Manzana' ){
            maquina_a.tortaDeManzanas(this.Decoraciones);
       }

       if(this.TipoContorno == 'Barra' ){
            maquina_a.contornoBarra(this.Contornos, this.AlturaMasa);
       }
       if(this.TipoContorno == 'Tubo' ){
            maquina_a.contornoTubo(this.Contornos, this.AlturaMasa);
       }

    },
};

//Inicio dat.GUI
var gui = new dat.GUI();

//Asocio obj al GUI
gui.remember(obj);

//Agregar botones
gui.add(obj, 'Generar');

//Agrego cuadro para ingresar numeros
gui.add(obj, 'Decoraciones').step(1); 
gui.add(obj, 'Contornos').step(1); 
gui.add(obj, 'AlturaMasa',0.1,2).name("AlturaMasa");
gui.add(obj, 'OndasTorta').step(1); 

// Choose from accepted values
gui.add(obj, 'TipoDecoracion', [ 'Copito', 'Cereza', 'Manzana' ] );
gui.add(obj, 'TipoContorno', [ 'Barra', 'Tubo' ] );

