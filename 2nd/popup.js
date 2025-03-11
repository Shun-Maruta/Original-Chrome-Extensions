document.getElementById("copyTable").addEventListener("click", () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        if (tabs.length === 0) return
        chrome.scripting.executeScript({
            target: { tabId: tabs[0].id },
            function: copyTableData
        })
        window.close()
    })
})

document.getElementById("createAnswer").addEventListener("click", () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        if (tabs.length === 0) return
        chrome.scripting.executeScript({
            target: { tabId: tabs[0].id },
            function: createAnswer
        })
        window.close()
    })
})

const createAnswer = async () => {
    const ticket_id = document.getElementById("ticket_id").textContent.trim()
    const title = document.getElementById("title").textContent.trim()
    const question = document.getElementById("question").textContent.trim()

    console.log(ticket_id, title, question)

    const response = await fetch(chrome.runtime.getURL("template.txt"))
    const template = await response.text()

    const result =  template.replace("{{ticket_id}}", ticket_id).replace("{{title}}", title).replace("{{question}}", question)

    const copyToClipboard = (text) => {
        navigator.clipboard.writeText(text)
            .then(() => alert("テーブルがコピーされました！"))
            .catch(err => alert("コピーに失敗しました: " + err))
    }
    
    setTimeout(() => copyToClipboard(result), 100)
}


const copyTableData = () => {
    const table = document.querySelector('[data-test-id="generic-table-body"]')
    if (!table) {
        alert("テーブルが見つかりません")
        return
    }

    let text = ""
    for (let row of table.querySelectorAll("tr")) {
        let rowData = []
        for (let cell of row.querySelectorAll("td")) {
            rowData.push(cell.innerText.trim())
        }
        text += rowData.join("\t") + "\n"
    }

    const copyToClipboard = (text) => {
        navigator.clipboard.writeText(text)
            .then(() => alert("テーブルがコピーされました！"))
            .catch(err => alert("コピーに失敗しました: " + err))
    }
    
    setTimeout(() => copyToClipboard(text), 100)
}
