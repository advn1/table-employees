let peopleData = []
const rows = Array.from(document.querySelectorAll("tbody tr")).slice(1,9)

const select = document.querySelector("select")
let entries = select.value

const search = document.querySelector(".search input")
console.log(search)

const next = document.querySelector(".right-btn")
const previous = document.querySelector(".left-btn")

let currentIndex = 0


async function fetchData() {
    const response = await fetch("./data.json")

    let tempData = await response.json()
    return tempData
}

async function getData() {
    const data = await fetchData()
    peopleData.push(...data)
}

getData().then(() => Logic(entries))

function Logic(entries, searchMode=false) {
    const td = () => document.createElement("td")

    if (!searchMode) clearRows()

    rows.slice(0,entries).forEach((row, idx) => {
        let arrOfText = Array.from(row.childNodes).map(el => el.innerHTML)

        if (peopleData[idx+currentIndex] === undefined) {
            return
        }

        if (searchMode) {
            if (arrOfText.filter(el => el.toLowerCase().includes(search.value.toLowerCase())).length === 0) {
                row.style.display = "none"
            } else {
                row.style.display = "table-row"
            }
        }
        else {
            appendRow(row, td, idx)
        }
    })
}

function clearRows() {
    for (let row of document.querySelectorAll(".data-row")) {
        while (row.firstChild) {
            row.deleteCell(row.firstChild)
        }
    }
}

function appendRow(row, td, idx) {
    row.appendChild(td()).textContent = peopleData[idx+currentIndex].firstName
    row.appendChild(td()).textContent = peopleData[idx+currentIndex].lastName
    row.appendChild(td()).textContent = peopleData[idx+currentIndex].email
    row.appendChild(td()).textContent = peopleData[idx+currentIndex].createdAt
}

select.addEventListener("change", () => {
    select.blur()
    entries = select.value
    Logic(entries)
})

search.addEventListener("input", (e) => {
    search.value = e.target.value
    Logic(entries, searchMode=true)
})

previous.addEventListener("click", () => {
    if (currentIndex - parseInt(entries) < 0) {
        return
    }
    currentIndex -= parseInt(entries)
    Logic(entries)
})

next.addEventListener("click", () => {
    currentIndex += parseInt(entries)
    Logic(entries)
})