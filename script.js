document.getElementById("footballBtn").addEventListener("click", clickFootball);
document.getElementById("upgradeBtn").addEventListener("click", buyUpgrade);
document
  .getElementById("UpgradeBtnTwo")
  .addEventListener("click", buyUpgradeTwo);
document
  .getElementById("resetBtn")
  .addEventListener("click", resetGameProgress);

const stats = {
  totalTouches: 0,
  touchesPerSecond: 1,
  clickValue: 1,
  autoClickers: 0,
};


function updateStats() {
  document.getElementById("totalTouches").innerText = stats.totalTouches;

  document.getElementById("touchesPerSecond").innerText =
    stats.touchesPerSecond;
}

function clickFootball() {
  stats.totalTouches += stats.clickValue;
  updateStats();
}

function buyUpgrade() {
  if (stats.totalTouches >= 10) {
    stats.totalTouches -= 10;
    stats.autoClickers++;
    stats.touchesPerSecond++;
    updateStats();
    localStorage.setItem("stats", JSON.stringify(stats));
  } else {
    alert("You need more touches for this upgrade!");
  }
}

function buyUpgradeTwo() {
  if (stats.totalTouches >= 75) {
    stats.totalTouches -= 75;
    stats.touchesPerSecond += 10;
    updateStats();
    localStorage.setItem("stats", JSON.stringify(stats));
  } else {
    alert("Click Faster!");
  }
}

function resetGameProgress() {
  stats.totalTouches = 0;
  stats.touchesPerSecond = 1;
  stats.clickValue = 1;
  stats.autoClickers = 0;
  updateStats();
  localStorage.removeItem("stats");
}

function autoIncrement() {
  stats.totalTouches  += stats.touchesPerSecond;
  updateStats();
}

window.addEventListener("load", () => {
  const storedStats = localStorage.getItem("stats");
  if (storedStats) {
    Object.assign(stats, JSON.parse(storedStats));
    updateStats();
  }
  setInterval(autoIncrement, 1000);
});