// @ts-check

const suits = ['Spades', 'Hearts', 'Diamonds', 'Clubs'];
const ranks = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
//constructors are: Game, Cards, Deck, Player



function Card({suit, rank}) {
    this.suit = suit;
    this.rank = ranks.indexOf(rank);
    this.name = `${rank} of ${suit}`;
};


function Deck() {
    /**
     * @type {Card[]}
     */
    this.cards = [];

    suits.forEach( suit => {
        // console.log(suit)
        ranks.forEach( rank => {
            // console.log(value)
            this.cards.push(new Card({
                suit: suit,
                rank: rank,
            }));
        })
    })
};

Deck.prototype.shuffle = function () {
    let currentIndex = this.cards.length,  randomIndex;

    // While there remain elements to shuffle...
    while (currentIndex != 0) {

        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        // And swap it with the current element.
        [this.cards[currentIndex], this.cards[randomIndex]] = [
            this.cards[randomIndex], this.cards[currentIndex]
        ];
    }
}







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
    this.hand = hand;



}





function Game() {



    //setting up game here
    //   Deck.call(this);
    /**
     * @type {Card[]}
     */
    this.player1Hand = [];
    /**
     * @type {Card[]}
     */
    this.player2Hand = [];
    /**
     * @type {Card[]}
     */
    this.stack = [];

    this.player1 = new Player(this.player1Hand);
    this.player2 = new Player(this.player2Hand);
    this.deck = new Deck();



}

Game.prototype.deal = function () {
    this.deck.cards.forEach((card, index) => {
        if (index % 2 === 0) {
            this.player1Hand.push(card);
        } else {
            this.player2Hand.push(card);
        }
    });
}

Game.prototype.start = function () {
    this.deck.shuffle()
    this.deal()
}

Game.prototype.draw = function () {
    // draw player1
    let card1 = this.drawCard(this.player1Hand);
    //draw player2
    let card2 = this.drawCard(this.player2Hand);

    console.log('player 1 drew', card1);
    console.log('player 2 drew', card2);

    this.stack.push(card1, card2);

    //compare the cards
    if (card1.rank === card2.rank) {
        //deal war
        [card1, card2] = this.goToWar();
    }
    //give cards
    // what if you draw at end of War?

    if (card1.rank < card2.rank) {
        this.player2Hand.unshift(...this.stack);
        this.stack = [];

        return "Player 2 wins!"

    }

     if (card1.rank > card2.rank) {
         this.player1Hand.unshift(...this.stack);
         this.stack = [];

         return "Player 1 wins!"

    }

    return "Draw"
}

Game.prototype.drawCard = function (hand) {
    let card1 = hand.pop();

    this.stack.push(card1);
    return card1;
}

Game.prototype.goToWar = function () {
    console.log("goToWar")

    this.drawCard(this.player1Hand);
    this.drawCard(this.player1Hand);
    this.drawCard(this.player1Hand);
    let card1 = this.drawCard(this.player1Hand);

    this.drawCard(this.player2Hand);;
    this.drawCard(this.player2Hand);;
    this.drawCard(this.player2Hand);;
    let card2 = this.drawCard(this.player2Hand);


    if (card1.rank === card2.rank) {
        return this.goToWar();
    }

    return [card1, card2]
}



// let currentCard = new Card();
// console.log({currentCard});

let currentGame = new Game();
currentGame.start()

console.log(currentGame.draw(), currentGame);

// currentGame.deal(this.card);



// let drawBtn = document.querySelector('#draw-btn');
// drawBtn.addEventListener('click', () => {

//     // alert(`You drew a(n) ${topCard.cardName}`);
//     alert(`You drew a(n) ${this.topCard}`);
// });




