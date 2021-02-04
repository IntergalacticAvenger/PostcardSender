var postcardObj;
var newImage = document.getElementById("serverImage");
var textBox = document.getElementById("text-box");
var postcard = document.getElementById("postcard-body");


getPostcard();

function getPostcard() {

    let r = 'zYxm9orlh2jF2nmKwVpWMQ';
    console.log("R is: ", r);


    let xhr = new XMLHttpRequest();

    let url = '/display.html?id=' + r;
    console.log("url is: ", url);


    xhr.open("GET", url);

    xhr.addEventListener('load', function () {
        if (xhr.status == 200) {
            let responseStr = xhr.responseText;
            let data = responseStr;

            console.log(data);




            // console.log("postobj: ", postcardObj);


            // newImage.src = postcardObj.photo;
            // textBox.innerHTML = postcardObj.message;
            // textBox.classList.add(postcardObj.font);
            // postcard.style.backgroundColor = postcardObj.color;

        } else {
            console.log(xhr.responseText);
        }

    });
    xhr.send();
};


document.getElementById("imgWrap").className += " editImage";
