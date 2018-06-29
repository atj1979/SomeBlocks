import AFRAME from 'aframe';

var fallingObjectsControllerString = 'falling-object-controller';
AFRAME.registerComponent(fallingObjectsControllerString, {
	schema: {
		radiusFromUser : { default: 1 },
		showDropLine : { default: true }
	},

	defaultHeight:15,
	init () {
		this.intervalTimerIds =[];
		this.allObjects = [];
		this.inactiveObjects = [];
		for(var i =0; i < this.el.children.length; i++){
			this.registerMe(this.el.children[i]);
		}
	},

	registerMe (el) {
		if (!el || !el.object3D) return;
		this.allObjects.push(el);
		this.inactiveObjects.push(el);
		el.object3D.visible = false;
	},

	unregisterMe (el) {
		var index = this.allObjects.indexOf(el);
		this.allObjects.splice(index, 1);
	},
	dropObjects(){
		var obj = this.inactiveObjects.pop();
		obj.object3D.visible = true;
		obj.object3D.position.set(Math.random() * 4, this.defaultHeight, Math.random() * 4);
		obj.setAttribute('dynamic-body', '');
	},
	resetObjectsThatAreInactive () {
		this.allObjects.forEach(function(obj) {
			if (obj.object3D.position.y < -5){
				obj.removeAttribute('dynamic-body'); // Romove physics calculations
				obj.object3D.position.setY(15);
				obj.object3D.visible = false;
			}
		});
	},

	tick (time, timeDelta) {
		this.resetObjectsThatAreInactive();
	},

	play (){
		var timerId = window.setInterval(this.dropObjects.bind(this),1000);
		this.intervalTimerIds.push(timerId);
	},

	pause () {
		this.intervalTimerIds.forEach(id => window.clearInterval(id));
	},
  
	remove (){
		this.allObjects.forEach(obj => this.unregisterMe(obj));
		this.el.removeObject3D('mesh');
	}
});