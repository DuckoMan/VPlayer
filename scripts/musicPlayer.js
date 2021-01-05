import {AddZeroToTimer} from "./supScript.js"
//General exporting function
export const musicPlayerInit =()=>{
//Variables
    const audio = document.querySelector(".audio");
    const audioImg = document.querySelector(".audio-img");
    const audioHeader = document.querySelector(".audio-header");
    const audioPlayer = document.querySelector(".audio-player");
    const audioNavigation = document.querySelector(".audio-navigation");
    const audioButtonPlay = document.querySelector(".audio-button__play");
    const audioProgress = document.querySelector(".audio-progress");
    const audioProgressTiming = document.querySelector(".audio-progress__timing");
    const audioTimePassed = document.querySelector(".audio-time__passed");
    const audioTimeTotal = document.querySelector(".audio-time__total");

    const playlist = ['hello','flow','speed'];

    let trackIndex = 0; //номер играющей песни
//Functions
    const loadTrack = () =>{
        const isAlreadePlaying = audioPlayer.paused;//Получаем True или False,в зависимости от того,играла музыка в момент сменты трека или нет(играла-True ,не играла- False)
        const track = playlist[trackIndex];

        audioImg.src = `./audio/${track}.jpg` //интерполируем и меняем картинку
        audioPlayer.src = `./audio/${track}.mp3`;//интерполируем и меняем аудио
        audioHeader.textContent = track.toUpperCase();//Меняем заголовок на название трека в апперкейс
        if (isAlreadePlaying){//Если музыка не играла во время переключения
            audioPlayer.pause();//ставится пауза
        } else {
            audioPlayer.play();//если играла,то переключенный трек тоже начинает играть
        }
    };
    const prevTrack = () => {
        if (trackIndex !== 0){
            trackIndex--;
        } else {
            trackIndex = playlist.length -1;//отсчет от 0 => отнимаем 1 от индекаса
        }
        loadTrack();
    }
    const nextTarck = () => {
        if (trackIndex === playlist.length -1){
            trackIndex =0;
        } else {
            trackIndex++;
        }
        loadTrack();
    }
//Tracking
    audioNavigation.addEventListener("click",event => {
        const target = event.target;
        const track = playlist[trackIndex];

        if (target.classList.contains("audio-button__play")){
            audio.classList.toggle("play");
            audioButtonPlay.classList.toggle("fa-play");
            audioButtonPlay.classList.toggle("fa-pause");

            if(audioPlayer.paused){
                audioPlayer.play();
            }else{
                audioPlayer.pause();
            }
            audioHeader.textContent = track.toUpperCase()//Меняем заголовок на название трека в апперкейс
        } else if (target.classList.contains("audio-button__prev")){
            prevTrack();
        } else if (target.classList.contains("audio-button__next")){
            nextTarck();
        }
    });
    audioPlayer.addEventListener("ended", ()=>{ //ended - нативное св-во для аудио.Когда трек заканчивается,он переключается на следующий
        nextTarck();
        audioPlayer.play();
    })

    audioPlayer.addEventListener("timeupdate", ()=>{
        const duration = audioPlayer.duration;
        const currentTime = audioPlayer.currentTime;
        const progress = (currentTime/duration)*100;

        audioProgressTiming.style.width = progress + "%";//Изменение ширины ползунка во время воспроизведения трека

        const minutesPassed = Math.floor(currentTime/60) || "0";//получаем минуты для таймера прослушанного времени ,если значения нет,меняем его на "0"
        const secondsPassed = Math.floor(currentTime%60) || "0";//получаем секунды для таймера прослушанного времени, если значения нет,меняем его на "0"

        const minutesInTotal = Math.floor(duration/60) || "0";// получаем общее кол-во минут для таймера, если значения нет,меняем его на "0"
        const secondsInTotal = Math.floor(duration%60) || "0";// получаем общее кол-во секунд для таймера, если значения нет,меняем его на "0"

        audioTimePassed.textContent = `${AddZeroToTimer(minutesPassed)}:${AddZeroToTimer(secondsPassed)}`;
        audioTimeTotal.textContent = `${AddZeroToTimer(minutesInTotal)}:${AddZeroToTimer(secondsInTotal)}`;
    });
    audioProgress.addEventListener("click", event =>{
        const x = event.offsetX;//получаем координатку,на которую кликнул пользователь на прогрессбаре
        const trackLength = audioProgress.clientWidth;
        let audioPlayerDuration = audioPlayer.duration
        let progress = (x / trackLength)* audioPlayerDuration;
        audioPlayer.currentTime = progress;

        // console.log(x)
        // console.log(trackLength)
        // console.log(audioPlayer.duration)
        // console.log(progress)
    })
}