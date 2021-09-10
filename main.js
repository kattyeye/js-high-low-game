const suits = ['Spades', 'Hearts', 'Diamonds', 'Clubs'];
const values = ['A', 'K', 'Q', 'J', '2', '3', '4', '5', '6', '7', '8', '9', '10'];

function Deck() { 
    this.deck = [];

    suits.forEach( suit => {
        console.log(suit)
        values.forEach( value => {
            console.log(value)
            this.deck.push({
                suit: suit,
                value: value,
                cardName: `${value} of ${suit}`,
            });
    
        })

    })
    // console.log({olddeck:this.deck});

        //shuffling deck
        let currentIndex = this.deck.length,  randomIndex;
      
        // While there remain elements to shuffle...
        while (currentIndex != 0) {
      
          // Pick a remaining element...
          randomIndex = Math.floor(Math.random() * currentIndex);
          currentIndex--;
          // And swap it with the current element.
          [this.deck[currentIndex], this.deck[randomIndex]] = [
            this.deck[randomIndex], this.deck[currentIndex]];
        }

    // console.log({deck:this.deck});
};


function Card(suit, value) {
    this.card = {
        suit: suit,
        value: value,
        cardName: `${value} of ${suit}`,
    }

    console.log({card: this.card});
 
 };

Card(suits[2], values[5]);


function Player(hand) {
    // player's hand (array) passed from game
    // player's score (number of cards they have)
    // the player's score is hand.length
    // play until one of the players has 0 cards left

    // top card in play for each player
    // cards in play-- in the beginning one card-- if it's war, adds 4 cards to the 1 already in play
    // if both players draw the same card.value
    this.topCard = hand[hand.length - 1];
    this.score = hand.length;
    this.cardsInPlay = [];

console.log({topCard: this.topCard});
console.log({score: this.score});
}


Player(
    [
        {
            suit: suits[0],
            value: values[0],
            cardName: `${values[0]} of ${suits[0]}`,
        }, 
        {
            suit: suits[1],
            value: values[1],
            cardName: `${values[1]} of ${suits[1]}`,
        }, 
        {
            suit: suits[2],
            value: values[2],
            cardName: `${values[2]} of ${suits[2]}`,
        }, 
    ]
)

function Game() {


    
     // console.log(Cards(cardName))
     
     // function Deck(v, s) {
     
     
     
     // console.log(deck); //logs 52 cards
     // }
     

      let deck = Deck.call(this);
      

}

let currentGame = new Game();
console.log(currentGame);





//constructors are: Game, Cards, Deck
// const newGame = new Game();
// function Game() {

// }
