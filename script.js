// Show/hide password functionality
document.getElementById("show-password").addEventListener("change", function() {
    const passwordField = document.getElementById("password");
    passwordField.type = this.checked ? "text" : "password"; // Toggle between text and password
});

document.getElementById("password-form").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent the default form submission

    const website = document.getElementById("website").value;
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    if (username && password && website) {
        const passwordData = {
            username: username,
            password: password
        };

        // Store the password data as a JSON string
        localStorage.setItem(website, JSON.stringify(passwordData));

        // Clear the input fields
        document.getElementById("website").value = '';
        document.getElementById("username").value = '';
        document.getElementById("password").value = '';

        displayPasswords();
    }
});

function displayPasswords() {
    const passwordTableBody = document.querySelector("#password-table tbody");
    passwordTableBody.innerHTML = '';

    for (let i = 0; i < localStorage.length; i++) { // Corrected loop condition
        const website = localStorage.key(i);
        const passwordData = JSON.parse(localStorage.getItem(website));

        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${website}</td>
            <td>${passwordData.username}</td>
            <td class="password-cell">
                        <input type="password" value="${passwordData.password}" disabled />
                        <input type="checkbox" onchange="togglePasswordVisibility(this)" />
                    </td>
        `;

        passwordTableBody.appendChild(row);
    }
}
function togglePasswordVisibility(checkbox) {
    const passwordField = checkbox.closest("tr").querySelector("td.password-cell input[type='password']");
    const inputType = passwordField.type === "password" ? "text" : "password"; // Toggle between text and password
    passwordField.type = inputType;
}

window.onload = displayPasswords;
