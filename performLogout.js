async function PerformLogout()
{
    try { 
        await Logout(localStorage.getItem("accessToken"));
    } catch(e) {
        console.log(e.message);
    } finally {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        window.location.href = "/login";
    }
}