
document.addEventListener('DOMContentLoaded', function() {
  chrome.topSites.get(function(urls) {
    urls.forEach(function({ url }) {
      window.document.getElementById("output").innerHTML += "<p>" + url + "<p>";
    })
  });
});
