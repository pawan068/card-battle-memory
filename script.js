const turn1 = document.getElementById("turn1");
const score1 = document.getElementById("score1");
let scoreplayer1 = 0;

const turn2 = document.getElementById("turn2");
const score2 = document.getElementById("score2");
let scoreplayer2 = 0;

const game = document.getElementById("game");
const reset = document.getElementById("restart");

let firstvalue = null;
let secondvalue = null;

let firstcard = null;
let secondcard = null;

let playerturn = 1;
let lockBoard = false;

let gameover=false;

let items = ["🍎","🍌","🥭","🍊","🍍","🍇","🍓","🍉","🥝","🍑"];
items = [...items, ...items];
items.sort(() => Math.random() - 0.5);

items.forEach((item, i) => {
  let card = document.createElement("div");
  card.classList.add("card");
  card.dataset.value = item;
  game.appendChild(card);

  card.addEventListener("click", () => {
    if (card === firstcard || card.style.pointerEvents === "none" || lockBoard) return;

    card.classList.add("flipped");
    card.innerText = item;

    storing(card);
  });
});

function storing(card) {
  if (!firstvalue) {
    firstvalue = card.dataset.value;
    firstcard = card;
    console.log(`First value: ${firstvalue}`);
  } else {
    secondvalue = card.dataset.value;
    secondcard = card;
    console.log(`Second value: ${secondvalue}`);
    checkresult();
  }
}

function checkresult() {
  if (firstvalue === secondvalue) {
    console.log("Matched");
    firstcard.style.pointerEvents = "none";
    secondcard.style.pointerEvents = "none";

    scores(playerturn);
    resetTurn();
  } else {
    console.log("Not matched");
    lockBoard = true;
    setTimeout(() => {
      firstcard.classList.remove("flipped");
      firstcard.innerText = "";
      secondcard.classList.remove("flipped");
      secondcard.innerText = "";
      resetTurn();
      lockBoard = false;
    }, 600);

    if (playerturn === 1) {
  playerturn = 2;
} else {
  playerturn = 1;
}
  }
  turns();
}

function resetTurn() {
  firstvalue = null;
  secondvalue = null;
  firstcard = null;
  secondcard = null;
}

function turns() {
  if(gameover===true)
    return;

  if (playerturn === 1) {
    turn1.style.backgroundColor = "green";
    turn1.style.color = "white";
    turn2.style.backgroundColor = "grey";
    turn2.style.color = "darkgrey";
  } else {
    turn2.style.backgroundColor = "green";
    turn2.style.color = "white";
    turn1.style.backgroundColor = "grey";
    turn1.style.color = "darkgrey";
  }
}

function scores(turnn) {
  if (turnn === 1) {
    scoreplayer1 += 1;
    score1.innerText = scoreplayer1;
  } else {
    scoreplayer2 += 1;
    score2.innerText = scoreplayer2;
  }

  let totalScore = scoreplayer1 + scoreplayer2;
  console.log("Total Score:", totalScore);
  if (totalScore === 8) {
    console.log("All boxes are filled");
    gameover=true;
    result();
  }
}
function result() {
  if (scoreplayer1 === scoreplayer2) {
    turn1.innerText = "DRAW";
    turn2.innerText = "DRAW";

    turn1.style.cssText = "background-color: green; color: white;";
    turn2.style.cssText = "background-color: green; color: white;";
  } else if (scoreplayer1 > scoreplayer2) {
    turn1.innerText = "WINNER";
    turn2.innerText = "LOOSER";

    turn1.style.cssText = "background-color: green; color: white;";
    turn2.style.cssText = "background-color: red; color: white;";
  } else {
    turn1.innerText = "LOOSER";
    turn2.innerText = "WINNER";

    turn1.style.cssText = "background-color: red; color: white;";
    turn2.style.cssText = "background-color: green; color: white;";
  }

    setTimeout(() => {
    document.querySelector(".restart-container").classList.add("active");
  }, 3000);

}

function newgame(){
  location.reload();

}
