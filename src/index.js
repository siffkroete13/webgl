"use strict";


import { Scene } from "./v1/Scene.js";
import { Events } from "./v1/Events.js";


function main() {
	var canvas = document.getElementById('meineWebGLCanvas');
	var gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
	if (!gl) {
		console.log("No WebGL context could be found.");
	}
	
	// Vertex shader program
	const vShaderCode = `
		attribute vec4 aVertexPosition;
		attribute vec4 aVertexColor;
		uniform mat4 uModelViewMatrix;
		uniform mat4 uProjectionMatrix;
		varying lowp vec4 vColor;
		void main(void) {
			gl_PointSize = 5.0;
			gl_Position = uProjectionMatrix * uModelViewMatrix * aVertexPosition;
			vColor = aVertexColor;
		}
	`;

	// Fragment shader program
	const fShaderCode = `
		varying lowp vec4 vColor;
		void main(void) {
		  gl_FragColor = vColor;
		}
	`;
	
	var model_data = [];
	
	model_data[0] = {
		type: 'simple',
		primitives: 'POINTS',
		
		num_lines: 12,
		num_vertices: 8,
		num_dim: 3,
		
		positions: [
			// Vorderseite
			-10.0, -10.0,  10.0,
			 10.0, -10.0,  10.0,
			 10.0,  10.0,  10.0,
			-10.0,  10.0,  10.0,
		
			// Rückseite
			-10.0, -10.0, -10.0,
			 10.0, -10.0, -10.0,
			 10.0,  10.0, -10.0,
			-10.0,  10.0, -10.0
		],
		
		colors: [
			0.0,  0.0,  0.0,  1.0,    
			0.0,  0.0,  1.0,  1.0,    
			0.0,  0.0,  0.0,  1.0,    
			0.0,  0.0,  1.0,  1.0,
			
			0.0,  0.0,  0.0,  1.0,    
			0.0,  0.0,  1.0,  1.0,    
			0.0,  0.0,  0.0,  1.0,    
			0.0,  0.0,  1.0,  1.0,   
		],
		
		
	}
	
	var scene = new Scene(canvas, gl, model_data, vShaderCode, fShaderCode);

	var controls = ['my_start', 'my_pause'];

	var events = new Events(scene, controls);
	
	canvas.addEventListener('mousedown', events.mouse_drag_started);
	canvas.addEventListener('mouseup', events.mouse_drag_ended);
	canvas.addEventListener('mousemove', events.mouse_dragged);


	/*
	// Remove all event handlers
	canvas.removeEventListner( "mousedown", this.events.mouse_drag_started);
	canvas.removeEventListner( "mouseup", this.events.mouse_drag_ended );
	canvas.removeEventListner( "mousemove", this.events.mouse_dragged );
	canvas.removeAllEventHandlers();
	*/
	
	events.animate();

	if (module.hot) {
		module.hot.accept('./v1/Scene.js', function() {
			// Hier kannst du die Logik hinzufügen, die ausgeführt wird, wenn sich das Modul ändert.
			console.log('Hot reload!');

			events.animate();
		});
	}
}
 


// Ein kleiner Hack damit die Start-Funktion erst aufgerufen wird, nachdem DOM geladen ist.
(function r(f) {
    /in/.test(document.readyState) ? setTimeout(function() { r(f);}, 9) : f()
})(main);
	    