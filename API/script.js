let url = "https://www.dnd5eapi.co/api/"
let endpoint="";
let name = "";
let classContainer = document.getElementById("classContainer")
let raceContainer = document.getElementById("racesContainer")
var path = window.location.pathname;
var page = path.split("/").pop();
if(page=="classes.html"){
loadClasses()}
else if (page=="races.html") {
loadRaces()}

fetch(url)
.then(response => response.json())
.then(data => console.log(data));

async function fetchJSON(url){
	const respuesta = await fetch(url);
	const json = await respuesta.json();
	return json;
}
function fixNavMobile(){
	if (navigator.userAgent.match(/Mobile/)) {
		document.getElementById("navLinks").innerHTML=`
			<div class="links"><img class="navIcons" src="img/home.png"></div>
			<div class="links"><img class="navIcons" src="img/class.png"></div>
			<div class="links"><img class="navIcons" src="img/race.png"></div>
			<div class="links"><img class="navIcons" src="img/skull.png"></div>
		`
	}
}


fixNavMobile();
function loadRaces(){
	endpoint = "races"
	fetchJSON(`${url}${endpoint}/${name.toLowerCase()}`).then(json =>	{
		for (race of json.results) {
				var p = document.createElement("div");
			p.id=`${race.name}`
			p.onclick = function(){deployClass(this.id)};
			p.classList.add("races")
			p.innerHTML=`
				<img class="racesIcon" src="img/races/${race.name.toLowerCase}.png">
				<h2>${race.name}</h2>
			`
			racesContainer.appendChild(p)
			p.onclick = function(){deployRaces(this.id)};
			}	
	})
}
function deployRaces(id){
	endpoint = "races";
	name = id;
	fetchJSON(`${url}${endpoint}/${name.toLowerCase()}`).then(json => { 
	racesContainer.innerHTML=`
	<div class="classInfo deployAnimation">
		<div class="classHead">
			<img class="classMiniIcon" src="img/world.png">
			<h1>${json.name}</h1>
			<img class="classMiniIcon" src="img/world.png">
		</div>
		<div class="classData">
			<div class="classText" id="classText"></div>

			<div id="classImgDiv"><img class="classImg" src="img/races/${name.toLowerCase}.png"</div>
		</div>
	</div>`
	addRaceData()
	})
}

function addRaceData(){
	endpoint = "races";
	fetchJSON(`${url}${endpoint}/${name.toLowerCase()}`).then(json => {
		var baseData = document.createElement("div")
		baseData.classList.add("basicData")
		baseData.innerHTML=`Basic info:<ul id="basicList"><li>Age: ${json.age}</li>
		<li>Size: ${json.size}</li>
		<li>Ability Bonuses: ${addAbilityBonuses(json)}</li>
		<li>Speed: ${json.speed}</li>
		<li>Languages: ${json.language_desc}</li>
		`
			var list = document.createElement("ul")
			console.log(json.language_options)
			if (!(json.language_options == undefined)) {
			var hr = document.createElement("hr")
			hr.id="separator"
			baseData.appendChild(hr)
			var p = document.createElement("p")
			p.innerText="Choose one of those languages"
			baseData.appendChild(p)
			list.id="tripleList"
				for (lang of json.language_options.from) {
					var li = document.createElement("li")
					li.innerText = lang.name
					list.appendChild(li)
		}}
		baseData.appendChild(list)
		document.getElementById("classText").appendChild(baseData)

	})	
}
function addAbilityBonuses(json){
	var li=""
	for (ability of json.ability_bonuses) {
		li+=` ${ability.ability_score.name} ${ability.bonus},`
	}
	return li.replace(/.$/,".")
}
function loadClasses(){
	endpoint = "classes";
fetchJSON(`${url}${endpoint}/${name.toLowerCase()}`).then(json => { 
	
		for (results of json.results) {
			var p = document.createElement("div");
			p.id=`${results.name}`
			// p.onclick = function(){deployClass(this.id)};
			p.classList.add("class")
			p.innerHTML=`
				<img class="classIcon" src="img/classIcon/${results.name.toLowerCase}.png">
				<h2>${results.name}</h2>
			`
			classContainer.appendChild(p)
			p.onclick = function(){deployClass(this.id)};

		}

	});
}
function deployClass(id){
	endpoint = "classes";
	name = id;
	fetchJSON(`${url}${endpoint}/${name.toLowerCase()}`).then(json => { 
	classContainer.innerHTML=`
	<div class="classInfo deployAnimation">
		<div class="classHead">
			<img class="classMiniIcon" src="img/classIcon/${name.toLowerCase}.png">
			<h1>${json.name}</h1>
			<img class="classMiniIcon" src="img/classIcon/${name.toLowerCase}.png">
		</div>
		<div class="classData">
			<div class="classText" id="classText"></div>

			<div id="classImgDiv"><img class="classImg" src="img/classes/${name.toLowerCase}.png"</div>
		</div>
	</div>
	`
	addClassData()
	})
}

function addClassData(){
	fetchJSON(`${url}${endpoint}/${name.toLowerCase()}`).then(json => {
		var baseData = document.createElement("div")
		baseData.classList.add("basicData")
		var spellcast = ""
		if (json.spellcasting == undefined) {
			console.log(json.spellcasting_ability)
			spellcast="This class is not a spellcaster"
		}else {
			spellcast=json.spellcasting.spellcasting_ability.name
		}
		baseData.innerHTML=`Basic info:<ul id="basicList"><li>Hit dices: d${json.hit_die}</li>
		<li>Saving throw type: ${json.saving_throws[0].name}</li><li>Saving throw type: ${json.saving_throws[1].name}</li><li>Spellcasting: ${spellcast}</li></ul>`
		addBasicData()
	document.getElementById("classText").appendChild(baseData)

		var proficiencies = document.createElement("div")
		proficiencies.classList.add("proficienciesContainer")
		for (profChoices of json.proficiency_choices) {
		var profContainer = document.createElement("div");
		profContainer.classList.add("profLists")
		var profList = document.createElement("ul")
			profContainer.innerHTML=`Choose ${profChoices.choose} of:`
			for (proficiency of profChoices.from) {
				var li = document.createElement("li")
				li.appendChild(document.createTextNode(proficiency.name))
				profList.appendChild(li)
			}
			if (profList.getElementsByTagName("li").length>10) {
				profList.id="longList"
			}
			profContainer.appendChild(profList)
			proficiencies.appendChild(profContainer)
		}
			document.getElementById("classText").appendChild(proficiencies)
	})

}
function addBasicData(){
	fetchJSON(`${url}${endpoint}/${name.toLowerCase()}/levels`).then(json => {
		var li = document.createElement("li")
		li.innerText=`Proficiency bonus: ${json[0].prof_bonus}`
		document.getElementById("basicList").appendChild(li)
		li.innerText="Skill features at level 1: "
		for (classProf of json[0].features) {
			li.innerText+=` ${classProf.name},`
		}
		li.innerText=li.innerText.replace(/.$/,".")
		document.getElementById("basicList").appendChild(li)

	})
}