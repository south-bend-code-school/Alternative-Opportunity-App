(function (){
  $(document).ready (initialize);

   var myDataRef;

  function initialize (){
	var description_p = document.getElementById('description');
	var age_p = document.getElementById('age');
	var title_p = document.getElementById('title');
	var category_p = document.getElementById('category');
	var time_p = document.getElementById('time');

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

			description_p.innerHTML = description;
			age_p.innerHTML = age;
			title_p.innerHTML = title;
			category_p.innerHTML = category;
			time_p.innerHTML = time;
		}
	});
  }

  function getURLParameter(name) {
    return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.search)||[,""])[1].replace(/\+/g, '%20'))||null
  }
})();
