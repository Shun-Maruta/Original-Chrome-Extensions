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
