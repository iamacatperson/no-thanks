import React from "react";

import "./Chips.scss";

export default function chips({ chips }) {
	return (
		<div className="chips">
			<ul className="chips__list">
				{[...Array(chips)].map((chip, index) => <li key={index} className="chips__chip" />)}
			</ul>
		</div>
	);
}