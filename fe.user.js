// ==UserScript==
// @name        Furry Expantion
// @description   expands furry sites
// @include     *sofurry.com/view/*
// @version     1.0
// ==/UserScript==


//so far only got sofurry story downloader. please help expand this script


(function () {
    'use strict';
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
            text = text.replace("Â&nbsp;"," ")
            return text;
        }
        var contentBody = document.getElementById('sfContentBody')
        var text = ""
        contentBody.childNodes.forEach(content => {
            var add = content.textContent

            text += `${decodeHTMLEntities(add)}\n`
        })
        var data = new Blob([text], {
            type: 'application/octet-stream'
        });
        data.name = document.getElementById("sfContentTitle").textContent
        var url = window.URL.createObjectURL(data);
        var downloadbutton = document.createElement("a")
        downloadbutton.style.position = "absolute"
        downloadbutton.style.top = "150px"
        downloadbutton.style.left = "200px"
        downloadbutton.href = url;
        downloadbutton.style.zIndex = 100000;
        downloadbutton.textContent = "download"
        downloadbutton.download = document.getElementById("sfContentTitle").textContent + ".txt"
        contentBody.appendChild(downloadbutton)
        console.log(url)
    }, 500)

})();
