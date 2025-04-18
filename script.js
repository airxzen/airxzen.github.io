// Ensure the user is authenticated anonymously
firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    // User is signed in, proceed with the game
    console.log('User signed in: ', user.uid);
    userId = user.uid;
    checkIfHost();
  } else {
    // No user is signed in, try signing in anonymously
    firebase.auth().signInAnonymously().catch(function(error) {
      console.error('Authentication failed:', error);
      alert('Failed to authenticate. Please try again.');
    });
  }
});

function checkIfHost() {
  firebase.database().ref(`rooms/${roomCode}`).once("value", snap => {
    const roomData = snap.val();
    if (roomData && roomData.host === userId) {
      isHost = true;
      uploadBtn.style.display = "inline-block";
      resetBtn.style.display = "inline-block";
    }
  });
}
