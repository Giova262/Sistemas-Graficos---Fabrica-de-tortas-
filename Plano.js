class Plano extends Grilla {
	constructor(gl, filas, columnas) {
		super(gl, filas, columnas,[0.69,0.69,0.69]);

		this.normal_buffer = [];
		
		this.createPositionBuffer();
		this.createColorBuffer();
		this.createNormalBuffer();
        this.setupBuffers();
	}
	
	createPositionBuffer() {	
		for(var fila = 0; fila < this.filas; fila++){
            for(var columna =0; columna < this.columnas; columna++) {
				var x = (fila - this.filas/2)*10;		   
                var y = (columna - this.columnas /2)*10;
				var z =0;
				
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
                    this.color_buffer.push(...[0.69,0.69,0.69]);
                }else{
                    this.color_buffer.push(...[0.69,0.69,0.69]);
                }
            }
        }
	}

	createNormalBuffer() {

		for(var fila = 0; fila < this.filas; fila++){
            for(var columna =0; columna < this.columnas; columna++) {
                if(columna * Math.PI * 2 / (this.columnas -1) < Math.PI){
                    this.normal_buffer.push(...[0.0,0.0,1.0]);
                }else{
                    this.normal_buffer.push(...[0.0,0.0,1.0]);
                }
            }
        }
	}
}
