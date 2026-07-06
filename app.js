// Handles shifting between Top Tabs (Sign In / Registration)
function showView(view) {
    const loginView = document.getElementById('login-view');
    const registerView = document.getElementById('register-view');
    const tabLogin = document.getElementById('tab-login');
    const tabRegister = document.getElementById('tab-register');

    if (view === 'login') {
        loginView.classList.remove('hidden');
        registerView.classList.add('hidden');
        tabLogin.classList.add('active');
        tabRegister.classList.remove('active');
    } else {
        registerView.classList.remove('hidden');
        loginView.classList.add('hidden');
        tabRegister.classList.add('active');
        tabLogin.classList.remove('active');
    }
}

// Handles switching inside Sign In Tab (Student vs Staff Form)
function switchLoginRole(role) {
    const studentForm = document.getElementById('student-login-form');
    const staffForm = document.getElementById('staff-login-form');
    const btnStudent = document.getElementById('role-student');
    const btnStaff = document.getElementById('role-staff');

    if (role === 'student') {
        studentForm.classList.remove('hidden');
        staffForm.classList.add('hidden');
        btnStudent.classList.add('active');
        btnStaff.classList.remove('active');
    } else {
        staffForm.classList.remove('hidden');
        studentForm.classList.add('hidden');
        btnStaff.classList.add('active');
        btnStudent.classList.remove('active');
    }
}

// Dynamic Department field visibility check
function checkClassDepartment(selectedClass) {
    const deptWrapper = document.getElementById('department-wrapper');
    const deptSelect = document.getElementById('reg-dept');

    // If selected class starts with SS (SS1, SS2, SS3)
    if (selectedClass.startsWith('SS')) {
        deptWrapper.classList.remove('hidden');
        deptSelect.setAttribute('required', 'required');
    } else {
        deptWrapper.classList.add('hidden');
        deptSelect.removeAttribute('required');
        deptSelect.value = ""; // clear choice if changed back to JSS
    }
}

// Front-end execution checks for student login inputs
function handleStudentLogin(event) {
    event.preventDefault();
    const studentId = document.getElementById('stud-id').value.trim();
    const studentPass = document.getElementById('stud-pass').value;

    if (!studentId.toUpperCase().startsWith('Z')) {
        alert("Verification Failure: Admission Numbers must begin with prefix letter 'Z'.");
        return false;
    }
    if (studentPass !== studentPass.toUpperCase()) {
        alert("Format Constraint: Your password surname verification must be typed completely in CAPITAL LETTERS.");
        return false;
    }

    alert("Connecting securely with system registry databases...");
}

// Front-end execution checks for staff login inputs
function handleStaffLogin(event) {
    event.preventDefault();
    alert("Authenticating system credentials through the private directory...");
}

// Handles the student application sign-up form
function handleStudentRegistration(event) {
    event.preventDefault();
    const studentName = document.getElementById('reg-name').value;
    alert("Application Received! Welcome, " + studentName + ". Your request has been queued waiting for review and approval inside the Private Administration Terminal.");
}