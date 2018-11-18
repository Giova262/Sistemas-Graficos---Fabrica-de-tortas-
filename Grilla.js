class Grilla {
	constructor(gl, filas, columnas, color, tiene_textura, nombre_textura) {
	
		this.filas = filas;
		this.columnas = columnas;

		this.color = color;
		
		this.tiene_textura = tiene_textura;

		// Buffers.
		this.position_buffer = [];
		this.index_buffer = [];
        this.color_buffer = [];
        this.normal_buffer = [];
        this.uv_texture_buffer = [];
                
        this.createIndexBuffer();
        this.createUVTextureBuffer();
        
        if(this.tiene_textura) {
		    this.grillaTexture = gl.createTexture();
			gl.bindTexture(gl.TEXTURE_2D, this.grillaTexture);
			gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
			gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
			gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
			gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
			gl.texImage2D(
				gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA,
				gl.UNSIGNED_BYTE,
				document.getElementById(nombre_textura)
			);
			gl.bindTexture(gl.TEXTURE_2D, this.grillaTexture);
		}
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
	
	createUVTextureBuffer() {
		for(var columna = 0; columna < this.columnas; columna++) {
			for(var fila = 0; fila < this.filas; fila++) {
				var u = columna / (this.columnas - 1);
				var v = fila / (this.filas - 1);
				this.uv_texture_buffer.push(...[u,v]);
			}
		}
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
		
		if(this.tiene_textura) {
			this.webgl_uv_texture_buffer = gl.createBuffer();
            gl.bindBuffer(gl.ARRAY_BUFFER, this.webgl_uv_texture_buffer);
            gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.uv_texture_buffer), gl.STATIC_DRAW);
		}
   	}

	dibujar() {

		/**Iluminacion Phong Datos de cada luz */
		var u_light_color = gl.getUniformLocation(glProgram,"light_color");
		gl.uniform3f(u_light_color,...this.color); 
		var u_ambient_color = gl.getUniformLocation(glProgram,"ambient_color");
		gl.uniform3f(u_ambient_color,...this.color );
		var u_light2_color = gl.getUniformLocation(glProgram,"light2_color");
		gl.uniform3f(u_light2_color,...this.color); 
		var u_ambient2_color = gl.getUniformLocation(glProgram,"ambient2_color");
		gl.uniform3f(u_ambient2_color,...this.color );
		var u_light3_color = gl.getUniformLocation(glProgram,"light3_color");
		gl.uniform3f(u_light3_color,...this.color); 
		var u_ambient3_color = gl.getUniformLocation(glProgram,"ambient3_color");
		gl.uniform3f(u_ambient3_color,...this.color );
	
		/**Buffers de posiciones */
		var vertexPositionAttribute = gl.getAttribLocation(glProgram, "aVertexPosition");
		gl.enableVertexAttribArray(vertexPositionAttribute);
		gl.bindBuffer(gl.ARRAY_BUFFER, this.webgl_position_buffer);
		gl.vertexAttribPointer(vertexPositionAttribute, 3, gl.FLOAT, false, 0, 0);
		
		/**Buffers de normales */
		var vertexNormalAttribute = gl.getAttribLocation(glProgram, "aVertexNormal");		
		gl.enableVertexAttribArray(vertexNormalAttribute);
        gl.bindBuffer(gl.ARRAY_BUFFER, this.webgl_normal_buffer);
        gl.vertexAttribPointer(vertexNormalAttribute, 3, gl.FLOAT, false, 0, 0);
        
        /*Buffers Coordenadas UV*/
        if(this.tiene_textura) {
        	var vertexTexCoordAttribute = gl.getAttribLocation(glProgram, "aVertexTexCoord");
        	gl.enableVertexAttribArray(vertexTexCoordAttribute);
            gl.bindBuffer(gl.ARRAY_BUFFER, this.webgl_uv_texture_buffer);
            gl.vertexAttribPointer(vertexTexCoordAttribute, 2, gl.FLOAT, false, 0, 0);
        }

		/**Dibujo */
		gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.webgl_index_buffer);
		gl.drawElements(gl.TRIANGLE_STRIP, this.index_buffer.length, gl.UNSIGNED_SHORT, 0);
	}
}
