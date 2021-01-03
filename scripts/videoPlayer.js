//General exporting function
export const videoPlayerInit =()=>{

//Variables
    const videoPlayer = document.querySelector(".video-player");
    const vidoButtonPlay = document.querySelector(".video-button__play");
    const vidoButtonStop = document.querySelector(".video-button__stop");
    const videoProgress = document.querySelector(".video-progress");
    const vidoTimePassed = document.querySelector(".video-time__passed");
    const vidoTimeToatal = document.querySelector(".video-time__total");

//Functions
    const toggleIcon = () => { //Меняет значок "play" на "pause" и наоборот
        if(videoPlayer.paused){
            vidoButtonPlay.classList.remove('fa-pause');
            vidoButtonPlay.classList.add('fa-play');
        } else {
            vidoButtonPlay.classList.add('fa-pause');
            vidoButtonPlay.classList.remove('fa-play');
        }
    }
    const togglePlay =() =>{ //Если видео остановлено,то при клике на плеер ,оно воспроизводитсся
        if (videoPlayer.paused){
            videoPlayer.play();
        } else {
            videoPlayer.pause();
        }
    }
    const stopPLay = () => { //Если видео воспрозводится в данный момент времени,то при клике на плеер ,оно останавливается
        videoPlayer.pause();
        videoPlayer.currentTime = 0;
    }
    const AddZeroToTimer = n => n <10 ? "0"+ n : n; //Добавляем "0" в занчение таймера для красоты(Если занчение таймера <10 ,то добавляем вначало "0", если > или =,возвараем обычное значние)

//Tracking
    videoPlayer.addEventListener("click", togglePlay); //Найстройка вкл/выкла плеера ,при нажатии на сам плеер
    vidoButtonPlay.addEventListener("click", togglePlay);

    videoPlayer.addEventListener("play", toggleIcon); // "play"и "pause" -натвные (js) для аудио и видео ,их можно отслеживать
    videoPlayer.addEventListener("pause", toggleIcon); //Найстройка вкл/выкла плеера ,при нажатии на кнопку "play"/"pause" в треккере


    vidoButtonStop.addEventListener("click", stopPLay)

    videoPlayer.addEventListener("timeupdate", ()=>{ //Настройка таймера и range(прогрессбар)
        const currentTimePassed = videoPlayer.currentTime; //currentTime - нативное св-во ,позволяющее узнать уже прошедшее время видео
        const generalVideoDuration = videoPlayer.duration; //currentTime - нативное св-во ,позволяющее узнать длитнльгость видео

        videoProgress.value = (currentTimePassed/generalVideoDuration) * 100;//rangepoint дивгреатя в зависимосои от пройденного времени.Получаем дробное значение,умножаем на 100,чтобы получить проценты

        let minutePassed = Math.floor(currentTimePassed/60); //Переводм пройденное время в минуты
        let secondsPassed = Math.floor(currentTimePassed % 60); //Переводим пройденное время в секунды, с помощью остатка от деления

        let minutesInTotal = Math.floor(generalVideoDuration / 60); //Переводим общее время видео в минуты
        let secondsInTotal = Math.floor(generalVideoDuration % 60); //Переводим общее время видео в секунды, с помощью остатка от деления
        
        vidoTimePassed.textContent = AddZeroToTimer(minutePassed) + ":" + AddZeroToTimer(secondsPassed); //менем значения таймера на значение уже пройденного нами веменем, про AddZeroToTimer см. выше
        vidoTimeToatal.textContent = AddZeroToTimer(minutesInTotal) + ":" + AddZeroToTimer(secondsInTotal); //менем значения второго статичного таймера на заначение обoей длиьельности видео, про AddZeroToTimer см. выше

        document.onkeydown = checkKey; //перемотка ,при нажатии на клавиши стрелочек влево,вправо и паузы на пробел
        function checkKey(e) {
        e = e || window.event;
        const generalVideoDuration = videoPlayer.duration;
        const changedRangeValue = videoProgress.value;
            if (e.keyCode == '37') { //при нажатии на стрелку вдево ,видео перематывается на 5 секунд назад
                videoPlayer.currentTime = ((changedRangeValue * generalVideoDuration) / 100)-5;
            }
            else if (e.keyCode == '39') { //при нажатии на стрелку вправо ,видео перематывается на 5 секунд вперед
                videoPlayer.currentTime = ((changedRangeValue * generalVideoDuration) / 100)+5;
            }
            else if (e.keyCode == '32') { //при нажатии на пробел ,ставиться пауза и меняется иконка
                toggleIcon();
                togglePlay();
            }
        }
    });
    videoProgress.addEventListener("change",()=>{ //Отслеживаем иземение на range,чтобы перематывать видео
        const generalVideoDuration = videoPlayer.duration;
        const changedRangeValue = videoProgress.value;

        videoPlayer.currentTime = (changedRangeValue * generalVideoDuration) / 100;
    });
}