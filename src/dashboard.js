export function dashboard() {
  const html = `
        <div class="h-16 flex items-center justify-between px-4 border-b border-gray-200">
            <img src="" alt="Logo" class="h-8"/>
            <button id="closeSidebar" class="sm:hidden text-gray-500 hover:text-gray-600">
                <i class="fas fa-times text-xl"></i>
            </button>
        </div>
        <nav class="p-4 space-y-1">
            <a href="index.html" class="flex items-center px-4 py-3 text-sm font-medium text-custom rounded-lg bg-indigo-50">
                <i class="fas fa-home w-5 h-5 mr-3"></i>
                Dashboard
            </a>
            <a href="members.html" class="flex items-center px-4 py-3 text-sm font-medium text-gray-700 rounded-lg hover:bg-gray-50">
                <i class="fas fa-users w-5 h-5 mr-3"></i>
                Members
            </a>
            <a href="newmember.html" class="flex items-center px-4 py-3 text-sm font-medium text-gray-700 rounded-lg hover:bg-gray-50">
                <i class="fas fa-user-plus w-5 h-5 mr-3"></i>
                New Member
            </a>
            <a href="#" class="flex items-center px-4 py-3 text-sm font-medium text-gray-700 rounded-lg hover:bg-gray-50">
                <i class="fas fa-money-bill-wave w-5 h-5 mr-3"></i>
                Payments
            </a>
            <a href="#" class="flex items-center px-4 py-3 text-sm font-medium text-gray-700 rounded-lg hover:bg-gray-50">
                <i class="fas fa-cog w-5 h-5 mr-3"></i>
                Settings
            </a>
        </nav>
    `

  const sidebar = document.querySelector(".js-sidebar")
  if (sidebar) {
    sidebar.innerHTML = html
  } else {
    console.error("Sidebar element not found.")
  }
}
