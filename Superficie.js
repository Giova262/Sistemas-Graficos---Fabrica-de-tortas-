class Superficie{

    constructor(){
        //Geometria
        var plano = new Plano(gl,5,5);    
        //Creo objeto
        this.piso = new Objeto3D(plano);
    }

    dibujar(){    
        this.piso.dibujar();
    }
}