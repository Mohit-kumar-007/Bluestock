// Certificate database - add more entries as needed
const certificateDatabase = {
    "BSTFEL299": {
        name: "ANSHU GIRI",
        date: "2026-05-01",
        role: "SDE Intern",
        duration: "24 MAR to 30 APR",
        remark: "Successfully Completed"
    }
};

// Verify document function
function verifyDocument() {
    const input = document.getElementById('docs-id');
    const docId = input.value.trim().toUpperCase();

    if (!docId) {
        input.classList.add('is-invalid');
        input.focus();
        setTimeout(() => input.classList.remove('is-invalid'), 2000);
        return;
    }

    // Show loading overlay
    showLoading();

    // Simulate backend verification delay
    setTimeout(() => {
        hideLoading();

        if (certificateDatabase[docId]) {
            showSuccess(certificateDatabase[docId]);
        } else {
            showError();
        }
    }, 2000);
}

// Show loading overlay with progress animation
function showLoading() {
    const overlay = document.getElementById('loading-overlay');
    const progressBar = document.getElementById('loading-progress');
    overlay.classList.add('active');

    let progress = 0;
    const interval = setInterval(() => {
        progress += Math.random() * 30 + 10;
        if (progress > 95) progress = 95;
        progressBar.style.width = Math.round(progress) + '%';
        progressBar.textContent = Math.round(progress) + '%';

        if (progress >= 95) {
            clearInterval(interval);
        }
    }, 400);

    // Store interval ID to clear later
    overlay.dataset.intervalId = interval;
}

// Hide loading overlay
function hideLoading() {
    const overlay = document.getElementById('loading-overlay');
    const progressBar = document.getElementById('loading-progress');
    const intervalId = overlay.dataset.intervalId;

    if (intervalId) clearInterval(parseInt(intervalId));

    progressBar.style.width = '100%';
    progressBar.textContent = '100%';

    setTimeout(() => {
        overlay.classList.remove('active');
        progressBar.style.width = '0%';
        progressBar.textContent = '0%';
    }, 300);
}

// Show success modal with certificate details
function showSuccess(data) {
    document.getElementById('result-name').textContent = data.name;
    document.getElementById('result-date').textContent = data.date;
    document.getElementById('result-role').textContent = data.role;
    document.getElementById('result-duration').textContent = data.duration;
    document.getElementById('result-remark').textContent = data.remark;

    const modal = new bootstrap.Modal(document.getElementById('successModal'));
    modal.show();
}

// Show error modal
function showError() {
    const modal = new bootstrap.Modal(document.getElementById('errorModal'));
    modal.show();
}

// Close toast notification
function closeToast() {
    const toast = document.getElementById('toast-notification');
    toast.classList.add('hidden');
}

// Allow Enter key to trigger verification
document.addEventListener('DOMContentLoaded', function () {
    const input = document.getElementById('docs-id');
    if (input) {
        input.addEventListener('keypress', function (e) {
            if (e.key === 'Enter') {
                e.preventDefault();
                verifyDocument();
            }
        });
    }

    // Auto-hide toast after 8 seconds
    setTimeout(() => {
        const toast = document.getElementById('toast-notification');
        if (toast && !toast.classList.contains('hidden')) {
            toast.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            toast.style.opacity = '0';
            toast.style.transform = 'translateX(-100%)';
            setTimeout(() => toast.classList.add('hidden'), 500);
        }
    }, 8000);
});
