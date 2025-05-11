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

// Fetch members from MongoDB API
async function fetchMembers() {
  try {
    const response = await fetch("/api/members")
    if (!response.ok) {
      throw new Error("Failed to fetch members")
    }
    const members = await response.json()
    displayMembers(members)
  } catch (error) {
    console.error("Error fetching members:", error)
  }
}

// Display members in the UI
function displayMembers(members) {
  const membersList = document.getElementById("membersList")
  if (!membersList) return

  membersList.innerHTML = ""

  if (members.length === 0) {
    membersList.innerHTML = '<tr><td colspan="5" class="text-center py-4">No members found</td></tr>'
    return
  }

  members.forEach((member) => {
    const row = document.createElement("tr")
    row.innerHTML = `
            <td class="px-6 py-4 whitespace-nowrap">${member.memberID}</td>
            <td class="px-6 py-4 whitespace-nowrap">${member.name}</td>
            <td class="px-6 py-4 whitespace-nowrap">${member.phoneNumber}</td>
            <td class="px-6 py-4 whitespace-nowrap">${member.email}</td>
            <td class="px-6 py-4 whitespace-nowrap">
                <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded text-xs view-details" 
                        data-member-id="${member.memberID}">
                    View Details
                </button>
            </td>
        `
    membersList.appendChild(row)
  })

  // Add event listeners to view detail buttons
  document.querySelectorAll(".view-details").forEach((button) => {
    button.addEventListener("click", function () {
      const memberId = this.getAttribute("data-member-id")
      showPersonalDetails(memberId)
    })
  })
}

function showPersonalDetails(memberId) {
  // Fetch member details from API
  fetch(`/api/members/${memberId}`)
    .then((response) => response.json())
    .then((member) => {
      document.getElementById("personalDetails").classList.remove("hidden")
      // Populate member details
      // (Add code to populate member details in the UI)
    })
    .catch((error) => console.error("Error fetching member details:", error))
}

function fetchGuarantor() {
  document.getElementById("guarantorData").classList.remove("hidden")
}

document.getElementById("applyLoanButton").addEventListener("click", () => {
  document.getElementById("loanApplication").classList.remove("hidden")
})

// Load members when page loads
document.addEventListener("DOMContentLoaded", fetchMembers)
