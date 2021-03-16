const contentZone = document.getElementById("contentZone");
const followList = document.getElementById("bottomPart");
const trends = document.getElementById("topPart");

function openFile(event){
	var input = event.target;
	var reader = new FileReader();

	reader.readAsText(input.files[0]);
	reader.onload = function(){
		var text = reader.result;
		var xmlDocument = removeWhiteSpace(text);
		getDocumentXML(xmlDocument);
	}
}

function removeWhiteSpace(xmlDoc){
	xmlDoc = xmlDoc.replace(/>\s*/g, '>');   
	xmlDoc = xmlDoc.replace(/\s*</g, '<');
	return xmlDoc;
}


function getDocumentXML(xmlDocument){
	var parser = new DOMParser();
	var xmlDom = parser.parseFromString(xmlDocument, "text/xml");
	addTweets(xmlDom);
	addFollows(xmlDom);
	addTrends(xmlDom);
};

function addTweets(xmlDom){
	var tweetList = xmlDom.getElementsByTagName("tweet");
	console.log(tweetList)
	for (var tweetActual = 0; tweetActual < tweetList.length; tweetActual++) {
		var actualTweet = tweetList[tweetActual];

		var tweet = document.createElement("div");
		tweet.classList.add("tweet")
		console.log(tweetList.length+" "+tweetActual)

		var profpic = document.createElement("img");
		profpic.classList.add("insideImg");
		profpic.src = actualTweet.childNodes[0].firstChild.nodeValue;
		tweet.appendChild(profpic);

		var name = document.createElement("p");
		name.classList.add("overflowText")
		name.innerText = actualTweet.childNodes[1].firstChild.nodeValue;
		tweet.appendChild(name);

		var at = document.createElement("p");
		at.classList.add("overflowText")
		at.innerText = "@"+actualTweet.childNodes[2].firstChild.nodeValue;
		tweet.appendChild(at);

		var text = document.createElement("p");
		text.classList.add("insideText")
		text.innerText = actualTweet.childNodes[3].firstChild.nodeValue;
		tweet.appendChild(text);

		var p = document.createElement("p");
		p.classList.add("imgContainer")
		tweet.appendChild(p);

		var image = document.createElement("img");
		image.classList.add("contentImg")
		console.log(actualTweet.childNodes[4].firstChild)
		if (actualTweet.childNodes[4].firstChild == null) {
			image.src="";
			}else {
				image.src = actualTweet.childNodes[4].firstChild.nodeValue;
		}
		p.appendChild(image);



		contentZone.appendChild(tweet);

	} 
}


	function addFollows(xmlDom){
		console.log(xmlDom)
		var followsList = xmlDom.getElementsByTagName("follow");
		console.log(followsList)
		for (var i = 0; i < followsList.length; i++) {
			var actualFollow = followsList[i];
			console.log(i)
			var follow = document.createElement("div");
			follow.classList.add("account")

			var profpic = document.createElement("img");
			profpic.classList.add("insideImg");
			profpic.src = actualFollow.childNodes[0].firstChild.nodeValue;
			follow.appendChild(profpic);

			var infoAccount = document.createElement("div");
			infoAccount.classList.add("info");
			follow.appendChild(infoAccount);

			var name = document.createElement("p");
			name.classList.add("overflowText");
			name.innerText = actualFollow.childNodes[1].firstChild.nodeValue;
			infoAccount.appendChild(name)

			var at = document.createElement("p");
			at.classList.add("overflowText");
			at.innerText = "@"+actualFollow.childNodes[2].firstChild.nodeValue;
			infoAccount.appendChild(at);

			var followButton = document.createElement("img");
			followButton.classList.add("insideImg")
			followButton.src = "http://cdn.onlinewebfonts.com/svg/img_404688.png"
			follow.appendChild(followButton);

			followList.appendChild(follow);
	}
}
	function addTrends(xmlDom){
		trendList = xmlDom.getElementsByTagName("trend");
		for (var i = 0; i < trendList.length; i++) {
			actualTrend = trendList[i]

			var trend = document.createElement("div");
			trend.classList.add("trend");

			var text = document.createElement("p");
			text.innerText = actualTrend.childNodes[0].firstChild.nodeValue;
			trend.appendChild(text)

			var img = document.createElement("img");
			img.classList.add("trendImg");
			img.src = actualTrend.childNodes[1].firstChild.nodeValue;
			trend.appendChild(img);
			topPart.appendChild(trend);
		}
	}
