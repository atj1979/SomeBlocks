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
        { boxestoAdd }        
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


AFRAME.registerSystem('fallingBoxes', {
  init: function () {
    this.allBoxes = [];
    this.activeBoxes = [];
    this.inactiveBoxes = [];
  },

  registerMe: function (el) {
    this.allBoxes.push(el);
  },

  unregisterMe: function (el) {
    var index = this.allBoxes.indexOf(el);
    this.allBoxes.splice(index, 1);
  },
  tick:'',
  play:'',
  pause:''


});

AFRAME.registerComponent('fallingBoxes', {
  init: function () {
    this.system.registerMe(this.el);
  },

  remove: function () {
    this.system.unregisterMe(this.el);
  }
});

// Boxes Should fall on a timer - be hittable by a stick  