/* Forma de uso:

	Se debe crear una serie de puntos [x, 0, z];
	La clase creara una reviolucion a lo largo del eje z.
	
	Ej:
	var curva = [0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.5, 0.0, 0.5, 1.0, 0.0, 1.0, 0.0, 0.0, 1.0];
	var color = [0.0,0.0,1.0];
	
	Luego:
	var puntosDeRevolucion = 40;
	superficieRevolucion = new SuperficieDeRevolucion(gl, curva, puntosDeRevolucion, color);
	
	Finalmente:
	objetoGrafico = new Objeto3D(gl, superficieRevolucion);

*/


class SuperficieDeRevolucion extends Grilla {
	constructor(gl, curva, columnas, color,angulo) {
		super(gl, curva.length / 3, columnas);
		
		this.curva = curva;
		this.color = color;
		this.angulo = angulo;
		//this.angulo = 2*Math.PI;
		
		this.createPositionBuffer();
        this.createColorBuffer();
        this.setupBuffers();
	}
	
	createPositionBuffer() {	
		
		for(var fila = 0; fila < this.curva.length; fila = fila + 3){
			for(var columna = 0; columna < this.columnas; columna++){	
			
				//var x = this.curva[fila] * Math.cos(columna * 2*Math.PI/(this.columnas-1));
				//var y = this.curva[fila] * Math.sin(columna * 2*Math.PI/(this.columnas-1));
				var x = this.curva[fila] * Math.cos(columna * this.angulo/(this.columnas-1));
				var y = this.curva[fila] * Math.sin(columna * this.angulo/(this.columnas-1));
				var z = this.curva[fila+2];
				this.position_buffer.push(...[x,y,z]);
			}
		}
	}
	
	createColorBuffer() {
		for(var fila = 0; fila < this.filas; fila++){
            for(var columna =0; columna < this.columnas; columna++) {
            	this.color_buffer.push(...this.color);
            }
        }
	}
}
