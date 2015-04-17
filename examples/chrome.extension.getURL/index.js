
window.document.body.style.backgroundColor = "yellow";
document.addEventListener('DOMContentLoaded', function() {
  window.document.body.style.backgroundColor = "red";
  chrome.tabs.create({
    url: chrome.extension.getURL("page.html")
  }, function(tab) {
    window.document.body.style.backgroundColor = "green";
  });
});
