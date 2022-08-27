"use strict"

import difficulties from '../data/difficulties.js'
import ancientsData from '../data/ancients.js'
import cardsData from '../data/mythicCards/index.js'
function Game(){
let gods = "", newDeck, allStages;
const box = document.querySelector(".box");
const eldritchGod = document.querySelectorAll(".eldritch__god");
const difficultyLevel = document.querySelector(".difficulty__level");
const choseLevel = document.querySelectorAll(".choose__level");
const position = document.querySelector(".position");



//берет первую карту с перетасованной колоды(также удаляет его с массива)
// и добавляет его в новую колоду 
function getCard(shufledArr, eldritchData, color, stage) {
  let colorArr = [];
  let cardNum = eldritchData[stage + "Stage"][color + "Cards"];
  for(let i = 0; i < cardNum; i++){
    colorArr.push(shufledArr.pop())
  }
  return colorArr
}

// Берет создает массив с подмассивами и перемешивает подмассивы
function objToArray(arr) {
  let stageArr = []
  arr.forEach(value => {
    let stages = []
    Object.values(value).forEach((prop) => {
      prop.forEach((item, i) => {
        stages.push(item)
      })
    })
    stageArr.push(shuffleCards(stages, []))
  })
  return stageArr
}

eldritchGod.forEach(value => {
  value.addEventListener('click', (event) => {
    gods = ancientsData[event.target.id]
    position.innerHTML = `<h3 class="choose__title">Your opponent</h3> ${event.target.outerHTML}`
    box.classList.add("fade")
    position.classList.remove("fade")
    difficultyLevel.classList.remove("fade")
    createDeck()
    allStages = objToArray(newDeck)
  })
})

let yourLevel = "";
 const last = document.querySelector(".last__block");
 const positionBottom = document.querySelector(".position__bottom");

 choseLevel.forEach(value => {
  value.addEventListener('click', (e) => {
    positionBottom.innerHTML = `<img src="assets/img/${e.target.id}.png" alt="" class="eldritch__img">`;
    positionBottom.classList.remove("fade_bot")
    yourLevel = e.target.id;
    console.log(yourLevel);
    difficultyLevel.classList.add("fade");
    last.classList.remove("fade")
    createCards(allToOneArr(allStages).length)
    showCard() 
  })
 })

  // пермешиваем карты 
  let shuffleBlue = shuffleCards(cardsData.blueCards, []),
  shuffleGreen = shuffleCards(cardsData.greenCards, []),
  shuffleBrown = shuffleCards(cardsData.brownCards, []);

  // колода в котором я соберу все карты в разные этапы
function createDeck() {
   newDeck = [
    {
      green: getCard(shuffleGreen, gods, 'green', 'first'),
      brown: getCard(shuffleBrown, gods, 'brown', 'first'),
      blue: getCard(shuffleBlue, gods, 'blue', 'first'),

    },
    {
      green: getCard(shuffleGreen, gods, 'green', 'second'),
      brown: getCard(shuffleBrown, gods, 'brown', 'second'),
      blue: getCard(shuffleBlue, gods, 'blue', 'second'),

    },
    {
      green: getCard(shuffleGreen, gods, 'green', 'third'),
      brown: getCard(shuffleBrown, gods, 'brown', 'third'),
      blue: getCard(shuffleBlue, gods, 'blue', 'third'),
    }
  ]
}
  


  // цифры нужно использую как массивы, будущем нужно заменить из на
  // длинну массивов из файла Data

  // принимает в себя массив(что-угодно) и перетасовывет карты
  function shuffleCards(cardArr, myDeck){
    do{
      let randCard = getRandomNumber(0, cardArr.length - 1);
      if(!myDeck.includes(cardArr[randCard])){
        myDeck.push(cardArr[randCard]);
      }
    } while(myDeck.length !== cardArr.length);
    return myDeck
  }




  // функция для того чтобы взять случайное число 
  function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min) ;
  }




function createCards(arr){
  const fullDeck = document.querySelector(".cards__deck");
  // длина какого то массива

  // Функция для создания определенного количества карт и добавления их в колоду НАЧАЛО

  for(let i = 0; i < arr; i++){
    let newCard = document.createElement("div"),
    front = new Image(),
    back = new Image();
    front.classList.add("card__front"),
    back.classList.add("card__back");
    front.src = `${allToOneArr(allStages)[i].cardFace}`, back.src = "assets/img/deck__back.png";
    newCard.classList.add("card"), newCard.classList.add("fromFar");
    newCard.append(back);
    newCard.append(front);
    fullDeck.append(newCard);
   setTimeout( function littleIntervalCards() {
    newCard.classList.remove("fromFar");
      newCard.id = `card${i}`;
      newCard.style = `--u:${createUNumber(i-arr/2)};--i:${i-arr/2};`
    }, i*160)
    
  }

  // Функция чтобы создать диаграмму от 3-2-1-1-1-2-3 для {--u}
  function createUNumber(num) {
    if(num < 0 ) num = -num;
    if(num <= 2) num = 2;
    return num
  }
} 
// Функция для создания определенного количества карт и добавления их в колоду КОНЕЦ


let cardColor, col;
// Перебор карт, простой не используя рандомные карты Начало
function showCard() {
  countCards(0, 0, 0)
  const deckClick = document.querySelector(".deck");
  let block = document.querySelectorAll(".card"), count = 0;
  let green = 0,brown = 0,blue = 0;
    deckClick.addEventListener("click", (e) => {
      block[count].classList.add("center")
      cardColor = allToOneArr(allStages)[count].id
      col = allToOneArr(allStages)[count].color
      if(onlyWord(cardColor) === "green") green++
      if(onlyWord(cardColor) === "brown") brown++
      if(onlyWord(cardColor) === "blue") blue++
      countCards(green, brown, blue)
      count++;
      if(block[count] === undefined){
        document.querySelector(".restart").classList.remove("fade_s")
      }
    })
  }
// Перебор карт, простой не используя рандомные карты Конец



function allToOneArr(arr) {
  let myArr = [];
  arr.forEach(value => {
    value.forEach(a => myArr.push(a))
  })
  return myArr
}

function onlyWord(str) {
  return str.replace(/\d/gi, "")
}


function countCards(grNum, brNum, blNum) {
  const green = document.querySelectorAll(".green"),
    brown = document.querySelectorAll(".brown"),
    blue = document.querySelectorAll(".blue");
    let gr = 'greenCards', br = 'brownCards', bl = 'blueCards';
    let f = 'firstStage', s = 'secondStage', t = 'thirdStage';

    function clear(color, index){
      color[index].classList.toggle("cool")
      setTimeout(() => (color[index].classList.toggle("cool")), 600)
    } 
    console.log(green[0].classList);
    if(col === "green"){
      grNum <= gods[f][gr] ? clear(green, 0):
      grNum <= gods[f][gr] + gods[s][gr] ? clear(green, 1):
      clear(green, 2) ;
    }
    if(col === "brown") {
      brNum <= gods[f][br] ? clear(brown, 0) : 
      brNum <= gods[f][br] + gods[f][br] ? clear(brown, 1) :
      clear(brown, 2);
    }
    if(col === "blue"){
      blNum <= gods[f][bl] ? clear(blue, 0) : 
      blNum <= gods[f][bl] + gods[s][bl] ? clear(blue, 1) :
      clear(blue, 2);
    }
  
    
    
    
      green[0].innerHTML = `Green:&nbsp;${(grNum > gods[f][gr] ? 0 : gods[f][gr] - grNum)}`;
      brown[0].innerHTML = `Brown:&nbsp;${(brNum > gods[f][br] ? 0 : gods[f][br] - brNum)}`;
      blue[0].innerHTML = `Blue:&nbsp;${(blNum > gods[f][bl] ? 0 : gods[f][bl] - blNum)}`;

      green[1].innerHTML = `Green:&nbsp;${(gods[f][gr] + gods[s][gr]) - grNum < 0 ? 0 : gods[f][gr] - grNum < 0 ? gods[s][gr] - (grNum - gods[f][gr]) : gods[s][gr]} `;
      brown[1].innerHTML = `Brown:&nbsp;${(gods[f][br] + gods[s][br]) - brNum < 0 ? 0 : gods[f][br] - brNum < 0 ? gods[s][br] - (brNum - gods[f][br]) : gods[s][br]} `;
      blue[1].innerHTML = `Blue:&nbsp;${(gods[f][bl] + gods[s][bl]) - blNum < 0 ? 0 : gods[f][bl] - blNum < 0 ? gods[s][bl] - (blNum - gods[f][bl]) :  gods[s][bl]} `;
      
      green[2].innerHTML = `Green:&nbsp;${(gods[f][gr] + gods[s][gr]) - grNum < 0 ? gods[t][gr] - (grNum - (gods[f][gr] + gods[s][gr])) : gods[t][gr]}`;
      brown[2].innerHTML = `Brown:&nbsp;${(gods[f][br] + gods[s][br]) - brNum < 0 ? gods[t][br] - (brNum - (gods[f][br] + gods[s][br])) : gods[t][br]}`;
      blue[2].innerHTML = `Blue:&nbsp;${(gods[f][bl] + gods[s][bl]) - blNum < 0 ? gods[t][bl] - (blNum - (gods[f][bl] + gods[s][bl])) : gods[t][bl]}`;
}}

Game()

document.querySelector(".restart__game").addEventListener("click", () => {
  document.querySelector(".restart").classList.add("fade_s")
})