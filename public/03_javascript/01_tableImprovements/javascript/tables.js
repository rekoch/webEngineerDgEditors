document.querySelectorAll("[data-table-name]").forEach((element) => {
  const tableType = element.getAttribute("data-table-name");
  if (tableType === "benchmark") {
    const columns = element.querySelectorAll("[data-table-column]");
    let columnWidest = 0;
    columns.forEach((col) => {
      const colWidth = Number(col.innerText);
      if (colWidth > columnWidest) {
        columnWidest = colWidth;
      }
    });
    columns.forEach((col) => {
      const colWidth = col.innerText;
      const width = 100 / columnWidest * colWidth;
      col.style.width = `${width}%`;
    });
  }
});
