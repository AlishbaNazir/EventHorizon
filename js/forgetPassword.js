// Toggle password visibility
document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("showPassword").addEventListener("change", function () {
    var passwordInput = document.getElementById("password");
    if (passwordInput.type === "password") {
        passwordInput.type = "text";
    } else {
        passwordInput.type = "password";
    }
});
});