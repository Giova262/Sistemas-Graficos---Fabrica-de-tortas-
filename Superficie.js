class Superficie{

    constructor(){
        //Geometria
        var plano = new Plano(gl,3,3);    
        //Creo objeto
        this.piso = new Objeto3D(plano);
    }

    dibujar(){    
        this.piso.dibujar();
    }
}