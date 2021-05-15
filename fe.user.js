// ==UserScript==
// @name        Furry Expantion
// @description   expands furry sites
// @include     *sofurry.com*
// @version     1.4
// ==/UserScript==


//so far only got sofurry story downloader. please help expand this script



(function () {
    'use strict';
    var blacklist = {//edit this to add to blacklist, will add a menu later
        artits: ["Amethyst Mare","Krkthal010"]
    }

    var lsplit = window.location.pathname.split('/')
    if(lsplit[lsplit.length - 1].includes('.')){
        lsplit.pop()
    }
    var location = window.location.hostname + lsplit.join('/')
    if(lsplit[1]){
        switch(lsplit[1]){
            case "view":
                console.log("creating download")
                setTimeout(function () {
                    function decodeHTMLEntities(text) {
                        var entities = [
                            ['amp', '&'],
                            ['apos', '\''],
                            ['#x27', '\''],
                            ['#x2F', '/'],
                            ['#39', '\''],
                            ['#47', '/'],
                            ['lt', '<'],
                            ['gt', '>'],
                            ['nbsp', ' '],
                            ['quot', '"']
                        ];

                        for (var i = 0, max = entities.length; i < max; ++i) {
                            text = text.replace(new RegExp('&' + entities[i][0] + ';', 'g'), entities[i][1]);
                        }
                        text = text.replace("Â&nbsp;"," ");
                        return text;
                    }
                    var contentBody = document.getElementById('sfContentBody');
                    var text = "";
                    contentBody.childNodes.forEach(content => {
                        var add = content.textContent;

                        text += `${decodeHTMLEntities(add)}\n`;
                    })
                    var data = new Blob([text], {
                        type: 'application/octet-stream'
                    });
                    data.name = document.getElementById("sfContentTitle").textContent;
                    var url = window.URL.createObjectURL(data);
                    var downloadbutton = document.createElement("a");
                    downloadbutton.style.position = "absolute";
                    downloadbutton.style.top = "150px";
                    downloadbutton.style.left = "200px";
                    downloadbutton.href = url;
                    downloadbutton.style.zIndex = 100000;
                    downloadbutton.textContent = "download";
                    downloadbutton.download = document.getElementById("sfContentTitle").textContent + ".txt";
                    contentBody.appendChild(downloadbutton);
                    console.log(url);
                }, 500);
                break;
            case "browse":
                console.log("browse stuff")
                var wlitems = document.getElementsByClassName("watchlist_item");
                console.log(wlitems)
                for(var i in wlitems){
                    try{
                        var metaA = wlitems[i].firstElementChild
                        console.log(metaA)
                        var metaD = metaA.childNodes[3]
                        console.log(metaD)
                        var artistD = metaD.childNodes[3]
                        console.log(artistD.firstElementChild.textContent)
                        if(blacklist.artits.includes(artistD.firstElementChild.textContent)){
                            console.log("blacklist")
                            wlitems[i].style.display = "none";
                        }
                    }
                    catch(e){
                        console.log(e)
                    }
                }
                break;
            default:
                console.log(lsplit[1])
                break;
        }
    }else{
        console.log(lsplit)
    }
})();
