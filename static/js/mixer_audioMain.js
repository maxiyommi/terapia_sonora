const AudioContext = window.AudioContext || window.webkitAudioContext;
const audioCtx = new AudioContext();
Tone.context = audioCtx;

//const audioElement = document.querySelector('audio');
//const track = audioCtx.createMediaElementSource(audioElement);

const playButton = document.querySelector('[data-action="prueba"]');
const pauseButton = document.querySelector('[data-action="prueba2"]');

playButton.addEventListener('click', function(){
    play();
	
}, false);

pauseButton.addEventListener('click', function(){
    pause();
	
}, false);

function play () {
    // check if context is in suspended state
    if (audioCtx.state === 'suspended'){
        audioCtx.resume();
    }

    // play or pause track depending on state

    console.log("play play")
    console.log(audioCtx.state);
    noisePink.start();
    noiseWhite.start();
    noiseNarrow.start();
    noiseTonegen.start();
    noiseRain.start();
    noiseHeavyRain.start();
    noiseWater.start();

    document.getElementById("prueba1").style.display = "none"
    document.getElementById("prueba2").style.display = "block"

    
    let state = playButton.getAttribute('aria-checked') === "true" ? true : false;
    playButton.setAttribute( 'aria-checked', state ? "false" : "true" );
    playButton.dataset.playing=true;

    }

function pause () {

        // check if context is in suspended state
    if (audioCtx.state === 'suspended'){
        audioCtx.resume();
    }

    console.log("stop stop")
    console.log(audioCtx.state);
    noisePink.stop();
    noiseWhite.stop();
    noiseNarrow.stop();
    noiseTonegen.stop();
    noiseRain.stop();
    noiseHeavyRain.stop();
    noiseWater.stop();
    document.getElementById("prueba1").style.display = "block"
    document.getElementById("prueba2").style.display = "none"

    let state = pauseButton.getAttribute('aria-checked') === "true" ? true : false;
    pauseButton.setAttribute('aria-checked', state ? "false" : "true" );
    playButton.dataset.playing=false;

}


/* These lines execute the animation on the "play" button.  */
$(document).ready(function() {
    var icon = $('.prueba');
    icon.click(function() {
       icon.toggleClass('active');
       return false;

    });
  });