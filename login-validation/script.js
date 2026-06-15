document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("login-form");
    const emailInput = document.getElementById("email");
    const passwordInput = document.getElementById("password");
    const statusBanner = document.getElementById("status-banner");

    // Regular Expression pattern tracking standard RFC email models
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    // Verification Logic Functions
    function validateEmail() {
        const value = emailInput.value.trim();
        const group = emailInput.parentElement;
        
        if (value === "" || !emailRegex.test(value)) {
            group.classList.add("invalid");
            return false;
        } else {
            group.classList.remove("invalid");
            return true;
        }
    }

    function validatePassword() {
        const value = passwordInput.value;
        const group = passwordInput.parentElement;
        
        if (value.length < 8) {
            group.classList.add("invalid");
            return false;
        } else {
            group.classList.remove("invalid");
            return true;
        }
    }

    // Interactive Real-Time Input Trackers
    emailInput.addEventListener("input", validateEmail);
    passwordInput.addEventListener("input", validatePassword);

    // Submission Interception System
    form.addEventListener("submit", (e) => {
        e.preventDefault();

        // Run both checks explicitly
        const isEmailValid = validateEmail();
        const isPasswordValid = validatePassword();

        // Clear top status display banner state resets
        statusBanner.className = "status-banner hidden";

        if (isEmailValid && isPasswordValid) {
            // Success State Transition
            statusBanner.textContent = "Secure connection established! Logging in...";
            statusBanner.classList.remove("hidden");
            statusBanner.classList.add("success");
            
            // Clear inputs for demonstration security purposes
            emailInput.value = "";
            passwordInput.value = "";
        } else {
            // General Error Banner Injection
            statusBanner.textContent = "Authentication rejected. Fix errors below.";
            statusBanner.classList.remove("hidden");
            statusBanner.classList.add("error");
        }
    });
});
