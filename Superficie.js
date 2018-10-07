class Superficie{

    constructor(){

        //Geometria
        var grilla = new Plano(gl,3,3);
        
        //Creo objeto
        this.my_grid = new Objeto3D(gl,grilla);
    }

    dibujar(){
        var grillaMatriz = mat4.create();
        mat4.identity(grillaMatriz);
        //mat4.translate(grillaMatriz, grillaMatriz, [0.0, 0.0, -5.0]);
        //mat4.rotate(grillaMatriz, grillaMatriz,5.2, [0.0, 0.0, 0.0]);
        this.my_grid.setMatriz(grillaMatriz);
        this.my_grid.dibujar();
    }
}