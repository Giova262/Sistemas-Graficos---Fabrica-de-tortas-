class Rectangulo {
	constructor(gl, ancho, alto, profundidad, color) {
		this.ancho = ancho;
		this.alto = alto;
		this.profundidad = profundidad;
		this.color = color;
		
		this.TRIANGULOS = 24;

		// Buffers.
		this.position_buffer = [];
		this.index_buffer = [];
        this.color_buffer = [];
        this.normal_buffer = [];
        
        this.crearIndexBuffer();
        this.crearPositionBuffer();
        this.crearColorBuffer();
        this.crearNormalBuffer();
    	this.setupBuffers();
	}
	
	crearIndexBuffer() {
		for(var i = 0; i < this.TRIANGULOS ; i += 4){
			this.index_buffer.push(...[i, (i + 1), (i + 2), i, (i + 2), (i + 3)]);
		}
	}
	
	crearPositionBuffer() {
	
		// Sistema de coordenadas en el centro de la cara inferior. Centrado en z = 0.
		var x = this.ancho / 2;
		var y = this.alto / 2;
		var z = this.profundidad;
	
		this.position_buffer = [
		// Cara Frontal.
			-x, y,  0,
			 x, y,  0,
			 x, y,  z,
			-x, y,  z,

		// Cara Superior.
			-x, -y, z,
			-x, y,  z,
			 x, y,  z,
			 x, -y, z,

		// Cara Posterior.
			-x, -y, 0,
			-x, -y, z,
			 x, -y, z,
			 x, -y, 0,
					
		// Cara Lateral Derecha.
			 x, -y, 0,
			 x, -y, z,
			 x, y,  z,
			 x, y,  0,
					
		// Cara Inferior.
			-x, -y, 0,
			 x, -y, 0,
			 x, y,  0,
			-x, y,  0,
					
		// Cara Lateral Izquierda.
			-x, -y, 0,
			-x, y,  0,
			-x, y,  z,
			-x, -y, z,
		];
	}
	
	crearNormalBuffer() {
		this.normal_buffer = [
		// Cara Frontal.
			0,1,0,
			0,1,0,
			0,1,0,
			0,1,0,
						
		// Cara Superior.
			0,0,1,
			0,0,1,
			0,0,1,
			0,0,1,
			
		// Cara Posterior.
			0,-1,0,
			0,-1,0,
			0,-1,0,
			0,-1,0,
						
		// Cara Lateral Derecha.
			1,0,0,
			1,0,0,
			1,0,0,
			1,0,0,
			
		// Cara Inferior.
			0,0,-1,
			0,0,-1,
			0,0,-1,
			0,0,-1,
						
		// Cara Lateral Izquierda.
			-1,0,0,
			-1,0,0,
			-1,0,0,
			-1,0,0,
		];
	}
	
	crearColorBuffer() {
		for (var i = 0; i < this.TRIANGULOS * 3; i += 3){
			this.color_buffer.push(... this.color);
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
   	}

	dibujar() {

		/**Iluminacion Phong Datos de color */
		var u_light_color = gl.getUniformLocation(glProgram,"light_color");
		gl.uniform3f(u_light_color,...this.color); 
		var u_ambient_color = gl.getUniformLocation(glProgram,"ambient_color");
		gl.uniform3f(u_ambient_color,...this.color);	
		var u_light2_color = gl.getUniformLocation(glProgram,"light2_color");
		gl.uniform3f(u_light2_color,...this.color); 
		var u_ambient2_color = gl.getUniformLocation(glProgram,"ambient2_color");
		gl.uniform3f(u_ambient2_color,...this.color );
		var u_light3_color = gl.getUniformLocation(glProgram,"light3_color");
		gl.uniform3f(u_light3_color,...this.color); 
		var u_ambient3_color = gl.getUniformLocation(glProgram,"ambient3_color");
		gl.uniform3f(u_ambient3_color,...this.color );

		/**Buffers de posicion */
		var vertexPositionAttribute = gl.getAttribLocation(glProgram, "aVertexPosition");
		gl.enableVertexAttribArray(vertexPositionAttribute);
		gl.bindBuffer(gl.ARRAY_BUFFER, this.webgl_position_buffer);
		gl.vertexAttribPointer(vertexPositionAttribute, 3, gl.FLOAT, false, 0, 0);
		
		/**Buffers de normales */
		var vertexNormalAttribute = gl.getAttribLocation(glProgram, "aVertexNormal");		
		gl.enableVertexAttribArray(vertexNormalAttribute);
        gl.bindBuffer(gl.ARRAY_BUFFER, this.webgl_normal_buffer);
        gl.vertexAttribPointer(vertexNormalAttribute, 3, gl.FLOAT, false, 0, 0);

		/**Dibujo */
		gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.webgl_index_buffer);
		gl.drawElements(gl.TRIANGLE_STRIP, this.index_buffer.length, gl.UNSIGNED_SHORT, 0);
	}
}
