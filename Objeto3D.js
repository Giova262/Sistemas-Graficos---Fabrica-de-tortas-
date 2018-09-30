class Objeto3D {
	constructor(gl, geometria) {
		this.gl = gl;

		this.mvMatrix = mat4.create();
			 
		this.geometria = geometria;
		this.hijos = [];
   	}
  	
   	agregarHijo(hijo) {
   		this.hijos.push(hijo);
	}

	setMatriz(_matriz){	
		//matriz para usarla de identidad solo para copiar matriz en mvmatrix
		var m = mat4.create();
		mat4.multiply(this.mvMatrix, _matriz,m );
		
	}
	   
   	dibujar(){
		//Dibujo Padre.
		var u_model_view_matrix = gl.getUniformLocation(glProgram, "uMVMatrix");	
		gl.uniformMatrix4fv(u_model_view_matrix, false, this.mvMatrix );
		
		this.geometria.dibujar();
		
		//Dibujo Hijos
		for(var i = 0 ; i < this.hijos.length ; i++){
			this.hijos[i].dibujar();
		}	
	}
}
