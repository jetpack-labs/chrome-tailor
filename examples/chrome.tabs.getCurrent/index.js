
window.document.body.style.backgroundColor = "yellow";
document.addEventListener('DOMContentLoaded', function() {
  window.document.body.style.backgroundColor = "red";
  chrome.tabs.getCurrent(function(tab) {
    chrome.tabs.duplicate(tab.id, function() {
      window.document.body.style.backgroundColor = "green";
    });
  });
});
