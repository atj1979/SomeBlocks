import React, { Component } from 'react';
require('./fallingBoxesController');

class Level1 extends Component {
  constructor(props) {
    super(props)
    this.maxBoxes = 100;
  }
  getBoxWithStartingPosition(startingPositionVec3){
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
  getThisManyBoxes(numberOfObjects){
    var boxes = [];
    for(var i =0; i < numberOfObjects; i++){
      var box = this.getBoxWithStartingPosition();
      boxes.push(box);
    }
    return boxes;
  }

  render() {
    var preCreatedBoxes = this.getThisManyBoxes(this.maxBoxes);
    return (
      <React.Fragment>
        <a-entity falling-object-controller >
          {preCreatedBoxes}
        </ a-entity >
      </ React.Fragment>
    );
  }
}

export default Level1;
