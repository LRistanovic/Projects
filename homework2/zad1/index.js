var form = document.getElementById("addForm")
var itemList = document.getElementById("items")
var filter = document.getElementById("filter")
form.addEventListener("submit", addItem)
itemList.addEventListener("click", removeItem)
itemList.addEventListener("click", selectItem)
window.addEventListener("keyup", chooseItem)
filter.addEventListener("keyup", filterItems)

for (let i = 1; i > 0; i++) {
    if (localStorage.getItem(i) === null)
        break
    
    var newItem = localStorage.getItem(i)
    var li = document.createElement("li")
    li.className = "list-group-item"
    li.appendChild(document.createTextNode(newItem))
    var deleteBtn = document.createElement("button")
    deleteBtn.className = "btn btn-danger btn-sm float-right delete"
    deleteBtn.appendChild(document.createTextNode("X"))
    li.appendChild(deleteBtn)
    itemList.appendChild(li)
}

function addItem(e) {
    e.preventDefault()
    var newItem = document.getElementById("item").value
    var li = document.createElement("li")
    li.className = "list-group-item"
    li.appendChild(document.createTextNode(newItem))
    var deleteBtn = document.createElement("button")
    deleteBtn.className = "btn btn-danger btn-sm float-right delete"
    deleteBtn.appendChild(document.createTextNode("X"))
    li.appendChild(deleteBtn)
    itemList.appendChild(li)
    localStorage.setItem(itemList.childElementCount, newItem)
}

function removeItem(e) {
    if (e.target.classList.contains("delete")) {
        if (confirm("Are you sure?")) {
            var li =  e.target.parentElement
            localStorage.removeItem(Array.from(itemList.children).indexOf(li) + 1)
            lower(Array.from(itemList.children).indexOf(li) + 1)
            itemList.removeChild(li)
        }
    }
}

function filterItems(e) {
    var text = e.target.value.toLowerCase()
    var items = Array.from(itemList.getElementsByTagName("li"))
    items.forEach(function(item) {
        var itemName = item.firstChild.textContent
        if (itemName.toLowerCase().indexOf(text) === 0) {
            item.style.display = "block"
        } else {
            item.style.display = "none"
        }
    })
}

function selectItem(e) {
    if (e.target.className === "list-group-item") {
        filter.value = e.target.firstChild.textContent
        Array.from(itemList.getElementsByTagName("li")).forEach(function(item) {
            if (item.textContent !== e.target.textContent)
                item.style.display = "none"
        })
    }
}

function chooseItem(e) {
    var list = Array.from(itemList.children).filter((item) => item.style.display !== "none")
    var selectedItem = document.getElementById("selected")

    if (e.key === "ArrowDown") {
        if (!selectedItem) {
            list[0].id = "selected"
            list[0].style.backgroundColor = "#EEEEEE"    
        } else {
            selectedItem.id = null
            selectedItem.style.backgroundColor = "white"
            if (selectedItem === list[list.length - 1]) {
                list[0].id = "selected"
                list[0].style.backgroundColor = "#EEEEEE"
            } else {
                list[list.indexOf(selectedItem) + 1].id = "selected"
                list[list.indexOf(selectedItem) + 1].style.backgroundColor = "#EEEEEE"
            }
        }
    } else if (e.key === "ArrowUp") {
        if (!selectedItem) {
            list[0].id = "selected"
            list[0].style.backgroundColor = "#EEEEEE"    
        } else {
            selectedItem.id = null
            selectedItem.style.backgroundColor = "white"
            if (selectedItem === list[0]) {
                list[list.length - 1].id = "selected"
                list[list.length - 1].style.backgroundColor = "#EEEEEE"
            } else {
                list[list.indexOf(selectedItem) - 1].id = "selected"
                list[list.indexOf(selectedItem) - 1].style.backgroundColor = "#EEEEEE"
            }
        }
    } else if (e.key === "Enter") {
        selectedItem.id = null
        selectedItem.style.backgroundColor = "white"
        filter.value = selectedItem.firstChild.textContent
        Array.from(itemList.getElementsByTagName("li")).forEach(function(item) {
            if (item.textContent !== selectedItem.textContent)
                item.style.display = "none"
        })
    }
}

function lower(index) {
    let i = index + 1
    while (localStorage.getItem(i) !== null) {
        localStorage.setItem(i - 1, localStorage.getItem(i))
        i++
    }
    localStorage.removeItem(i - 1)
}
