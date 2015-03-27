$ = function(id) {
    return document.getElementById(id);
}

$$ = function(classname) {
    return document.getElementsByClassName(classname);
}

window.onload = function() {
    var buttons = $$('button');
    var big_button = $('info-bar');
    var at_plus = $('apb');
    var hover_area = $('bottom-positioner');
    xmlhttp = new XMLHttpRequest();


    big_button.disabled = 1;
    big_button.onclick = calculateSum;
    hover_area.onmouseleave = ResetCalculator;
    at_plus.onclick = simulateRobert;
    everyButtonClick(buttons, big_button);
}

function connectServer(callback) {
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

function simulateRobert() {
    ResetCalculator();
    var buttons = $$('button');
    $('apb').disabled = 1;

    getRandomNumber(buttons, buttons[0], function() {
        getRandomNumber(buttons, buttons[1], function() {
            getRandomNumber(buttons, buttons[2], function() {
                getRandomNumber(buttons, buttons[3], function() {
                    getRandomNumber(buttons, buttons[4], function() {
                        calculateSum();
                    });
                });
            });
        });
    });
}

function getRandomNumber(buttons, button, callback) {
    button.childNodes[1].classList.add('wating');
    button.childNodes[1].innerHTML = "...";
    disableOtherButtons(buttons, button);

    connectServer(function(number) {
        button.childNodes[1].innerHTML = number;
        button.classList.add('inactivated');
        button.disabled = 1;
        enableOtherButtons(buttons, button);
        ifActivateBigButton(buttons);
        if (typeof callback === "function") {
            callback();
        }
    })
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

function calculateSum() {
    var at_plus = $('apb');
    var buttons = $$('button');
    var sum = 0;

    for (var i = 0; i < buttons.length; i++) {
        sum += parseInt(buttons[i].childNodes[1].innerHTML);
    }

    at_plus.disabled = 0;
    this.innerHTML = sum;
    this.disabled = 1;
    this.classList.add('inactivated');
}

function ResetCalculator() {
    xmlhttp.abort(); //中断当前的AJAX请求
    var buttons = $$('button');
    var big_button = $('info-bar');
    var at_plus = $('apb');

    for (var i = 0; i < buttons.length; i++) {
        buttons[i].disabled = 0;
        buttons[i].classList.toggle('inactivated', false);
        buttons[i].childNodes[1].classList.toggle('wating', false);
    }

    at_plus.disabled = 0;
    big_button.disabled = 1;
    big_button.innerHTML = '';
    big_button.classList.toggle('inactivated', true);
}

function everyButtonClick(buttons, big_button) {
    for (var i = 0; i < buttons.length; i++) {
        buttons[i].onclick = function(i) {
            return function() {
                getRandomNumber(buttons, buttons[i]);
            }
        }(i)
    }
}

function ifActivateBigButton(buttons) {
    var big_button = $('info-bar');
    for (var i = 0; i < buttons.length; i++) {
        if (!buttons[i].childNodes[1].classList.contains('wating')) {
            return;
        }
    }
    big_button.disabled = 0;
    big_button.classList.remove('inactivated');
}

function calculateSum() {
    var big_button = $('info-bar');
    var buttons = $$('button');
    var sum = 0;

    for (var i = 0; i < buttons.length; i++) {
        sum += parseInt(buttons[i].childNodes[1].innerHTML);
    }

    big_button.innerHTML = sum;
    big_button.disabled = 1;
    big_button.classList.add('inactivated');
}
