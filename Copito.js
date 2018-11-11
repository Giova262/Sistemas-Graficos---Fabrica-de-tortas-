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
								 0.005,	0.0,	1.0,
								 0.015,	0.0,	1.0,
								 0.025,	0.0,	1.0,
								 
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
		
		var puntos_detalle_curva = 60;
		var puntos_detalle_revolucion = 60;
		
		var curva = new CurvaBezier(puntos_de_control, puntos_detalle_curva);
		
		this.superficie = new SuperficieDeRevolucion(gl, curva.getPosiciones(), curva.getNormales(), puntos_detalle_revolucion, [29.8/100,29.8/100,73.7/100],2*Math.PI);
	}
	
	dibujar() {
		this.superficie.dibujar();
	}
}

class Cilindro{
	constructor(gl,radio,altura,color,angulo){
		var puntos = [];
		this.angulo = angulo;
		puntos.push(...[0,0,0]);
		puntos.push(...[radio,0,0]);
		puntos.push(...[radio,0,altura]);
		puntos.push(...[0,0,altura]);

		this.superficie = new SuperficieDeRevolucion(gl,puntos,40, color,this.angulo);
	}
	dibujar(){
		this.superficie.dibujar();
	}
}
