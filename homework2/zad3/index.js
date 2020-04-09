// functions

function createSquares(num) {
    for (let i = 0; i < num; i++) {
        addSquare()
    }
}

function addSquare() {
    numOfSquares++

    let input = document.createElement("input")
    input.type = "text"
    input.maxLength = 1
    
    let deleteBtn = document.createElement("button")
    deleteBtn.className = "deleteBtn"
    deleteBtn.textContent = "X"
    deleteBtn.addEventListener("click", removeSquare)

    let square = document.createElement("div")
    square.className = "square"
    square.id = "square" + numOfSquares
    square.addEventListener("keyup", checkIfPalindrome)
    square.appendChild(input)
    square.appendChild(deleteBtn)

    squaresContainer.appendChild(square)
}

function removeSquare() {
    numOfSquares--
    squaresContainer.removeChild(this.parentElement)
}

function checkIfPalindrome() {
    let string = ""
    Array.from(squaresContainer.children).forEach((square) => {
        let letter = square.firstElementChild.value.toLowerCase()
        if ((letter >= "a" && letter <= "z") || letter === " " || letter === "") 
            string += letter
        else {
            square.firstElementChild.value = "";
            alert("Unijeli ste neodgovarajući karakter. Dozvoljeno je unositi samo velika slova, mala slova, i razmak.")
        }
    })
    let isPalindrome = true
    let len = string.length
    for (let i = 0; i < len; i++)
        if (string[i] !== string[len - i - 1]) 
            isPalindrome = false;
    
    if (isPalindrome)
        isPalindromePrompt.textContent = "Riječ je palindrom."
    else 
        isPalindromePrompt.textContent = "Riječ nije palindrom."
}

// declaration

let numInput = document.getElementById("numInput"),
    okBtn = document.getElementById("okBtn"),
    startDiv = document.getElementById("characterNumberInput"),
    squaresDiv = document.getElementById("squaresDiv"),
    squaresContainer = document.getElementById("squaresContainer"),
    addCharBtn = document.getElementById("addCharacter"),
    deleteBtns = document.getElementsByClassName("deleteBtn"),
    isPalindromePrompt = document.getElementById("isPalindrome")
    numOfSquares = 0

okBtn.addEventListener("click", function() {
    if (numInput.value === "")
        alert("Molim popunite polje za unos")
    else {
        startDiv.style.display = "none"
        squaresDiv.style.display ="block"
        createSquares(numInput.value)
    }
})

addCharBtn.addEventListener("click", addSquare)
