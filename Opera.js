class Opera extends Rectangulo {
	constructor(gl, ancho, alto, profundidad, color) {
		super(gl, ancho, alto, profundidad, color, true, "baston-textura")
		this.createUVTextureBuffer();
	}
	
	createUVTextureBuffer() {
		this.uv_texture_buffer = [];
		for(var i = 0; i < 6; i++) {
			this.uv_texture_buffer.push(...[0.55,  0.8]);
			this.uv_texture_buffer.push(...[0.5,  0.8]);
			this.uv_texture_buffer.push(...[0.5,  0.5]);
			this.uv_texture_buffer.push(...[0.55,  0.5]);
		}
	}
}
