// @ts-check




let p1drew = document.querySelector('#p1-drew');
let p2drew = document.querySelector('#p2-drew');

let turnResult = document.querySelector('#turn-result');
let warbox = document.querySelector('#warbox');


const suits = ['S', 'H', 'D', 'C'];
const ranks = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
//constructors are: Game, Cards, Deck, Player



function Card({suit, rank}) {
    this.suit = suit;
    this.rank = ranks.indexOf(rank);
    this.name = `${rank}${suit}`;
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

    this.cards = shuffle(this.cards);

}

function shuffle(items) {
    let currentIndex = items.length,  randomIndex;

    // While there remain elements to shuffle...
    while (currentIndex != 0) {

        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        // And swap it with the current element.
        [items[currentIndex], items[randomIndex]] = [
            items[randomIndex], items[currentIndex]
        ];
    }
    return items;
}





function Player(name, game) {
    // player's hand (array) passed from game
    // player's score (number of cards they have)
    // the player's score is hand.length
    // play until one of the players has 0 cards left

    // top card in play for each player
    // cards in play-- in the beginning one card-- if it's war, adds 4 cards to the 1 already in play
    // if both players draw the same card.value
    // this.topCard = hand[hand.length - 1];
    // this.score = hand.length;
    // this.cardsInPlay = [];

    /**
    * @type {Card[]}
    */
    this.hand = [];

    this.game = game;

    this.name = name;

}

Player.prototype.drawCard = function () {
    let card1 = this.hand.pop();

    if (card1) {
        this.game.stack.push(card1);
    }

    return card1;
}

Player.prototype.drawCards = function (count) {
    for (let n = 0; n < count; n++) {
        this.drawCard();
    }
}





function Game() {



    //setting up game here
    //   Deck.call(this);

    /**
    * @type {Card[]}
    */
    this.stack = [];

    this.player1 = new Player("Fredna", this);
    this.player2 = new Player("Debbie", this);
    this.deck = new Deck();



}

Game.prototype.deal = function () {
    this.player1.hand = [];
    this.player2.hand = [];


    this.deck.cards.forEach((card, index) => {
        if (index % 2 === 0) {
            this.player1.hand.push(card);
        } else {
            this.player2.hand.push(card);
        }
    });
}

Game.prototype.start = function () {
    this.deck.shuffle()
    this.deal()
}

Game.prototype.flipCards = function () {
   let card1 = this.player1.drawCard();
    let card2 = this.player2.drawCard();

    if (card1) {
        p1drew.textContent = `${this.player1.name} drew ${card1.name}`
    } else {
            p1drew.textContent = `${this.player1.name} ran out of cards`

    }
    if (card2) {
            p2drew.textContent = `${this.player2.name} drew ${card2.name}`

    } else {
    p2drew.textContent = `${this.player2.name} ran out of cards`

    }


        return [card1, card2]

}

Game.prototype.draw = function () {

     warbox.innerHTML = ""

        let [card1, card2] = this.flipCards();


    // compare the cards
    if (card1.rank === card2.rank) {
         warbox.innerHTML += `<br>Players drew the same cards ${card1.name} and ${card2.name}.`
        warbox.innerHTML += `<br> Going to war...`;
        [card1, card2] = this.goToWar();
    }

    if (!card1) {
        return {type: 'win', player: this.player2}
    }

    if (!card2) {
        return {type: 'win', player: this.player1}
    }

    if (card1.rank < card2.rank) {
        return this.giveCardsTo(this.player2)
    }

    if (card1.rank > card2.rank) {
        return this.giveCardsTo(this.player1);
    }

        return {type: 'draw', player: null}
}

Game.prototype.giveCardsTo = function (player) {
    console.log("%s adds %d cards to their hand", player.name, this.stack.length)

    // shuffling cards and returning them back to the hand
    // There are 2 reasons:
    // 1. players can count cards when they have a small hand,
    // 2. when given a small hand players will often get into a loop when they have a high card

    player.hand.unshift(...shuffle(this.stack));

    console.log(this.player1.hand.map(card => card.name).join(' '));
    console.log(this.player2.hand.map(card => card.name).join(' '));

    this.stack = [];

    if (player.hand.length === this.deck.cards.length) {
        return { type: 'win', player }
    }

    return { type: 'go again', player }
}


Game.prototype.goToWar = function () {
    console.log("goToWar")

    this.player1.drawCards(3)
    this.player2.drawCards(3)

    let [card1, card2] = this.flipCards();



    if (card1?.rank === card2?.rank) {
 warbox.innerHTML += `<br>Players drew the same cards ${card1.name} and ${card2.name}.`
    warbox.innerHTML += `<br> Going to war...`

        return this.goToWar();
    }

    return [card1, card2]
}



// let currentCard = new Card();
// console.log({currentCard});

let currentGame = new Game();

// currentGame.deal(this.card);


let startButton = document.querySelector('#start-btn');
let drawBtn = document.querySelector('#draw-btn');

startButton.addEventListener('click', () => {
    currentGame.start();

    startButton.style.display = "none";
    drawBtn.style.display = "inline";

    turnResult.textContent = "";
    warbox.textContent = "";

});


drawBtn.addEventListener('click', () => {
    let result = currentGame.draw();

    if (result.type === "win") {
        turnResult.textContent = `Congratulations ${result.player.name}`
        startButton.style.display = "inline";
        drawBtn.style.display = "none";
    } else if (result.type === "draw") {
        turnResult.textContent = `You tied, please play again`
        startButton.style.display = "inline";
        drawBtn.style.display = "none";
    } else if (result.type === "go again") {
        turnResult.textContent = `${result.player.name} won the turn, please draw another card`
    }



});




// "click Start Game" Start the game

// Hide the draw button

// Show the draw button



// click "draw"



