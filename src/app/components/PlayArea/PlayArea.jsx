import React, { Component } from "react";

import Deck from "./Deck/Deck.jsx";
import Player from "./Player/Player.jsx";
import Chips from "./Chips/Chips.jsx";

import { removeNineCards, sortPlayCards } from "./Functions/initCards.js";

import {
	changeActivePlayer,
	calculateTotal,
	addOfferedChipsToPlayer,
	removeChipFromPlayer,
	addCardToPlayer
} from "./Functions/playerHelperActions.js";

import "../../base/styles.scss";
import "./PlayArea.scss";

export default class PlayArea extends Component {
	constructor(props) {
		super(props);
		this.state = {
			playableCards: [],
			openedCard: null,
			winner: null,
			message: "Start of the game!",
			offeredChips: 0,
			activePlayer: 0, // first player is 0, second player is 1
			isGameOver: false,
			players: [
				{
					name: "Ava",
					remainingChips: 11,
					cards: [],
					score: null
				},
				{
					name: "Daxi",
					remainingChips: 11,
					cards: [],
					score: null
				}
			]
		};
	}

	componentDidMount() {
		this.getPlayableCards();
	}

	/* 
		Gets the playable cards
	*/
	getPlayableCards = () => {
		const playableCards = [...removeNineCards()];
		this.setState({ playableCards: playableCards }, () => this.openCard());
	};

	/* 
		Opens the top card of the deck
	*/
	openCard = () => {
		const { openedCard, playableCards } = this.state;

		if (playableCards.length > 0) {
			this.setState({
				openedCard: this.state.playableCards[0]
			});
		} else {
			this.setState({
				isGameOver: true
			}, () => this.getWinner());
		}
	};

	/* 
		Take card
	*/
	takeCard = () => {
		const {
			activePlayer,
			players,
			playableCards,
			offeredChips,
			openedCard
		} = this.state;

		let nextPlayableCards = [];
		const playersClone = [...players];
		const activePlayerClone = playersClone[activePlayer];

		if (playableCards.length !== 0) {
			addCardToPlayer(activePlayerClone, openedCard);
			addOfferedChipsToPlayer(activePlayerClone, offeredChips);

			nextPlayableCards = playableCards.filter(card => {
				return card !== openedCard;
			});

			this.setState(
				prevState => {
					return {
						playableCards: nextPlayableCards,
						activePlayer: changeActivePlayer(activePlayer),
						players: playersClone,
						openedCard: null,
						offeredChips: 0,
						message: `${activePlayerClone.name} took the card!`
					};
				},
				() =>
					this.calculateScore(
						activePlayer,
						players[activePlayer].remainingChips
					)
			);
		}
	};

	/* 
		Reject card
	*/
	rejectCard = () => {
		const { activePlayer, players, openedCard, playableCards } = this.state;
		let playersClone = [...players];

		if (playableCards.length !== 0) {
			if (players[activePlayer].remainingChips > 0) {
				removeChipFromPlayer(playersClone[activePlayer]);

				this.setState(
					prevState => {
						return {
							activePlayer: changeActivePlayer(activePlayer),
							players: playersClone,
							message: `${
								players[activePlayer].name
							} said, "No thanks!"`,
							offeredChips: prevState.offeredChips + 1
						};
					},
					() =>
						this.calculateScore(
							activePlayer,
							players[activePlayer].remainingChips
						)
				);
			} else {
				this.setState({
					message:
						"You have no more chips! Please take the card."
				});
			}
		}
	};

	/* 
		Calculate score
	*/
	calculateScore = (activePlayer, remainingChips) => {
		const { players } = this.state;
		const activePlayerCards = players[activePlayer].cards;
		const sortedActivePlayerCards = sortPlayCards(activePlayerCards);
		let playersClone = [...players];

		playersClone[activePlayer].score = calculateTotal(
			sortedActivePlayerCards,
			remainingChips
		);
		this.setState({ players: playersClone }, () => this.openCard());
	};

	/* 
		Get the game winner
	*/
	getWinner = () => {
		const { players } = this.state;

		if(players[0].score > players[1].score) {
			this.setState({ winner: 1 })
		} else {
			this.setState({ winner: 0 })
		}

	}

	render() {
		const {
			openedCard,
			playableCards,
			players,
			offeredChips,
			activePlayer,
			message,
			winner,
			isGameOver
		} = this.state;

		return (
			<div className="playArea flex flex-justify-between">
				<div className="playArea__card-area flex flex-justify-center flex-direction-column">
					<div className="flex flex-justify-start">
						<Deck
							openedCard={openedCard}
							playableCards={playableCards}
						/>
					</div>

					<div className="playArea__chips">
						<Chips chips={offeredChips} />
					</div>

					{winner !== null ? <p className="playArea__winner">{players[winner].name}<br />won<br />the<br />game!</p> : <p></p>}

					{!isGameOver && message && <p className="playArea__messages">{message}</p>}

					{!isGameOver && 
					<p className="playArea__cards-remaining">
						Cards Remaining: {playableCards.length}
					</p>}
				</div>

				<div className="playArea__player-area flex flex-justify-center flex-direction-column">
					<div className="playArea__playersContainer">
						<Player
							players={players}
							player={players[0]}
							activePlayer={activePlayer}
							isGameOver={isGameOver}
						/>
						<Player
							players={players}
							player={players[1]}
							activePlayer={activePlayer}
							isGameOver={isGameOver}
						/>
					</div>

					<div className="playArea__button-group flex flex-justify-between">
						<button onClick={() => this.takeCard()}>
							Take Card
						</button>
						<button onClick={() => this.rejectCard()}>
							No Thanks!
						</button>
					</div>
				</div>
			</div>
		);
	}
}