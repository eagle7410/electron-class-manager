import React from 'react';
import './LoadAnimation.css';

const LoadAnimation = (state) => {
	let cont = [];
	for (let i = 1; i<6; ++i)
		cont.push(<div className={`sk-rect sk-rect${i}`} key={`dk-rect${i}`}/>);

	return (
		<div>
			{state.isNoLabel ? '' : <div>Loading...</div>}
			<div className="sk-wave">{cont}</div>
		</div>
	);
};

export default  LoadAnimation;
