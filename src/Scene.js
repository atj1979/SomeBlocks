import 'aframe';
import 'aframe-physics-system';

import React, { Component } from 'react';
import Controls from './Controls';
import Level1 from './Level1';


class Scene extends Component {
  render() {
    return (
      <a-scene physics="debug: true;" stats>
        <a-plane color="blue" height="100" width="100" rotation="-90 0 0"></a-plane>
        <Controls />
        <Level1 />
        <a-box color="red" position="0 2 -5" rotation="0 45 45" scale="2 2 2"></a-box>
        
      </a-scene>
    );
  }
}

export default Scene;