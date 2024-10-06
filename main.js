document.addEventListener('DOMContentLoaded', function(){

//Possible card names, values, and suits
  let cardNames = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A']
  let cardValues = [2,3,4,5,6,7,8,9,10,10,10,10,11]
  let suits = ['♥', '♦', '♠', '♣']

// creates a full deck of cards - array of objects - each card is an object
  let createDeck = () => {
    let result = []
    for (let x = 0; x < suits.length; x++) {
      for (let y = 0; y < cardNames.length; y++) {
        let cardObj = {}
        cardObj.name = cardNames[y]
        cardObj.numVal = cardValues[y]
        cardObj.suit = suits[x]
        result.push(cardObj)
      }
    }
    return result
  }

//variable for the deck of cards created
  let cardDeck = createDeck()

//deals a randomly selected card
  let dealCard = () => {
    return cardDeck[Math.floor(Math.random() * cardDeck.length)]
  }

//creates a variable for the dealer card location
let dealerArea = document.querySelector('#dealerArea')

//variable for deal button
let dealButton = document.querySelector('#dealButton')

//variable for hit hitButton
let hitButton = document.querySelector('#hitButton')

// variable for bet button
let betButton = document.querySelector('#betButton')

//variable for dealerCount
let dealerCount = document.querySelector('#dealerCount')
dealerCount.textContent = 0

//variable for playerCount
let playerCount = document.querySelector('#playerCount')
playerCount.textContent = 0

//creates a counter for the cards left in Deck
let cardsLeftInDeck = document.querySelector('#cardsLeftInDeck')
cardsLeftInDeck.textContent = cardDeck.length

//function which removes whichever card was played from the Deck
let removeCard = (arrOfCards, cardPlayed) => {
  let result = []
  for (let x = 0; x < arrOfCards.length; x++) {
    if (arrOfCards[x] !== cardPlayed) {
      result.push(arrOfCards[x])
    }
  }
  return result
}

//create variable for stand button
let standButton = document.querySelector('#standButton')

//standButton function adds dealercard until total > 17
let stand = () => {
  while (dealerCount.textContent < 17) {
    dealerCard()
  }
}

//variable for bank values
let bank = document.querySelector('#bank')
bank.textContent = 500

//function for buy in, used everytime deal is clicked
let buyIn = () => {
  bank.textContent -= bet.textContent
}

//variable for bet value
let bet = document.querySelector('#bet')
bet.textContent = 0

//bets 5 everytime bet button pushed
let bet5 = () => {
  let newBet = parseInt(bet.textContent,10)
  newBet += 5
  bet.textContent = newBet
}

//disable hit button
let hitDisable = () => {
  hitButton.setAttribute('disabled', true)
}

//disable dealButton
let dealDisable = () => {
  dealButton.setAttribute('disabled', true)
}

//enable dealButton
let dealEnable = () => {
  dealButton.removeAttribute('disabled')
}

//disable stand button
let standDisable = () => {
  standButton.setAttribute('disabled', true)
}

//disable double button
let doubleDisable = () => {
  doubleDownButton.setAttribute('disabled', true)
}

//disable bet button
let betDisable = () => {
  betButton.setAttribute('disabled', true)
}

//function that disables all buttons other than deal if BUST
let bustDisable = () => {
  if (playerCount.textContent === 'BUST' || dealerCount.textContent === 'BUST') {
    hitDisable()
    standDisable()
  }
}

//function that enables hit and stand buttons
let enableStandHit = () => {
  hitButton.removeAttribute('disabled')
  standButton.removeAttribute('disabled')
}

//player card array
let playerCardArray = []

//dealer card array
let dealerCardArray = []

//clears playerCardArray for every new hand
let playerCardClear = () => {
  playerCardArray = []
}

//clears dealerCardArray
let dealerCardClear = () => {
  dealerCardArray = []
}

//calculates score and handles aces and busts
let scoreCalculator = (inputCount, inputArray, screenCount) => {
  if (inputCount > 21) {
    for (let x = 0; x < inputArray.length; x++) {
      if (inputArray[x] === 11) {
        inputArray[x] = 1
        inputCount = inputArray.reduce((a, b) => a + b)
        break
      } else {
        inputCount = 'BUST'
      }
    }
  }
  screenCount.textContent = inputCount
}

//evaluates scores and determines a winner upon the stand button being pressed
let evalScore = (pScore, dScore) => {
  if (pScore.textContent > dScore.textContent || dScore.textContent === "BUST") {
    bank.textContent =  parseInt(bank.textContent) + parseInt(bet.textContent * 2)
    bet.textContent = 0
  } else if (pScore.textContent < dScore.textContent){
    bet.textContent = 0
    enableBet()
  } else {
    enableBet()
    bank.textContent =  parseInt(bank.textContent) + parseInt(bet.textContent)
    bet.textContent = 0
  }
}

//variable for double down button
let doubleDownButton = document.querySelector('#doubleDownButton')

//function for doubleDown
let doubleDown = () => {
  bank.textContent -= bet.textContent
  bet.textContent = parseInt(bet.textContent * 2)
}

//function that enables hit and stand buttons
let enableDoubleDown = () => {
  doubleDownButton.removeAttribute('disabled')
}

//functin that enables bet button after each round is complete
let enableBet = () => {
  betButton.removeAttribute('disabled')
}

//var for signin button
let submitButton = document.querySelector('#submit')


//userList for local localStorage
let userList = []

//function that shuffles deck aka, checks if there are zero cards left and refills deck if so
let shuffle = () => {
  if (cardDeck.length === 0) {
    cardDeck = createDeck()
  }
}

//variable for snackbar
let snack = document.querySelector('#snackbar')

//function for snackbar/toast
function showSnack() {
  snack.className = 'show'
  setTimeout(function(){ snack.className = snack.className.replace("show", ""); }, 3000)
}

//var for form
let form = document.querySelector('form')

//deals a dealer card
let dealerCard = () => {
  //run dealCard() to create new card, set equal to variable card for access
  let card = dealCard()

  //create card elements
  let newCard = document.createElement('div')
  let newCardName = document.createElement('div')
  let newCardSuit = document.createElement('div')
  let newCardName2 = document.createElement('div')

  //style card
  newCard.style.backgroundColor = 'white'
  newCard.style.width = "14%"
  newCard.style.margin = '1%'
  newCard.style.float = 'left'
  newCard.style.borderRadius = '0.5em'
  newCardName.textContent = card.name
  newCardName.style.marginLeft = '5%'
  newCardSuit.textContent = card.suit
  newCardSuit.style.textAlign = 'center'
  newCardSuit.style.fontSize = '200%'
  newCardSuit.style.marginTop = '40%'
  newCardSuit.style.marginBottom = '40%'
  newCardName2.textContent = card.name
  newCardName2.style.textAlign = 'right'
  newCardName2.style.marginRight = '5%'

  //changes card text to red if a heart or diamond
  if(newCardSuit.textContent === '♦' || newCardSuit.textContent === '♥') {
    newCard.style.color = 'red'
  }

  //append new card
  newCard.appendChild(newCardName)
  newCard.appendChild(newCardSuit)
  newCard.appendChild(newCardName2)
  dealerArea.appendChild(newCard)

  //dealer total points for hand
  dealerCardArray.push(card.numVal)

  //variable that calculates score
  let parsedDealerCount = dealerCardArray.reduce((a, b) => a + b)

  //analyzes score and adjusts aces for busts
  scoreCalculator(parsedDealerCount, dealerCardArray, dealerCount)

  //removes card from deck when played
  cardDeck = removeCard(cardDeck, card)

  // counter for the cards left in deck
  cardsLeftInDeck.textContent = cardDeck.length
}

//deals a player card
let playerCard = () => {
  //run dealCard() to create new card, set equal to variable card for access
  let card = dealCard()

  //create card elements
  let newCard = document.createElement('div')
  let newCardName = document.createElement('div')
  let newCardSuit = document.createElement('div')
  let newCardName2 = document.createElement('div')

  //style card
  newCard.style.backgroundColor = 'white'
  newCard.style.width = "14%"
  newCard.style.margin = '1%'
  newCard.style.float = 'left'
  newCard.style.borderRadius = '0.5em'
  newCardName.textContent = card.name
  newCardName.style.marginLeft = '5%'
  newCardSuit.textContent = card.suit
  newCardSuit.style.textAlign = 'center'
  newCardSuit.style.fontSize = '200%'
  newCardSuit.style.marginTop = '40%'
  newCardSuit.style.marginBottom = '40%'
  newCardName2.textContent = card.name
  newCardName2.style.textAlign = 'right'
  newCardName2.style.marginRight = '5%'

  //changes card text to red if a heart or diamond
  if(newCardSuit.textContent === '♦' || newCardSuit.textContent === '♥') {
    newCard.style.color = 'red'
  }

  //append new card
  newCard.appendChild(newCardName)
  newCard.appendChild(newCardSuit)
  newCard.appendChild(newCardName2)
  playerArea.appendChild(newCard)

  //dealer total points for hand
  playerCardArray.push(card.numVal)

  //keeps track of player score
  let parsedPlayerCount = playerCardArray.reduce((a, b) => a + b)

  //calculates the score and handles aces if bust occurs
  scoreCalculator(parsedPlayerCount, playerCardArray, playerCount)

  if (playerCount.textContent === "BUST") {
    bet.textContent = 0
  }

  //removes card from deck when played
  cardDeck = removeCard(cardDeck, card)

  // counter for the cards left in deck
  cardsLeftInDeck.textContent = cardDeck.length
}

//eventListener for dealButton
dealButton.addEventListener('click', function() {
  dealerCount.textContent = '0'
  playerCount.textContent = '0'
  dealerArea.textContent = ''
  playerArea.textContent = ''
  dealerCardClear()
  playerCardClear()
  buyIn()
  playerCard()
  shuffle()
  playerCard()
  shuffle()
  dealerCard()
  shuffle()
  enableStandHit()
  enableDoubleDown()
  betDisable()
  dealDisable()
 })

 //eventListener for dealButton
 hitButton.addEventListener('click', function() {
   playerCard()
   shuffle()
   bustDisable()
   doubleDisable()
   //check for user bust and allows for betting
   if (playerCount.textContent === 'BUST') {
     enableBet()
   }
  })

  //eventListener for standButton
  standButton.addEventListener('click', function() {
    shuffle()
    stand()
    shuffle()
    bustDisable()
    hitDisable()
    standDisable()
    doubleDisable()
    evalScore(playerCount, dealerCount)
    enableBet()
   })

   //eventListener for bet5Button
   betButton.addEventListener('click', function() {
    bet5()
    dealEnable()
    })

    //eventListener for doubleDownButton
    doubleDownButton.addEventListener('click', function() {
      doubleDown()
      hitDisable()
      standDisable()
      playerCard()
      shuffle()
      stand()
      shuffle()
      evalScore(playerCount, dealerCount)
      doubleDisable()
      enableBet()
    })


    form.addEventListener('submit', function(event) {
      event.preventDefault()
      let email = document.querySelector('#email').value
      let password = document.querySelector('#password').value
      let name = document.querySelector('#name').value
      if (email && password && name) {
        snack.textContent = `Thanks for signing in ${name}`
         showSnack()
         userList.push({'name': name, 'email': email, 'password': password})
         localStorage.setItem('User', JSON.stringify(userList))
      }
    })

})
