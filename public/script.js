"use strict";

// Upload the file


// document.getElementById("custom-file").style.display = "none";

document.getElementById("file-upload").style.padding = 0
var uploader = document.getElementById("file-upload");
var message = document.getElementById("text-box");
var replace = document.getElementById("replace");
var share = document.getElementById("share");
// replace.style.display = "block"; //hide it
replace.hidden = true; //Hide Replace Image -> .hidden = false when we want to show

[uploader, replace].forEach(item => {
        item.addEventListener('change', event => {

                let chosenFile = uploader.files[0]; //uploading 1 file, so we want first index
                var formData = new FormData();

                //name of what we are appending, the actual file, and the actual file's name
                formData.append('newImage', chosenFile, chosenFile.name);

                // AJAX portion begins
                var xhr = new XMLHttpRequest();
                xhr.open("POST", "/upload", true);

                // callback function executed when the HTTP response comes back
                xhr.onloadend = function (e) {
                        // Get the server's response body
                        console.log(xhr.responseText);
                        // now that the image is on the server, we can display it!
                        var newImage = document.getElementById("serverImage");
                        newImage.src = "../images/" + chosenFile.name;
                        // console.log(newImage);
                };

                // actually send the request
                xhr.send(formData);
                replace.hidden = false;
                document.getElementById("random").style.display = "none";
        });
});



// var contenteditable = document.querySelector()

share.addEventListener("click", function () {
        var postcardObj = {
                "photo": document.getElementById("serverImage").src,
                "message": document.getElementById("text-box").value,
                "font": currentFont,
                "color": currentColor
        };
        console.log(postcardObj);


        var xhr = new XMLHttpRequest();
        xhr.open("POST", "/dbRoute", true);
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.onloadend = function(e) {
                console.log(xhr.responseText);
        };

        // send the request
        xhr.send(JSON.stringify(postcardObj));

});


//
// function active() {
// let bullets = document.getElementById("font-body");
//
// for (let i = 0; i < bullets.length; i++) {
//         bullets[i].addEventListener("click", function() {
//                 var current = document.getElementsByClassName("active");
//                 current[0].className = current[0].className.replace(" active", "");
//                 this.className += " active";
//         });
// }
//
// }

var fontBullet = document.getElementsByClassName('font'); //get font array in fontBullet
var fonts = ["Indie Flower", "Dancing Script", "Long Cang", "Homemade Apple"];

fontBullet[0].textContent = "\u25C7 " + fonts[0];
fontBullet[1].textContent = "\u25C7 " + fonts[1];
fontBullet[2].textContent = "\u25C7 " + fonts[2];
fontBullet[3].textContent = "\u25C7 " + fonts[3];

var currentFont;
function whichFont(n) {
        let fontIndex = n - 1;
        let textbox = document.getElementById('text-box');



        while (textbox.classList.contains('indie')
        || textbox.classList.contains('dancing')
        || textbox.classList.contains('cang')
        || textbox.classList.contains('apple') === true) {
                textbox.classList.remove('indie');
                textbox.classList.remove('dancing');
                textbox.classList.remove('cang');
                textbox.classList.remove('apple');
        }
        let fontArray = ["indie", "dancing", "cang", "apple"]
        currentFont = fontArray[fontIndex];
        // console.log("\u2756 " +fontBullet[fontIndex].textContent);
        //
        // fontBullet[fontIndex].textContent = "\u2756 " + fontArray[fontIndex];
        // var notFont = 0;
        // fontBullet[notFont].textContent = "\u25C7 " + fonts[notFont];




        if (fontIndex === 0) {
                fontBullet[0].textContent = "\u2756 " + fonts[0];
                fontBullet[1].textContent = "\u25C7 " + fonts[1];
                fontBullet[2].textContent = "\u25C7 " + fonts[2];
                fontBullet[3].textContent = "\u25C7 " + fonts[3];
                document.getElementById('text-box').classList.add('indie');
        } else if(fontIndex === 1) {
                fontBullet[0].textContent = "\u25C7 " + fonts[0]
                fontBullet[1].textContent = "\u2756 " + fonts[1];
                fontBullet[2].textContent = "\u25C7 " + fonts[2];
                fontBullet[3].textContent = "\u25C7 " + fonts[3];
                document.getElementById('text-box').classList.add('dancing');
        } else if(fontIndex === 2) {
                fontBullet[0].textContent = "\u25C7 " + fonts[0]
                fontBullet[1].textContent = "\u25C7 " + fonts[1];
                fontBullet[2].textContent = "\u2756 " + fonts[2];
                fontBullet[3].textContent = "\u25C7 " + fonts[3];
                document.getElementById('text-box').classList.add('cang');
        } else {
                fontBullet[0].textContent = "\u25C7 " + fonts[0]
                fontBullet[1].textContent = "\u25C7 " + fonts[1];
                fontBullet[2].textContent = "\u25C7 " + fonts[2];
                fontBullet[3].textContent = "\u2756 " + fonts[3];
                document.getElementById('text-box').classList.add('apple');
        }

}



//Select color
var currentColor;
function whichColor(n) {
        let color = ["#e6e2cf", "#dbcaac", "#c9cbb3","#bbc9ca",
                "#a6a5b5", "#b5a6ab", "#eccfcf", "#eceeeb", "#bab9b5"];
        let colorIndex = n - 1;
        let postcard = document.getElementById("postcard-body");
        postcard.style.backgroundColor = color[colorIndex];

        currentColor = color[colorIndex];
        return currentColor;
}





// Fixes prroblem by removing padding after an image upload

uploader.addEventListener('click', function () {
        document.getElementById("imgWrap").className += " editImage";

});
