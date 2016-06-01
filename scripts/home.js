'use strict';

var allPostsSection = document.getElementById('all-posts-list');

/**
 * Creates a post element.
 */
function createPostElement(title, date, time, description, category, key, votes) {

var eventID = '';

switch(category){
	case 'Sports':
		eventID = '<div id="event1">';
		break;
	case 'Art':
		eventID = '<div id="event2">';
		break;
	case 'Music':
		eventID = '<div id="event3">';
		break;
	case 'ATV':
		eventID = '<div id="event5">';
		break;
	case 'Camp':
		eventID = '<div id="event4">';
		break;
	default:
		eventID = '<div id="event">';
		break;
}

	var rockLevel = 1;
	if(votes > 15) {
		rockLevel=4;
	} else if (votes > 10) {
		rockLevel=3;
	} else if (votes > 5) {
		rockLevel=2;
	}

  var html =
      eventID+
			'<div id="heart'+rockLevel+'"></div>'+
      '<h2 class="category"></h2>' +
      '<h3 class="title"></h3>' +
      '<h4 class="date"></h4>' +
      '<!-- <h4>at</h4>' +
      '<h4 class="time"></h4> -->' +
      '<h4 class="location"></h4>' +
      '<p class="description"></p>' +
      '</div>';

  // Create the DOM element from the HTML.
  var link = document.createElement('a');
  link.setAttribute('href', 'opp.html?key=' + key);
  var div = document.createElement('div');
  div.innerHTML = html;
  var postElement = div.firstChild;

  // Set values.
  postElement.getElementsByClassName('category')[0].innerText = category;
  postElement.getElementsByClassName('title')[0].innerText = title;
  postElement.getElementsByClassName('date')[0].innerText = date + ' at ' + time;
  //postElement.getElementsByClassName('time')[0].innerText = time;
  //postElement.getElementsByClassName('location')[0].innerText = location;
  postElement.getElementsByClassName('description')[0].innerText = description;

  link.appendChild(postElement);
  //return postElement;
  return link;
}

/**
 * Starts listening for new posts and populates posts lists.
 */
function startDatabaseQueries() {
  var allPostsRef = firebase.database().ref('posts/');

  var fetchPosts = function(postsRef, sectionElement) {
    postsRef.on('child_added', function(data) {
      var containerElement = sectionElement.getElementsByClassName('posts-container')[0];
      containerElement.insertBefore(
          createPostElement(data.val().event, data.val().date, data.val().time, data.val().description, data.val().category, data.key, data.val().votes),
          containerElement.firstChild);
    });
  };

  fetchPosts(allPostsRef, allPostsSection);
}

// Bindings on load.
window.addEventListener('load', function() {
	// Listen for auth state changes
    startDatabaseQueries();
    allPostsSection.style.display = 'block';
}, false);

firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    // User is signed in.
	console.log("logged in");
	console.log(user.displayName);
  } else {
    // No user is signed in.
	console.log("not logged in");
  }
});
