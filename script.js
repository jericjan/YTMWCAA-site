document.getElementById("crop").onclick = function () {
    cropImage()
}
document.getElementById("download").onclick = function () {
    downloadThing()
}
document.getElementById("generate").onclick = function () {
    generateAlbum()
}

function generateAlbum() {
    var finaltitle = document.getElementById("title").value.split("\n")[0].trim()
    var finalartist = document.getElementById("artist").value.split("\n")[0].trim()
    document.getElementById("album").value = finalartist + " - " + finaltitle

}

function cropImage() {
    resize
        .result({
            type: "canvas",
            size: "original",
            format: "png",
            quality: 1
        })
        .then(function (blob) {            
            document.getElementById("final").src = blob
            window.blob = blob
        })
}
function downloadThing() {
    var xhttp = new XMLHttpRequest();
    xhttp.open("GET", "https://yt2mp3-albumart.jericjanjan.repl.co/get_uuid", false);
    xhttp.send();
    var uuid = xhttp.response
    console.log("uuid is: " + uuid)
    var finaltitle = document.getElementById("title").value.split("\n")[0].trim()
    var finalartist = document.getElementById("artist").value.split("\n")[0].trim()
    var finalalbum = document.getElementById("album").value.split("\n")[0].trim()
    var file = document.getElementById("final")

    function urltoFile(url, filename, mimeType) {
        return fetch(url)
            .then(function (res) {
                return res.arrayBuffer()
            })
            .then(function (buf) {
                return new File([buf], filename, { type: mimeType })
            })
    }

    var client = new XMLHttpRequest()

    var fd = new FormData()
    urltoFile(file.src, "img.png", "image/png").then(function (file) {
        fd.append("file", file)
    })

    function saveBlob(blob, fileName) {
        var a = document.createElement("a")
        a.href = window.URL.createObjectURL(blob)
        a.download = fileName
        a.dispatchEvent(new MouseEvent("click"))
    }

    function checkFlag() {
        if (fd.get("file") == null) {
            window.setTimeout(
                checkFlag,
                100
            ) /* this checks the flag every 100 milliseconds*/
        } else {
            console.log(fd.get("file"))
            $.ajax({
                xhr: function () {
                    var xhr = new window.XMLHttpRequest()

                    // Upload progress
                    xhr.upload.addEventListener(
                        "progress",
                        function (evt) {
                            if (evt.lengthComputable) {
                                var percentComplete = (evt.loaded / evt.total) * 100
                                //Do something with upload progress
                                console.log(percentComplete)
                                document.getElementById("status").innerHTML =
                                    percentComplete.toFixed(1) + "% uploaded"
                                $(".progress-bar2").each(function () {
                                    var width = percentComplete.toFixed(1) + "%"
                                    $(this).animate({ width: width }, 1)
                                })
                                if (
                                    document.getElementById("status").innerHTML ==
                                    "100.0% uploaded"
                                ) {
                                    document.getElementById("status").innerHTML =
                                        "Doing magic... Give it a minute or two."





                                    var evtSource = new EventSource(
                                        "https://yt2mp3-albumart.jericjanjan.repl.co/log?pogid=" + uuid, { withCredentials: true }
                                    )
                                    window.evtsource = evtSource
                                    evtSource.onmessage = function (e) {

                                        if (e.data == "Beep boop...") {
                                            document.getElementById("log").innerHTML = e.data
                                        } else {
                                            document.getElementById("log").innerHTML = e.data
                                            document.getElementById("status").innerHTML = "Processing..."
                                            $(".progress-bar2").each(function () {
                                                var width = e.data.split('(')[1].split(')')[0]
                                                $(this).animate({ width: width }, 1)
                                            })
                                        }


                                        //		}
                                    }
                                }
                            }
                        },
                        false
                    )

                    // Download progress
                    xhr.addEventListener(
                        "progress",
                        function (evt) {
                            if (evt.lengthComputable) {
                                evtsource.close()                                
                                document.getElementById("log").innerHTML = ""
                                var percentComplete = (evt.loaded / evt.total) * 100
                                // Do something with download progress
                                console.log(percentComplete)
                                document.getElementById("status").innerHTML =
                                    percentComplete.toFixed(1) + "% downloaded"
                                $(".progress-bar2").each(function () {
                                    var width = percentComplete.toFixed(1) + "%"
                                    $(this).animate({ width: width }, 1)
                                })
                                if (
                                    document.getElementById("status").innerHTML ==
                                    "100.0% downloaded"
                                ) {
                                    document.getElementById("status").innerHTML = "FINISHED!"
                                }
                            }
                        },
                        false
                    )

                    return xhr
                },
                type: "POST",
                url:
                    "https://yt2mp3-albumart.jericjanjan.repl.co/download?url=" +
                    url +
                    "&author=" +
                    finalartist +
                    "&title=" +
                    finaltitle +
                    "&album=" +
                    finalalbum +
                    "&uuid=" +
                    uuid,
                data: fd,
                processData: false,
                contentType: false,
                xhrFields: {
                    responseType: "blob",
                    withCredentials: true

                },
                success: function (blob) {
                    console.log(blob)
                    console.log(typeof blob)
                    saveBlob(blob, title + ".mp3")
                },
                error: function (xhr, status, error) {
                    var errorMessage = xhr.status + ": " + xhr.statusText
                    document.getElementById("status").innerHTML =
                        errorMessage + " Try again :("
                }
            })
        }
    }
    checkFlag()
}



var animateButton = function (e) {
    e.preventDefault
    //reset animation
    e.target.classList.remove("animate")

    e.target.classList.add("animate")
    setTimeout(function () {
        e.target.classList.remove("animate")
    }, 700)
}

var bubblyButtons = document.getElementsByClassName("bubbly-button")

for (var i = 0; i < bubblyButtons.length; i++) {
    bubblyButtons[i].addEventListener("click", animateButton, false)
}




function componentToHex(c) {
    var hex = c.toString(16)
    return hex.length == 1 ? "0" + hex : hex
}

function rgbToHex(r, g, b) {
    return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b)
}

function invertColor(hex) {
    if (hex.indexOf("#") === 0) {
        hex = hex.slice(1)
    }
    // convert 3-digit hex to 6-digits.
    if (hex.length === 3) {
        hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2]
    }
    if (hex.length !== 6) {
        throw new Error("Invalid HEX color.")
    }
    // invert color components
    var r = (255 - parseInt(hex.slice(0, 2), 16)).toString(16),
        g = (255 - parseInt(hex.slice(2, 4), 16)).toString(16),
        b = (255 - parseInt(hex.slice(4, 6), 16)).toString(16)
    // pad each with zeros and return
    return "#" + padZero(r) + padZero(g) + padZero(b)
}

function padZero(str, len) {
    len = len || 2
    var zeros = new Array(len).join("0")
    return (zeros + str).slice(-len)
}

function set_image() {
    var el = document.getElementById("first")
    var resize = new Croppie(el, {
        viewport: { width: 200, height: 200 },
        boundary: { width: 600, height: 600 },
        showZoomer: true,
        enableResize: false,
        enableOrientation: true,
        mouseWheelZoom: "ctrl",
        useCORS: true
    })
    resize.bind({
        url: el
    })
    window.resize = resize
}

function LinkGet(val) {
    if (window.resize == undefined) {
        console.log('no Croppie yet')
    } else {
        resize.destroy()
    }

    const colorThief = new ColorThief()
    const img = document.querySelector("#first")

    var array1 = val.value.split("\n")[0]
    if (array1.startsWith("https://youtu.be/")) {
        var idd = array1.split("?")[0].split("/")[
            array1.split("?")[0].split("/").length - 1
        ]
        window.url = array1.split("?")[0]
    } else if (array1.startsWith("https://www.youtube.com/")) {
        var idd = array1.split("&")[0].split("=")[1]
        window.url = array1.split("&")[0]
    } else {
        alert("Not a YouTube URL")
    }

    fetch("https://cool-sun-0721.cantilfrederick.workers.dev/" + idd) //proxy that gets data from yt api
        .then(response => response.json())
        .then(json => {
            console.log("parsed json", json) // access json.body here
            var thumbnail_url = json.items[0].snippet.thumbnails
            if (thumbnail_url.maxres !== undefined) {
                var final_url = thumbnail_url.maxres.url
                console.log(final_url)
            } else if (thumbnail_url.standard !== undefined) {
                var final_url = thumbnail_url.standard.url
                console.log(final_url)
            } else if (thumbnail_url.high !== undefined) {
                var final_url = thumbnail_url.high.url
                console.log(final_url)
            } else if (thumbnail_url.medium !== undefined) {
                var final_url = thumbnail_url.medium.url
                console.log(final_url)
            } else if (thumbnail_url.default !== undefined) {
                var final_url = thumbnail_url.default.url
                console.log(final_url)
            }
            var pic = document.getElementById("first")
            pic.crossOrigin = "Anonymous"
            pic.src =
                "https://quiet-sun-6d6e.cantilfrederick.workers.dev/?" + final_url // simple cors proxy server
            set_image()
            window.title = json.items[0].snippet.title
            window.author = json.items[0].snippet.channelTitle

            // Make sure image is finished loading
            if (img.complete) {
                console.log(colorThief.getColor(img))
                var color = colorThief.getColor(img)

                $("body").animate(
                    {
                        backgroundColor:
                            "RGB(" + color[0] + "," + color[1] + "," + color[2] + ")"
                    },
                    { duration: 1000, queue: false }
                )
                $("textarea").animate(
                    {
                        backgroundColor: invertColor(rgbToHex(color[0], color[1], color[2]))
                    },
                    { duration: 1000, queue: false }
                )
                $("textarea").animate(
                    { color: "RGB(" + color[0] + "," + color[1] + "," + color[2] + ")" },
                    { duration: 1000, queue: false }
                )
                $("h3").animate(
                    { color: invertColor(rgbToHex(color[0], color[1], color[2])) },
                    { duration: 1000, queue: false }
                )
                $("div#status,div#log").animate(
                    { color: invertColor(rgbToHex(color[0], color[1], color[2])) },
                    { duration: 1000, queue: false }
                )
                $("img#final").animate(
                    { "border-color": invertColor(rgbToHex(color[0], color[1], color[2])) },
                    { duration: 1000, queue: false }
                )
                $("img#final").animate(
                    { "border-width": '8px' },
                    { duration: 1000, queue: false }
                )
            } else {
                img.addEventListener("load", function () {
                    console.log(colorThief.getColor(img))
                    var color = colorThief.getColor(img)
                    $("body").animate(
                        {
                            backgroundColor:
                                "RGB(" + color[0] + "," + color[1] + "," + color[2] + ")"
                        },
                        { duration: 1000, queue: false }
                    )
                    $("textarea").animate(
                        {
                            backgroundColor: invertColor(
                                rgbToHex(color[0], color[1], color[2])
                            )
                        },
                        { duration: 1000, queue: false }
                    )
                    $("textarea").animate(
                        {
                            color: "RGB(" + color[0] + "," + color[1] + "," + color[2] + ")"
                        },
                        { duration: 1000, queue: false }
                    )
                    $("h3").animate(
                        { color: invertColor(rgbToHex(color[0], color[1], color[2])) },
                        { duration: 1000, queue: false }
                    )
                    $("div#status,div#log").animate(
                        { color: invertColor(rgbToHex(color[0], color[1], color[2])) },
                        { duration: 1000, queue: false }
                    )
                    $("img#final").animate(
                        { "border-color": invertColor(rgbToHex(color[0], color[1], color[2])) },
                        { duration: 1000, queue: false }
                    )
                    $("img#final").animate(
                        { "border-width": '8px' },
                        { duration: 1000, queue: false }
                    )
                })
            }

            document.getElementById("title").value = json.items[0].snippet.title
            document.getElementById("artist").value =
                json.items[0].snippet.channelTitle
            document.getElementById("album").value =
                json.items[0].snippet.channelTitle + " - " + json.items[0].snippet.title
        })
}

document.getElementById("update-ytdlp").onclick = function () {
    document.getElementById("update-ytdlp").disabled = true
    document.querySelector("#ytdlp-log").innerHTML = ""
    var evtSource = new EventSource(
        "https://yt2mp3-albumart.jericjanjan.repl.co/update-yt-dlp"
    )
    window.evtsource = evtSource
    evtSource.onmessage = function (e) {
        if (e.data == "END") {
            console.log("closing")
            evtSource.close()
            document.getElementById("update-ytdlp").disabled = false
        } else {
            console.log(e.data)
            var thing = document.createElement('a')
            thing.innerHTML = e.data
            document.querySelector("#ytdlp-log").appendChild(thing)
            var linebreak = document.createElement("br")
            document.querySelector("#ytdlp-log").appendChild(linebreak)
        }
    }


}



// vv jquery Multi Modal Control - https://codepen.io/hnjungElis/pen/ZEyzPbe 
var mdzIndex = 10
$(".js-modal-open").on("click", function (e) {
    e.preventDefault()
    mdzIndex++
    var mdId = $(this).data("modal-id")
    if (mdId === null || mdId === "") return true
    $("#" + mdId)
        .addClass("js-is-active")
        .css({ "z-index": mdzIndex })
})
$(".js-modal-close").on("click", function () {
    $(this)
        .closest(".js-modal")
        .removeClass("js-is-active")
        .css({ "z-index": "" })
    if ($(".js-modal.js-is-active").length === 0) {
        mdzIndex = 10
    }
})
$(".js-modal").on("click", function (e) {
    if ($(e.target).hasClass("js-modal")) {
        $(this).find(".js-modal-close").trigger("click")
    }
})
// ^^ jquery Multi Modal Control - https://codepen.io/hnjungElis/pen/ZEyzPbe 

window.addEventListener('load', function() {
    var http = new XMLHttpRequest()
    http.open(
        "POST",
        "https://api.uptimerobot.com/v2/getMonitors?format=json&api_key=m789063836-d171e621fd1ec06c641b4942",
        false
    )
    http.send()
    var status = JSON.parse(http.response).monitors[0].status
    if (status == "0") {
        var fstatus = "PAUSED"
    } else if (status == "1") {
        var fstatus = "NOT CHECKED YET"
    } else if (status == "2") {
        var fstatus = "UP"
    } else if (status == "8") {
        var fstatus = "SEEMS DOWN"
    } else if (status == "9") {
        var fstatus = "DOWN"
    }
    document.querySelector("#uptime2").innerHTML = fstatus
})





