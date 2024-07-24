let peopleData = []
const rows = Array.from(document.querySelectorAll("tbody tr")).slice(1,9)
const select = document.querySelector("select")

async function fetchData() {
    const response = await fetch("./data.json")

    let tempData = await response.json()
    return tempData
}

async function getData() {
    const data = await fetchData()
    peopleData.push(...data)
}

getData().then(() => Logic())

function Logic() {
    rows.forEach((row, idx) => {
        console.log(peopleData[idx])
        const td = () => document.createElement("td")
        row.appendChild(td()).textContent = peopleData[idx].firstName
        row.appendChild(td()).textContent = peopleData[idx].lastName
        row.appendChild(td()).textContent = peopleData[idx].email
        row.appendChild(td()).textContent = peopleData[idx].createdAt
    })
}

select.addEventListener("change", () => select.blur())
