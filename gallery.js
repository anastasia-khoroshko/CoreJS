var indexActiveElement = 0,
    clientWidth = document.documentElement.clientWidth;
function createElement(obj) {
    var newdiv = document.createElement('li');
    if (indexActiveElement === 0) {
        newdiv.classList.add("active");
        indexActiveElement++;
        document.getElementById("left").style.display = "none";
    }
    else newdiv.classList.remove("active");
    newdiv.innerHTML = ['<img class="gallery" src="images/', obj.img,
                      '" class="gallery" width="300" height="250"/>', '<p>"', obj.title, '"</p>'].join('');
    document.getElementById('images').insertBefore(newdiv, null);
};

document.onkeydown = function (e) {
    if (e.keyCode == 39) {
        nextElement();
    }
    if (e.keyCode == 37) {
        previousElement();
    }
};

function nextElement() {
    var element = document.getElementsByClassName("active")[0],
        width = clientWidth - element.getBoundingClientRect().right,
        nextElement = element.nextElementSibling,
        currentLeft = document.getElementsByClassName('scrollbar')[0].scrollLeft;

    if (nextElement) {
        nextElement.classList.add("active");
        (width <= nextElement.scrollWidth) ?
            animate(function (timePassed) {
                document.getElementsByClassName('scrollbar')[0].scrollLeft = currentLeft + nextElement.clientWidth * timePassed / 500;
            }, 500) : {};
        element.classList.remove("active");
        document.getElementById("left").style.display = "block"
    }else document.getElementById("right").style.display = "none";
}

function previousElement() {
    var element = document.getElementsByClassName("active")[0],
        prevElement = element.previousElementSibling,
        width = element.getBoundingClientRect().left,
        currentLeft = document.getElementsByClassName('scrollbar')[0].scrollLeft;

    document.getElementById("right").style.display = "block"
    if (prevElement) {
        prevElement.classList.add("active");
        (width <= prevElement.scrollWidth)?
            animate(function (timePassed) {
                document.getElementsByClassName('scrollbar')[0].scrollLeft = currentLeft - prevElement.clientWidth * timePassed / 200;
            }, 200):{};
        element.classList.remove("active");
    } else document.getElementById("left").style.display = "none"
}

function animate(draw, duration) {
    var start = performance.now();

    requestAnimationFrame(function animate(time) {
        var timePassed = time - start;
        if (timePassed > duration) timePassed = duration;
        draw(timePassed);
        if (timePassed < duration) {
            requestAnimationFrame(animate);
        }

    });
}

function loadDataFromJson() {
    var xmlhttp;
    if (window.XMLHttpRequest) {
        xmlhttp = new XMLHttpRequest();
    } else {
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }

    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == XMLHttpRequest.DONE) {
            if (xmlhttp.status == 200) {
                content = JSON.parse(xmlhttp.responseText);
                for (var i = 0; i < content.length; i++)
                    createElement(content[i]);
            }
            else if (xmlhttp.status == 400) {
                alert('There was an error 400')
            }
            else {
                alert('something else other than 200 was returned')
            }
        }
    }
    xmlhttp.open('GET', 'https://copy.com/X6H2VOt8VnXSdjoX/source.json?download=1', true);
    xmlhttp.send();
}

loadDataFromJson();