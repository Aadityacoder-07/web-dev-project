const ans = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
  [1, 4, 7],
  [2, 5, 8],
  [3, 6, 9],
  [1, 5, 9],
  [3, 5, 7],
];

const button = document.querySelector(".play");
const container = document.querySelector(".container");
const result = document.querySelector('.result')
const p = document.createElement('div')
const resetButton = document.querySelector('.reset')

let input_o = [];
let input_x = [];
let chance_o = 1;
let play = 1;
let win = 1;


resetButton.addEventListener("click" , function(e){
  reset()
});

function reset(){
  input_o = [];
  input_x = [];
  chance_o = 1;
  play = 1;
    document.querySelectorAll(".box").forEach((box) => {
    box.innerHTML = ""
    box.style.backgroundColor = 'aliceblue'
    box.classList.remove('displayIcon')
    box.classList.remove('disabled')
  })
  container.classList.remove('disabled')
}

if (play) {
  takeInput();
}

function displayIcon(icon_O) {
  if(icon_O) {
    
  }
}


function takeInput() {
  document.querySelectorAll(".box").forEach((box) => {
    box.addEventListener("click", function (e) {
      let inputIs;

      if (
        box.classList.contains("disabled") ||
        document.querySelector(".container").classList.contains("disabled")
      )
        return;

      box.classList.add("disabled");

      if (chance_o) {
        box.style.backgroundColor = 'rgb(194, 224, 251)';
        box.innerHTML = 'O'
        box.classList.add('displayIcon')
        input_o.push(Number(e.target.id));
        inputIs = input_o;
        chance_o = 0;
      } else {
        box.style.backgroundColor = 'rgb(194, 224, 251)';
        box.innerHTML = 'X'
        box.classList.add('displayIcon')
        input_x.push(Number(e.target.id));
        inputIs = input_x;
        chance_o = 1;
      }

      inputIs.sort();
      checkInput(inputIs);
    });
  });
}

function checkInput(input) {
  if (input.length >= 3) {
    for (let i = 0; i < input.length; i++) {
      const e1 = input[i];

      for (let j = i + 1; j < input.length; j++) {
        const e2 = input[j];
        for (let k = j + 1; k < input.length; k++) {
          const e3 = input[k];

          let result = [e1, e2, e3];

          const found = ans.some((subArray) =>
            subArray.every((value, ind) => value === result[ind]),
          );

          if (found) {
            displayWinGame();
            return;
          }

          if(input_o.length === 5 && input_x.length === 4 ) {
            displayTieGame();
          }
        }
      }
    }
  }
}

function displayTieGame() {
  p.innerHTML = '<h1> GAME IS TIE PLAY AGAIN TO WIN </h1>'
  result.appendChild(p)
  playAgain()
}

function displayWinGame() {

  let player;
  if(chance_o == 1) player = 2
  else player = 1

  p.innerHTML = `<h1> PLAYER ${player} WIN THE GAME <br> Play again to restart</h1>`
  result.appendChild(p)
  playAgain();
}

function playAgain() {

  resetButton.setAttribute('disabled' , '');
  container.classList.add("disabled");
  button.removeAttribute("disabled");
  play = 0
  button.addEventListener('click' , function (e){
    startPlay()
  })
}

function startPlay(){
  input_o = [];
  input_x = [];
  chance_o = 1;
  play = 1;
  result.removeChild(p)
  document.querySelectorAll(".box").forEach((box) => {
    box.innerHTML = ""
    box.style.backgroundColor = 'aliceblue'
    box.classList.remove('displayIcon')
    box.classList.remove('disabled')
  })
  button.setAttribute('disabled' , '')
  resetButton.removeAttribute('disabled')
  container.classList.remove('disabled')
}

