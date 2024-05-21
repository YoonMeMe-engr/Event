const audioTag = document.getElementsByClassName("audioTag")[0];
const playListContainerTag = document.getElementsByClassName("playListcontainer")[0];
const totalMinutesAndSecondsTag = document.getElementsByClassName("toalMinutesAndSeconds")[0];
const currentProgressTag = document.getElementById("currentProgress");
const previousButtonTag = document.getElementsByClassName("previousButton")[0];
const playButtonTag = document.getElementsByClassName("playButton")[0];
const pauseButtonTag = document.getElementsByClassName("pauseButton")[0];
const nextButtonTag = document.getElementsByClassName("nextButton")[0];
const volumeButtonTag = document.getElementsByClassName("volumeButton")[0];

const tracks = [
    { trackId: "music/track1.mp3" , title: "December Nya - Lin Nit" },
    { trackId: "music/track2.mp3" , title: "Tsaw Ra Ai Tsaw Hkrup Sai - Ann Naw" },
    { trackId: "music/track3.mp3" , title: "Lann Mha Gyee Bay - Wine Su Khine Thein" },
    { trackId: "music/track4.mp3" , title: "Yee Zeer Sar - Sai Sai Kham Hlaing" },
];

for ( let i = 0; i < tracks.length; i ++ ) {
    const trackList = document.createElement("div");
    trackList.addEventListener("click" , () => {
        const trackItem = tracks[i].trackId;
        audioTag.src = trackItem;
        isPlaying = true;
        currentPlayingIndex = i;
        updateSongsToPlay();
    });
    trackList.classList.add("shout");
    trackList.textContent = ( i + 1 ).toString() + ". " + tracks[i].title;
    playListContainerTag.append(trackList);
};

let durationTime = 0;
let durationTimeText = "00:00";
audioTag.addEventListener("loadeddata" , () => {
    durationTime = Math.floor(audioTag.duration);
    durationTimeText = updateMinutesAndSeconds(durationTime);
});

audioTag.addEventListener("timeupdate" , () => {
    const currentTime = Math.floor(audioTag.currentTime);
    const currentTimeText = updateMinutesAndSeconds(currentTime);

    totalMinutesAndSecondsTag.textContent = currentTimeText + " / " +durationTimeText;
    updateProgressBar(currentTime);
});

const updateProgressBar = (currentTime) => {
    const currentProgressWidth = (640/durationTime) * currentTime;
    currentProgressTag.style.width = currentProgressWidth.toString() + "px";
};

const updateMinutesAndSeconds = (totalseconds) => {
    const minutes = Math.floor(totalseconds/60);
    const seconds = totalseconds % 60;

    const minuteText = minutes < 10 ? "0" + minutes.toString() : minutes;
    const secondText = seconds < 10 ? "0" + seconds.toString() : seconds;
    return minuteText + ":" + secondText;
};

let currentPlayingIndex = 0;
let isPlaying = false;
playButtonTag.addEventListener("click" , () => {
    const currentTime = Math.floor(audioTag.currentTime);
    isPlaying = true;
    if (currentTime === 0) {
        updateSongsToPlay();
    }
    audioTag.play();
    updatePlayAndPauseButton();
});

pauseButtonTag.addEventListener("click" , () => {
    isPlaying = false;
    audioTag.pause();
    updatePlayAndPauseButton();
});

const updatePlayAndPauseButton = () => {
    if (isPlaying) {
        playButtonTag.style.display = "none";
        pauseButtonTag.style.display = "inline";
    } else {
        playButtonTag.style.display = "inline";
        pauseButtonTag.style.display = "none";
    }
};

previousButtonTag.addEventListener("click" , () => {
 if (currentPlayingIndex === 0) {
    return;
    }
    currentPlayingIndex -= 1;
    updateSongsToPlay();
});

nextButtonTag.addEventListener("click" , () => {
    if (currentPlayingIndex === tracks.length - 1) {
        return;
    }
    currentPlayingIndex += 1;
    updateSongsToPlay();
});

const updateSongsToPlay = () => {
    const songsToPlay = tracks[currentPlayingIndex].trackId;
    audioTag.src = songsToPlay;
    audioTag.play();
    updatePlayAndPauseButton();
};

audioTag.addEventListener("volumechange" , () => {
    console.log("volume...");
});