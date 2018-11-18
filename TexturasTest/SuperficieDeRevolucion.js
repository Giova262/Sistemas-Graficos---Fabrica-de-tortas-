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
	constructor(gl, curva, normales_curva, columnas, color,angulo) {
		super(gl, curva.length / 3, columnas,color);
		
		this.curva = curva;
		this.normales_curva = normales_curva;
		//this.color = color;
		this.angulo = angulo;
		//this.angulo = 2*Math.PI;
		
		this.createPositionBuffer();
        this.createColorBuffer();
        this.createNormalBuffer();
        this.setupBuffers();
	}
	
	createPositionBuffer() {	
		
		for(var fila = 0; fila < this.curva.length; fila = fila + 3){
			for(var columna = 0; columna < this.columnas; columna++){	
			
				//Codigo mas viejo.
				//var x = this.curva[fila] * Math.cos(columna * 2*Math.PI/(this.columnas-1));
				//var y = this.curva[fila] * Math.sin(columna * 2*Math.PI/(this.columnas-1));
				
				//Codigo viejo.
				/*var x = this.curva[fila] * Math.cos(columna * this.angulo/(this.columnas-1));
				var y = this.curva[fila] * Math.sin(columna * this.angulo/(this.columnas-1));
				var z = this.curva[fila+2];
				this.position_buffer.push(...[x,y,z]);*/
				
				var posicion = vec3.fromValues(this.curva[fila], this.curva[fila+1], this.curva[fila+2]);
				
				var transformacion = mat4.create();
				mat4.identity(transformacion);
      			mat4.rotate(transformacion, transformacion, columna * this.angulo/(this.columnas-1), [0.0, 0.0, 1.0]);
      			
      			vec3.transformMat4(posicion, posicion, transformacion);
      			
      			this.position_buffer.push(...[posicion[0], posicion[1], posicion[2]]);
			}
		}
	}
	
	createColorBuffer() {
		for(var fila = 0; fila < this.filas; fila++){
            for(var columna =0; columna < this.columnas; columna++) {
            	//this.color_buffer.push(...this.color);
            }
        }
	}
	
	createNormalBuffer() {
		for(var fila = 0; fila < this.curva.length; fila= fila +3 ){
            for(var columna =0; columna < this.columnas; columna++) {
            
            	// Esto no funciona bien.
            	/*var normal = vec3.fromValues(this.normales_curva[fila], this.normales_curva[fila+1], this.normales_curva[fila+2]);
            	vec3.normalize(normal, normal);
            	
            	var transformacion = mat4.create();
				mat4.identity(transformacion);
      			mat4.rotate(transformacion, transformacion, columna * this.angulo/(this.columnas-1), [0.0, 0.0, 1.0]);
            	
            	vec3.transformMat4(normal, normal, transformacion);
            	
 				this.normal_buffer.push(...[normal[0], normal[1], normal[2]]);*/
           		
           		//Este es el codigo viejo pero funciona un poco mejor.
            	var x = this.normales_curva[fila] * Math.cos(columna * this.angulo/(this.columnas-1));
				var y = this.normales_curva[fila] * Math.sin(columna * this.angulo/(this.columnas-1));
				var z = this.normales_curva[fila+2];
				this.normal_buffer.push(...[x,y,z]);
				
            }
        }
	}
}
