document.getElementById("openSidebar").addEventListener("click", () => {
  const sidebar = document.getElementById("sidebar")
  const mainContent = document.getElementById("mainContent")
  const header = document.getElementById("header")

  sidebar.classList.remove("-translate-x-full")
  mainContent.classList.remove("ml-0")
  mainContent.classList.add("sm:ml-64")
  header.classList.remove("left-0")
  header.classList.add("left-64")
})

document.getElementById("closeSidebar").addEventListener("click", () => {
  const sidebar = document.getElementById("sidebar")
  const mainContent = document.getElementById("mainContent")
  const header = document.getElementById("header")

  sidebar.classList.add("-translate-x-full")
  mainContent.classList.remove("sm:ml-64")
  mainContent.classList.add("ml-0")
  header.classList.remove("left-64")
  header.classList.add("left-0")
})

function startTimer(duration, display) {
  let timer = duration,
    minutes,
    seconds
  const countdown = setInterval(() => {
    minutes = Number.parseInt(timer / 60, 10)
    seconds = Number.parseInt(timer % 60, 10)
    minutes = minutes < 10 ? "0" + minutes : minutes
    seconds = seconds < 10 ? "0" + seconds : seconds
    display.textContent = minutes + ":" + seconds
    if (--timer < 0) {
      clearInterval(countdown)
      display.textContent = "Session Expired"
    }
  }, 1000)
}

window.onload = () => {
  const tenMinutes = 60 * 10,
    display = document.querySelector("#timer")
  startTimer(tenMinutes, display)
}
