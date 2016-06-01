(function (){
  $(document).ready (initialize);

  var myDataRef;
  var userData;
  var votes = 1;

  function initialize (){
    $('#redBtn').on('click', addUser);

	var description_p = document.getElementById('description');
	var age_p = document.getElementById('age');
	var title_p = document.getElementById('title');
	var category_p = document.getElementById('category');
	var time_p = document.getElementById('time');
  var rockItdiv_p = document.getElementById('rockItHeart');
	var video_key = getURLParameter('key');
	console.log(video_key);

	var myFirebaseRef = new Firebase("https://sbcs-opp-app.firebaseio.com/");
	myFirebaseRef.child('posts').on("value", function(snapshot) {
		if(video_key) {
			var video = snapshot.val()[video_key];

			var description = video['description'];
			var age = video['age'];
			var title = video['event'];
			var category = video['category'];
			var time = video['time'];
      votes = video['votes']

			description_p.innerHTML = description;
			age_p.innerHTML = age;
			title_p.innerHTML = title;
			category_p.innerHTML = category;
			time_p.innerHTML = time;

      var rockLevel = 1;
    	if(votes > 15) {
    		rockLevel=4;
    	} else if (votes > 10) {
    		rockLevel=3;
    	} else if (votes > 5) {
    		rockLevel=2;
    	}
      rockItdiv_p.id = 'rockItHeart'+rockLevel;
		}
	});

    firebase.auth().onAuthStateChanged(function(user) {
		userData = user;
	});
  }

  function addUser() {
	if(userData) {
    votes=votes+1;
    var rockItdiv_p = document.getElementById('rockItHeart1');
    if(votes > 15) {
      rockItdiv_p = document.getElementById('rockItHeart3');
      rockLevel=4;
      rockItdiv_p.id = 'rockItHeart'+rockLevel;
    } else if (votes > 10) {
      rockItdiv_p = document.getElementById('rockItHeart2');
      rockLevel=3;
      rockItdiv_p.id = 'rockItHeart'+rockLevel;
    } else if (votes > 5) {
      rockItdiv_p = document.getElementById('rockItHeart1');
      rockLevel=2;
      rockItdiv_p.id = 'rockItHeart'+rockLevel;
    }


		var list = document.getElementById("friendList");
		var newName = document.createElement('h6');
		newName.innerHTML = userData.displayName;
		list.appendChild(newName);
	} else {
		alert("Please log in first on the splash page");
	}
  }

  function getURLParameter(name) {
    return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.search)||[,""])[1].replace(/\+/g, '%20'))||null
  }
})();
