function videoDownload(){
    console.log("Download this video.");

    var dl = document.getElementById("videoDownloadDropdown");
    if(dl.className.indexOf("shown") > -1){
        dl.className = dl.className.replace("shown", "");
    }else{
    dl.className += "shown";
    }

};

function downloadURI(event){
    event.preventDefault();
    event.stopPropagation();

    var url = event.currentTarget.getAttribute("href");
    var name = document.getElementsByTagName("title")[0].innerText;
    var datatype = event.currentTarget.getAttribute("data-type");
    var data = {url: url, name: name, sender: "YTDL", type: datatype};

    window.postMessage(data, "*");

    return false;
};


window.ondblclick = function() {
            var videoURL = window.ytplayer.config.args.url_encoded_fmt_stream_map.split(",").map(function(item){
                return item.split("&").reduce(function(pre, cur){

                    cur = cur.split("=");

                    return Object.assign(pre, {[cur[0]]: decodeURIComponent(cur[1])});
                }, {});

            });

            console.log("Our extension has loaded.", videoURL);

            var cont = document.getElementById("top-level-buttons");

            var btn = document.createElement("button");
            btn.className = "style-scope ytd-menu-renderer force-icon-button style-default size-default";
            btn.setAttribute("role", "button");
            btn.setAttribute("id", "downloadVideo");
            btn.innerText = "DOWNLOAD";

            var dropdown = document.createElement("div");
            dropdown.id = "videoDownloadDropdown";

            var dropList = document.createElement("ul");

            cont.appendChild(dropdown);
            dropdown.appendChild(dropList);
            cont.appendChild(btn);

            for (i in videoURL){
                var item = document.createElement("a");
                item.innerText = videoURL[i]["quality"];

                item.setAttribute("href", videoURL[i]["url"]);
                item.setAttribute("data-type", videoURL[i]["type"]);
                item.addEventListener("click", downloadURI);
                dropList.appendChild(item);
            }
            btn.addEventListener("click", videoDownload);   
}