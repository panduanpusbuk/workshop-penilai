firebase.auth().onAuthStateChanged(user => {
  const onVideoPage = window.location.pathname.includes("video.html");

  if (user) {
    if (!onVideoPage) window.location.href = "video.html";
  } else {
    if (onVideoPage) window.location.href = "login.html";
  }
});

function loginUser(email, password) {
  firebase.auth().signInWithEmailAndPassword(email, password)
    .catch(error => {
      alert("Login gagal: " + error.message);
    });
}

function logoutUser() {
  firebase.auth().signOut().then(() => {
    window.location.href = "login.html";
  });
}