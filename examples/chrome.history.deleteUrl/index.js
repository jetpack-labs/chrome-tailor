
window.document.body.style.backgroundColor = "yellow";
document.addEventListener('DOMContentLoaded', function() {
  window.document.body.style.backgroundColor = "red";
  chrome.tabs.getCurrent(function(tab) {
    chrome.history.deleteUrl({ url: tab.url }, function() {
      window.document.body.style.backgroundColor = "green";
    });
  });
});
