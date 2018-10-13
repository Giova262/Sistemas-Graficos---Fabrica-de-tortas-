class Objeto3D {
	constructor( geometria) {
			 
		this.geometria = geometria;
		
		this.angulo = 0 ;
		this.ejeDeRotacion = [0,0,1];
		this.posicion = [0,0,0];
		this.escalado = [1,1,1];

		this.padreMatrix = mat4.create();
		mat4.identity(this.padreMatrix);

		this.hijos = [];
   	}
  	
   	agregarHijo(hijo) {
   		this.hijos.push(hijo);
	}

	rotar(angulo,ejeRotacion){
		this.angulo = angulo ;
		this.ejeDeRotacion = ejeRotacion;
	}

	trasladar(posicion){
		this.posicion = posicion;
	}

	escalar(escalado){
		this.escalado = escalado;
	}

	setPadreMatriz(_padreMatriz){
		var m = mat4.create();
		mat4.copy(this.padreMatrix, _padreMatriz,m );
	}

	
	   
   	dibujar(){
		
		var u_model_view_matrix = gl.getUniformLocation(glProgram, "uMVMatrix");		
		var mvMatrix = mat4.create();
		mat4.identity(mvMatrix);	
		mat4.multiply(mvMatrix,mvMatrix, this.padreMatrix );
		mat4.translate(mvMatrix, mvMatrix, this.posicion);
		mat4.rotate(mvMatrix,mvMatrix, this.angulo, this.ejeDeRotacion);
		mat4.scale(mvMatrix,mvMatrix, this.escalado);
		
		//Pongo la matriz "mvMatrix" en el shader
		gl.uniformMatrix4fv(u_model_view_matrix, false, mvMatrix );

		//Dibujo 
		this.geometria.dibujar();

		//Dibujo Hijos
		for(var i = 0 ; i < this.hijos.length ; i++){
			this.hijos[i].setPadreMatriz(mvMatrix);
			this.hijos[i].dibujar();
		}	
	}
}
