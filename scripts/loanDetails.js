document.getElementById("openSidebar").addEventListener("click", () => {
  const sidebar = document.getElementById("sidebar")
  const mainContent = document.getElementById("mainContent")

  sidebar.classList.remove("-translate-x-full")
  mainContent.classList.remove("ml-0")
  mainContent.classList.add("sm:ml-64")
})

document.getElementById("closeSidebar").addEventListener("click", () => {
  const sidebar = document.getElementById("sidebar")
  const mainContent = document.getElementById("mainContent")

  sidebar.classList.add("-translate-x-full")
  mainContent.classList.remove("sm:ml-64")
  mainContent.classList.add("ml-0")
})

function addExtraCharge() {
  const chargeType = prompt("Enter charge type:")
  const amount = prompt("Enter amount:")
  if (chargeType && amount) {
    const chargesList = document.getElementById("charges-list")
    const newCharge = document.createElement("div")
    newCharge.className = "flex justify-between"
    newCharge.innerHTML = `<span class='text-sm text-gray-500'>${chargeType}</span><span class='text-sm font-medium text-gray-900'>Rs.${amount}</span>`
    chargesList.appendChild(newCharge)
    updateTotalCharges()
  }
}

function updateTotalCharges() {
  // Implementation for updating total charges
}
