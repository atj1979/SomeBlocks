import 'aframe';

import React, { Component } from 'react';


class Controls extends Component {
	render() {
		return (
			<a-entity>
				<a-entity id="leftHand" hand-controls="left"></a-entity>
				<a-entity id="rightHand" hand-controls="right"></a-entity>
			</ a-entity>
		);
	}
}

export default Controls;
