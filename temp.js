function getDeck()
{
	var deck = new Array();

	for(var i = 0; i < suits.length; i++)
	{
		for(var x = 0; x < values.length; x++)
		{
			var card = {Value: values[x], Suit: suits[i]};
			deck.push(card);
		}
	}

	return deck;
}; 
console.log(getDeck());
// creates a deck of cards as an array of objects

var getDeck() = deck1;

const drawBtn = document.querySelector('draw-btn');

drawBtn.addEventListener('click', function (){
    
    deck[Math.floor(Math.random() * deck.length)];
}); 
console.log(drawBtn)
