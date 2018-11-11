class Esfera extends Grilla {
	constructor(gl, filas, columnas, radio) {
		super(gl, filas, columnas);
		this.radio = radio;
		
		this.createPositionBuffer();
        this.createColorBuffer();
        this.createNormalBuffer();
        this.setupBuffers();
	}
	
	createPositionBuffer() {	
		for(var fila = 0; fila < this.filas; fila++){
            for(var columna =0; columna < this.columnas; columna++) {
                var y = this.radio * Math.cos(columna * Math.PI * 2 / (this.columnas - 1)) * Math.sin(fila * Math.PI / (this.filas - 1));
                var x = this.radio * Math.sin(columna * Math.PI * 2 / (this.columnas - 1)) * Math.sin(fila * Math.PI / (this.filas - 1));
                var z = this.radio * Math.cos(fila * Math.PI / (this.filas - 1));
        		this.position_buffer.push(x);
        		this.position_buffer.push(y);
        		this.position_buffer.push(z);
            }
        }
	}
	
	createColorBuffer() {
		for(var fila = 0; fila < this.filas; fila++){
            for(var columna =0; columna < this.columnas; columna++) {
                if(columna * Math.PI * 2 / (this.columnas -1) < Math.PI){
                    this.color_buffer.push(...[68.2/100,18.8/100,19.2/100]);
                }else{
                    this.color_buffer.push(...[68.2/100,18.8/100,19.2/100]);
                }
            }
        }
	}
	
	createNormalBuffer() {
		for(var fila = 0; fila < this.filas; fila++){
            for(var columna =0; columna < this.columnas; columna++) {
            	var y = this.radio * Math.cos(columna * Math.PI * 2 / (this.columnas - 1)) * Math.sin(fila * Math.PI / (this.filas - 1));
                var x = this.radio * Math.sin(columna * Math.PI * 2 / (this.columnas - 1)) * Math.sin(fila * Math.PI / (this.filas - 1));
                var z = this.radio * Math.cos(fila * Math.PI / (this.filas - 1));
       			
            	var normal = vec3.fromValues(x,y,z);
                vec3.normalize(normal,normal);
                this.normal_buffer.push(...normal);
            }
        }
	}
}
