
window.document.body.style.backgroundColor = "yellow";
document.addEventListener('DOMContentLoaded', function() {
  window.document.body.style.backgroundColor = "red";
  chrome.tabs.create({
    url: "about:about"
  }, function(tab) {
    window.document.body.style.backgroundColor = "green";
  });
});
