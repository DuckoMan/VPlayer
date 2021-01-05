//General exporting function
export const radioPlayerInit =()=>{
//Variables
    const radio = document.querySelector(".radio");
    const radioCoverImg = document.querySelector(".radio-cover__img");
    const radioHeaderBig = document.querySelector(".radio-header__big");
    const radioNavigation = document.querySelector(".radio-navigation");
    const radioItem = document.querySelectorAll(".radio-item");
    const radioStop = document.querySelector(".radio-stop");

    const audio = new Audio(); //Нативный объект Audio
    audio.type = "audio/aac"; //Тип аудио - acc
    radioStop.disabled = true;//Блокируем кнопку "play",пока радиостанция не выбрана
//Functions
    const changeIconPlay = () => {
        if(audio.paused){
            radio.classList.remove("play");
            radioStop.classList.add("fa-play")
            radioStop.classList.remove("fa-stop")
        } else {
            radio.classList.add("play");
            radioStop.classList.remove("fa-play")
            radioStop.classList.add("fa-stop")
        }
    }
    const selectActiveItem = elem =>{
        radioItem.forEach(item => item.classList.remove("select"))//Перебираем все элементы с классом item и удаляем класс select(потому что после активации другой радиостанции класс select(обводка)остается,чтобы ее не было -удаляем класс select везде)
        elem.classList.add("select");//Класс select включает обводку у активной радиостанции
    }

//Tracking
    radioNavigation.addEventListener("change", event =>{ //Выбор радиостанции (Chaange используется потому,что в html каждому из элементов с иконками радио прописано одно и то же имя и один и тот же тип(radioButton)
        const target = event.target; //узнаем истоичник вызова функции ,с помощбю атрибута target внутри event
        const parrent = target.closest(".radio-item");//Получаем играющюю радисотанцию
        const title = parrent.querySelector(".radio-name").textContent;//Получем название радиостанции,textContent - для получения текста из тега
        radioHeaderBig.textContent = title;

        // const img = parrent.querySelector(".radio-img").src; //ЧТОБЫ МЕНЯЛАСЬ И КАРТИНКА ВО ВРЕМЯ ВОСПРОИЗВЕДЕНИЯ МУЗЫКА
        // radioCoverImg.src = img;
    
        selectActiveItem(parrent);//про selectActiveItem см. выше
        radioStop.disabled = false;
        audio.src = target.dataset.radioStantion;
        audio.play();
        changeIconPlay();
    });
    radioStop.addEventListener("click",()=>{//настройка кнопки "play"/"paused"(смена значка)
        if(audio.paused){
            audio.play();
        } else {
            audio.pause();
        }
        changeIconPlay();
    })
}