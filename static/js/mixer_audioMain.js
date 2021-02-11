const AudioContext = window.AudioContext || window.webkitAudioContext;
const audioCtx = new AudioContext();
Tone.context = audioCtx;

//const audioElement = document.querySelector('audio');
//const track = audioCtx.createMediaElementSource(audioElement);

const playButton = document.querySelector('.control .play');

playButton.addEventListener('click', function(){

    // check if context is in suspended state
    if (audioCtx.state === 'suspended'){
        audioCtx.resume();
    }

    // play or pause track depending on state
    if (this.dataset.playing === 'false') {
        console.log(audioCtx.state);
        noiseRain.start();
        noiseHeavyRain.start();
        noiseWater.start();
        noisePink.start();
        noiseWhite.start();
        noiseNarrow.start();
        noiseTonegen.start();
        this.dataset.playing = 'true';
    }
    else if (this.dataset.playing === 'true') {
        console.log(audioCtx.state);
        noiseRain.stop();
        noiseHeavyRain.stop();
        noiseWater.stop();
        noisePink.stop();
        noiseWhite.stop();
        noiseNarrow.stop();
        noiseTonegen.stop();
        this.dataset.playing = 'false';
    }
    
    let state = this.getAttribute('aria-checked') === "true" ? true : false;
	this.setAttribute( 'aria-checked', state ? "false" : "true" );
	
}, false);


/* 
These lines execute the animation on the "play" button.
*/
$(document).ready(function() {
    var icon = $('.play');
    icon.click(function() {
       icon.toggleClass('active');
       return false;
    });
  });