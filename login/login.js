$(document).ready(function() {
    if (localStorage.getItem("accessToken") !== null)
    {
        window.location.href = "../";
    }
})

async function PerformLogin()
{
    if (!ValidateForm()) return;
    let tokens;
    $("#loginBtn").attr("disabled", true);
    try {
        tokens = await Login($("#emailInput").val(), $("#passwordInput").val());
    } catch(e) {
        if (["400", "401"].includes(e.message)) alert("Неверный адрес электронной почты или пароль");
        else alert("Неизвестная ошибка");
        console.log("Status: " + e.message);
    }
    $("#loginBtn").attr("disabled", false);
    localStorage.setItem("accessToken", tokens.accessToken);
    localStorage.setItem("refreshToken", tokens.refreshToken);
    window.location.href = "../";
}

function ValidateForm()
{
    if (!Validate($("#emailInput"), v => v != "", "Поле не должно быть пустым")) return false;
    if (!Validate($("#emailInput"), v => /^.+\@.+\..+$/.test(v), "Некорректный e-mail")) return false;
    if (!Validate($("#passwordInput"), v => v != "", "Поле не должно быть пустым")) return false;
    return true;
}