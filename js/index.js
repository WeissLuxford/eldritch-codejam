"use strict"

import difficulties from '../data/difficulties.js'
import ancientsData from '../data/ancients.js'
import cardsData from '../data/mythicCards/index.js'

let gods = "";
const box = document.querySelector(".box");
const eldritchGod = document.querySelectorAll(".eldritch__god");
const position = document.querySelector(".position");
const difficultyLevel = document.querySelector(".difficulty__level");

eldritchGod.forEach(value => {
  value.addEventListener('click', (event) => {
    gods = ancientsData[event.target.id]
    position.innerHTML = `<h3 class="choose__title">Your opponent</h3> ${event.target.outerHTML}`
    box.classList.add("fade")
    position.classList.remove("fade")
    difficultyLevel.classList.remove("fade")
    console.log(gods);
  })
})
  

let yourLevel = "";
 const last = document.querySelector(".last__block");
 const positionBottom = document.querySelector(".position__bottom");

 difficultyLevel.addEventListener('click', (e) => {
  positionBottom.innerHTML = `<img src="assets/img/${e.target.id}.png" alt="" class="eldritch__img">`;
  positionBottom.classList.remove("fade_bot")
  yourLevel = e.target.id;
  console.log(yourLevel);
  difficultyLevel.classList.add("fade");
  last.classList.remove("fade")
  createCards(8)
  showCard() 
})


function myHelper() {



  // колода в котором я соберу все карты в разные этапы
  const newDeck = [
    {
      green: [], brown: [], blue: [],
    },
    {
      green: [], brown: [], blue: [],
    },
    {
      green: [], brown: [], blue: [],
    }
  ]

  // цифры нужно использую как массивы, будущем нужно заменить из на
  // длинну массивов из файла Data
  let green = [];

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

  // пермешиваем карты 
let shuffleBlue = shuffleCards(cardsData.blueCards, newDeck[0].blue),
    shuffleGreen = shuffleCards(cardsData.greenCards, newDeck[0].green),
    shuffleBrown = shuffleCards(cardsData.brownCards, newDeck[0].brown);

    console.log(shuffleBlue, shuffleGreen, shuffleBrown);

  //берет первую карту с перетасованной колоды(также удаляет его с массива)
  // и добавляет его в новую колоду 
  function getCard() {
    return arguments
  }


  // функция для того чтобы взять случайное число 
  function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min) ;
  }
}  myHelper()



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




