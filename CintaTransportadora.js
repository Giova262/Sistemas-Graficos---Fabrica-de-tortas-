class CintaTransportadora extends Rectangulo {
	constructor(gl, ancho, alto, profundidad, color) {
		super(gl, ancho, alto, profundidad, color, true, "cinta-textura")
		this.createUVTextureBuffer();
	}
	
	createUVTextureBuffer() {
		this.uv_texture_buffer = [
		// Cara Frontal.
			 0.0,  0.0,
			 0.0,  0.0,
			 0.0,  0.0,
			 0.0,  0.0,

		// Cara Superior.
			 1.0,  0.0,
			 1.0,  1.0,
			 0.0,  1.0,
			 0.0,  0.0,
			 
		// Cara Posterior.
			 0.0,  0.0,
			 0.0,  0.0,
			 0.0,  0.0,
			 0.0,  0.0,
					
		// Cara Lateral Derecha.
			 0.0,  0.0,
			 0.0,  0.0,
			 0.0,  0.0,
			 0.0,  0.0,
			 
					
		// Cara Inferior.
			 0.0,  0.0,
			 0.0,  0.0,
			 0.0,  0.0,
			 0.0,  0.0,
					
		// Cara Lateral Izquierda.
			 0.0,  0.0,
			 0.0,  0.0,
			 0.0,  0.0,
			 0.0,  0.0,
			 
		];
	}
}
