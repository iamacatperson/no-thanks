/* 
	Generates the card list which is a number from 3 to 35
	Uses shuffleCards() to shuffle the list of cards
*/
const generateAllCards = () => {
	let allCards = [];

	for (let card = 3; card <= 35; card++) {
		allCards.push(card);
	}
	
	return shuffleCards(allCards);
};

/* 
	Shuffles the card deck
	@param {array} cardDeck - list of all the 33 cards in ascending order
*/
const shuffleCards = cardDeck => {
	let shuffled = cardDeck
		.map(a => ({ sort: Math.random(), value: a }))
		.sort((a, b) => a.sort - b.sort)
		.map(a => a.value);

	return shuffled;
};

/* 
	Removes random 9 cards from the deck	
	Uses generateAllCards() to get the list of generated cards
*/
export const removeNineCards = () => {
	let generatedCards = generateAllCards();
	let totalNumOfCards = generatedCards.length;

	for (let cardToRemove = 9; cardToRemove > 0; cardToRemove--) {
		const randomCard = Math.floor(Math.random() * totalNumOfCards);
		totalNumOfCards--;
		generatedCards.splice(randomCard, 1);
	}

	return generatedCards;
};

/* 
	Sort numbers in descending order
*/
const sortNumberDescending = (a, b) => {
	return b - a;
};

/* 
	Sort the cards in descending order
*/
export const sortPlayCards = playerCards => {
	return playerCards.sort(sortNumberDescending);
};