/* 13331078 hujiangchuan */
$ = function(id) {
	return document.getElementById(id);
}
$$ = function(className) {
	return document.getElementsByClassName(className);
}

window.onload = function() {
	reset();
	var menuArea = $('button');
	menuArea.onmouseleave = reset;
}

function connectServer(callback) {
	if (window.XMLHttpRequest) {
		xmlhttp = new XMLHttpRequest();
	} else if (window.ActiveXObject) {
        xmlHttp = new ActiveXObject("Microsoft.XMLHttp");
    } else return;
	xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            callback(xmlhttp.responseText);
        }
    }
    xmlhttp.open('GET', '../server', true);
    xmlhttp.send();
}

function ButtonsInit() {
	var buttons = $$('button');
	for(var i = 0; i < buttons.length; ++i) {
		buttons[i].bannedforever = 0;
		buttons[i].disabled = false;
		buttons[i].classList.remove('banned');
		buttons[i].onclick = function(i) {
			return function() {
				if (this.disabled) {return};
				bannedButtons(this, buttons);
				this.childNodes[1].innerHTML = '...';
				this.childNodes[1].style.visibility = 'visible';
				connectServer(function(data) {
					buttons[i].childNodes[1].innerHTML = data;
					bannedButtons(null, buttons);
					enableButtons(buttons);
					checkInfoIsReady(buttons);
				});
			}
		}(i);
	}
}

function bannedButtons(except, buttons) {
	for(var i = 0; i < buttons.length; ++i) {
		buttons[i].classList.add('banned');
		buttons[i].disabled = true;
	}
	if (except != null && except.bannedforever == 0) {
		except.classList.remove('banned');
		except.bannedforever = 1;
	}
}

function enableButtons(buttons) {
	for(var i = 0; i < buttons.length; ++i) {
		if (buttons[i].bannedforever == 0) {
			buttons[i].classList.remove('banned');
			buttons[i].disabled = false;
		}
	}
}

function getSum(tips) {
	var sum = 0;
	for(var i = 0; i < tips.length; ++i) {
		sum += parseInt(tips[i].innerHTML);
	}
	$('result').innerHTML = sum;
}

function checkInfoIsReady(buttons) {
	var info = $$('info')[0];
	for(var i = 0; i < buttons.length; ++i) {
		if (buttons[i].disabled == false) {
			return;
		}
	}
	info.disabled = false;
	info.classList.remove('banned');
}

function reset() {
	var tips = $$('tip');
	for(var i = 0; i < tips.length; ++i) {
		tips[i].style.visibility = 'hidden';
		tips[i].innerHTML = '';
	}
	var info = $$('info')[0];
	info.disabled = true;
	info.classList.add('banned');
	info.onclick = function() {
		if (info.disabled) {return;}
		getSum(tips);
		this.disabled = true;
		this.classList.add('banned');
	}
	$('result').innerHTML = '';
	$('msg').innerHTML = '';
	ButtonsInit();

	var arr = [];
	for(var i = 0; i < 5; ++i) {  //65 -> A
		arr[i] = String.fromCharCode(65 + i);
	}
	arr.sort( function() {return 0.5 - Math.random();} );

	$('order').innerHTML = arr.join();
	$('order').style.visibility = 'hidden';

	$$('icon')[0].disabled = false;
	$$('icon')[0].onclick = function() {    //in random order
		$('order').style.visibility = 'visible';
		if (this.disabled == false) {
			$$('icon')[0].disabled = true;
			clickNextButton(0, arr, 0);
		}
	}
}

function clickNextButton(sum, array, index) {
	if (index == 5) {
		bubbleHandler(sum);
		return;
	}
	var arrIndex = array[index].charCodeAt() - 65;
	if ($$('button')[arrIndex].bannedforever == 1) {
		var addition = $$('button')[arrIndex].childNodes[1].innerHTML;
		clickNextButton(sum + parseInt(addition), array, index + 1);
	}
	$('result').innerHTML = sum;
	var handleResult = function(error, sum, array, index) {
		if (error != null) {
			console.log(error);
		}
		clickNextButton(sum, array, index);
	}
	switch (arrIndex) {
		case 0:
			aHandler(sum, array, index, handleResult);
			break;
		case 1:
			bHandler(sum, array, index, handleResult);
			break;
		case 2:
			cHandler(sum, array, index, handleResult);
			break;
		case 3:
			dHandler(sum, array, index, handleResult);
			break;
		case 4:
			eHandler(sum, array, index, handleResult);
			break;
	}
}

function isFailed() {
	return Math.random() > 0.5;
}

function bubbleHandler(sum) {
	$('msg').style.color = '#43f974';
	$('msg').innerHTML = '楼主异步调用战斗力感人，目测不超过';
	$('result').innerHTML = sum;
}

function aHandler(sum, array, index, handleResult) {
	var buttons = $$('button');
	if (buttons[0].disabled) {return};
	bannedButtons(buttons[0], buttons);
	buttons[0].childNodes[1].innerHTML = '...';
	buttons[0].childNodes[1].style.visibility = 'visible';
	var isfail = isFailed();
	if (!isfail) {
		$('msg').style.color = 'green';
		$('msg').innerHTML = '这是个天大的秘密';
	} else {
		$('msg').style.color = 'red';
		$('msg').innerHTML = '这不是个天大的秘密';
	}
	connectServer(function(data) {
		bannedButtons(null, buttons);
		enableButtons(buttons);
		if (!isfail) {
			buttons[0].childNodes[1].innerHTML = data;
			sum += parseInt(data);
			handleResult(null, sum, array, index + 1);
		} else {
			handleResult('A failed!', sum, array, index + 1);
		}
	});
}

function bHandler(sum, array, index, handleResult) {
	var buttons = $$('button');
	if (buttons[1].disabled) {return};
	bannedButtons(buttons[1], buttons);
	buttons[1].childNodes[1].innerHTML = '...';
	buttons[1].childNodes[1].style.visibility = 'visible';
	var isfail = isFailed();
	if (!isfail) {
		$('msg').innerHTML = '我不知道';
		$('msg').style.color = 'green';
	} else {
		$('msg').innerHTML = '我知道';
		$('msg').style.color = 'red';
	}
	connectServer(function(data) {
		bannedButtons(null, buttons);
		enableButtons(buttons);
		if (!isfail) {
			buttons[1].childNodes[1].innerHTML = data;
			sum += parseInt(data);
			handleResult(null, sum, array, index + 1);
		} else {
			handleResult('B failed!', sum, array, index + 1);
		}
	});
}

function cHandler(sum, array, index, handleResult) {
	var buttons = $$('button');
	if (buttons[2].disabled) {return};
	bannedButtons(buttons[2], buttons);
	buttons[2].childNodes[1].innerHTML = '...';
	buttons[2].childNodes[1].style.visibility = 'visible';
	var isfail = isFailed();
	if (!isfail) {
		$('msg').innerHTML = '你不知道';
		$('msg').style.color = 'green';
	} else {
		$('msg').innerHTML = '你知道';
		$('msg').style.color = 'red';
	}
	connectServer(function(data) {
		bannedButtons(null, buttons);
		enableButtons(buttons);
		if (!isfail) {
			buttons[2].childNodes[1].innerHTML = data;
			sum += parseInt(data);
			handleResult(null, sum, array, index + 1);
		} else {
			handleResult('C failed!', sum, array, index + 1);
		}
	});
}

function dHandler(sum, array, index, handleResult) {
	var buttons = $$('button');
	if (buttons[3].disabled) {return};
	bannedButtons(buttons[3], buttons);
	buttons[3].childNodes[1].innerHTML = '...';
	buttons[3].childNodes[1].style.visibility = 'visible';
	var isfail = isFailed();
	if (!isfail) {
		$('msg').innerHTML = '他不知道';
		$('msg').style.color = 'green';
	} else {
		$('msg').innerHTML = '他知道';
		$('msg').style.color = 'red';
	}
	connectServer(function(data) {
		bannedButtons(null, buttons);
		enableButtons(buttons);
		if (!isfail) {
			buttons[3].childNodes[1].innerHTML = data;
			sum += parseInt(data);
			handleResult(null, sum, array, index + 1);
		} else {
			handleResult('D failed!', sum, array, index + 1);
		}
	});
}

function eHandler(sum, array, index, handleResult) {
	var buttons = $$('button');
	if (buttons[4].disabled) {return};
	bannedButtons(buttons[4], buttons);
	buttons[4].childNodes[1].innerHTML = '...';
	buttons[4].childNodes[1].style.visibility = 'visible';
	var isfail = isFailed();
	if (!isfail) {
		$('msg').innerHTML = '才怪';
		$('msg').style.color = 'green';
	} else {
		$('msg').innerHTML = '不怪';
		$('msg').style.color = 'red';
	}
	connectServer(function(data) {
		bannedButtons(null, buttons);
		enableButtons(buttons);
		if (!isfail) {
			buttons[4].childNodes[1].innerHTML = data;
			sum += parseInt(data);
			handleResult(null, sum, array, index + 1);
		} else {
			handleResult('E failed!', sum, array, index + 1);
		}
	});
}