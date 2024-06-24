'user strict';

import { MyUtil } from '../utils/my-util.js';
import { mat4 } from 'gl-matrix';
import { ShaderUtil } from './Shader_util.js';
import { Model_VOB } from './Model_VOB.js';



var Scene = (function() {
	
	var myUtil = MyUtil.getInstance();


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
	
	
		this.render = function() {
			// Clear the entire canvas window background with the clear color
			this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
			
			// Build individual transforms
			var transform = mat4.create();
			mat4.identity(transform);
	 
			// Erstelle Rotationsmatrizen
			var rotate_x_matrix = mat4.create();
			var rotate_y_matrix = mat4.create();
	 		
			mat4.fromRotation(rotate_x_matrix, this.angle_x * Math.PI / 180, [1, 0, 0]);
			mat4.fromRotation(rotate_y_matrix, this.angle_y * Math.PI / 180, [0, 1, 0]);
			
			const fieldOfView = 45.0 * (Math.PI / 180.0);
			const aspect = gl.canvas.clientWidth / gl.canvas.clientHeight;
			const zNear = 0.1;
			const zFar = 20.0;
			
			// Create a perspective matrix, a special matrix that is used to simulate the distortion of perspective in a camera.
			// Our field of view is 45 degrees, with a width/height  ratio that matches the display size of the canvas
			// and we only want to see objects between zNear units and zFar units away from the camera.
			// Create projection Matrix (das ist meine eigene Funktion!) ------------------
			const projectionMatrix = myUtil.getProjectionMat4(fieldOfView, aspect, zNear, zFar);
			
			// Das müsste am Ende sein:  projektion * rotate_y * rotate_x * gl_position;
			
			// mat4.multiply(transform, rotate_y_matrix, rotate_x_matrix);
			
			for (var i = 0; i < this.model_VOBs.length; ++i) {
				myUtil.printMatrix4(projectionMatrix);
				this.model_VOBs[i].render(projectionMatrix, transform);
			}
		}
			
		this.cleanUp = function() {
			// Clean up shader programs
			ShaderUtil.cleanUp(this.program);
		
			// Delete each model's VOB
			var model_names = Object.keys(this.model_VOBs);
			for(var i = 0; i < model_names.length; ++i) {
				this.model_VOBs[model_names[i]].cleanUp();
			}
		}
	
	}
	return Scene;
})();


export { Scene };