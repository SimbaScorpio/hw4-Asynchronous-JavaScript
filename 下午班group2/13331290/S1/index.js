$ = function(id) {
    return document.getElementById(id);
}

$$ = function(classname) {
    return document.getElementsByClassName(classname);
}

window.onload = function() {
    var buttons = $$('button');
    var big_button = $('info-bar');
    var hover_area = $('bottom-positioner');

    big_button.disabled = 1;
    big_button.onclick = calculateSum;
    hover_area.onmouseleave = ResetCalculator;
    getRandomNumber(big_button, buttons);
}

function connectServer(callback) {
    if (window.XMLHttpRequest) {
        xmlhttp = new XMLHttpRequest();
    } else {
        xmlhttp = new XMLHttpRequest('Microsoft.XMLHTTP');
    }

    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            if (typeof callback === 'function') {
                callback(xmlhttp.responseText);
            }
        }
    }

    xmlhttp.open('GET', '../server', true);
    xmlhttp.send();
}

function getRandomNumber(big_button, buttons) {
    for (var i = 0; i < buttons.length; i++) {
        buttons[i].onclick = function(i) {
            return function() {
                buttons[i].childNodes[1].classList.add('wating');
                buttons[i].childNodes[1].innerHTML = '...';
                disableOtherButtons(buttons, buttons[i]);

                connectServer(function(number) {
                    buttons[i].childNodes[1].innerHTML = number;
                    buttons[i].classList.add('inactivated');
                    buttons[i].disabled = 1;
                    enableOtherButtons(buttons, buttons[i]);
                    ifActivateBigButton(big_button, buttons);
                });
            }
        }(i)
    }
}

function disableOtherButtons(buttons, abled_button) {
    for (var i = 0; i < buttons.length; i++) {
        if (abled_button != buttons[i]) {
            buttons[i].classList.add('inactivated');
            buttons[i].disabled = 1;
        }
    }
}

function enableOtherButtons(buttons, disabled_button) {
    for (var i = 0; i < buttons.length; i++) {
        if (disabled_button != buttons[i] &&
            !buttons[i].childNodes[1].classList.contains('wating')) {
            buttons[i].classList.remove('inactivated');
            buttons[i].disabled = 0;
        }
    }
}

function ifActivateBigButton(big_button, buttons) {
    for (var i = 0; i < buttons.length; i++) {
        if (!buttons[i].childNodes[1].classList.contains('wating')) {
            return;
        }
    }
    big_button.disabled = 0;
    big_button.classList.remove('inactivated');
}

function calculateSum() {
    var buttons = $$('button');
    var sum = 0;

    for (var i = 0; i < buttons.length; i++) {
        sum += parseInt(buttons[i].childNodes[1].innerHTML);
    }

    this.innerHTML = sum;
    this.disabled = 1;
    this.classList.add('inactivated');
}

function ResetCalculator() {
    var buttons = $$('button');
    var big_button = $('info-bar');

    for (var i = 0; i < buttons.length; i++) {
        buttons[i].disabled = 0;
        buttons[i].classList.toggle('inactivated', false);
        buttons[i].childNodes[1].classList.toggle('wating', false);
    }

    big_button.disabled = 1;
    big_button.innerHTML = '';
    big_button.classList.toggle('inactivated', true);
}