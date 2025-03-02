(() => {
    console.log("2nd/content.js")
    // `ticket_id` を持つ <h3> 要素を取得
    const ticketElement = document.getElementById("ticket_id")
    if (!ticketElement) console.error("ticket_id が見つかりません")
    if (!ticketElement) return // 要素が存在しない場合は処理しない

    // ボタンを作成
    const button = document.createElement("button")
    button.innerText = "コピー"
    button.style.marginLeft = "10px" // 右側に配置するための余白
    button.style.padding = "5px 10px"
    button.style.cursor = "pointer"

    // ボタンのクリック時に ticket_id の内容をクリップボードにコピー
    button.addEventListener("click", () => {
        const ticketText = ticketElement.innerText.trim() // `#12345` を取得
        navigator.clipboard.writeText(ticketText)
            .then(() => alert("コピーしました: " + ticketText))
            .catch(err => alert("コピーに失敗しました: " + err))
    })

    // `ticketElement` の右側にボタンを挿入
    ticketElement.insertAdjacentElement("afterend", button)
})()
