import React, { createContext, useContext, useState } from 'react';
import styles from './Zoomable.module.css';

const ZoomContext = createContext();

function Zoomable ({ initialZoom = 1.0, ...props }) {
	const [zoomLevel, setZoomLevel] = useState(initialZoom);

	function zoomIn (increment = 0.1) {
		setZoomLevel(prev => prev + increment);
	}

	function zoomOut (decrement = 0.1) {
		setZoomLevel(prev => prev - decrement);
	}

	const providerValue = {
		zoomLevel,
		setZoomLevel,
		zoomIn,
		zoomOut,
	};

	return (
		<ZoomContext.Provider value={providerValue}>
			{props.children}
		</ZoomContext.Provider>
	);
}

function Controls (props) {
	const { zoomIn, zoomOut } = useContext(ZoomContext);

	return (
		<div {...props} className={`${styles.ZoomControls} ${props.className ?? ''}`}>
			<button onClick={() => zoomIn()}>+</button>
			<button onClick={() => zoomOut()}>-</button>
		</div>
	);
}

function Area (props) {
	const { zoomLevel } = useContext(ZoomContext);

	return (
		<div
			{...props}
			className={styles.ZoomArea}
		>
			<div
				style={{
					transform: `scale(${zoomLevel})`,
					transformOrigin: '0% 0% 0px',
					outline: '1px dotted blue',
				}}
			>
				{props.children}
			</div>
		</div>
	);
}

Zoomable.Controls = Controls;
Zoomable.Area = Area;

export default Zoomable;
