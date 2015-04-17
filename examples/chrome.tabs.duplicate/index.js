
window.document.body.style.backgroundColor = "yellow";
document.addEventListener('DOMContentLoaded', function() {
  window.document.body.style.backgroundColor = "red";
  chrome.tabs.duplicate(0, function() {
    window.document.body.style.backgroundColor = "green";
  });
});
