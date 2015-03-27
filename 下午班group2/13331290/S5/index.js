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

    big_button.disabled = 1;
    big_button.onclick = calculateSum;
    hover_area.onmouseleave = ResetCalculator;
    at_plus.onclick = simulateRobert;
    everyButtonClick(buttons, big_button);
}

function connectServer(callback) {
    var xmlhttp;
    if (window.XMLHttpRequest) {
        xmlhttp = new XMLHttpRequest();
    } else {
        xmlhttp = new XMLHttpRequest('Microsoft.XMLHTTP');
    }

    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            if (typeof callback === 'function') {
                callback(parseInt(xmlhttp.responseText));
            }
        }
    }

    xmlhttp.open('GET', '../server', true);
    xmlhttp.send();
}

function simulateRobert() {
    ResetCalculator();
    $('apb').disabled = 1;
    var buttons = $$('button');
    var order_text = $('bubble-order');

    var order = new Array;
    for (var i = 0; i < 5; i++) {
        order[i] = i;
    }
    order.sort(function() {
        return Math.random() - 0.5;
    });

    for (var i = 0; i < 5; i++) {
        order_text.innerHTML += String.fromCharCode(order[i] + 65);
    }

    clickNextBotton(0, 0, order);
}

function clickNextBotton(currentSum, index, order) {
    if (!$('apb').disabled) {
        return;
    }
    if (index == 5) {
        bubbleHandler(currentSum);
        return;
    }
    var message = $('message');
    switch (order[index]) {
        case 0:
            aHandler(currentSum, index, order, function(err, nextIndex, sum) {
                if (err) {
                    message.classList.toggle('error', true);
                    message.innerHTML = err;
                    setTimeout(clickNextBotton, 1000, sum, nextIndex, order);
                } else {
                    clickNextBotton(sum, nextIndex, order);
                }
            });
            break;

        case 1:
            bHandler(currentSum, index, order, function(err, nextIndex, sum) {
                if (err) {
                    message.classList.toggle('error', true);
                    message.innerHTML = err;
                    setTimeout(clickNextBotton, 1000, sum, nextIndex, order);
                } else {
                    clickNextBotton(sum, nextIndex, order);
                }
            });
            break;

        case 2:
            cHandler(currentSum, index, order, function(err, nextIndex, sum) {
                if (err) {
                    message.classList.toggle('error', true);
                    message.innerHTML = err;
                    setTimeout(clickNextBotton, 1000, sum, nextIndex, order);
                } else {
                    clickNextBotton(sum, nextIndex, order);
                }
            });
            break;

        case 3:
            dHandler(currentSum, index, order, function(err, nextIndex, sum) {
                if (err) {
                    message.classList.toggle('error', true);
                    message.innerHTML = err;
                    setTimeout(clickNextBotton, 1000, sum, nextIndex, order);
                } else {
                    clickNextBotton(sum, nextIndex, order);
                }
            });
            break;

        case 4:
            eHandler(currentSum, index, order, function(err, nextIndex, sum) {
                if (err) {
                    message.classList.toggle('error', true);
                    message.innerHTML = err;
                    setTimeout(clickNextBotton, 1000, sum, nextIndex, order);
                } else {
                    clickNextBotton(sum, nextIndex, order);
                }
            });
            break;
    }
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

function calculateSum() {
    var at_plus = $('apb');
    var big_button = $('info-bar');
    var buttons = $$('button');
    var sum = 0;

    for (var i = 0; i < buttons.length; i++) {
        sum += parseInt(buttons[i].childNodes[1].innerHTML);
    }

    at_plus.disabled = 0;
    big_button.innerHTML = sum;
    big_button.disabled = 1;
    big_button.classList.add('inactivated');
}

function ifActivateBigButton(buttons) {
    var big_button = $('info-bar');
    for (var i = 0; i < buttons.length; i++) {
        if (!buttons[i].childNodes[1].classList.contains('wating')
            || buttons[i].childNodes[1].innerHTML == '...') {
            return;
        }
    }
    big_button.disabled = 0;
    big_button.classList.remove('inactivated');
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

function ResetCalculator() {
    var buttons = $$('button');
    var big_button = $('info-bar');
    var at_plus = $('apb');

    $('bubble-order').innerHTML = '';
    $('message').innerHTML = '';

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

function failedToHandle() {
    return Math.random() > 0.5;
}

function bubbleHandler(currentSum) {
    $('message').innerHTML = '楼主异步调用战斗力感人，目测不超过' + currentSum;
    var big_button = $('info-bar');
    big_button.innerHTML = currentSum;
    $('apb').disabled = 0;
}

function aHandler(currentSum, index, order, callback) {
    var buttons = $$('button');
    buttons[0].childNodes[1].classList.add('wating');
    buttons[0].childNodes[1].innerHTML = "...";
    disableOtherButtons(buttons, buttons[0]);
    if (failedToHandle()) {
        callback('这不是个天大的秘密', index, currentSum);
    } else {
        var message = $('message');
        message.classList.toggle('error', false);
        message.innerHTML = '这是个天大的秘密';
        connectServer(function(number) {
            buttons[0].childNodes[1].innerHTML = number;
            buttons[0].classList.add('inactivated');
            buttons[0].disabled = 1;
            enableOtherButtons(buttons, buttons[0]);
            callback(null, index + 1, number + currentSum);
        });
    }
}

function bHandler(currentSum, index, order, callback) {
    var buttons = $$('button');
    buttons[1].childNodes[1].classList.add('wating');
    buttons[1].childNodes[1].innerHTML = "...";
    disableOtherButtons(buttons, buttons[1]);
    if (failedToHandle()) {
        callback('我知道', index, currentSum);
    } else {
        var message = $('message');
        message.classList.toggle('error', false);
        message.innerHTML = '我不知道';
        connectServer(function(number) {
            buttons[1].childNodes[1].innerHTML = number;
            buttons[1].classList.add('inactivated');
            buttons[1].disabled = 1;
            enableOtherButtons(buttons, buttons[1]);
            callback(null, index + 1, number + currentSum);
        });
    }
}

function cHandler(currentSum, index, order, callback) {
    var buttons = $$('button');
    buttons[2].childNodes[1].classList.add('wating');
    buttons[2].childNodes[1].innerHTML = "...";
    disableOtherButtons(buttons, buttons[2]);
    if (failedToHandle()) {
        callback('你知道', index, currentSum);
    } else {
        var message = $('message');
        message.classList.toggle('error', false);
        message.innerHTML = '你不知道';
       connectServer(function(number) {
            buttons[2].childNodes[1].innerHTML = number;
            buttons[2].classList.add('inactivated');
            buttons[2].disabled = 1;
            enableOtherButtons(buttons, buttons[2]);
            callback(null, index + 1, number + currentSum);
        });
    }
}

function dHandler(currentSum, index, order, callback) {
    var buttons = $$('button');
    buttons[3].childNodes[1].classList.add('wating');
    buttons[3].childNodes[1].innerHTML = "...";
    disableOtherButtons(buttons, buttons[3]);
    if (failedToHandle()) {
        callback('他知道', index, currentSum);
    } else {
        var message = $('message');
        message.classList.toggle('error', false);
        message.innerHTML = '他不知道';
        connectServer(function(number) {
            buttons[3].childNodes[1].innerHTML = number;
            buttons[3].classList.add('inactivated');
            buttons[3].disabled = 1;
            enableOtherButtons(buttons, buttons[3]);
            callback(null, index + 1, number + currentSum);
        });
    }
}

function eHandler(currentSum, index, order, callback) {
    var buttons = $$('button');
    buttons[4].childNodes[1].classList.add('wating');
    buttons[4].childNodes[1].innerHTML = "...";
    disableOtherButtons(buttons, buttons[4]);
    if (failedToHandle()) {
        callback('就是', index, currentSum);
    } else {
        var message = $('message');
        message.classList.toggle('error', false);
        message.innerHTML = '才怪';
        connectServer(function(number) {
            buttons[4].childNodes[1].innerHTML = number;
            buttons[4].classList.add('inactivated');
            buttons[4].disabled = 1;
            enableOtherButtons(buttons, buttons[4]);
            callback(null, index + 1, number + currentSum);
        });
    }
}
