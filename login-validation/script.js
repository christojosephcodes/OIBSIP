document.addEventListener("DOMContentLoaded", () => {
    // Tab switching elements
    const loginTab = document.getElementById("toggle-login-tab");
    const regTab = document.getElementById("toggle-reg-tab");
    const loginForm = document.getElementById("login-form");
    const registerForm = document.getElementById("register-form");
    const statusBanner = document.getElementById("status-banner");

    // Email pattern tracking standard RFC compliant profiles
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    // View Switching Logic Engine
    loginTab.addEventListener("click", () => {
        loginTab.classList.add("active");
        regTab.classList.remove("active");
        loginForm.classList.remove("hidden");
        registerForm.classList.add("hidden");
        statusBanner.className = "status-banner hidden";
    });

    regTab.addEventListener("click", () => {
        regTab.classList.add("active");
        loginTab.classList.remove("active");
        registerForm.classList.remove("hidden");
        loginForm.classList.add("hidden");
        statusBanner.className = "status-banner hidden";
    });

    // Helper function handling UI field marking states
    function toggleFieldState(inputElement, isValid) {
        const group = inputElement.parentElement;
        if (isValid) {
            group.classList.remove("invalid");
        } else {
            group.classList.add("invalid");
        }
        return isValid;
    }

    // ================= VALIDATE LOGIN =================
    loginForm.addEventListener("submit", (e) => {
        e.preventDefault();
        statusBanner.className = "status-banner hidden";

        const email = document.getElementById("login-email");
        const pass = document.getElementById("login-password");

        const isEmailOk = toggleFieldState(email, emailRegex.test(email.value.trim()));
        const isPassOk = toggleFieldState(pass, pass.value.length >= 8);

        if (isEmailOk && isPassOk) {
            statusBanner.textContent = "Sign-In successful! Loading workspace dashboard...";
            statusBanner.className = "status-banner success";
            loginForm.reset();
        } else {
            statusBanner.textContent = "Sign-In failed. Correct flagged values.";
            statusBanner.className = "status-banner error";
        }
    });

    // ================= VALIDATE REGISTRATION =================
    registerForm.addEventListener("submit", (e) => {
        e.preventDefault();
        statusBanner.className = "status-banner hidden";

        const name = document.getElementById("reg-name");
        const email = document.getElementById("reg-email");
        const pass = document.getElementById("reg-password");
        const confirm = document.getElementById("reg-confirm");

        const isNameOk = toggleFieldState(name, name.value.trim() !== "");
        const isEmailOk = toggleFieldState(email, emailRegex.test(email.value.trim()));
        const isPassOk = toggleFieldState(pass, pass.value.length >= 8);
        const isConfirmOk = toggleFieldState(confirm, confirm.value === pass.value && confirm.value !== "");

        if (isNameOk && isEmailOk && isPassOk && isConfirmOk) {
            statusBanner.textContent = "Account generated successfully! You can sign-in now.";
            statusBanner.className = "status-banner success";
            registerForm.reset();
        } else {
            statusBanner.textContent = "Registration rejected. Complete registration details.";
            statusBanner.className = "status-banner error";
        }
    });
});
