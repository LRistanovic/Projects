var fields = document.getElementsByClassName("field")
var table = Array(9).fill(0)

var turn = "X"

Array.from(fields).forEach((field) => {
    field.addEventListener("click", clicked)
})

function clicked(e) {
    let index = e.target.className[11] - 1
    if (table[index] === 0) {
        e.target.firstChild.textContent = turn
        table[index] = turn
        if (turn === "X") {
            turn = "O"
            document.getElementById("turn").textContent = "Na redu je igrač O"
            e.target.firstChild.style.marginLeft = "25%";
            e.target.firstChild.style.color = "blue"
        } else {
            turn = "X"
            document.getElementById("turn").textContent = "Na redu je igrač X"
            e.target.firstChild.style.marginLeft = "19%";
            e.target.firstChild.style.color = "red"
        }
        checkIfDone(index)
        checkIfUnresolved()
    }
}

function checkIfDone(i) {
    // horizontal check
    switch(i % 3) {
        case 0:
            if (table[i] === table[i + 1] && table[i] === table[i + 2])
                end(table[i])
            break
        case 1:
            if (table[i] === table[i - 1] && table[i] === table[i + 1])
                end(table[i])
            break
        case 2:
            if (table[i] === table[i - 1] && table[i] === table[i - 2])
                end(table[i])
    }

    // vertical check
    if (i <= 2) {
        if (table[i] === table[i + 3] && table[i] === table[i + 6])
            end(table[i])
    } else if (i >= 3 && i <= 5) {
        if (table[i] === table[i - 3] && table[i] === table[i + 3])
            end(table[i])
    } else {
        if (table[i] === table[i - 3] && table[i] === table[i - 6])
            end(table[i])
    }

    // diagonal check
    if (i === 0 || i === 4 || i === 8) {
        if (table[0] === table[4] && table[0] === table[8])
            end(table[0])
    }
    if (i === 2 || i === 4 || i === 6) {
        if (table[2] === table[4] && table[2] === table[6])
            end(table[2])
    }
}

function end(player) {
    alert("Igrač " + player + " je pobjednik!")
    location.reload()
    Object.freeze(window)
}

function checkIfUnresolved() {
    if (table.every((x) => x)) {
        alert("Neriješeno!")
        location.reload()
    }
}