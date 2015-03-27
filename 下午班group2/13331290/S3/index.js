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

function simulateRobert() {
    ResetCalculator();
    $('apb').disabled = 1;
    var buttons = $$('button');

    for (var i = 0; i < buttons.length; i++) {
        getRandomNumber(buttons, buttons[i]);
    }
}

function getRandomNumber(buttons, button) {
    button.childNodes[1].classList.add('wating');
    button.childNodes[1].innerHTML = "...";
    disableOtherButtons(buttons, button);

    XMLHttp.sendRequest('GET', '../server', function(number) {
        button.childNodes[1].innerHTML = number;
        button.classList.add('inactivated');
        button.disabled = 1;
        enableOtherButtons(buttons, button);
        ifActivateBigButton(buttons);
    });
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
    XMLHttp.abortALLRequest();
    var buttons = $$('button');
    var big_button = $('info-bar');
    var order = $('bubble-order');
    var at_plus = $('apb');

    order.innerHTML = '';
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
    var at_plus = $('apb');
    for (var i = 0; i < buttons.length; i++) {
        if (!buttons[i].childNodes[1].classList.contains('wating')
            || buttons[i].childNodes[1].innerHTML == '...') {
            return;
        }
    }
    big_button.disabled = 0;
    big_button.classList.remove('inactivated');
    if (at_plus.disabled) {
        calculateSum();
    }
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