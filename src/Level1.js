import AFRAME from 'aframe';
import React, { Component } from 'react';

class Level1 extends Component {
  constructor(props) {
    super(props)
    this.maxBoxes = 100;
    this.availableBoxes = [];
  }

  getThisManyBoxes(nubmerOfBoxes){
    var boxes = [];
    for(var i =0; i < nubmerOfBoxes; i++){
      var box = getBoxWithStartingPosition();
      boxes.push(box);
      this.availableBoxes.push(box); 
  
    }
    return boxes;
  }

  render() {
    var boxestoAdd = this.getThisManyBoxes(this.maxBoxes);
    return (
      <React.Fragment>
        <a-entity falling-boxes-controller >
        {boxestoAdd}
        </ a-entity >

      </ React.Fragment>
    );
  }
}

export default Level1;

function getBoxWithStartingPosition(startingPositionVec3){
    if (!startingPositionVec3){
        startingPositionVec3 = {
            x: Math.random(100),
            y: 10,
            z: Math.random(100),
        }
    }
    return (<a-box
      dynamic-body
      position={`${startingPositionVec3.x} ${startingPositionVec3.y} ${startingPositionVec3.z}`}
      color="red" 
      key={`${startingPositionVec3.x} ${startingPositionVec3.y} ${startingPositionVec3.z}`} 
    />);  
}

var fallingBoxesControllerString = 'falling-boxes-controller';
AFRAME.registerComponent(fallingBoxesControllerString, {
  schema: {
    boxes: {type:'array'}
  },
  defaultHeight:15,
  init () {
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
  resetBoxesThatAreInactive(){
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
  play(){
    window.setInterval(this.dropBox.bind(this),1000)
  },
  pause:() => {}


});




// Boxes Should fall on a timer - be hittable by a stick  