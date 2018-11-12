class Grilla {
	constructor(gl, filas, columnas,color) {
	
		this.filas = filas;
		this.columnas = columnas;

		this.color = color;

		// Buffers.
		this.position_buffer = [];
		this.index_buffer = [];
        this.color_buffer = [];
        this.normal_buffer = [];
                
        this.createIndexBuffer();
	}
	
	createIndexBuffer() {
	
		//Codigo que funciona bien.
        var indice_de_vertice = 0;
		var matriz_de_indices = new Array(this.filas);

		for (var i = 0.0; i < this.filas; i++) { 
        	matriz_de_indices[i] = new Array(this.columnas);
            	for (var j = 0.0; j < this.columnas; j++) {
                	matriz_de_indices[i][j] = indice_de_vertice;
                	indice_de_vertice++;
            	}
        }

		var hacia_arriba = true;
		var columna = 0;
					
		for(var i = 0.0; i < (this.filas-1); i++) {
        	for (var j = 0.0; j < this.columnas; j++) {
				if(hacia_arriba) {
					columna = j;
				} else {
					columna = this.columnas - 1 - j;
				}                            
            	this.index_buffer.push(matriz_de_indices[i][columna], matriz_de_indices[i + 1][columna]);
        	}
         	hacia_arriba = !hacia_arriba;
         }
        
        //Codigo que funciona mal.
        /*for(var fila = 0; fila < this.filas - 1; fila++){
            for(var columna= 0; columna < this.columnas; columna++){
                this.index_buffer.push(columna + fila * this.filas);
                this.index_buffer.push(columna + (fila + 1) * this.filas);
            }
            if(fila < (this.filas - 2)){
                this.index_buffer.push(columna - 1 + (fila + 1) * this.filas);
                this.index_buffer.push(columna + fila * this.filas);
            }   
		}*/
	}
	
	setupBuffers() {
		this.webgl_position_buffer = gl.createBuffer();
		gl.bindBuffer(gl.ARRAY_BUFFER, this.webgl_position_buffer);
		gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.position_buffer), gl.STATIC_DRAW);

		this.webgl_color_buffer = gl.createBuffer();
		gl.bindBuffer(gl.ARRAY_BUFFER, this.webgl_color_buffer);
		gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.color_buffer), gl.STATIC_DRAW);  
		
		this.webgl_normal_buffer = gl.createBuffer();
		gl.bindBuffer(gl.ARRAY_BUFFER, this.webgl_normal_buffer);
		gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.normal_buffer), gl.STATIC_DRAW);    

		this.webgl_index_buffer = gl.createBuffer();
		gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.webgl_index_buffer);
		gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(this.index_buffer), gl.STATIC_DRAW);
   	}

	dibujar() {

		//Iluminacion Phong Datos
		var u_light_color = gl.getUniformLocation(glProgram,"light_color");
		gl.uniform3f(u_light_color,...this.color); 
		var u_ambient_color = gl.getUniformLocation(glProgram,"ambient_color");
		gl.uniform3f(u_ambient_color,...this.color );
		var u_ka = gl.getUniformLocation(glProgram,"uka");
		gl.uniform1f(u_ka, 0.5);
		var u_kd = gl.getUniformLocation(glProgram,"ukd");
		gl.uniform1f(u_kd, 1.0);
		var u_ks = gl.getUniformLocation(glProgram,"uks");
		gl.uniform1f(u_ks, 1.0);
		var u_n = gl.getUniformLocation(glProgram,"un");
		gl.uniform1f(u_n, 32.0);
	
		var vertexPositionAttribute = gl.getAttribLocation(glProgram, "aVertexPosition");
		gl.enableVertexAttribArray(vertexPositionAttribute);
		gl.bindBuffer(gl.ARRAY_BUFFER, this.webgl_position_buffer);
		gl.vertexAttribPointer(vertexPositionAttribute, 3, gl.FLOAT, false, 0, 0);

		/*var vertexColorAttribute = gl.getAttribLocation(glProgram, "aVertexColor");
		gl.enableVertexAttribArray(vertexColorAttribute);
		gl.bindBuffer(gl.ARRAY_BUFFER, this.webgl_color_buffer);
		gl.vertexAttribPointer(vertexColorAttribute, 3, gl.FLOAT, false, 0, 0);*/
		
		var vertexNormalAttribute = gl.getAttribLocation(glProgram, "aVertexNormal");		
		gl.enableVertexAttribArray(vertexNormalAttribute);
        gl.bindBuffer(gl.ARRAY_BUFFER, this.webgl_normal_buffer);
        gl.vertexAttribPointer(vertexNormalAttribute, 3, gl.FLOAT, false, 0, 0);

		gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.webgl_index_buffer);

		gl.drawElements(gl.TRIANGLE_STRIP, this.index_buffer.length, gl.UNSIGNED_SHORT, 0);
	}
}
