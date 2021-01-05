import {radioPlayerInit} from "./radioPlayer.js";
import{videoPlayerInit} from  "./videoPlayer.js";
import{musicPlayerInit} from  "./musicPlayer.js";

const playerBtn = document.querySelectorAll(".player-btn");
const playerBlock = document.querySelectorAll(".player-block");
const temp = document.querySelector(".temp");

const deactivationPlayer=()=>{
    temp.style.display = "none"; //удаляет надпись "Медиа портал VPlayer"
    playerBtn.forEach((item)=>{item.classList.remove("active")}); //Деактивируется блок навигации в хэдере
    playerBlock.forEach((item)=>{item.classList.remove("active")});//Деактивируется блок с видео e.t.c. в body
    
}

playerBtn.forEach((btn , i) => { //отслежтвает нажатие на любую кнопку навигации,активирует кнопку переключает табы см.функцию deactivationPlayer
    btn.addEventListener("click", ()=>{
        deactivationPlayer();
        btn.classList.add("active");
        playerBlock[i].classList.add("active")
    });
});

//Вызов всех фунцкий из подключенных js-модулей
videoPlayerInit();
radioPlayerInit();
musicPlayerInit();