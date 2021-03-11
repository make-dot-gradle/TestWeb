function makeElementFromTemplate(tmplt) {
	if (typeof tmplt === "string") return tmplt;
	let el = document.createElement(tmplt.tag);
	if (tmplt.attrs !== undefined)
		Object.entries(tmplt.attrs).forEach(a => el.setAttribute(...a));
	if (tmplt.listeners !== undefined)
		Object.entries(tmplt.listeners).forEach(l => el.addEventListener(...l));
	if (tmplt.children !== undefined)
		tmplt.children.forEach(c => el.append(makeElementFromTemplate(c)));
	return el;
}
function deletePoga(event) {
	const form = event.target.parentElement;
	const jsonentry = document.getElementById(`poga${form.id}_jsonrow`);
	form.parentElement.removeChild(form); // .remove() is still experimental
	jsonentry.parentElement.removeChild(jsonentry);
}
function updateJSON(event) {
	const jsonel = document.getElementById(`poga${event.target.form.id}_jsontxt`);
	jsonel.textContent = JSON.stringify(Object.fromEntries((new FormData(event.target.form)).entries()));
}
const makeForm = (idx) => ({
	tag: "form",
	attrs: {"class": "form", id: `${idx}`},
	children: [
		{tag: "input", attrs: {value: "5", name: "inp1"}, listeners: {input: updateJSON}},
		{tag: "input", attrs: {value: "-15", name: "inp2"}, listeners: {input: updateJSON}},
		{
			tag: "input",
			attrs: {type: "button", value: `poga${idx}`},
			listeners: {
				click: function(event) {
					alert(event.target.value);
					deletePoga(event);
				} 
			}
		}
	]
});
const makeTableEntry = (idx, obj) => ({
	tag: "tr",
	attrs: {id: `poga${idx}_jsonrow`},
	children: [
		{tag: "td", children: [`poga${idx}`]},
		{tag: "td", children: [{
			tag: "code",
			attrs: {id: `poga${idx}_jsontxt`},
			children: [JSON.stringify(obj)]
		}]}
	]
});
function addForm(button, addDiv, JSONTable) {
	let idx = Number(button.dataset.idx);
	let form = makeElementFromTemplate(makeForm(idx));
	addDiv.appendChild(form)
	let entry = makeElementFromTemplate(makeTableEntry(idx, {inp1: "5", inp2: "-15"}));
	JSONTable.appendChild(entry);
	idx++;
	button.dataset.idx = idx.toString();
}
const qs = document.querySelector.bind(document);
