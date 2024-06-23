var Scene = (function() {
	
	// Konstruktor
	function Scene(canvas_ct, gl, model_data, vShaderCode, fShaderCode) {
		this.canvas_ct = canvas_ct;
		this.gl = gl;
		this.model_data = model_data;
		
		// Set up the rendering program and set the state of webgl
 		this.program_data = ShaderUtil.createProgram(this.gl, vShaderCode, fShaderCode);
		
		this.model_VOBs = [];
		
		this.gl.useProgram(this.program_data.program);

  		this.gl.enable(gl.DEPTH_TEST);
		
		// Alle models_VOB initialisieren
		for (var i = 0; i < this.model_data.length; ++i) {
			this.model_VOBs.push(new Model_VOB(this.gl, this.program_data, this.model_data[i]));
		}
		
	}
	
	
	
	Scene.prototype.render = function() {
		// Clear the entire canvas window background with the clear color
    	this.gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
		
		// Build individual transforms
		var transform = matrix.create();
        matrix.identity(transform);
        matrix.rotateX(transform, transform, this.angle_x * Math.PI / 180);
        matrix.rotateY(transform, transform, this.angle_y * Math.PI / 180);
	
		// Combine the transforms into a single transformation
		matrix.multiplySeries(transform, transform, rotate_x_matrix, rotate_y_matrix);
		
		// Combine the transforms into a single transformation
    	matrix.multiplySeries(transform, transform, rotate_x_matrix, rotate_y_matrix);
		
		for (var i = 0; i < model_names.length; ++i) {
			this.model_VOBs[i].render(transform);
		}
	}
	
	Scene.prototype.cleanUp = function () {
		// Clean up shader programs
		ShaderUtil.cleanUp(this.program);
	
		// Delete each model's VOB
		var model_names = Object.keys(this.model_VOBs);
		for(var i = 0; i < model_names.length; ++i) {
			this.model_VOBs[model_names[i]].cleanUp();
		}
	
		// Remove all event handlers
		this.canvas_ct.removeEventListner( "mousedown", this.events.mouse_drag_started);
		this.canvas_ct.removeEventListner( "mouseup", this.events.mouse_drag_ended );
		this.canvas_ct.removeEventListner( "mousemove", this.events.mouse_dragged );
		this.events.removeAllEventHandlers();
	
		// Disable any animation
		this.animate_active = false;
  	}
	
	return Scene;
})();