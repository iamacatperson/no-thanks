import React from "react";

import Chips from "../Chips/Chips.jsx";

import "./Player.scss";

export default function Player({ players, player, activePlayer, isGameOver }) {
	const playerIndex = players.indexOf(player);

	return (
		<div
			className={`player ${playerIndex === activePlayer &&
				"player--active"}`}
		>
			<h2>
				<strong>
					{player.name} {isGameOver && `(${player.score})`}
				</strong>
			</h2>

			<ul className="player__cards">
				{player.cards.map((card, index) => {
					return (
						<li
							key={index}
							className={`player__card ${
								card - player.cards[index + 1] === 1
									? "player__cards-sticky"
									: null
							}`}
						>
							{card}
						</li>
					);
				})}
			</ul>

			<Chips chips={player.remainingChips} />
		</div>
	);
}