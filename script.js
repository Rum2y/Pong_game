'use strict';
const players = document.querySelectorAll('.player');
const ball = document.querySelector('.ball');
const playArea = document.querySelector('.play-area');
const direct1 = document.querySelectorAll('.direct1');
const direct2 = document.querySelectorAll('.direct2');
const score = document.querySelectorAll('.score-text');
const split = document.querySelector('.split');
const starting = document.querySelector('.starting');
const heading = document.querySelector('.heading');
const buttons = document.querySelector('.buttons');
const options = document.querySelectorAll('.options');
const overlay = document.querySelector('.overlay');
const decision = document.querySelector('.decision');
const reset = document.querySelector('.reset');
const win = document.querySelector('.win');
const restart = document.querySelector('.restart');
const final = document.querySelector('.final');

let pixels = 61.5;
let y = 30.75;
let c = 0;
let ascore1 = 0;
let ascore2 = 0;
let playing = false;
let b = 0;
let vy = 0;
let vx = 0;
let direction;
let move1 = 50;
let move2 = 50;
let stop = 0;
let score1 = 0;
let score2 = 0;
let start = 0;
const points = [30, 50, 70];
const points2 = [20, 30];

// Play Area boundaries
let playAreaRight = playArea.getBoundingClientRect().right;
let playAreaLeft = playArea.getBoundingClientRect().left;
let playAreaTop = playArea.getBoundingClientRect().top;
let playAreaBottom = playArea.getBoundingClientRect().bottom;

//initial
function startState() {
  decision.style.display = `none`;
  reset.classList.add('hidden');
  win.classList.add('hidden');
}
startState();

function winState() {
  overlay.classList.remove('hidden');
  decision.style.display = `flex`;
  reset.classList.remove('hidden');
  win.classList.remove('hidden');
}

function initial() {
  starting.style.display = `none`;
  heading.classList.add('hidden');
  buttons.classList.add('hidden');
  overlay.classList.add('hidden');
}

options[0].addEventListener('click', function () {
  direction = -2;
  playing = true;
  initial();
  document.addEventListener('keydown', keyboardMovement);
});
options[1].addEventListener('click', function () {
  direction = -2;
  playing = true;
  initial();
  document.addEventListener('mousemove', mouseMovement);
});

//ball Movement
function ballMovement() {
  if (ascore1 === 10) {
    playing = false;
    final.textContent = `You loose`;
    winState();
  } else if (ascore2 === 10) {
    playing = false;
    final.textContent = `You Win`;
    winState();
  }
  if (playing) {
    if (direction === -2) {
      ball.classList.remove('hidden');
      b = 0;
      ball.style.transform = `translate(${pixels}%, ${y}%)`;
      if (start === 0) {
        pixels += 6.25;
        vx = 1;
      } else if (start === 1) {
        pixels -= 5;
        vx = 0;
      }
      y += 36.25;
      vy = 1;
    }

    //Ball Boundaries
    let ballRight = ball.getBoundingClientRect().right;
    let ballLeft = ball.getBoundingClientRect().left;
    let ballTop = ball.getBoundingClientRect().top;
    let ballBottom = ball.getBoundingClientRect().bottom;

    //Determine Drection of the ball
    //Player 2
    direct2.forEach(function (n, i) {
      let p2Up = n.getBoundingClientRect().top;
      let p2Down = n.getBoundingClientRect().bottom;
      let p2Left = n.getBoundingClientRect().left;

      if (
        p2Left - ballRight < 1 &&
        p2Up < ballBottom &&
        p2Down > ballTop &&
        ballLeft < playAreaRight
      ) {
        direction = i + 6;
      }
    });
    if (ballRight < playAreaLeft && ballRight !== 0) {
      ball.classList.add('hidden');
      b = 3;
      score2++;

      if (start === 0) {
        let random2 = Math.floor(Math.random() * points2.length);
        ball.style.top = `${points2[random2]}%`;
        start = 1;
      } else if (start === 1) {
        let random = Math.floor(Math.random() * points.length);
        ball.style.top = `${points[random]}%`;
        start = 0;
      }
      setTimeout(function () {
        ascore2 = score2 % 50;
        score[1].textContent = ascore2;
        pixels = 5;
        y = 5;
        direction = -2;
      }, 500);
    } else if (direction === 6) {
      ball.style.transform = `translate(${pixels}%, ${y}%)`;
      pixels -= 61.5;
      y -= 30.75;
      vy = 0;
      vx = 0;
    } else if (direction === 7) {
      ball.style.transform = `translate(${pixels}%, ${y}%)`;
      pixels -= 61.5;
      y -= 30.75;
      vy = 0;
      vx = 0;
    } else if (direction === 8) {
      ball.style.transform = `translate(${pixels}%, ${y}%)`;
      pixels -= 61.5;
    } else if (direction === 9) {
      ball.style.transform = `translate(${pixels}%, ${y}%)`;
      pixels -= 61.5;
      y += 30.75;
      vy = 1;
      vx = 0;
    } else if (direction === 10) {
      ball.style.transform = `translate(${pixels}%, ${y}%)`;
      pixels -= 61.5;
      y += 30.75;
      vy = 1;
      vx = 0;
    }

    //Player 1
    direct1.forEach(function (n, i) {
      let p1Up = n.getBoundingClientRect().top;
      let p1Down = n.getBoundingClientRect().bottom;
      let p1Right = n.getBoundingClientRect().right;

      if (
        ballLeft - p1Right < 0 &&
        p1Up < ballBottom &&
        p1Down > ballTop &&
        ballRight > playAreaLeft
      ) {
        direction = i + 1;
      }
    });
    if (ballLeft > playAreaRight) {
      ball.classList.add('hidden');
      b = 3;
      score1++;
      if (start === 0) {
        let random2 = Math.floor(Math.random() * points2.length);
        ball.style.top = `${points2[random2]}%`;
        start = 1;
      } else if (start === 1) {
        let random = Math.floor(Math.random() * points.length);
        ball.style.top = `${points[random]}%`;
        start = 0;
      }
      setTimeout(function () {
        // score1++;
        ascore1 = score1 % 50;
        score[0].textContent = ascore1;
        pixels = 5;
        y = 5;
        direction = -2;
      }, 500);
    } else if (direction === 1) {
      ball.style.transform = `translate(${pixels}%, ${y}%)`;
      pixels += 61.5;
      y -= 30.75;
      vy = 0;
      vx = 1;
    } else if (direction === 2) {
      ball.style.transform = `translate(${pixels}%, ${y}%)`;
      pixels += 61.5;
      y -= 30.75;
      vy = 0;
      vx = 1;
    } else if (direction === 3) {
      ball.style.transform = `translate(${pixels}%, ${y}%)`;
      pixels += 61.5;
    } else if (direction === 4) {
      ball.style.transform = `translate(${pixels}%, ${y}%)`;
      pixels += 61.5;
      y += 30.75;
      vy = 1;
      vx = 1;
    } else if (direction === 5) {
      ball.style.transform = `translate(${pixels}%, ${y}%)`;
      pixels += 61.5;
      y += 30.75;
      vy = 1;
      vx = 1;
    }

    //Play area bounce physics
    if (
      ballTop - playAreaTop < 1 &&
      ballLeft > playAreaLeft &&
      ballRight < playAreaRight
    ) {
      direction = 0;
    } else if (
      playAreaBottom - ballBottom < 1 &&
      ballLeft > playAreaLeft &&
      ballRight < playAreaRight
    ) {
      direction = -1;
    }

    if (vy === 0 && (direction === 0 || direction === -1) && vx === 0) {
      ball.style.transform = `translate(${pixels}%, ${y}%)`;
      pixels -= 61.5;
      y += 30.75;
    } else if (vy === 1 && (direction === 0 || direction === -1) && vx === 1) {
      ball.style.transform = `translate(${pixels}%, ${y}%)`;
      pixels += 61.5;
      y -= 30.75;
    } else if (vy === 1 && (direction === 0 || direction === -1) && vx === 0) {
      ball.style.transform = `translate(${pixels}%, ${y}%)`;
      pixels -= 61.5;
      y -= 30.75;
    } else if (vy === 0 && (direction === 0 || direction === -1) && vx === 1) {
      ball.style.transform = `translate(${pixels}%, ${y}%)`;
      pixels += 61.5;
      y += 30.75;
    }

    //Computer Movement
    if (players[0].getBoundingClientRect().top <= playAreaTop) {
      b = 1;
    } else if (players[0].getBoundingClientRect().bottom - playAreaBottom < 1) {
      b = 2;
    }

    setTimeout(function () {
      if (b === 1) {
        players[0].style.top = `${ballTop - playAreaTop}px`;
      } else if (b === 2) {
        if (
          playAreaBottom - ballTop >=
          players[0].getBoundingClientRect().height
        ) {
          players[0].style.top = `${
            ballTop - playAreaTop - direct1[1].getBoundingClientRect().height
          }px`;
        }
      } else if (b === 0) {
        players[0].style.top = `${ballTop - playAreaTop}px`;
      }
    }, 69.998);
  }
}

ballMovement();
setInterval(ballMovement, 10);

//Player movement
function keyboardMovement(e) {
  e.preventDefault();
  //Play area boundaries
  let playAreaTop = playArea.getBoundingClientRect().top;
  let playAreaBottom = playArea.getBoundingClientRect().bottom;

  //Player Boundaries
  let player2Top = players[1].getBoundingClientRect().top;
  let player2Bottom = players[1].getBoundingClientRect().bottom;

  if (e.key === 'ArrowDown') {
    if (playAreaBottom - player2Bottom < 20) {
      if (playAreaBottom === player2Bottom) {
        move2 = move2;
      }
    } else {
      players[1].style.transform = `translateY(${move2}px)`;
      move2 += 50;
    }
  }

  if (e.key === 'ArrowUp') {
    let y = player2Top - playAreaTop;
    if (player2Top - playAreaTop < 20) {
      if (playAreaTop === player2Top) {
        move2 = move2;
      }
    } else {
      move2 -= 50;
      players[1].style.transform = `translateY(${move2}px)`;
    }
  }
}

//Mouse movement
function mouseMovement(e) {
  if (
    e.target.closest('.play-area') &&
    e.y + players[1].getBoundingClientRect().height <
      playArea.getBoundingClientRect().bottom
  ) {
    players[1].style.top = `${e.y - playArea.getBoundingClientRect().top}px`;
  }
}

//Restart Game
restart.addEventListener('click', function () {
  ascore1 = 0;
  ascore2 = 0;
  score1 = 0;
  score2 = 0;
  score.forEach(n => {
    n.textContent = `0`;
  });
  document.removeEventListener('mousemove', mouseMovement);
  document.removeEventListener('keydown', keyboardMovement);
  startState();
  starting.style.display = `flex`;
  [heading, buttons, overlay].forEach(el => {
    el.classList.remove('hidden');
  });
  // heading.classList.remove('hidden');
  // buttons.classList.remove('hidden');
  // overlay.classList.remove('hidden');
});
