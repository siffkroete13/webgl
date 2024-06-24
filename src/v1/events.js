var Events = (function() {

    function Events(scene, controls) {
        this.scene = scene;
        this.controls = controls;
        this.isDragging = false;
        this.previousMousePosition = { x: 0, y: 0 };
        

        this.mouse_drag_started = function(event) {
            this.isDragging = true;
            this.previousMousePosition = { x: event.clientX, y: event.clientY };
        };

        this.mouse_drag_ended = function(event) {
            this.isDragging = false;
        };

        this.mouse_dragged = function(event) {
            if (this.isDragging) {
                var deltaX = event.clientX - this.previousMousePosition.x;
                var deltaY = event.clientY - this.previousMousePosition.y;
                
                this.scene.angle_y += deltaX * 0.5;
                this.scene.angle_x += deltaY * 0.5;
                
                this.previousMousePosition = { x: event.clientX, y: event.clientY };
            }
        };

        this.animate = function() {
            var self = this;
            function renderLoop() {
                self.scene.render();
                requestAnimationFrame(renderLoop);
            }
            renderLoop();
        }

    } // End Konstruktor

    return Events;
})();

export { Events }