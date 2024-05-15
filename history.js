const history = document.getElementById("history");

// Render history data
function renderHistory() {
  history.innerHTML = "";
  const historyData = JSON.parse(localStorage.getItem("historyData")) || [];
  historyData.forEach((item) => {
    const li = document.createElement("li");
    li.textContent = `${item.term} - ${item.timestamp.toLocaleString()}`;
    history.appendChild(li);
  });
}

// Initialize the history page
function init() {
  renderHistory();
}

init();