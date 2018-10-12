/*
	Uso:
	
	// Creo la geometria.
	var copitoGeometria = new Copito(gl);
	
	//Creo un objeto 3D con geometria copito (Consultar clase Objeto3D).
    copito = new Objeto3D(gl, copitoGeometria); 
*/


class Copito {
	constructor(gl) {
		var puntos_de_control = [0.0,	0.0,	1.0,
								 0.0,	0.0,	1.0,
								 0.0,	0.0,	1.0,
								 0.0,	0.0,	1.0,
								 
							     0.025,	0.0,	1.0,
								 0.025,	0.0,	0.7,
								 0.32,	0.0,	0.6,
								 0.32,	0.0,	0.2,
								 
								 0.32,	0.0,	0.2,
								 0.32,	0.0,	0.1,
								 0.5,	0.0,	0.1,
								 0.5,	0.0,	0.0,
								 
								 0.0,	0.0,	0.0,
								 0.0,	0.0,	0.0,
								 0.0,	0.0,	0.0,
								 0.0,	0.0,	0.0,
		];
		
		var puntos_detalle_curva = 40;
		var puntos_detalle_revolucion = 40;
		
		var curva = new CurvaBezier(puntos_de_control, puntos_detalle_curva);
		
		this.superficie = new SuperficieDeRevolucion(gl, curva.getPosiciones(), puntos_detalle_revolucion);
	}
	
	dibujar() {
		this.superficie.dibujar();
	}
}

class Cilindro{
	constructor(gl,radio,altura){
		var puntos = [];
		puntos.push(...[0,0,0]);
		puntos.push(...[radio,0,0]);
		puntos.push(...[radio,0,altura]);
		puntos.push(...[0,0,altura]);

		this.superficie = new SuperficieDeRevolucion(gl,puntos,40);
	}
	dibujar(){
		this.superficie.dibujar();
	}
}