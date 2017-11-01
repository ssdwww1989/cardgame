'use strict';


var cardarray = [];
var count = 0;
var starsnew = 0;
var counttime;
var hour, minute, second; //时 分 秒
hour = minute = second = 0; //初始化
var millisecond = 0; //毫秒
var starttimer;




//重置按钮
$(".restart").click(function() {
    window.location.reload();
});
resetCard("deck");




//卡牌重新排序
function resetCard(rescard) {
    let arr = ["fa-diamond", "fa-paper-plane-o", "fa-anchor", "fa-bolt", "fa-cube", "fa-leaf", "fa-bicycle", "fa-bomb", "fa-diamond", "fa-paper-plane-o", "fa-anchor", "fa-bolt", "fa-cube", "fa-leaf", "fa-bicycle", "fa-bomb"];
    arr = shuffle(arr);
    var list = "";
    for (let i = 0; i < arr.length; i++) {
        list += `<li class="card"><i class="${arr[i]}"></i></li>`; //使用es6 模板字符串  get
    }
    document.getElementById(rescard).innerHTML += list;
}

//设定10秒倒计时
function timeout(cts) {
    counttime = setInterval(function() {
        cts--;

        $(".counttime em").text(cts);
        if (cts == 0) {
            clearInterval(counttime);
            //调用开始计时器
            start();
            cts = 0;
            $(".counttime").hide();
            $(".starttimer").show();
            $(".deck li").removeClass("open show");
        }
    }, 1000)
}
//默认展开功能
function starshow() {
    $(".deck li").addClass("open show")
}


//游戏开始计时器
//开始
function start() {
    starttimer = setInterval(timer, 50);
}

//计时
function timer() {
    millisecond = millisecond + 50;
    if (millisecond >= 1000) {
        millisecond = 0;
        second = second + 1;
    }
    if (second >= 60) {
        second = 0;
        minute = minute + 1;
    }
    if (minute >= 60) {
        minute = 0;
        hour = hour + 1;
    }

    var $starttimer = $(".starttimer")

    $starttimer.find(".minute").text(minute);
    $starttimer.find(".second").text(second);
}





//对比两张卡牌
function matchcard(card, array) {
    if (array.length >= 2) {
        if (card == array[0]) {
            count++;
            $(".moves").text(count);
            $("." + card).parent().addClass("match").removeClass("open show");
            var le = $(".deck .match").length; //检查有多个match
            if (le == 16) { //检查match是否相等
                var endminu = $(".minute").text();//获取耗时分
                var endsec = $(".second").text();//获取耗时秒
                getstarlength(starsnew); //调用检查星星的方法
                window.clearInterval(starttimer) //清除计时器
                setTimeout(function() {
                    window.location.href = "Congratulation.html?mo=" + count + "?sta=" + starsnew+"?min"+endminu+"?sec"+endsec;
                }, 400)
            } //检查有多个match
            //清空数组
            array.length = 0;
        } else {
            count++;
            $(".moves").text(count)
            $("ul li").each(function() {
                if ($(this).hasClass("open")) {
                    $(this).addClass("error").removeClass("open");
                    var thisli = $(this);
                    setTimeout(function() {
                        thisli.removeClass("show error")
                    }, 500)
                }
            })
            array.length = 0;
        }
    }
    starsf(count)
}

//卡牌点击功能
function cardclick(element) {
    $(".deck").on('click', 'li', function() { //动态绑定
        if ($(this).hasClass("show") || $(this).hasClass("match") || $(this).hasClass("open")) {} else {
            $(this).addClass("open show");
            var cleson = $(this).find("i").prop("className");
            cardarray.push(cleson);
            matchcard(cleson, cardarray)
        }
    })
}

//调用卡牌点击功能 传入class类名card
cardclick("card");

//判断成绩 可以获得多少颗星
function starsf(ele, stars) {
    if (ele > 8) {
        $(".stars li:last-child i").removeClass("fa-star").addClass("fa-star-o")
    }
    if (ele > 15) {
        $(".stars li:nth-child(2) i").removeClass("fa-star").addClass("fa-star-o")
    }
}

//随机排序数组
function shuffle(array) {
    var currentIndex = array.length,
        temporaryValue, randomIndex;
    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
}

//游戏结束获取剩余的星
function getstarlength(stars) {
    $(".stars li").each(function() {
        if ($(this).find("i").hasClass("fa-star")) {
            stars++;
            starsnew = stars;
        }
    })
}

setTimeout(function() {
    //调用倒计时
    timeout(10);
    //默认展示
    starshow();
}, 1000)



/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */