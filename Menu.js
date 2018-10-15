
var obj = {

    //Cuadro para ingresar numeros
    Decoraciones: 20,
    Contornos: 20 ,

    //Seleccionador
    TipoDecoracion: 'Copito',
    TipoContorno: 'Barra',

    //Botones 
    Generar: function () {
        
       if(this.TipoDecoracion == 'Copito' ){
            maquina_a.tortaDeCopitos(this.Decoraciones);
            maquina_b.copos();
       }
       if(this.TipoDecoracion == 'Cereza' ){
            maquina_a.tortaDeCereza(this.Decoraciones);
       }
       if(this.TipoDecoracion == 'Manzana' ){
            //Falta implementar el ultimo
       }

       if(this.TipoContorno == 'Barra' ){
            maquina_a.contornoBarra(this.Contornos);
       }
       if(this.TipoContorno == 'Tubo' ){
            maquina_a.contornoTubo(this.Contornos);
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

// Choose from accepted values
gui.add(obj, 'TipoDecoracion', [ 'Copito', 'Cereza', 'Manzana' ] );
gui.add(obj, 'TipoContorno', [ 'Barra', 'Tubo' ] );

