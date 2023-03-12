async function PerformLogout()
{
    $("#logoutBtn").attr("disabled", true);
    try { 
        await Logout(localStorage.getItem("accessToken"));
    } catch(e) {
        console.log(e.message);
    } finally {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        $("#logoutBtn").attr("disabled", false);
        window.location.href = "/login";
    }
}