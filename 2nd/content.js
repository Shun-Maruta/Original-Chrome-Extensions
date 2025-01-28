chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (request.action === "getTableData") {
        const table = document.getElementById("myTable");  // 特定のテーブルIDを指定

        if (table) {
            const rows = table.querySelectorAll("tr");
            let tableData = [];

            rows.forEach(row => {
                const cells = row.querySelectorAll("td");
                let rowData = [];
                cells.forEach(cell => {
                    rowData.push(cell.innerText.trim());
                });
                if (rowData.length > 0) {
                    tableData.push(rowData.join("\t"));  // タブ区切りで整形
                }
            });

            if (tableData.length > 0) {
                const textToCopy = tableData.join("\n");  // 行ごとに改行を挿入
                alert(textToCopy);
                navigator.clipboard.writeText(textToCopy).then(() => {
                    console.log("クリップボードにコピーしました");
                }).catch(err => {
                    alert("クリップボードへのコピーに失敗しました。", err);
                });
            } else {
                console.log("テーブルデータが空です");
            }
        } else {
            console.log("指定されたテーブルが見つかりません");
        }
    }
});
