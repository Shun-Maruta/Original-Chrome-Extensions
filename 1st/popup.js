let tableData = [] // テーブルデータを格納する変数

// 「テーブルを読み取り、コピー」ボタンのイベントリスナー
document.getElementById("processTable").addEventListener("click", () => {
	chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
		chrome.tabs.sendMessage(tabs[0].id, { action: "read_table" }, (response) => {
			if (chrome.runtime.lastError) {
				console.error("エラー:", chrome.runtime.lastError.message)
				alert("テーブルデータを読み取れませんでした。")
				return
			}

			// 受け取ったデータを表示
			if (response.tableData) {
				tableData = response.tableData
				document.getElementById("output").textContent = JSON.stringify(response.tableData, null, 2)

				// テーブルデータを適切な形式で文字列に変換
				const clipboardText = tableData
					.map(row => row.join(" "))  // 各行をスペースで区切る
					.join("\n")  // 行と行を改行で区切る

				// クリップボードにコピー
				navigator.clipboard.writeText(clipboardText).then(() => {
					alert("テーブルデータがクリップボードにコピーされました！")
				}).catch((error) => {
					console.error("コピーに失敗:", error)
					alert("クリップボードへのコピーに失敗しました。")
				})
			} else {
				document.getElementById("output").textContent = response.error
			}
		})
	})
})
