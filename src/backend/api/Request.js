const hash = window.location.hash.substring(1);
const params = new URLSearchParams(hash);
const accessToken = params.get("access_token");

if (accessToken) {
    // Save token in local storage or pass it to your main app
    localStorage.setItem("fitbit_access_token", accessToken);
    window.location.href = "index.html";  // Redirect to main page
} else {
    document.body.innerHTML = "<h2>Failed to retrieve access token.</h2>";
}