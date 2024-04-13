function validatePassword() {
    var password = document.getElementById("passwordField").value;
    var re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    var existingAlerts = document.querySelectorAll(".alert");

    // Remove existing alerts
    existingAlerts.forEach(function(alert) {
        alert.parentNode.removeChild(alert);
    });

    var alertDiv = document.createElement("div");
    if (!re.test(password)) {
        // alertDiv.className = "alert alert-danger";
        // alertDiv.role = "alert";
        // alertDiv.textContent = "Please choose a strong password!";
        // document.body.insertBefore(alertDiv, document.body.firstChild);
        return false;
    }
    return true;
}

document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("showPassword").addEventListener("change", function () {
        var passwordInput = document.getElementById("passwordField");
        if (passwordInput.type === "password") {
            passwordInput.type = "text";
        } else {
            passwordInput.type = "password";
        }
    });

    document.getElementById("passwordField").addEventListener("input", function() {
        if (validatePassword()) {
            document.getElementById("submitBtn").disabled = false;
        } else {
            document.getElementById("submitBtn").disabled = true;
        }
    });
    
});