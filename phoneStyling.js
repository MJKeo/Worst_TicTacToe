var isPhone = false

checkDimensions()
setInterval(checkDimensions, 100)

function checkDimensions() {
    if( navigator.userAgent.match(/Android/i)
    || navigator.userAgent.match(/webOS/i)
    || navigator.userAgent.match(/iPhone/i)
    || navigator.userAgent.match(/iPad/i)
    || navigator.userAgent.match(/iPod/i)
    || navigator.userAgent.match(/BlackBerry/i)
    || navigator.userAgent.match(/Windows Phone/i)) {
        if ((window.innerWidth / window.innerHeight) < 1 && !isPhone) {
            isPhone = true
            switchToPhoneDisplay()
        } else if ((window.innerWidth / window.innerHeight) >= 1 && isPhone) {
            isPhone = false
            switchToRegularDisplay()
        }
    } else if (isPhone) {
        isPhone = false
        switchToRegularDisplay()
    }
}

function switchToPhoneDisplay() {
    let num = 1
    while (num < 10) {
        document.getElementById("" + num).classList.remove("board-square")
        document.getElementById("" + num).classList.add("board-square-phone")
        num++
    }

    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            document.getElementById(i + "," + j).classList.remove("square-text")
            document.getElementById(i + "," + j).classList.add("square-text-phone")
        }
    }

    document.getElementById("announcementText").classList.remove("announcement-text")
    document.getElementById("announcementText").classList.add("announcement-text-phone")

    document.getElementById("title").classList.remove("title-text")
    document.getElementById("title").classList.add("title-text-phone")
}

function switchToRegularDisplay() {
    let num = 1
    while (num < 10) {
        document.getElementById("" + num).classList.add("board-square")
        document.getElementById("" + num).classList.remove("board-square-phone")
        num++
    }

    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            document.getElementById(i + "," + j).classList.add("square-text")
            document.getElementById(i + "," + j).classList.remove("square-text-phone")
        }
    }

    document.getElementById("announcementText").classList.add("announcement-text")
    document.getElementById("announcementText").classList.remove("announcement-text-phone")

    document.getElementById("title").classList.add("title-text")
    document.getElementById("title").classList.remove("title-text-phone")
}