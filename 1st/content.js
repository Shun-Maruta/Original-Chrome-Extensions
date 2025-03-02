chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "read_table") {
        const table = document.querySelector('[data-test-id="generic-table-body"]');
        if (table) {
            // テーブルデータを取得する
            const rows = Array.from(table.rows).map(row => {
                const cells = Array.from(row.cells).map(cell => cell.textContent.trim());
                return cells;
            });

            // 取得したテーブルデータを返す
            sendResponse({ tableData: rows });
        } else {
            sendResponse({ error: "テーブルが見つかりません。" });
        }
    }
    // 必ず返す
    return true;
});
