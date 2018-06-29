import AFRAME from 'aframe';

var fallingBoxesControllerString = 'breaking-wall-controller';
AFRAME.registerComponent(fallingBoxesControllerString, {
	defaultHeight:15,
	init () {
		this.intervalTimerIds =[];
		this.allBoxes = [];
		this.inactiveBoxes = [];
		for(var i =0; i < this.el.children.length; i++){
			this.registerMe(this.el.children[i]);
		}
	},

	registerMe (el) {
		this.allBoxes.push(el);
		this.inactiveBoxes.push(el);
		el.object3D.visible = false;
	},

	unregisterMe (el) {
		var index = this.allBoxes.indexOf(el);
		this.allBoxes.splice(index, 1);
	},
	dropBox(){
		var box = this.inactiveBoxes.pop();
		box.object3D.visible = true;
		box.object3D.position.set(Math.random() * 4, this.defaultHeight, Math.random() * 4);
		box.setAttribute('dynamic-body', '');
	},
	resetBoxesThatAreInactive () {
		this.allBoxes.forEach(function(box) {
			if (box.object3D.position.y < -5){
				box.removeAttribute('dynamic-body'); // Romove physics calculations
				box.object3D.position.setY(15);
				box.object3D.visible = false;
			}
		});
	},
	tick (time, timeDelta) {
		this.resetBoxesThatAreInactive();
	},
	play (){
		var timerId = window.setInterval(this.dropBox.bind(this),1000);
		this.intervalTimerIds.push(timerId);
	},
	pause () {
		this.intervalTimerIds.forEach(id => window.clearInterval(id));
	},
	remove (){
		this.allBoxes.forEach(box => this.unregisterMe(box));
		this.el.removeObject3D('mesh');
	}
});