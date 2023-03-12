$(document).ready(function() {
    if (localStorage.getItem("accessToken") == null) window.location.href = "/login";
    else RefreshToken();
})

async function RefreshToken()
{
    try {
        tokens = await Refresh(localStorage.getItem("refreshToken"));
        localStorage.setItem("accessToken", tokens.accessToken);
        localStorage.setItem("refreshToken", tokens.refreshToken);
        console.log("Tokens refreshed");
    } catch(e) {
        console.log("Error");
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        window.location.href = "/login";
    }
}
