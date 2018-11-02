let Game = {
    deck: null,    
    players: {},
    playersTurn: null,
    turnDirection: 1,
    topCard: null,
    topCardColor: null,
    topCardValue:null
}

function makeNewCards(){
    const cards = [
        'red_0',
        'red_1', 'red_2', 'red_3', 'red_4', 'red_5', 'red_6', 'red_7', 'red_8', 'red_9',
        'red_1', 'red_2', 'red_3', 'red_4', 'red_5', 'red_6', 'red_7', 'red_8', 'red_9',
        'red_skip', 'red_reverse', 'red_draw_two',
        'red_skip', 'red_reverse', 'red_draw_two',
        
        'green_0',
        'green_1', 'green_2', 'green_3', 'green_4', 'green_5', 'green_6', 'green_7', 'green_8', 'green_9',
        'green_1', 'green_2', 'green_3', 'green_4', 'green_5', 'green_6', 'green_7', 'green_8', 'green_9',
        'green_skip', 'green_reverse', 'green_draw_two',
        'green_skip', 'green_reverse', 'green_draw_two',
        
        'blue_0',
        'blue_1', 'blue_2', 'blue_3', 'blue_4', 'blue_5', 'blue_6', 'blue_7', 'blue_8', 'blue_9',
        'blue_1', 'blue_2', 'blue_3', 'blue_4', 'blue_5', 'blue_6', 'blue_7', 'blue_8', 'blue_9',
        'blue_skip', 'blue_reverse', 'blue_draw_two',
        'blue_skip', 'blue_reverse', 'blue_draw_two',
        
        'yellow_0',
        'yellow_1', 'yellow_2', 'yellow_3', 'yellow_4', 'yellow_5', 'yellow_6', 'yellow_7', 'yellow_8', 'yellow_9',
        'yellow_1', 'yellow_2', 'yellow_3', 'yellow_4', 'yellow_5', 'yellow_6', 'yellow_7', 'yellow_8', 'yellow_9',
        'yellow_skip', 'yellow_reverse', 'yellow_draw_two',
        'yellow_skip', 'yellow_reverse', 'yellow_draw_two',
        
        'wild_draw_four','wild_draw_four', 'wild', 'wild',
        'wild_draw_four','wild_draw_four', 'wild', 'wild',
    ]    
    
    return cards
}

// create a function that takes an array of cards 
// and returns a new array of shuffled cards
function shuffle( cards ){
    // create an array to hold the shuffled cards
    const deck = [ ]
    // algorithm to shuffle a deck of cards
    // as long as there are cards in the cards array
    while (cards.length > 0) {
        // pick a random number between 0 and the length of the cards array
        let randomNumber = Math.floor(Math.random() * cards.length)
        // then use that number to pick a card
        let card = cards[randomNumber]
        // console.log('card is '+card)
        // push that card onto the new deck
        deck.push(card)
        // remove the card from the original deck
        cards.splice(randomNumber, 1)        
    }
    return deck
}

function dealCard(deck){
    return deck.shift()
}

function startNewGame(){
    // create a new set of cards 
    let cards = makeNewCards()
    // shuffle those cards
    let deck = shuffle(cards)
    // and attach them to the Game object
    Game.deck = deck
    
    // add up to four players to the Game object
    //                        0           1           2           3 
    const playerNames = ["Kimberlina", "Ismael", "Albertito", "Jeremy" ]
    const ALPHABET = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I']
    for (let i = 0; i < playerNames.length; i++) {
        // get the player name 
        let name = playerNames[i]
        let id = ALPHABET[i]
        let player = createNewPlayer(name, id)
        Game.players[id] = player
    }
    
    // flip the top on the deck over to start the game
    let discard = dealCard(Game.deck)
    Game.topCard = discard
    
    let color = getCardColor(discard)
    let val = getCardValue(discard)
    Game.topCardColor = color
    Game.topCardValue = val
    
    let topCard = document.querySelector('#deck')
    topCard.setAttribute('src', 'images/'+discard+'.png')
    
    Game.playersTurn = 'A'
    
    showGameObject()
}

function createNewPlayer( playerName, id ){
    // every player has to have a name
    // cards
    // points
    let player = {
        id: id,
        name: playerName,
        cards: [ ],
        points: 0
    }
    
    for (let i = 0; i < 7; i++){
        let card = dealCard(Game.deck)
        player.cards.push(card)
    }
    
    return player
}

function showGameObject(){
    var codeSection = document.querySelector('#game-object')
    codeSection.innerHTML = JSON.stringify(Game, null, 2)
}

function changePlayersTurn(){
    const ALPHABET = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I']
}
//
function getCardColor(cardName){
    //take the string cardName and split the word
    const splitCard = cardName.split('_')//['blue', '7']
    //then..
    const color = splitCard[0] // 'blue'
    //then..
    return color
    //return..
}

//ex. "blue_7"
function getCardValue(cardName){
    //take the string cardName and split at underscore
    const splitCard = cardName.split('_')
    //then take index 1(second value in array)
    let val = splitCard[1]
    //if the length of the splitCard array is 3
    //then grab the value at index 2
    //and concatenate it on to the end of the val variable
    if (splitCard. length === 3) {
        val += '_'+splitCard[2]
    }
    return val
    
}
//output 7


//things we need to know :
//who's turn is it?
//direction the turn is going
function changePlayerTurn(){
    //get the Alphabet
    const ALPHABET = Object.keys(Game.players)
    //get the id of whos turn it is
    const currentPlayerId = Game.playersTurn
    //get which direction the turn it's going
    const currentDirection = Game.turnDirection
    //move the curent player's turn one position in which direction it's supposed to move in.
        //first, get the index of the player's turn in the alphabet
    const index = ALPHABET.indexOf(currentPlayerId)
        //change that index by the direction number
    let newIndex = index + currentDirection
        //if index is less then 0, set it to the idex of the last player's id
    const keys = Object.keys(Game.players)
    const numPlayers = keys.length
    if(newIndex < 0){
        //get number of players playing
        newIndex = ALPHABET.length - 1
        //get the index of the last player's id
    }
        //if ...
    if(newIndex >= ALPHABET.length){
        newIndex = 0
    }
        //then get the id of the new index in the alphabet array
    const newPlayersTurn = ALPHABET[newIndex]
    Game.playersTurn = newPlayersTurn
    //change the Game.playerTurn to the next player's turn
}

// function getNumberOfCard(){}
function playCard(playerId, cardName){
    let color = getCardColor(cardName)
    let val = getCardValue(cardName)
    let isCardPlayable = cardIsPlayable(color,val)
    // has to make sure player can set a card down
    // trigger to different affects
    
    if (val === 'skip'){
        skipTurn()
    }
    if (val === 'reverse'){
        reverseTurn()
    }
    if (val === 'wild'){
        playWildCard()
    }
    if (val === 'draw_two'){
        playerDrawTwo()
    }
    if (val === 'draw_four'){
        playerDrawFour()
    }
    


function playerDrawCard(playerId){
    let player = Game.players[playerId]
    // has to make sure player draws 1 card 
    // when its that turning player's turn
}


function skipTurn(){
    // has to make sure when the skip card is activated
    // turning player gets skipped on to the next
    changePlayerTurn()
}


function playerDrawTwo(playerId){
    // has to make sure when the draw 2 card is activated
    // turning player gets to draw 2 cards
    playerDrawCard(playerId)
    playerDrawCard(playerId)
}


function playerDrawFour(playerId){
    // has to make sure when the draw 4 card is activated
    // turning player gets to draw 4 cards
    playerDrawCard(playerId)
    playerDrawCard(playerId)
    playerDrawCard(playerId)
    playerDrawCard(playerId)
}


function reverseTurn(){
    // has to make sure when the reverse card is activated
    // turning player rotation gets reversed
    Game.turnDirection = Game.turnDirenction * -1
}


function playWildCard(playerId, topColor){
    var chooseColor =  prompt("What color would you like to choose?")
    if (chooseColor === 'green' || chooseColor === 'blue' || chooseColor === 'red' || chooseColor === 'yellow'){
        Game.topColor = chooseColor
    } else {
        alert("Invalid color. Choose red, blue, yellow, or green.")
        playWildCard()
    }
    //allows for input of color value
    //checks if color is valid
    //if not then alert message
    //and run fucntion again
}

function cardIsPlayable(cardColor, cardValue){
    if ( cardColor === Game.topCardColor ){
        return true
    } 
    if (cardValue === Game.topCardValue){
        return true
    }
    
    if ( cardColor === 'wild'){
        return true
    }
    // has to make sure a card is playable to set down
    // numbers have to be the same
    // colors have to be the same
}   return false


function endTurn(){
    // has to end a players turn so the next player can set a card
    
}