const searchForm = document.getElementById("searchForm");
const searchInput = document.getElementById("searchInput");
const welcomeCardContainer = document.getElementById("welcomeCardContainer");
const themeToggle = document.getElementById("themeToggle");

const theme = localStorage.getItem("theme") || "light";
//tạo function renderWelcome từ welcome-card trước
function renderWelcome() {
  welcomeCardContainer.innerHTML = `
        <div class="welcome-card" id="welcomeCard">
                        <svg class="welcome-icon" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                            <path
                                d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z">
                            </path>
                        </svg>
                        <h2>Welcome to GitHub User Search</h2>
                        <p>Enter a GitHub username above to discover detailed profile information, including
                            repositories,
                            followers, and
                            more.</p>
                    </div>;
        `;
}

//tạo function loading từ loading-message trước
function renderLoading() {
  welcomeCardContainer.innerHTML = `
        <div id="loadingMessageContainer" class="loading-message-container">
                        <div id="loadingMessage" class="loading-message"></div>
                        <p id="loadingText">Searching for user...</p>

                    </div>
        `;
}

// tạo function lỗi từ error-message trước
function renderError() {
  welcomeCardContainer.innerHTML = `
        <div id="errorMessage" class="error-message-container">
                    <div class="error-message">
                        <span id="errorText"> User not found</span>
                    </div>
                </div>
        `;
}

// tạo user card từ user-card-container trước
function renderUser(user) {
  welcomeCardContainer.innerHTML = `
    <div class="user-card-container">
      <div class="user-profile">
        <div class="user-info">

          <div class="user-avatar">
            <img src="${user.avatar_url}" alt="${user.login}">
          </div>

          <div class="user-desc">
            <h2>${user.name || user.login}</h2>
            <a href="${user.html_url}" target="_blank" class="user-username">
              @${user.login}
            </a>

            <p class="user-bio" >${user.bio || "This profile has no bio"}</p>

            <div class="user-stats">
              <div class="user-stat">
                <span class="number">${user.public_repos}</span>
                Repos
              </div>
              <div class="user-stat">
                <span class="number">${user.followers}</span>
                Followers
              </div>
              <div class="user-stat">
                <span class="number">${user.following}</span>
                Following
              </div>
            </div>

            <div class="user-meta">
              <div>Joined ${new Date(user.created_at).toDateString()}</div>
              ${user.location ? `<div>${user.location}</div>` : ""}
              ${
                user.blog
                  ? `<a href="${user.blog}" target="_blank">${user.blog}</a>`
                  : ""
              }
              ${user.company ? `<div>${user.company}</div>` : ""}

            </div>
          </div>

        </div>
      </div>
    </div>
    `;
}

// lấy api user từ github
async function fetchUser(username) {
  renderLoading();
  try {
    const response = await fetch(`https://api.github.com/users/${username}`);
    if (!response.ok) {
      renderError();
      return;
    }

    const data = await response.json();
    renderUser(data);
  } catch (error) {
    renderError();
  }
}

//form submit
searchForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const username = searchInput.value.trim();
  if (!username) return;

  fetchUser(username);
});

renderWelcome();

themeToggle.addEventListener("click", () => {
  const currentTheme = localStorage.getItem("theme");
  if (currentTheme === "light") {
    localStorage.setItem("theme", "dark");
    document.body.classList.add("dark");
    //themeToggle have svg icon change to moon
    themeToggle.innerHTML = `
    <svg class="moon-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
    </svg>
    `;
  } else {
    localStorage.setItem("theme", "light");
    document.body.classList.remove("dark");
    themeToggle.innerHTML = `
    <svg class="sun-icon"  width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <circle cx="12" cy="12" r="5"></circle>
        <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42">
        </path>
    </svg>
    `;
  }
});

if (theme === "dark") {
  document.body.classList.add("dark");

  themeToggle.innerHTML = `
    <svg class="moon-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
    </svg>
    `;
} else {
  document.body.classList.remove("dark");
  // sun-icon have style    transform: rotate(-90deg) scale(0);
  themeToggle.innerHTML = `
    <svg class="sun-icon"  width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <circle cx="12" cy="12" r="5"></circle>
        <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42">
        </path>
    </svg>
    `;
    
}
