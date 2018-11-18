class Horno extends Rectangulo {
	constructor(gl, ancho, alto, profundidad, color) {
		super(gl, ancho, alto, profundidad, color, true, "horno-textura")
		this.createUVTextureBuffer();
	}
	
	createUVTextureBuffer() {
		this.uv_texture_buffer = [
		// Cara Frontal.
			 0.725,  0.5,
			 0.37,  0.5,
			 0.37,  0.0,
			 0.725,  0.0,

		// Cara Superior.
			 0.0,  0.0,
			 0.0,  0.0,
			 0.0,  0.0,
			 0.0,  0.0,
			 
		// Cara Posterior.
			 0.37,  0.5,
			 0.37,  0.0,
			 0.725,  0.0,
			 0.725,  0.5,
					
		// Cara Lateral Derecha.		//Original
			 0.37,  0.5,
			 0.37,  0.0,
			 0.725,  0.0,
			 0.725,  0.5,
			 
					
		// Cara Inferior.
			 0.0,  0.0,
			 0.0,  0.0,
			 0.0,  0.0,
			 0.0,  0.0,
					
		// Cara Lateral Izquierda.		//Original
			 0.39,  0.52,
			 0.0,  0.52,
			 0.0,  0.0,
			 0.39,  0.0,
			 
		];
	}
}
