document.querySelectorAll("[data-table-name]").forEach((element) => {
  const tableType = element.getAttribute("data-table-name");
  if (tableType === "benchmark") {
    const columns = element.querySelectorAll("[data-table-column]");

    // working but not optimized solution
    let columnWidest = 0;
    columns.forEach((col) => {
      const colWidth = Number(col.innerText);
      if (colWidth > columnWidest) {
        columnWidest = colWidth;
      }
    });
    columns.forEach((col) => {
      const colWidth = col.innerText;
      const width = (100 / columnWidest) * colWidth;
      col.style.width = `${width}%`;
    });

    // optimized solution but also not easy to understand on first glance
    /*     const maxWidth = Math.max(
      ...Array.from(columns, (col) => Number(col.innerText))
    );
    columns.forEach((col) => {
      col.style.width = `${(100 * Number(col.innerText)) / maxWidth}%`;
    });
 */
  }
});
