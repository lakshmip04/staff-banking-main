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
