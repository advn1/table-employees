let peopleData = []
const rows = Array.from(document.querySelectorAll("tbody tr")).slice(1,9)
const select = document.querySelector("select")
let entries = select.value
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

function Logic(entries) {
    clearRows()

    rows.slice(0,entries).forEach((row, idx) => {
        const td = () => document.createElement("td")

        if (peopleData[idx+currentIndex] === undefined) {
            return
        }
        row.appendChild(td()).textContent = peopleData[idx+currentIndex].firstName
        row.appendChild(td()).textContent = peopleData[idx+currentIndex].lastName
        row.appendChild(td()).textContent = peopleData[idx+currentIndex].email
        row.appendChild(td()).textContent = peopleData[idx+currentIndex].createdAt
    })
}

function clearRows() {
    for (let row of document.querySelectorAll(".data-row")) {
        while (row.firstChild) {
            row.deleteCell(row.firstChild)
        }
    }
}

select.addEventListener("change", () => {
    select.blur()
    entries = select.value
    Logic(entries)
})

previous.addEventListener("click", () => {
    currentIndex -= parseInt(entries)
    Logic(entries)
})

next.addEventListener("click", () => {
    currentIndex += parseInt(entries)
    Logic(entries)
})