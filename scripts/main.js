'use strict';
// Shortcuts to DOM Elements.
var fNameInput = document.getElementById('new-fname');
var lNameInput = document.getElementById('new-lname');
var eventInput = document.getElementById('new-event');
var dateInput = document.getElementById('new-date');
var ageInput = document.getElementById('new-name');
var timeInput = document.getElementById('new-time');
var descriptionInput = document.getElementById('new-description');
var categoryInput = document.getElementById('new-category');
var postButton = document.getElementById('post-button');

/**
 * Saves a new post to the Firebase DB.
 */
// [START write_fan_out]
function writeNewPost(firstName, lastName, event, date, age, time, description, category) {
  // A post entry.
  var postData = {
    firstName: firstName,
    lastName: lastName,
    event: event,
    date: date,
    age: age,
    time: time,
    description, description,
    category: category
  };

  // Get a key for a new Post.
  var newPostKey = firebase.database().ref().child('posts').push().key;

  // Write the new post's data simultaneously in the posts list and the user's post list.
  var updates = {};
  updates['/posts/' + newPostKey] = postData;
  
  return firebase.database().ref().update(updates);
}
// [END write_fan_out]

// Bindings on load.
window.addEventListener('load', function() {
  // Saves message on form submit.
  postButton.onclick = function(e) {
    console.log("Button clicked");
    e.preventDefault();
    if (fNameInput.value && lNameInput.value && eventInput.value && dateInput.value && ageInput.value && timeInput.value && descriptionInput.value) {
        // [START_EXCLUDE]
        writeNewPost(fNameInput.value, lNameInput.value, eventInput.value, dateInput.value, ageInput.value, timeInput.value, descriptionInput.value, categoryInput.value).then(function() {
              console.log("Uploaded");
              window.location.replace('./home.html');
            });
        // [END_EXCLUDE]
    };
  }
}, false);
