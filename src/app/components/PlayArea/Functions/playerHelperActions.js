/* 
	Change active player
	@param {number} activePlayer - current active player (0 is player 1, 1 is player 2)
*/
export const changeActivePlayer = activePlayer => {
	return activePlayer === 0 ? 1 : 0;
};

/* 
	Get total
*/
const getSum = (total, num) => {
	return total + num;
};

/* 
	Calculate the total cards score
	@param {array} sortedPlayerCards - sorted cards (descending) of active player
	@param {number} remainingChips - remaining chips of active player
*/
export const calculateTotal = (sortedPlayerCards, remainingChips) => {
	let cardsToAdd = [];

	sortedPlayerCards.forEach((number, index) => {
		if (number - sortedPlayerCards[index + 1] > 1) {
			cardsToAdd.push(number);
		}
	});

	cardsToAdd.push(sortedPlayerCards[sortedPlayerCards.length - 1]);

	return cardsToAdd.reduce(getSum) - remainingChips;
};

/* 
	Add offered chips to player
	@param {object} activePlayer - active player object
	@param {number} offeredChips - number of chips offered on opened card
*/
export const addOfferedChipsToPlayer = (activePlayer, offeredChips) => {
	activePlayer.remainingChips += offeredChips;
};

/* 
	Remove chip from active player
	@param {object} activePlayer - active player object
*/
export const removeChipFromPlayer = activePlayer => {
	activePlayer.remainingChips--;
};

/* 
	Add card to active player
	@param {object} activePlayer - active player object
	@param {number} openedCard - opened card
*/
export const addCardToPlayer = (activePlayer, openedCard) => {
	activePlayer.cards = [...activePlayer.cards, openedCard];
};