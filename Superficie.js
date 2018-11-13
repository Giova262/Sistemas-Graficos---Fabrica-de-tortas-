class Superficie{

    constructor(){
        //Geometria
        var plano = new Plano(gl,5,5);    
        //Creo objeto
        this.piso = new Objeto3D(plano);
        this.piso.setCoheficientesPhong(0.75,0.5,0.5,12.0);
    }

    dibujar(){    
        this.piso.dibujar();
    }
}