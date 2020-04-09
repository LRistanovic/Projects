let imgContainer = document.getElementById("img-container"),
    currentImg = 1,
    imgSize = "normal",
    keyboradSlidingEnabled = false

document.getElementById("right-button").addEventListener("click", moveRight)
document.getElementById("left-button").addEventListener("click", moveLeft)

imgContainer.addEventListener("click", grow)
imgContainer.lastElementChild.addEventListener("click", shrink)
imgContainer.addEventListener("mouseenter", () => keyboradSlidingEnabled = true)
imgContainer.addEventListener("mouseleave", () => keyboradSlidingEnabled = false)

window.addEventListener("keyup", keyboardSlide)

function moveRight() {
    currentImg = (currentImg === 6) ? 1 : ++currentImg
    setImage(currentImg)
}

function moveLeft() {
    currentImg = (currentImg === 1) ? 6 : --currentImg
    setImage(currentImg)
}

function setImage(img) {
    imgContainer.style.background = `url(images/img${img}.jpg)`
    imgContainer.style.backgroundSize = "contain"
    imgContainer.style.backgroundRepeat = "no-repeat"
    imgContainer.style.backgroundPosition = "50% 50%"
}

function grow(e) {
    if (imgSize === "normal" && e.target === imgContainer) {
        imgSize = "large"

        imgContainer.style.left = "5vw"
        imgContainer.style.top = "5vh"
        imgContainer.style.width = "90vw"
        imgContainer.style.height = "90vh"
        imgContainer.lastElementChild.style.display = "block"
    }
}

function shrink() {
    if (imgSize === "large") {
        imgSize = "normal"

        imgContainer.style.left = "35vw"
        imgContainer.style.top = "13vw"
        imgContainer.style.width = "30vw"
        imgContainer.style.height = "20vw"
        imgContainer.lastElementChild.style.display = "none"
    }
}

function keyboardSlide(e) {
    if (keyboradSlidingEnabled) {
        if (e.key === "ArrowRight") 
            moveRight()
        else if (e.key === "ArrowLeft")
            moveLeft()
    }
}