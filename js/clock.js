const zeroPad = (num, places) => String(num).padStart(places, '0');

function updateClock() {
	let d = new Date();
	let hrs = zeroPad(d.getHours(), 2);
	let minutes = zeroPad(d.getMinutes(), 2);
	let seconds = zeroPad(d.getSeconds(), 2);
	document.getElementById("clock").innerHTML = `${hrs}:${minutes}:${seconds}`;
}
setInterval(updateClock, 1000);
