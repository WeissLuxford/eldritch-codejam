"use strict"

import difficulties from '../data/difficulties.js'
import ancientsData from '../data/ancients.js'
import cardsData from '../data/mythicCards/index.js'

let gods = "", newDeck;
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


eldritchGod.forEach(value => {
  value.addEventListener('click', (event) => {
    gods = ancientsData[event.target.id]
    position.innerHTML = `<h3 class="choose__title">Your opponent</h3> ${event.target.outerHTML}`
    box.classList.add("fade")
    position.classList.remove("fade")
    difficultyLevel.classList.remove("fade")
    createDeck()
    console.log(newDeck, gods);
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
    createCards(8)
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

  for(let i = 0; i <= arr; i++){
    let newCard = document.createElement("div"),
    front = new Image(),
    back = new Image();
    front.classList.add("card__front"),
    back.classList.add("card__back");
    front.src = "assets/img/baby.jpg", back.src = "assets/img/deck__back.png";
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
    if(num === 0) num = 1;
    return num
  }
} 
// Функция для создания определенного количества карт и добавления их в колоду КОНЕЦ


 

// Перебор карт, простой не используя рандомные карты Начало
function showCard() {
  const deckClick = document.querySelector(".deck");
  let block = document.querySelectorAll(".card"), count = 0;

    deckClick.addEventListener("click", (e) => {
      block[count].style.transition = `1s ease-in-out`
      block[count].classList.add("center")
      count++
    })
  }
// Перебор карт, простой не используя рандомные карты Конец




