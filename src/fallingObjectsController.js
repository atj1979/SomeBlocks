import AFRAME from 'aframe';
/* eslint-disable no-debugger */

var fallingObjectsControllerString = 'falling-object-controller';
AFRAME.registerComponent(fallingObjectsControllerString, {
  schema: {
    radiusFromUser : { default: 1 },
    showDropLine : { default: true }
  },

  init () {
    this.defaultHeight = 15;
    this.intervalTimerIds =[];
    this.allObjects = [];
    this.inactiveObjects = [];
    for(var i =0; i < this.el.children.length; i++){
      this.registerMe(this.el.children[i]);
    }
    this.dropLine = this.createDropPath();
  },

  createDropPath (){
    var aEntity = document.createElement('a-entity');
    aEntity.setAttribute('visible', false);
    aEntity.setAttribute('line', '');
    this.el.parentEl.append(aEntity);

    return aEntity;
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
    if (!obj || !obj.object3D) return;
    obj.object3D.visible = true;
    obj.object3D.position.set(Math.random() * 4, this.defaultHeight, Math.random() * 4);
    obj.setAttribute('dynamic-body', '');
    if (this.data.showDropLine){
      var dropLinePositionStart = obj.object3D.position.clone();
      var dropLinePositionEnd = dropLinePositionStart.clone().setY(0);
      var lineAttributes =
        `start: ${dropLinePositionStart.x} ${dropLinePositionStart.y} ${dropLinePositionStart.z}; \
        end: ${dropLinePositionEnd.x} ${dropLinePositionEnd.y} ${dropLinePositionEnd.z}; \
        color: green;`;
      this.dropLine.object3D.visible = true;
      this.dropLine.setAttribute('line', lineAttributes);
    }
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