/* noisePink */
var sliderPink = document.getElementById("slider_pink");
var numberPink = document.getElementById("value_pink");

const volumeControlPink = document.querySelector('[data-action="volume-pink"]');
const onOffSwitchPink = document.querySelector('.switch_pink');

const gainNodePink = new Tone.Gain(0.05);
const noisePink = new Tone.Noise("pink");

gainNodePink.gain.value = volumeControlPink.value / 100;
noisePink.connect(gainNodePink);
gainNodePink.connect(audioCtx.destination);

console.log(audioCtx.state);

sliderPink.oninput = function(){
    numberPink.innerHTML = sliderPink.value;
}

volumeControlPink.addEventListener('input', function() {

    gainNodePink.gain.value = this.value / 100;
    console.log(this.value / 100);

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
const noiseWhite = new Tone.Noise("white");

gainNodeWhite.gain.value = volumeControlWhite.value / 100;
noiseWhite.connect(gainNodeWhite);
gainNodeWhite.connect(audioCtx.destination);

console.log(audioCtx.state);

sliderWhite.oninput = function(){
    numberWhite.innerHTML = sliderWhite.value;
}


volumeControlWhite.addEventListener('input', function() {

    gainNodeWhite.gain.value = this.value / 100;
    console.log(this.value / 100);

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

const gainNodeNarrow = new Tone.Gain(0.5);
const noiseNarrow = new Tone.Player("./static/media/audio/narrow.wav");
noiseNarrow.loop = true;

gainNodeNarrow.gain.value = volumeControlNarrow.value / 100;
noiseNarrow.connect(gainNodeNarrow);
gainNodeNarrow.connect(audioCtx.destination);

console.log(audioCtx.state);

sliderNarrow.oninput = function(){
    numberNarrow.innerHTML = sliderNarrow.value;
}
/*
*/
function narrow500(){
	/* Function that select the 500 Hz narrowband */
	const gainNodeNarrow = new Tone.Gain(0.5);
	const noiseNarrow = new Tone.Player("");
	noiseNarrow.loop = true;
	console.log("500");

};
	
	
function narrow1k(){
	/* Function that select the 1 kHz narrowband */
	const gainNodeNarrow = new Tone.Gain(0.5);
	const noiseNarrow = new Tone.Player("");
	noiseNarrow.loop = true;
	console.log("1k");

	
};
	
function narrow2k(){
	/* Function that select the 2 kHz narrowband */
	const gainNodeNarrow = new Tone.Gain(0.5);
	const noiseNarrow = new Tone.Player("");
	noiseNarrow.loop = true;
	console.log("2k");	
	
	
};

volumeControlNarrow.addEventListener('input', function() {

    gainNodeNarrow.gain.value = this.value / 100;
    console.log(this.value / 100);

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

gainNodeTonegen.gain.value = volumeControlTonegen.value / 100;
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

    gainNodeTonegen.gain.value = this.value / 100;
    console.log(this.value / 100);

}, false);

freqControlTonegen.addEventListener('input', function() {

    noiseTonegen.set({frequency: this.value});
    console.log(noiseTonegen.frequency._initialValue);

}, false);

/* This is for a future button of mute
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
const noiseRain = new Tone.Player("./static/media/audio/rain.mp3");
noiseRain.loop = true;


gainNodeRain.gain.value = volumeControlRain.value / 100;
noiseRain.connect(gainNodeRain);
gainNodeRain.connect(audioCtx.destination);
console.log(audioCtx.state);

sliderRain.oninput = function(){
    numberRain.innerHTML = sliderRain.value;
}

volumeControlRain.addEventListener('input', function() {

    gainNodeRain.gain.value = this.value / 100;
    console.log(this.value / 100);

}, false);

/* This is for a future button of mute
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
const noiseHeavyRain = new Tone.Player("./static/media/audio/heavy_rain.mp3");
noiseHeavyRain.loop = true;


gainNodeHeavyRain.gain.value = volumeControlHeavyRain.value / 100;
noiseHeavyRain.connect(gainNodeHeavyRain);
gainNodeHeavyRain.connect(audioCtx.destination);
console.log(audioCtx.state);

sliderHeavyRain.oninput = function(){
    numberHeavyRain.innerHTML = sliderHeavyRain.value;
}

volumeControlHeavyRain.addEventListener('input', function() {

    gainNodeHeavyRain.gain.value = this.value / 100;
    console.log(this.value / 100);

}, false);

/* This is for a future button of mute
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
const noiseWater = new Tone.Player("./static/media/audio/water.mp3");
noiseWater.loop = true;

gainNodeWater.gain.value = volumeControlWater.value / 100;
noiseWater.connect(gainNodeWater);
gainNodeWater.connect(audioCtx.destination);
console.log(audioCtx.state);
sliderWater.oninput = function(){
    numberWater.innerHTML = sliderWater.value;
}

volumeControlWater.addEventListener('input', function() {

    gainNodeWater.gain.value = this.value / 100;
    console.log(this.value / 100);

}, false);

/* This is for a future button of mute
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