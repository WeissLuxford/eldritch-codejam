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

difficultyLevel.addEventListener('click', (e) => {
  yourLevel = e.target.id;
  difficultyLevel.classList.add("fade");
  last.classList.remove("fade")
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




