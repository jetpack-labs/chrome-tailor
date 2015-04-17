
window.document.body.style.backgroundColor = "yellow";
document.addEventListener('DOMContentLoaded', function() {
  window.document.body.style.backgroundColor = "red";
  chrome.history.addUrl({ url: "https://mozilla.com" }, function() {
    window.document.body.style.backgroundColor = "green";
  });
});
