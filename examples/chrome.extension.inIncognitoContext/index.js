
window.document.body.style.backgroundColor = "yellow";
document.addEventListener('DOMContentLoaded', function() {
  if (chrome.extension.inIncognitoContext == false) {
    window.document.body.style.backgroundColor = "red";
  }
  else {
    window.document.body.style.backgroundColor = "green";
  }
});
