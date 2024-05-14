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
        alertDiv.className = "alert alert-danger";
        alertDiv.role = "alert";
        alertDiv.textContent = "Please choose a strong password!";
        document.body.insertBefore(alertDiv, document.body.firstChild);
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

    //phone no must be equal to 11 digits

    document.getElementById("numberField").addEventListener("input", function() {
        var phone = document.getElementById("numberField").value;
        var re = /^\d{11}$/;
        var existingAlerts = document.querySelectorAll(".alert");

        // Remove existing alerts
        existingAlerts.forEach(function(alert) {
            alert.parentNode.removeChild(alert);
        });

        var alertDiv = document.createElement("div");
        if (!re.test(phone)) {
            alertDiv.className = "alert alert-danger";
            alertDiv.role = "alert";
            alertDiv.textContent = "Please enter a valid phone number!";
            document.body.insertBefore(alertDiv, document.body.firstChild);
            return false;
        }
        return true;
    });
    
    //username must contain alphabets not only digits
    document.getElementById("username").addEventListener("input", function() {
        var username = document.getElementById("username").value;
        var re = /^[a-zA-Z]+$/;
        var existingAlerts = document.querySelectorAll(".alert");

        // Remove existing alerts
        existingAlerts.forEach(function(alert) {
            alert.parentNode.removeChild(alert);
        });

        var alertDiv = document.createElement("div");
        if (!re.test(username)) {
            alertDiv.className = "alert alert-danger";
            alertDiv.role = "alert";
            alertDiv.textContent = "Please enter a valid username!";
            document.body.insertBefore(alertDiv, document.body.firstChild);
            return false;
        }
        return true;
    });

    //email must contain the valid format

    document.getElementById("emailField").addEventListener("input", function() {
        var email = document.getElementById("emailField").value;
        var re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        var existingAlerts = document.querySelectorAll(".alert");

        // Remove existing alerts
        existingAlerts.forEach(function(alert) {
            alert.parentNode.removeChild(alert);
        });

        var alertDiv = document.createElement("div");
        if (!re.test(email)) {
            alertDiv.className = "alert alert-danger";
            alertDiv.role = "alert";
            alertDiv.textContent = "Please enter a valid email!";
            document.body.insertBefore(alertDiv, document.body.firstChild);
            return false;
        }
        return true;
    });



});