const START_POINTS = 5;

/* cache for element references */
const eCache = {
  board: document.querySelector(".game-board"),
  nextTurnBtn: document.querySelector(".next-turn"),
  allCards: document.querySelectorAll(".card"),
  playerPoints: document.querySelector(".player-stats .life-total"),
  playerPointsMeter: document.querySelector(".player-stats .life-left"),
  playerIcon: document.querySelector(".player-stats .thumbnail"),

  lifePoints: document.querySelector(".life-stats .life-total"),// kind of a funny variable name
  lifePointsMeter: document.querySelector(".life-stats .life-left"),
  lifeIcon: document.querySelector(".life-stats .thumbnail"),
  lifeCard: document.querySelector(".life-card"),
  winnerSection: document.querySelector(".winner-section")
};
/* card scenarios */
var scenarios = [
  {
    lifeCard: {
      description: "You just got out of college and need a new car for your brand new job which gave you a huge pay raise.",
      power: 4,
    },
    playerCards: [
      {
        description: "Check my budget and make sure that I have enough to buy an affordable, gas-efficient, low-maintence car.",
        power: 5,
      },
      {
        description: "Buy used car because I don't want expensive payments.",
        power: 4,
      },
      {
        description: "Buy my expensive dream car because I deserve it and can finally afford to make payments.",
        power: 2,
      }
    ]
  },
  {
    lifeCard: {
      description: "You have no retirment and your job just offered a plan that all your co workers are talking about.",
      power: 3,
    },

    playerCards: [
      {
        description: "Speak to a financial advisor and look more into the retirement plan.",
        power: 4,
      },
      {
        description: "Don't look into it much because I'm sure I'll be fine and will figure it out later.",
        power: 2,
      },
      {
        description: "Retirement is a sham; that's what social security is for!",
        power: 1,
      }
    ]
  },
  {
    lifeCard: {
      description: "You're very young and currently don't have health care. However, your fulltime job's health care that once was bad is now great.",
      power: 3,
    },
    playerCards: [
      {
        description: "Look into the new healthcare plan and see what it has to offer.",
        power: 5,
      },
      {
        description: "I go to the gym and excercise regularly so I don't need it. ",
        power: 2,
      },
      {
        description: "Continue with no health care because nothing can happen to you and you don't need it now.",
        power: 1,
      }
    ]
  },
  {
    lifeCard: {
      description: "You bought a car a year ago, saved some of your money, and want a really cool phone that all your friends have. However, the new phone would cost you your whole savings.",
      power: 2,
    },
    playerCards: [
      {
        description: "Put my savings into my emergency fund so that I have money when I need it.",
        power: 4,
      },
      {
        description: "Don't buy the new phone and keep doing what I've been doing.",
        power: 2,
      },
      {
        description: "Buy the new phone because I only live once and I'm going to treat myself.",
        power: 1,
      }
    ]
  },
  {
    lifeCard: {
      description: "You were unable to afford this year's taxes after you've filed.",
      power: 3,
    },
    playerCards: [
      {
        description: "Start saving my money up to pay my taxes.",
        power: 4,
      },
      {
        description: "Continue on with no current plans of paying my taxes off and solve this problem next year.",
        power: 2,
      },
      {
        description: "Don't plan on paying the taxes; the IRS won't come for me!",
        power: 1,
      }
    ]
  },

  {
    lifeCard: {
      description: "Your friend is trying to convince you about a certain stock to invest in.",
      power: 3,
    },
    playerCards: [
      {
        description: "Do my own research on the stock and invest what I can afford if I have deemed it worthy.",
        power: 4,
      },
      {
        description: "Trust in you friend's judgement and invest what you can afford to.",
        power: 2,
      },
      {
        description: "Blindly invest because life is all about the risk",
        power: 1,
      }
    ]
  },

  {
    lifeCard: {
      description: "You want to buy a house because of the current housing market.",
      power: 3,
    },
    playerCards: [
      {
        description: "Figure out how much I have in my savings to see if I can afford the starting costs of owning a home in an affordable area.",
        power: 5,
      },
      {
        description: "Consult with a realtor or a real-estate investor, try to find my dream home.",
        power: 2,
      },
      {
        description: "Plan to buy a house for well over the asking price so I can increase my odds of getting the house.",
        power: 1,
      }
    ]
  },
  {
    lifeCard: {
      description: "Your credit card debt is starting to pile up and you want a new flatscreen TV for Superbowl Sunday. You haven't been making payments.",
      power: 3,
    },
    playerCards: [
      {
        description: "Don't buy the tv and plan for paying off your credit card debt.",
        power: 4,
      },
      {
        description: "Start planning and budgeting for paying off your credit card debt but still buy the tv.",
        power: 3,
      },
      {
        description: "Don't worry about it now, buy the TV.",
        power: 1,
      }
    ]
  }
];

function player() {
  function playTurn(card) {
    var cardSelected = false;
    //Find card?
    if (cardSelected) { return; }
    cardSelected = true;
    card.classList.add("played-card");
    eCache.board.classList.add("card-selected");

  };

  return { playTurn };
};
/**
 * Contains most of the logic needed for the game board.
 * @module
 */
var boardModule = function () {
  /**
   * Constructs points object
   */
  const points = ['player', 'life'].reduce((a, p) => {
    return { ...a, [p]: START_POINTS }
  }, {});
  const gameBoard = eCache.board;

  var cards = eCache.allCards;

  const render = {
    points: function () {
      function limitNumberWithinRange(num) {
        const MIN = 0;
        const MAX = START_POINTS;
        const parsed = parseInt(num)
        console.log(parsed)
        return Math.min(Math.max(parsed, MIN), MAX)
      }
      points.player = limitNumberWithinRange(points.player);
      points.life = limitNumberWithinRange(points.life);
      eCache.playerPoints.innerHTML = points.player;
      eCache.lifePoints.innerHTML = points.life;
      var playerPercent = points.player / START_POINTS * 100;
      if (playerPercent < 0) {
        playerPercent = 0;
      }
      eCache.playerPointsMeter.style.height = playerPercent + "%";
      var lifePercent = points.life / START_POINTS * 100
      if (lifePercent < 0) {
        lifePercent = 0;
      }
      eCache.lifePointsMeter.style.height = lifePercent + "%";
    }
  };



  function checkWin() {
    // If the player died
    if (points.player <= 0) {
      return "life"

    }
    else if (points.life <= 0) {
      return "player"
    }
    else {
      return null;
    }

  };

  render.points();
  return {
    render, gameBoard, cards, points, checkWin,
  };
}();
//@ts-ignore
var gamePlay = function () {
  /* event listeners */
  eCache.nextTurnBtn.addEventListener("click", function (e) {
    gameRound();
  });

  const gameRound = function () {
    const board = boardModule;
    var allCardElements = board.cards;

    // hide next button
    eCache.nextTurnBtn.setAttribute("disabled", "true");

    function shuffleArray(a) {
      var j, x, i;
      for (i = a.length; i; i--) {
        j = Math.floor(Math.random() * i);
        x = a[i - 1];
        a[i - 1] = a[j];
        a[j] = x;
      }
      return a;
    }

    {

      eCache.board.classList.remove("card-selected");

      // Remove "ouch" class from player and life thumbnails
      eCache.playerIcon.classList.remove("ouch");
      eCache.lifeIcon.classList.remove("ouch");

      // Hides the "next turn" button, will show again when turn is over

      for (var i = 0; i < allCardElements.length; i++) {
        var card = allCardElements[i];
        card.classList.remove("showCard");
      }

      setTimeout(function () {


        var j = 0;
        var cardIndexes = shuffleArray([0, 1, 2]);

        // Get scenario cards

        var randomScenarioIndex = Math.floor(Math.random() * scenarios.length);
        var scenario = scenarios[randomScenarioIndex];

        scenarios.splice(randomScenarioIndex, 1);

        var lifeCard = scenario.lifeCard;
        var lifeCardEl = document.querySelector(".life-area .card");

        // Contents of the player cards
        var playerCards = scenario.playerCards;
        for (var i = 0; i < allCardElements.length; i++) {
          var card = allCardElements[i];

          card.classList.remove("worse-card");
          card.classList.remove("better-card");
          card.classList.remove("played-card");
          card.classList.remove("tie-card");
          card.classList.remove("prepared");
          card.classList.remove("reveal-power");

          // Display the payer card details
          if (card.classList.contains("player-card")) {
            card.querySelector(".text").innerHTML = playerCards[cardIndexes[j]].description;
            card.querySelector(".power").innerHTML = playerCards[cardIndexes[j]].power;
            j++;
          }

          // Reveal each card one by one with a delay of 100ms
          setTimeout(function (card, j) {
            return function () {
              card.classList.remove("prepared");
              card.style.display = "block";
              card.classList.add("showCard");
            }
          }(card, i), parseInt(i + 1) * 200);
        }

        // Display the life card
        lifeCardEl.querySelector(".text").innerHTML = lifeCard.description;
        lifeCardEl.querySelector(".power").innerHTML = lifeCard.power;
      }, 500);
    }

    var allCardElements = eCache.allCards;
    // go through all dom elements and make an event listener
    for (var i = 0; i < allCardElements.length; i++) {


      var card = allCardElements[i];
      if (card.classList.contains("player-card")) {
        card.addEventListener("click", function (e) {
          e.preventDefault();
          // play the turn
          player().playTurn(this);


          // Wait 500ms to reveal the life power
          setTimeout(function () {
            // Shows the power level on the life card
            // revealLemonPower();
            var lifeCard = eCache.lifeCard;

            lifeCard.classList.add("reveal-power");
          }, 500)

          // Wait 750ms to reveal the player power
          setTimeout(function () {
            // Shows the power level on the player card
            // revealPlayerPower();
            var playerCard = document.querySelector(".played-card");
            playerCard.classList.add("reveal-power");
          }, 800)

          // Wait 1250ms to compare the card scoers
          setTimeout(function () {
            var playerLife = board.points.player;

            var lifeLife = board.points.life;
            var playerCard = document.querySelector(".played-card");

            var playerPowerEl = playerCard.querySelector(".power");

            var lifeCard = eCache.lifeCard;
            var lifePowerEl = lifeCard.querySelector(".power");

            var playerPower = parseInt(playerPowerEl.innerHTML);
            var lifePower = parseInt(lifePowerEl.innerHTML);
            var powerDifference = playerPower - lifePower;
            console.log(powerDifference,'test')
            console.log(playerLife,'playerLife')
            if (powerDifference < 0) {

              // Player Loses
              board.points.player = board.points.player + powerDifference;
              lifeCard.classList.add("better-card");
              playerCard.classList.add("worse-card");
              eCache.playerIcon.classList.add("ouch");
            } else if (powerDifference > 0) {
              // Player Wins
              board.points.life = board.points.life - powerDifference;
              playerCard.classList.add("better-card");
              lifeCard.classList.add("worse-card");
              eCache.lifeIcon.classList.add("ouch");
            } else {
              playerCard.classList.add("tie-card");
              lifeCard.classList.add("tie-card");
            }
            board.render.points();

            const winStatus = board.checkWin();
            if (winStatus !== null) {
              //  game over...
              eCache.board.classList.add("game-over");
              eCache.winnerSection.style.display = "flex";
              eCache.winnerSection.classList.remove("player-color", "life-color");
              document.querySelector(".winner-message").innerHTML = (winStatus == "life" ? "Game over: you got pwned by the game of life, my friend! </3" : "You won! Now go save some money in real life.");
              eCache.winnerSection.classList.add(winStatus == "life" ? "life-color" : "player-color");

            }

            else {
              eCache.nextTurnBtn.removeAttribute("disabled");

            }


          }, 1400);
        });
      }
    }

  };
  /**
   * Initializes the game
   */
  function start() {
    var gBoard = eCache.board
    gBoard.classList.remove("before-game");
    gBoard.classList.add("during-game");
    gameRound();
  } return {
    start,
  };
}();
