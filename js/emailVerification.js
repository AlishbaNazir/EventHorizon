function validateVerificationCode() {
    var verificationCode = document.getElementById("verificationCode").value;

    // Check if the verification code is empty
    if (verificationCode.length === 0) {
        return false;
    }

    // Check if the verification code contains only digits
    if (!/^\d+$/.test(verificationCode)) {
        return false;
    }

    // Check if the verification code has the correct length (assuming it should be 6 digits)
    if (verificationCode.length !== 6) {
        return false;
    }

    // If all checks pass, return true
    return true;
}

document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("verificationCode").addEventListener("input", function () {
        if (validateVerificationCode()) {
            document.getElementById("verifyBtn").disabled = false;
        } else {
            document.getElementById("verifyBtn").disabled = true;
        }
    });
});
