document.addEventListener("deviceready", function () { init(myPath); }, false);

var myPath = 'file:///';

var musicData = [];

var current;

function init(myPath) {

    window.resolveLocalFileSystemURL(myPath,
        function (dir) {
            var reader = dir.createReader();

            reader.readEntries(function (entries) {
                console.log("readEntries");
                console.dir(entries);

                var data = [];
                //var reader = new FileReader();
                var process = function (index, cb) {
                    console.log("doing index " + index);
                    var entry = entries[index];
                    //var name = entry.name;
                    if (entry.isDirectory) {
                        data.push({ url: entry.nativeURL, name: entry.name, fileType: false });
                    }
                    else if (entry.isFile) {
                        data.push({ url: entry.nativeURL, name: entry.name, fileType: true });
                        musicData.push({ url: entry.nativeURL, name: entry.name, fileType: true });
                    }

                    if (index + 1 < entries.length) {
                        process(++index, cb);
                    } else {
                        cb(data);
                    }
                };

                process(0, function (data) {
                    
                    console.dir(data);
                    var s = "";
                    for (var i = 0; i < data.length; i++) {
                        if (data[i].fileType === false)
                            s += '<li onclick="init(' + "'" + data[i].url + "'" + ');">' + data[i].name + '</li>';
                        else if (checkFileExtension(data[i].name) === true)
                            s += '<li onclick="playMP3(' + "'" + data[i].url + "'"+","+"'" + i + "'" + ');">' + data[i].name + '</li>';
                    }
                    document.getElementById("select-demo").innerHTML = s;

                });
            });

        }, function (err) {

        });

}

var media;
function playMP3(l, post) {
    if (media) { media.stop(); media.release(); }
    media = new Media(l, null, function (err) { console.dir(err); });
    media.play();
    current = post;
}

function stopMP3(l) {
    if (media) { media.stop(); media.release(); }

}

function processMP3File(url) {
    var s;
    entry.file(function (file) {
        data.push({ name: entry.name });
        ID3.loadTags(entry.name, function () {
            var tags = ID3.getAllTags(name);
            data.push({ name: entry.name, tags: tags });
            console.log("got tags for " + entry.name, tags);
            document.getElementById("details").innerHTML += "*";
        }, {
                dataReader: FileAPIReader(file)
            });
    });
    s += "<p>";
    s += "<b>" + data[i].tags.title + "</b><br/>";
    s += "By " + data[i].tags.artist + "<br/>";
    s += "Album: " + data[i].tags.album + "<br/>";
    s += "</p>";
    document.getElementById("details").innerHTML = s;
}
/*document.addEventListener('backbutton', function () {
    if (menu is visible) {
    //Hide the menu
    //This is also working fine
    return false;
}
  else //nothing is visible, exit the app
{
    navigator.app.exitApp();
}
});*/

function checkFileExtension(fileName) {
    if (fileName.indexOf(".mp3") > -1)
        return true;
    return false;
}

function checkFolderName(folderName) {
    if (folderName.indexOf("storage") > -1 || folderName.indexOf("sdcard") > -1)
        return true;
    return false;
}