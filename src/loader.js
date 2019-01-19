
s = document.createElement("script");
s.src = chrome.extension.getURL("src/youtubedl.js");

s.onload = function () {
    this.remove();
};

document.head.appendChild(s);

window.addEventListener("message", function (e) {
    var ext = e.data.type.split("/")[1].split(";")[0];
    var fn = e.data.name.split(" ")[0] + "." + ext;
    console.log(fn);

    chrome.runtime.sendMessage({name: fn, url: e.data.url}, function (res) {
        console.log(res);
    });
});