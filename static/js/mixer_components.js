/* noisePink */
var sliderPink = document.getElementById("slider_pink");
var numberPink = document.getElementById("value_pink");

const volumeControlPink = document.querySelector('[data-action="volume-pink"]');
const onOffSwitchPink = document.querySelector('.switch_pink');

const gainNodePink = new Tone.Gain(0.05);
const noisePink = new Tone.Player("./static/media/audio/pinkNoise.wav");
noisePink.loop = true;
gainNodePink.gain.value = Math.pow(10, volumeControlPink.value / 20);
noisePink.connect(gainNodePink);
gainNodePink.connect(audioCtx.destination);

console.log(audioCtx.state);
timer_on=0;
sliderPink.oninput = function(){
    numberPink.innerHTML = sliderPink.value;
}

volumeControlPink.addEventListener('input', function() {

    if (this.value != -60) {
		gainNodePink.gain.value =  Math.pow(10, this.value / 20);
		console.log(Math.pow(10, this.value / 20));
		}
		else {
			gainNodePink.gain.value = 0;
		}
	
		if (gainNodePink.gain.value < 0.0011) {
			console.log("entra");
			document.getElementById("infinity_pink").style.display = "block";
			document.getElementById("value_pink").style.display = "none";
	
		}
		else{
			document.getElementById("infinity_pink").style.display = "none";
			document.getElementById("value_pink").style.display = "block";
		}
}, false);
/*
This is for a future button of mute
onOffSwitchPink.addEventListener('change', function() {
	
	if (this.dataset.power === 'on') {
		if (playButton.dataset.playing === 'true') {
			noisePink.stop();
		}
		this.dataset.power = 'off';
	} else if (this.dataset.power === 'off') {
		if (playButton.dataset.playing === 'true') {
			noisePink.start();
		}
		this.dataset.power = 'on';
	}
	console.log(this.dataset);

    let state = this.getAttribute('aria-checked') === "false" ? true : false;
	this.setAttribute( 'aria-checked', state ? "true" : "false" );
}, false);
*/

/* noiseWhite */
var sliderWhite = document.getElementById("slider_white");
var numberWhite = document.getElementById("value_white");

const volumeControlWhite = document.querySelector('[data-action="volume-white"]');
const onOffSwitchWhite = document.querySelector('.switch_white');

const gainNodeWhite = new Tone.Gain(0.5);
const noiseWhite = new Tone.Player("./static/media/audio/whiteNoise.wav");
noiseWhite.loop = true;
gainNodeWhite.gain.value = Math.pow(10, volumeControlWhite.value / 20);
noiseWhite.connect(gainNodeWhite);
gainNodeWhite.connect(audioCtx.destination);

console.log(audioCtx.state);

sliderWhite.oninput = function(){
	
    numberWhite.innerHTML = sliderWhite.value;
}


volumeControlWhite.addEventListener('input', function() {
	if (this.value != -60) {
    gainNodeWhite.gain.value =  Math.pow(10, this.value / 20);
    console.log(Math.pow(10, this.value / 20));
	}
	else {
		gainNodeWhite.gain.value = 0;
	}

	if (gainNodeWhite.gain.value < 0.0011) {
		document.getElementById("infinity_white").style.display = "block";
		document.getElementById("value_white").style.display = "none";

	}
	else{
		document.getElementById("infinity_white").style.display = "none";
		document.getElementById("value_white").style.display = "block";
	}

}, false);


/*
This is for a future button of mute
onOffSwitchWhite.addEventListener('change', function() {
	
	if (this.dataset.power === 'on') {
		if (playButton.dataset.playing === 'true') {
			noiseWhite.stop();
		}
		this.dataset.power = 'off';
	} else if (this.dataset.power === 'off') {
		if (playButton.dataset.playing === 'true') {
			noiseWhite.start();
		}
		this.dataset.power = 'on';
	}
	console.log(this.dataset);

    let state = this.getAttribute('aria-checked') === "false" ? true : false;
	this.setAttribute( 'aria-checked', state ? "true" : "false" );
}, false);
*/

/* noiseNarrow */
var sliderNarrow = document.getElementById("slider_narrow");
var numberNarrow = document.getElementById("value_narrow");

const volumeControlNarrow = document.querySelector('[data-action="volume-narrow"]');
const onOffSwitchNarrow = document.querySelector('.switch_narrow');

const Narrow250 = document.querySelector('[data-action="narrow250"]');
const Narrow500 = document.querySelector('[data-action="narrow500"]');
const Narrow1k = document.querySelector('[data-action="narrow1k"]');
const Narrow2k = document.querySelector('[data-action="narrow2k"]');
const Narrow3k = document.querySelector('[data-action="narrow3k"]');
const Narrow4k = document.querySelector('[data-action="narrow4k"]');
const Narrow6k = document.querySelector('[data-action="narrow6k"]');
const Narrow8k = document.querySelector('[data-action="narrow8k"]');
const Narrow10k = document.querySelector('[data-action="narrow10k"]');
const Narrow12k = document.querySelector('[data-action="narrow12k"]');


const gainNodeNarrow = new Tone.Gain(0.5);

/* First it set the 500 narrowband */
var noiseNarrow = new Tone.Player("./static/media/audio/narrowband500.wav");
noiseNarrow.loop = true;

/* Second it load the rest and save it in a buffer */
const buffer250 = new Tone.Buffer("./static/media/audio/narrowband250.wav");
const buffer500 = new Tone.Buffer("./static/media/audio/narrowband500.wav");
const buffer1k = new Tone.Buffer("./static/media/audio/narrowband1k.wav");
const buffer2k = new Tone.Buffer("./static/media/audio/narrowband2k.wav");
const buffer3k = new Tone.Buffer("./static/media/audio/narrowband3k.wav");
const buffer4k = new Tone.Buffer("./static/media/audio/narrowband4k.wav");
const buffer6k = new Tone.Buffer("./static/media/audio/narrowband6k.wav");
const buffer8k = new Tone.Buffer("./static/media/audio/narrowband8k.wav");
const buffer10k = new Tone.Buffer("./static/media/audio/narrowband10k.wav");
const buffer12k = new Tone.Buffer("./static/media/audio/narrowband12k.wav");

gainNodeNarrow.gain.value = Math.pow(10, volumeControlNarrow.value / 20);
noiseNarrow.connect(gainNodeNarrow);
gainNodeNarrow.connect(audioCtx.destination);

console.log(audioCtx.state);

sliderNarrow.oninput = function(){
	
    numberNarrow.innerHTML = sliderNarrow.value;
}
/*
*/

Narrow250.addEventListener('click', function() {
	/*
	Function activated when user clicks on the "250 Hz" button.
	*/
		color("button_narrow250")	
	
		if (playButton.dataset.playing === 'true'){
			/*
			Ask if the button play is played
			*/
			noiseNarrow.stop();
			noiseNarrow = new Tone.Player(buffer250);
			console.log("buffer250");
			noiseNarrow.loop = true;
			noiseNarrow.connect(gainNodeNarrow);
			gainNodeNarrow.connect(audioCtx.destination);
			console.log("2501");
			noiseNarrow.start();
		}
		else{
			noiseNarrow = new Tone.Player(buffer250);
			noiseNarrow.loop = true;
			noiseNarrow.connect(gainNodeNarrow);
			gainNodeNarrow.connect(audioCtx.destination);
			console.log("2502");
		}

}, false);

Narrow500.addEventListener('click', function() {
	color("button_narrow500")
		if (playButton.dataset.playing === 'true'){
			/*
			Ask if the button play is played
			*/
			noiseNarrow.stop();
			noiseNarrow = new Tone.Player(buffer500);
			noiseNarrow.loop = true;
			noiseNarrow.connect(gainNodeNarrow);
			gainNodeNarrow.connect(audioCtx.destination);
			noiseNarrow.start();
			console.log("500");
		}
		else{
			noiseNarrow = new Tone.Player(buffer500);
			noiseNarrow.loop = true;
			noiseNarrow.connect(gainNodeNarrow);
			gainNodeNarrow.connect(audioCtx.destination);
			console.log("500");
			
	}
}, false);

Narrow1k.addEventListener('click', function() {
	color("button_narrow1k")

		if (playButton.dataset.playing === 'true'){
			/*
			Ask if the button play is played
			*/
			noiseNarrow.stop();
			noiseNarrow = new Tone.Player(buffer1k);
			noiseNarrow.loop = true;
			noiseNarrow.connect(gainNodeNarrow);
			gainNodeNarrow.connect(audioCtx.destination);
			noiseNarrow.start();
			console.log("1k");
		} 
		else{
			noiseNarrow = new Tone.Player(buffer1k);
			noiseNarrow.loop = true;
			noiseNarrow.connect(gainNodeNarrow);
			gainNodeNarrow.connect(audioCtx.destination);
			console.log("1k");

		}
	}, false);

Narrow2k.addEventListener('click', function() {
	color("button_narrow2k")
	console.log("2k");	
		if (playButton.dataset.playing === 'true'){	
			/*
			Ask if the button play is played
			*/
			noiseNarrow.stop();
			noiseNarrow = new Tone.Player(buffer2k);
			noiseNarrow.loop = true;
			noiseNarrow.connect(gainNodeNarrow);
			gainNodeNarrow.connect(audioCtx.destination);
			noiseNarrow.start();
		}
		else{
			noiseNarrow = new Tone.Player(buffer2k);
			noiseNarrow.loop = true;
			noiseNarrow.connect(gainNodeNarrow);
			gainNodeNarrow.connect(audioCtx.destination);	
		}
}, false);

Narrow3k.addEventListener('click', function() {
	color("button_narrow3k")
	console.log("3k");	
		if (playButton.dataset.playing === 'true'){	
			/*
			Ask if the button play is played
			*/
			noiseNarrow.stop();
			noiseNarrow = new Tone.Player(buffer3k);
			noiseNarrow.loop = true;
			noiseNarrow.connect(gainNodeNarrow);
			gainNodeNarrow.connect(audioCtx.destination);
			noiseNarrow.start();
		}
		else{
			noiseNarrow = new Tone.Player(buffer3k);
			noiseNarrow.loop = true;
			noiseNarrow.connect(gainNodeNarrow);
			gainNodeNarrow.connect(audioCtx.destination);	
		}
}, false);


Narrow4k.addEventListener('click', function() {
	color("button_narrow4k")
	console.log("4k");	
		if (playButton.dataset.playing === 'true'){	
			/*
			Ask if the button play is played
			*/
			noiseNarrow.stop();
			noiseNarrow = new Tone.Player(buffer4k);
			noiseNarrow.loop = true;
			noiseNarrow.connect(gainNodeNarrow);
			gainNodeNarrow.connect(audioCtx.destination);
			noiseNarrow.start();
		}
		else{
			noiseNarrow = new Tone.Player(buffer4k);
			noiseNarrow.loop = true;
			noiseNarrow.connect(gainNodeNarrow);
			gainNodeNarrow.connect(audioCtx.destination);	
		}	
}, false);

Narrow6k.addEventListener('click', function() {
	color("button_narrow6k")
	console.log("6k");	
		if (playButton.dataset.playing === 'true'){	
			/*
			Ask if the button play is played
			*/
			noiseNarrow.stop();
			noiseNarrow = new Tone.Player(buffer6k);
			noiseNarrow.loop = true;
			noiseNarrow.connect(gainNodeNarrow);
			gainNodeNarrow.connect(audioCtx.destination);
			noiseNarrow.start();
		}
		else{
			noiseNarrow = new Tone.Player(buffer6k);
			noiseNarrow.loop = true;
			noiseNarrow.connect(gainNodeNarrow);
			gainNodeNarrow.connect(audioCtx.destination);	
		}
}, false);


Narrow8k.addEventListener('click', function() {
	color("button_narrow8k")
	console.log("8k");	
		if (playButton.dataset.playing === 'true'){	
			/*
			Ask if the button play is played
			*/
			noiseNarrow.stop();
			noiseNarrow = new Tone.Player(buffer8k);
			noiseNarrow.loop = true;
			noiseNarrow.connect(gainNodeNarrow);
			gainNodeNarrow.connect(audioCtx.destination);
			noiseNarrow.start();
		}
		else{
			noiseNarrow = new Tone.Player(buffer8k);
			noiseNarrow.loop = true;
			noiseNarrow.connect(gainNodeNarrow);
			gainNodeNarrow.connect(audioCtx.destination);	
		}
}, false);

Narrow10k.addEventListener('click', function() {
	color("button_narrow10k")
	console.log("10k");	
		if (playButton.dataset.playing === 'true'){	
			/*
			Ask if the button play is played
			*/
			noiseNarrow.stop();
			noiseNarrow = new Tone.Player(buffer10k);
			noiseNarrow.loop = true;
			noiseNarrow.connect(gainNodeNarrow);
			gainNodeNarrow.connect(audioCtx.destination);
			noiseNarrow.start();
		}
		else{
			noiseNarrow = new Tone.Player(buffer10k);
			noiseNarrow.loop = true;
			noiseNarrow.connect(gainNodeNarrow);
			gainNodeNarrow.connect(audioCtx.destination);	
		}
}, false);

Narrow12k.addEventListener('click', function() {
	color("button_narrow12k")
	console.log("12k");	
		if (playButton.dataset.playing === 'true'){	
			/*
			Ask if the button play is played
			*/
			noiseNarrow.stop();
			noiseNarrow = new Tone.Player(buffer12k);
			noiseNarrow.loop = true;
			noiseNarrow.connect(gainNodeNarrow);
			gainNodeNarrow.connect(audioCtx.destination);
			noiseNarrow.start();
		}
		else{
			noiseNarrow = new Tone.Player(buffer12k);
			noiseNarrow.loop = true;
			noiseNarrow.connect(gainNodeNarrow);
			gainNodeNarrow.connect(audioCtx.destination);	
		}
}, false);


function color(button){
	/*
			Function that changes the color of each button. It swap the font color with the background color.

			In:
			-------
			button (str): takes the ID of the button, set this to one "checked" color and change the rest to the original one.
			*/
	str = ["button_narrow250", "button_narrow500", "button_narrow1k", "button_narrow2k", "button_narrow3k", "button_narrow4k", "button_narrow6k", "button_narrow8k", "button_narrow10k", "button_narrow12k"];
	var i;

	for (i = 0; i < str.length; i++) {
		if (str[i] == button){
			document.getElementById(str[i]).style.color = "#d38157";
			document.getElementById(str[i]).style.backgroundColor = "#1d0b38"
			aux=i
		}
		else{
			document.getElementById(str[i]).style.color = "#1d0b38";
			document.getElementById(str[i]).style.backgroundColor = "#d38157";

		}
	}
}


volumeControlNarrow.addEventListener('input', function() {

    if (this.value != -60) {
		gainNodeNarrow.gain.value =  Math.pow(10, this.value / 20);
		console.log(Math.pow(10, this.value / 20));
		}
		else {
			gainNodeNarrow.gain.value = 0;
		}
	
		if (gainNodeNarrow.gain.value < 0.0011) {
			document.getElementById("infinity_narrow").style.display = "block";
			document.getElementById("value_narrow").style.display = "none";
	
		}
		else{
			document.getElementById("infinity_narrow").style.display = "none";
			document.getElementById("value_narrow").style.display = "block";
		}
}, false);

/*
This is for a future button of mute
onOffSwitchNarrow.addEventListener('change', function() {
	
	if (this.dataset.power === 'on') {
		if (playButton.dataset.playing === 'true') {
			noiseNarrow.stop();
		}
		this.dataset.power = 'off';
	} else if (this.dataset.power === 'off') {
		if (playButton.dataset.playing === 'true') {
			noiseNarrow.start();
		}
		this.dataset.power = 'on';
	}
	console.log(this.dataset);

    let state = this.getAttribute('aria-checked') === "false" ? true : false;
	this.setAttribute( 'aria-checked', state ? "true" : "false" );
}, false);

*/

/* noiseTonegen */
var sliderTonegen = document.getElementById("slider_tonegen");
var numberTonegen = document.getElementById("value_tonegen");
var sliderTonegenFreq = document.getElementById("slider_tonegen_freq");
var numberTonegenFreq = document.getElementById("value_tonegen_freq");

const volumeControlTonegen = document.querySelector('[data-action="volume-tonegen"]');
const freqControlTonegen = document.querySelector('[data-action="freq-tonegen"]');
const onOffSwitchTonegen = document.querySelector('.switch_tonegen');

const gainNodeTonegen = new Tone.Gain(0.5);
const noiseTonegen = new Tone.Oscillator(freqControlTonegen.value, "sine");

gainNodeTonegen.gain.value = Math.pow(10, volumeControlTonegen.value / 20);
noiseTonegen.connect(gainNodeTonegen);
gainNodeTonegen.connect(audioCtx.destination);
noiseTonegen.frequency = sliderTonegenFreq.value;

sliderTonegen.oninput = function(){
    numberTonegen.innerHTML = sliderTonegen.value;
}

sliderTonegenFreq.oninput = function(){
    numberTonegenFreq.innerHTML = sliderTonegenFreq.value;
	
}

volumeControlTonegen.addEventListener('input', function() {
	if (this.value != -60) {
    gainNodeTonegen.gain.value =  Math.pow(10, this.value / 20);
    console.log(Math.pow(10, this.value / 20));
	}
	else {
		gainNodeTonegen.gain.value = 0;
	}

	if (gainNodeTonegen.gain.value < 0.0011) {
		document.getElementById("infinity_tonegen").style.display = "block";
		document.getElementById("value_tonegen").style.display = "none";

	}
	else{
		document.getElementById("infinity_tonegen").style.display = "none";
		document.getElementById("value_tonegen").style.display = "block";
	}

}, false);

freqControlTonegen.addEventListener('input', function() {

    noiseTonegen.set({frequency: this.value});
    console.log(noiseTonegen.frequency._initialValue);

}, false);
/*
This is for a future button of mute
onOffSwitchTonegen.addEventListener('change', function() {
	
	if (this.dataset.power === 'on') {
		if (playButton.dataset.playing === 'true') {
			noiseTonegen.stop();
		}
		this.dataset.power = 'off';
	} else if (this.dataset.power === 'off') {
		if (playButton.dataset.playing === 'true') {
			noiseTonegen.start();
		}
		this.dataset.power = 'on';
	}
	console.log(this.dataset);

    let state = this.getAttribute('aria-checked') === "false" ? true : false;
	this.setAttribute( 'aria-checked', state ? "true" : "false" );
}, false);
*/

/* noiseRain */
/* audio from https://www.freesoundslibrary.com/rain-noise-sound-effect/
License: Attribution 4.0 International (CC BY 4.0). You are allowed to use sound effects 
free of charge and royalty free in your multimedia projects for commercial or 
non-commercial purposes.*/

var sliderRain = document.getElementById("slider_rain");
var numberRain = document.getElementById("value_rain");

const volumeControlRain = document.querySelector('[data-action="volume-rain"]');
const onOffSwitchRain = document.querySelector('.switch_rain');

const gainNodeRain = new Tone.Gain(0.5);
const buff = new Tone.Buffer("./static/media/audio/Rain.wav");
var noiseRain = new Tone.Player(buff);
noiseRain.loop = true;


gainNodeRain.gain.value = Math.pow(10, volumeControlRain.value / 20);
noiseRain.connect(gainNodeRain);
gainNodeRain.connect(audioCtx.destination);
console.log(audioCtx.state);

sliderRain.oninput = function(){
    numberRain.innerHTML = sliderRain.value;
}

volumeControlRain.addEventListener('input', function() {
	if (this.value != -60) {
    gainNodeRain.gain.value =  Math.pow(10, this.value / 20);
    console.log(Math.pow(10, this.value / 20));
	}
	else {
		gainNodeRain.gain.value = 0;
	}

	if (gainNodeRain.gain.value < 0.0011) {
		document.getElementById("infinity_rain").style.display = "block";
		document.getElementById("value_rain").style.display = "none";

	}
	else{
		document.getElementById("infinity_rain").style.display = "none";
		document.getElementById("value_rain").style.display = "block";
	}

}, false);
/*
This is for a future button of mute
onOffSwitchRain.addEventListener('change', function() {
	
	if (this.dataset.power === 'on') {
		if (playButton.dataset.playing === 'true') {
			noiseRain.stop();
		}
		this.dataset.power = 'off';
	} else if (this.dataset.power === 'off') {
		if (playButton.dataset.playing === 'true') {
			noiseRain.start();
		}
		this.dataset.power = 'on';
	}
	console.log(this.dataset);

    let state = this.getAttribute('aria-checked') === "false" ? true : false;
	this.setAttribute( 'aria-checked', state ? "true" : "false" );
}, false);

*/

/* noiseHeavyRain */
var sliderHeavyRain = document.getElementById("slider_heavyRain");
var numberHeavyRain = document.getElementById("value_heavyRain");

const volumeControlHeavyRain = document.querySelector('[data-action="volume-heavyRain"]');
const onOffSwitchHeavyRain = document.querySelector('.switch_heavyRain');

const gainNodeHeavyRain = new Tone.Gain(0.5);
var norm = new Tone.Normalize(0, 1);
const noiseHeavyRain = new Tone.Player("./static/media/audio/heavyRain.wav").connect(norm);
noiseHeavyRain.loop = true;


gainNodeHeavyRain.gain.value = Math.pow(10, volumeControlHeavyRain.value / 20);
noiseHeavyRain.connect(gainNodeHeavyRain);
gainNodeHeavyRain.connect(audioCtx.destination);
console.log(audioCtx.state);

sliderHeavyRain.oninput = function(){
    numberHeavyRain.innerHTML = sliderHeavyRain.value;
}

volumeControlHeavyRain.addEventListener('input', function() {
	if (this.value != -60) {
    gainNodeHeavyRain.gain.value =  Math.pow(10, this.value / 20);
    console.log(Math.pow(10, this.value / 20));
	}
	else {
		gainNodeHeavyRain.gain.value = 0;
	}

	if (gainNodeHeavyRain.gain.value < 0.0011) {
		document.getElementById("infinity_heavyRain").style.display = "block";
		document.getElementById("value_heavyRain").style.display = "none";

	}
	else{
		document.getElementById("infinity_heavyRain").style.display = "none";
		document.getElementById("value_heavyRain").style.display = "block";
	}

}, false);

/*
This is for a future button of mute
onOffSwitchHeavyRain.addEventListener('change', function() {
	
	if (this.dataset.power === 'on') {
		if (playButton.dataset.playing === 'true') {
			noiseHeavyRain.stop();
		}
		this.dataset.power = 'off';
	} else if (this.dataset.power === 'off') {
		if (playButton.dataset.playing === 'true') {
			noiseHeavyRain.start();
		}
		this.dataset.power = 'on';
	}
	console.log(this.dataset);

    let state = this.getAttribute('aria-checked') === "false" ? true : false;
	this.setAttribute( 'aria-checked', state ? "true" : "false" );
}, false);

*/

/* 
audio from https://www.freesoundslibrary.com/mountain-river-sounds/
License: Attribution 4.0 International (CC BY 4.0). You are allowed to use sound effects 
free of charge and royalty free in your multimedia projects for commercial or 
non-commercial purposes.
*/

/* noiseWater */
var sliderWater = document.getElementById("slider_water");
var numberWater = document.getElementById("value_water");

const volumeControlWater = document.querySelector('[data-action="volume-water"]');
const onOffSwitchWater = document.querySelector('.switch_water');

const gainNodeWater = new Tone.Gain(0.5);
const noiseWater = new Tone.Player("./static/media/audio/Water.wav");
noiseWater.loop = true;

gainNodeWater.gain.value = Math.pow(10, volumeControlWater.value / 20);
noiseWater.connect(gainNodeWater);
gainNodeWater.connect(audioCtx.destination);
console.log(audioCtx.state);
sliderWater.oninput = function(){
    numberWater.innerHTML = sliderWater.value;
}

volumeControlWater.addEventListener('input', function() {
	if (this.value != -60) {
    gainNodeWater.gain.value =  Math.pow(10, this.value / 20);
    console.log(Math.pow(10, this.value / 20));
	}
	else {
		gainNodeWater.gain.value = 0;
	}

	if (gainNodeWater.gain.value < 0.0011) {
		document.getElementById("infinity_water").style.display = "block";
		document.getElementById("value_water").style.display = "none";

	}
	else{
		document.getElementById("infinity_water").style.display = "none";
		document.getElementById("value_water").style.display = "block";
	}

}, false);


/*
This is for a future button of mute
onOffSwitchWater.addEventListener('change', function() {
	
	if (this.dataset.power === 'on') {
		if (playButton.dataset.playing === 'true') {
			noiseWater.stop();
		}
		this.dataset.power = 'off';
	} else if (this.dataset.power === 'off') {
		if (playButton.dataset.playing === 'true') {
			noiseWater.start();
		}
		this.dataset.power = 'on';
	}
	console.log(this.dataset);

    let state = this.getAttribute('aria-checked') === "false" ? true : false;
	this.setAttribute( 'aria-checked', state ? "true" : "false" );
}, false);
*/

const OpenTimer = document.querySelector('[data-action="open_timer"]');
const Timer10 = document.querySelector('[data-action="timer10"]');
const Timer20 = document.querySelector('[data-action="timer20"]');
const Timer30 = document.querySelector('[data-action="timer30"]');
const Timer40 = document.querySelector('[data-action="timer40"]');
const Timer50 = document.querySelector('[data-action="timer50"]');
const Timer60 = document.querySelector('[data-action="timer60"]');
const Timer120 = document.querySelector('[data-action="timer120"]');



OpenTimer.addEventListener('click', function() {
	pause();
	timer(1)

}, false);

Timer10.addEventListener('click', function() {
	var time = "10:00";
	playTimer(time)
}, false);

Timer20.addEventListener('click', function() {
	var time = "20:00";
	playTimer(time)
}, false);

Timer30.addEventListener('click', function() {
	var time = "30:00";
	playTimer(time)
}, false);

Timer40.addEventListener('click', function() {
	var time = "40:00";
	playTimer(time)
}, false);

Timer50.addEventListener('click', function() {
	var time = "50:00";
	playTimer(time)
}, false);

Timer60.addEventListener('click', function() {
	var time = "60:00";
	playTimer(time)
}, false);

Timer120.addEventListener('click', function() {
	var time = "120:00";
	playTimer(time)
}, false);

function playTimer(time){
	console.log(time);
	timer(0)
	initTimer(time);
	play();
	
}
function timer(x){
	if(x==0){
	document.getElementById("button_timer10").style.display = "none"
	document.getElementById("button_timer20").style.display = "none"
	document.getElementById("button_timer30").style.display = "none"
	document.getElementById("button_timer40").style.display = "none"
	document.getElementById("button_timer50").style.display = "none"
	document.getElementById("button_timer60").style.display = "none"
	document.getElementById("button_timer120").style.display = "none"
	document.getElementById("label_timer").style.display = "none"
	document.getElementById("timer").style.display = "block"
	timer_on = 1;
	}
	else{
	document.getElementById("button_timer10").style.display = "block"
	document.getElementById("button_timer20").style.display = "block"
	document.getElementById("button_timer30").style.display = "block"
	document.getElementById("button_timer40").style.display = "block"
	document.getElementById("button_timer50").style.display = "block"
	document.getElementById("button_timer60").style.display = "block"
	document.getElementById("button_timer120").style.display = "block"
	document.getElementById("label_timer").style.display = "block"
	document.getElementById("timer").style.display = "none"
	timer_on = 0;
	}

}

/*********************/
/*   Timer   */
/*********************/



 // other ways --> "0:15" "03:5" "5:2"

var reloadBtn = document.querySelector('.reload');
var timerEl = document.querySelector('.timer');


function initTimer (t) {

	stop=0;
   
   var self = this,
       timerEl = document.querySelector('.timer'),
       minutesGroupEl = timerEl.querySelector('.minutes-group'),
       secondsGroupEl = timerEl.querySelector('.seconds-group'),

       minutesGroup = {
          firstNum: minutesGroupEl.querySelector('.first'),
          secondNum: minutesGroupEl.querySelector('.second')
       },

       secondsGroup = {
          firstNum: secondsGroupEl.querySelector('.first'),
          secondNum: secondsGroupEl.querySelector('.second')
       };

   var time = {
      min: t.split(':')[0],
      sec: t.split(':')[1]
   };

   var timeNumbers;
   
   function updateTimer() {

      var timestr;
      var date = new Date();

      date.setHours(0);
      date.setMinutes(time.min);
      date.setSeconds(time.sec);

      var newDate = new Date(date.valueOf() - 1000);
      var temp = newDate.toTimeString().split(" ");
      var tempsplit = temp[0].split(':');

      time.min = tempsplit[1];
      time.sec = tempsplit[2];

	  if (stop==1){
		  time.min="00"
		  time.sec="00"
	  }
      timestr = time.min + time.sec;
      timeNumbers = timestr.split('');
	  console.log(timeNumbers)

      updateTimerDisplay(timeNumbers);

      if(timestr === '0000')
        countdownFinished();

	  if(timestr != '0000')
        setTimeout(updateTimer, 1000);

   }

   function updateTimerDisplay(arr) {

      animateNum(minutesGroup.firstNum, arr[0]);
      animateNum(minutesGroup.secondNum, arr[1]);
      animateNum(secondsGroup.firstNum, arr[2]);
      animateNum(secondsGroup.secondNum, arr[3]);

   }

   function animateNum (group, arrayValue) {

      TweenMax.killTweensOf(group.querySelector('.number-grp-wrp'));
      TweenMax.to(group.querySelector('.number-grp-wrp'), 1, {
         y: - group.querySelector('.num-' + arrayValue).offsetTop
      });

   }
   
   setTimeout(updateTimer, 1000);

}

function countdownFinished() {
   setTimeout(function () {
      TweenMax.to(timerEl, 1, {});
   }, 1000);
   pause();
   $.magnificPopup.proto.close.call()
}


/*********************/

$(document).on('click', function(event) {
    if ($(event.target).has('').length) {
        $(".lightbox").hide();
    }
});

/********Lightbox**********/


