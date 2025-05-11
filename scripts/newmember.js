function startCountdown() {
  let time = 1800
  const countdownEl = document.getElementById("countdown")
  const interval = setInterval(() => {
    time--
    const minutes = Math.floor(time / 60)
    const seconds = time % 60
    countdownEl.textContent = `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`
    if (time <= 0) {
      clearInterval(interval)
      alert("Session expired!")
      window.location.href = "/login"
    }
  }, 1000)
}

startCountdown()

document.addEventListener("DOMContentLoaded", () => {
  const openSidebar = document.getElementById("openSidebar")
  const closeSidebar = document.getElementById("closeSidebar")
  const sidebar = document.getElementById("sidebar")
  const mainContent = document.querySelector(".flex-1")
  const header = document.querySelector("header")

  openSidebar.addEventListener("click", () => {
    sidebar.classList.remove("-translate-x-full")
    mainContent.classList.remove("ml-0")
    mainContent.classList.add("sm:ml-64")
    header.classList.remove("left-0")
    header.classList.add("left-64")
  })

  closeSidebar.addEventListener("click", () => {
    sidebar.classList.add("-translate-x-full")
    mainContent.classList.remove("sm:ml-64")
    mainContent.classList.add("ml-0")
    header.classList.remove("left-64")
    header.classList.add("left-0")
  })

  const registrationForm = document.getElementById("registrationForm")
  const dateInput = registrationForm.querySelector('input[type="date"][disabled]')
  dateInput.value = new Date().toISOString().split("T")[0]

  registrationForm.addEventListener("submit", (e) => {
    e.preventDefault()
    alert("Form submitted successfully!")
  })

  const aadharInput = registrationForm.querySelector('input[pattern="[0-9]{4}-[0-9]{4}-[0-9]{4}"]')
  aadharInput.addEventListener("input", (e) => {
    let value = e.target.value.replace(/\D/g, "")
    if (value.length > 12) value = value.slice(0, 12)
    if (value.length >= 4) value = value.slice(0, 4) + "-" + value.slice(4)
    if (value.length >= 9) value = value.slice(0, 9) + "-" + value.slice(9)
    e.target.value = value
  })
})
