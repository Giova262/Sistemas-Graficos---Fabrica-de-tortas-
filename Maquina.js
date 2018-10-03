class Maquina{

    constructor(){

        //Geometrias
        var esferaGeometria = new Esfera(gl, 50, 50, 0.1);
        var rectangulo = new Rectangulo(gl,0.3,1,1,[0.50,0.2,0.65]);
        
        //Creo objetos
        this.esfera = new Objeto3D(gl, esferaGeometria);
        this.cajon = new Objeto3D(gl,rectangulo);

        //Agrego hijos a algun objeto
		this.cajon.agregarHijo(this.esfera);
    }

    dibujar(){

      //Configuro matriz del cajon
      var cajonMatriz = mat4.create();
      mat4.identity(cajonMatriz);
      mat4.translate(cajonMatriz, cajonMatriz, [-1.0, 0.0, -3.0]);
      mat4.rotate(cajonMatriz, cajonMatriz,5.2, [1.0, 0.0, 0.0]);
      this.cajon.setMatriz(cajonMatriz);
      //Configuro matriz de la esfera
      var esferaMatriz = mat4.create();
      mat4.identity(esferaMatriz);
      mat4.multiply(esferaMatriz,esferaMatriz, cajonMatriz );
      mat4.translate(esferaMatriz, esferaMatriz, [0.0,0.3,0.58]);
      this.esfera.setMatriz(esferaMatriz);

      //Dibujo Cajon  
      this.cajon.dibujar();
    }

    //METODOS DE LA CAMINA A FUTURO
}