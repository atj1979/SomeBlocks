import React, { Component } from 'react';
require('./fallingObjectsController');
require('./breakingWallController');

class Level1 extends Component {
  constructor(props) {
    super(props);
    this.maxBoxes = 100;
    this.maxSpheres = 100;
    this.level1Name = 'level1';
  }
  getBoxElementWithStartingPosition(startingPositionVec3){
    if (!startingPositionVec3){
      startingPositionVec3 = {
        x: Math.random(100),
        y: 10,
        z: Math.random(100),
      };
    }
    return (<a-box
      // dynamic-body
      position={`${startingPositionVec3.x} ${startingPositionVec3.y} ${startingPositionVec3.z}`}
      color="red" 
      key={`${startingPositionVec3.x} ${startingPositionVec3.y} ${startingPositionVec3.z}`} 
    />);  
  }
  getSphereElement(){
    return (<a-sphere scale="0.2 0.2 0.2" color="yellow"/>);
  }
  getThisManyObjects(numberOfObjects, objectConstructor){
    var objects = [];
    for(var i =0; i < numberOfObjects; i++){
      var obj = objectConstructor();
      objects.push(obj);
    }
    return objects;
  }
  getRacket () {
    return (
      <a-entity> 
        <a-box id='handle' scale='5 1 1' />
        <a-box id='racket-head' scale='5 5 0' position='5 0 0' />
      </ a-entity>
    );
  }

  render() {
    var preCreatedBoxes = this.getThisManyObjects(this.maxBoxes, this.getBoxElementWithStartingPosition);
    var spheres = this.getThisManyObjects(this.maxSpheres, this.getSphereElement);
    return (
      <React.Fragment id={this.level1Namef}>
        <a-entity breaking-wall-controller >
          {preCreatedBoxes}
        </ a-entity >
        <a-entity falling-object-controller="showDropLine:true" >
          {spheres}
        </ a-entity>  
      </ React.Fragment>
    );
  }
}

export default Level1;
