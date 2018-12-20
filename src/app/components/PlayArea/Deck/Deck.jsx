import React from "react";

import "../../../base/styles.scss";
import "./Deck.scss";

export default function Deck({ openedCard, playableCards }) {

	const playableCardsClone = [...playableCards];
	playableCardsClone.shift();

	return (
		<div className="deck flex flex-justify-between">
			<div className="deck__unopened-cards-group">
				{playableCardsClone.map((card, index) => (
						<div
							key={index}
							className="deck__card deck__unopened-cards"
							style={{ bottom: index }}
						/>
					))}
			</div>
			{openedCard && (
				<div className="deck__card deck__opened-card">{openedCard}</div>
			)}
		</div>
	);
}