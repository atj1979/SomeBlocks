import 'aframe';

import React, { Component } from 'react';


class Controls extends Component {
  render() {
    return (
      <a-entity>
        <a-entity id="leftHand" hand-controls="left" position='0 .9 -2' />
        <a-entity id="rightHand" hand-controls="right" position='0 1.1 -2' />
      </ a-entity>
    );
  }
}

export default Controls;
