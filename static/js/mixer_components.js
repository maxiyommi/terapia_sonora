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