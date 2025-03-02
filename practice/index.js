// テーブルのデータを取得する関数
function getTableData() {
    const table = document.getElementById("myTable")
    const rows = table.querySelectorAll("tbody tr") // tbody内のすべての行を取得
    console.log(rows)


    let data = []

    rows.forEach(row => {
        const cells = row.querySelectorAll("td") // 各セルを取得
        let rowData = []
        cells.forEach(cell => rowData.push(cell.textContent.trim())) // セルのテキストを取得
        data.push(rowData)
    })

    console.log(data) // 取得したデータをコンソールに出力
}


// テーブルのデータを取得してクリップボードにコピーする関数
function copyTableData() {
    const table = document.getElementById("myTable")
    const rows = table.querySelectorAll("tbody tr")
    let text = ""

    rows.forEach(row => {
        const cells = row.querySelectorAll("td")
        let rowData = []
        cells.forEach(cell => rowData.push(cell.textContent.trim()))
        text += rowData.join("\t") + "\n" // 各セルをタブ区切り、行は改行
    })

    // クリップボードにコピー
    navigator.clipboard.writeText(text).then(() => {
        alert("テーブルのデータをコピーしました！")
    }).catch(err => {
        console.error("コピーに失敗しました:", err)
    })
}

// ボタンにクリックイベントを追加
document.getElementById("copyButton").addEventListener("click", copyTableData)


// ボタンがクリックされたらデータを取得してコンソールに表示
document.getElementById("logButton").addEventListener("click", getTableData)
