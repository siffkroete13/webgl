var Model_VOB = (function() {
	
	// Konstruktor
	function Model(gl, program_data, model_data) {
		this.gl = gl;
		this.program_data = program_data;
		this.model_data = model_data;
	
		this.vertex_buffer_id = null;
		this.color_buffer_id = null;
		
		// Shader variables
		this.aVertexPosition = null;
		this.aVertexColor = null;
	
	
		this.createVertextPositionBuffer = function () {
			// Wir haben hauptsächlich folgende Schritte hier auszuführen:
			// 1.) Vertex Buffer erstellen
			// 2.) Bind Buffer: Buffer an “target” binden. The target tells WebGL what type of data the buffer object contains, 
					// allowing it to deal with the contents correctly.
					// Das Ziel ist gl.ARRAY_BUFFER Specifies that the buffer object contains vertex data
					// oder gl.ELEMENT_ARRAY_BUFFER Specifies that the buffer object contains index values pointing to vertex data.
					// Hier haben wir gl.ARRAY_BUFFER genommen: gl.ARRAY_BUFFER is specified as the target to store vertex data (positions) in the buffer object.
			// 3.) Buffer Data: Allocates storage and writes data to the buffer. You use gl.bufferData() to do this.

			// 1.) 
			this.vertex_buffer_id = this.gl.createBuffer(); 
			
			if(!this.vertex_buffer_id) {
				console.log('Failed to create the buffer object');
				return null;
			}
			
			// 2.) 
			this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.vertex_buffer_id);
			
			// 3.) Upload the data for this buffer object to the GPU.
			this.gl.bufferData(this.gl.ARRAY_BUFFER, this.model_data.positions, this.gl.STATIC_DRAW);
			
			return this.vertex_buffer_id;
		}

		this.createVertextColorBuffer = function () {
			// Ähnlich wie bei Position Buffer, einfach jetzt mit Color Buffer
			this.color_buffer_id = this.gl.createBuffer();
			this.gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
			this.gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.model_data.colors), gl.STATIC_DRAW);
		}


	
		this.render = function(transform_matrix) {
			// Wir haben hauptsächlich folgende Schritte hier auszuführen:
			// 1.) uniform variables ==>  shader kopieren. (uniform sind Variablen die sich während dem Rendering nicht ändern).
			// 2.) Vertex Buffer erstellen
			// 3.) Bind Buffer: Buffer an “target” binden. The target tells WebGL what type of data the buffer object contains, 
					// allowing it to deal with the contents correctly.
					// Das Ziel ist gl.ARRAY_BUFFER Specifies that the buffer object contains vertex data
					// oder gl.ELEMENT_ARRAY_BUFFER Specifies that the buffer object contains index values pointing to vertex data.
					// Hier haben wir gl.ARRAY_BUFFER genommen: gl.ARRAY_BUFFER is specified as the target to store vertex data (positions) in the buffer object.
			// 4.) Buffer Data: Allocates storage and writes data to the buffer. You use gl.bufferData() to do this.
			// 5.) Excecute shader
			

			// 1.) uniform variables ==>  shader kopieren.
			this.gl.uniformMatrix4fv(this.program_data.uniformLocations, false, transform_matrix);
			
			// 2.) 3.) und 4.) Vertex-Buffer erstellen, Bind Buffer und Buffer Data
			this.createVertextPositionBuffer();
			
			this.gl.vertexAttribPointer(this.aVertexPosition, 3, this.gl.FLOAT, false, 0, 0);
			this.gl.enableVertexAttribArray(this.aVertexPosition);
			
			this.gl.bindBuffer(gl.ARRAY_BUFFER, this.color_buffer_id);
			
		
			this.gl.vertexAttribPointer(this.aVertexColor, 4, this.gl.FLOAT, false, 0, 0);
			this.gl.enableVertexAttribArray(this.aVertexColor);
			
			// 5.) Excecute shader
			// Draw all of the Lines, Poins oder Triangles
			this.gl.drawArrays(gl.POINTS, 0, number_points);

		}
	
	
	
	
	
	
	
	} // End Konstruktor
	
	return Model;
})();