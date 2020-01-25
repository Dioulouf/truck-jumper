// ********************** variables *********************************

let truckIsMoving = false
const trailer = document.querySelector(".trailer")
const tractor = document.querySelector(".tractor")
const tractorBottom = document.querySelector(".tractor-bottom")
const truckContainer = document.querySelector(".truck-container")
const logo = document.querySelector(".logo")
const klaxon = document.querySelector(".klaxon")
const wheel = document.querySelectorAll(".wheel")
const allCloud = document.querySelectorAll(".cloud")
const title = document.querySelector("h1")
const informations = document.querySelector(".informations")
const lose = document.querySelector(".lose")
const dusts = document.querySelectorAll(".dust")
const buttonMusique = document.querySelector(".musique")
const road = document.querySelector(".road")
const bomb = document.querySelector(".bomb")
const dangerous = document.querySelector(".alert-dangerous")
const score = document.querySelector("h2")
const explosion = document.querySelector(".explosion")
const explosionMp3 = document.querySelector(".explosion-mp3")
let minimum = 8000
let maximum = 10000
let aleatoire = getRandomIntInclusive(0, maximum)
let colision = false
let compteur = 0




// ********************* functions ************************************


function keyRightDown() {
    truckContainer.style.transform = " scale(.7) translatex(200px)"
    truckContainer.style.bottom = "-25px"
    truckContainer.style.left = "-95px"
    for (let a of wheel) {

        // truck
        a.classList.add("wheel-turn")
        trailer.classList.add("truck-on-road")
        tractor.classList.add("truck-on-road")
        tractorBottom.classList.add("truck-on-road")
        logo.classList.add("truck-on-road")

        // dusts
        for (let dust of dusts) {
            dust.classList.add("dust-animation")
        }

        // items
        allCloud[0].classList.remove("items-show")
        allCloud[1].classList.remove("items-show")
        allCloud[2].classList.remove("items-show")
        title.classList.remove("items-show")
        informations.classList.remove("items-show")
        allCloud[0].classList.add("items-shadow")
        allCloud[1].classList.add("items-shadow")
        allCloud[2].classList.add("items-shadow")
        title.classList.add("items-shadow")
        informations.classList.add("items-shadow")
        score.style.transform = "scale(1)"

        // road
        road.classList.add("road-move")

        // clounds move
        allCloud[3].classList.add("cloud-external-screen-move")
        allCloud[4].classList.add("cloud-external-screen-move")
        allCloud[5].classList.add("cloud-external-screen-move")

        // boolean to know if truck is moving 
        truckIsMoving = true

        // music
        buttonMusique.play()
        buttonMusique.volume = 0.1
    }
}


function keyRightUp() {
    truckContainer.style.transform = " scale(1) translatex(0px)"
    truckContainer.style.bottom = "20px"
    truckContainer.style.left = "40px"

    for (let a of wheel) {
        // truck
        // delay stop weels
        setTimeout(function () {
            a.classList.remove("wheel-turn")
        }, 1000)
    }
    for (let dust of dusts) {
        setTimeout(function () {
            dust.classList.remove("dust-animation")
        }, 1000)
    }

    trailer.classList.remove("truck-on-road")
    tractor.classList.remove("truck-on-road")
    tractorBottom.classList.remove("truck-on-road")
    logo.classList.remove("truck-on-road")
    // truckContainer.style.transform = "scale(.7)"

    // items
    allCloud[0].classList.remove("items-shadow")
    allCloud[1].classList.remove("items-shadow")
    allCloud[2].classList.remove("items-shadow")
    title.classList.remove("items-shadow")
    informations.classList.remove("items-shadow")
    allCloud[0].classList.add("items-show")
    allCloud[1].classList.add("items-show")
    allCloud[2].classList.add("items-show")
    title.classList.add("items-show")
    informations.classList.add("items-show")
    score.style.transform = "scale(0)"

    // road
    setTimeout(function () {
        road.classList.remove("road-move")
    }, 800)

    // clounds move
    allCloud[3].classList.remove("cloud-external-screen-move")
    allCloud[4].classList.remove("cloud-external-screen-move")
    allCloud[5].classList.remove("cloud-external-screen-move")

    // boolean to know if truck is moving 
    truckIsMoving = false

    // music
    buttonMusique.pause()
}



function keySpaceDown() {
    klaxon.currentTime = 0
    klaxon.volume = 0.1
    klaxon.play()
}



function keyTopDown() {
    truckContainer.classList.add("jump")
    setTimeout(function () {
        truckContainer.classList.remove("jump")
    }, 600)

    if (truckIsMoving == true) {
        for (let dust of dusts) {
            dust.classList.remove("dust-animation")
            setTimeout(function () {
                dust.classList.add("dust-animation")
            }, 400)
        }
    }
}


function getRandomIntInclusive(min, max) {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min + 1)) + min
}


function explosionEvent() {

    truckContainer.classList.add("truck-container-explosion")

    // explosion animation
    explosion.style.animation = "explosion 1.5s linear"
    explosionMp3.currentTime = 0
    explosionMp3.volume = 0.1
    explosionMp3.play()


    // road
    setTimeout(function () {
        road.classList.remove("road-move")
    }, 300)

    // clounds move
    allCloud[3].classList.remove("cloud-external-screen-move")
    allCloud[4].classList.remove("cloud-external-screen-move")
    allCloud[5].classList.remove("cloud-external-screen-move")

    // boolean to know if truck is moving 
    truckIsMoving = false

    // music
    buttonMusique.pause()

    // loser
    lose.style.transform = "scale(1)"

}





// ********************** listen and execution functions ****************************************






window.addEventListener('keydown', function (e) {
    // key right down
    if ((e.keyCode === 39) && (colision == false)) {
        keyRightDown()
    }

    // key space down
    else if ((e.keyCode === 32) && (colision == false)) {
        keySpaceDown()
    }

    // key top down
    else if ((e.keyCode === 38) && (truckIsMoving == true)) {
        keyTopDown()
    }

    // reload and restart
    else if (e.keyCode === 13) {
        window.location.reload()
    }
})


window.addEventListener('keyup', function (e) {
    // key right up
    if ((e.keyCode === 39) && (colision == false)) {
        keyRightUp()
    }
})


// score
setInterval(() => {
    if (truckIsMoving && colision == false) {
        // score
        compteur = compteur + 0.5
        score.innerHTML = `Score : ${Math.round(compteur)} m`
    } else {
        score.innerHTML = `Score : ${Math.round(compteur)} m`
    }
}, 100)



// bomb
setInterval(() => {
    if (truckIsMoving && colision == false) {
        // alert dangerous at random
        dangerous.classList.add("dangerous")
        // 1s after alert dangerous -> bomb
        setTimeout(() => {
            bomb.classList.add("bomb-move")
            dangerous.classList.remove("dangerous")
            setTimeout(() => {
                bomb.classList.remove("bomb-move")
            }, 1000)
        }, 1000)
        if ((maximum > 2000) && (minimum > 0)) {
            maximum = maximum - 1000
            minimum = minimum - 1000
            aleatoire = getRandomIntInclusive(minimum, maximum)
        } else {
            aleatoire = 0
        }
    }
}, aleatoire)



// colision detection 
setInterval(() => {
    let bombInformations = bomb.getBoundingClientRect()
    for (let a of wheel) {
        let wheelInformations = a.getBoundingClientRect()

        if (wheelInformations.x < bombInformations.x + bombInformations.width &&
            wheelInformations.x + wheelInformations.width > bombInformations.x &&
            wheelInformations.y < bombInformations.y + bombInformations.height &&
            wheelInformations.height + wheelInformations.y > bombInformations.y) {
            colision = true
            console.log("colision")
            explosionEvent()
        }
    }
}, 50)