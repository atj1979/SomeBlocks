import AFRAME from 'aframe';
import * as THREE from 'three';
/* eslint-disable no-debugger */
var fallingObjectsControllerString = 'breaking-wall-controller';
AFRAME.registerComponent(fallingObjectsControllerString, {
  schema: {
  },

  init() {
    this.planeName = '';
    this.sizeOffsetFactor = 1.00000000000000000000;
    this.gridHeight = 5;
    this.gridWidth = 9;
    this.gridStartingPositionBottomLeft = new THREE.Vector3();
    this.intervalTimerIds = [];
    this.allObjects = [];
    this.inactiveObjects = [];
    for (var i = 0; i < this.el.children.length; i++) {
      this.registerMe(this.el.children[i]);
    }
 
  },

  registerMe(el) {
    if (!el || !el.object3D) return;
    this.allObjects.push(el);
    this.inactiveObjects.push(el);
    el.object3D.visible = false;
    el.removeAttribute('dynamic-body');
  },

  unregisterMe(el) {
    var index = this.allObjects.indexOf(el);
    this.allObjects.splice(index, 1);
  },
	
  createPlatformToPlaceObjects(){
    var plane = document.createElement('a-plane');
    plane.setAttribute('static-body', '');
    plane.setAttribute('height', 1);
    plane.setAttribute('width', this.gridWidth); 
    plane.setAttribute('rotation','-90 0 0');
    plane.object3D.position.set(0,0.00000001, -15);
    plane.object3D.name = this.planeName = 'this.object3D.uuid';
    this.el.append(plane);
  },
	
  placeObjects() {
    var boundingBox = new THREE.Box3();
    var size = new THREE.Vector3(1,1,1);
    if (this.inactiveObjects.length < this.gridHeight * this.gridWidth) console.warn('not enough boxes');
    for (var i =0; i < this.gridHeight * this.gridWidth; i++){
      var obj = this.inactiveObjects.pop();
      boundingBox.setFromObject(obj.object3D).getSize(size);
      if (!obj || !obj.object3D) return;
      var row = Math.floor(i/this.gridWidth + 1);
      var column = i % this.gridWidth;
      obj.object3D.position.set(
        size.x * this.sizeOffsetFactor * column, 
        size.y * this.sizeOffsetFactor * row ,
        -15
      );
      // offset the x position by half the width
      var Xoffset = new THREE.Vector3(this.gridWidth/2 - size.x/2,0,0);
      obj.object3D.position.sub(Xoffset);
      obj.object3D.visible = true;
      obj.setAttribute('constraint', 'target: a-box; type: lock; maxForce: 100');
      obj.setAttribute('dynamic-body', '');
      
    }
  },
  resetObjectsThatAreInactive() {
    this.allObjects.forEach(function (obj) {
      if (obj.object3D.position.y < -5) {
        obj.removeAttribute('dynamic-body'); // Romove physics calculations
        obj.object3D.position.setY(15);
        obj.object3D.visible = false;
      }
    });
  },

  tick(time, timeDelta) {
    this.resetObjectsThatAreInactive();
  },

  play() {
    this.createPlatformToPlaceObjects(this.el);
    this.placeObjects();
  },

  pause() {
    this.intervalTimerIds.forEach(id => window.clearInterval(id));
  },

  remove() {
    this.allObjects.forEach(obj => this.unregisterMe(obj));
    this.el.removeObject3D('mesh');
    this.el.removeObject3D(this.planeName);
  }
});

