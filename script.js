function navigateTo(pageId, path, btnElement) {
    // If hosted on a real server, use clean URLs. If testing locally via file://, use hash to prevent breaking.
    if (window.location.protocol !== 'file:') {
        window.history.pushState({ path: path }, '', path);
    } else {
        window.location.hash = pageId === 'home' ? '' : pageId;
    }

    // Hide all sections
    document.querySelectorAll('.page-section').forEach(section => {
        section.classList.remove('active');
    });

    // Remove active class from all buttons
    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.classList.remove('active');
    });

    // Show target section
    document.getElementById(pageId).classList.add('active');

    // Highlight clicked button safely
    if (btnElement) {
        btnElement.classList.add('active');
    }
}

// Handle browser back/forward buttons or local hash changes
window.onpopstate = function() {
    handleRouting();
};

window.onload = function() {
    handleRouting();
};

function handleRouting() {
    const path = window.location.pathname;
    const hash = window.location.hash.replace('#', '');

    if (hash === 'shop' || path === '/shop') {
        activatePage('shop', 'shop-btn');
    } else if (hash === 'status' || path === '/status') {
        activatePage('status', 'status-btn');
    } else {
        activatePage('home', 'home-btn');
    }
}

function activatePage(pageId, btnId) {
    document.querySelectorAll('.page-section').forEach(section => {
        section.classList.remove('active');
    });
    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    
    const targetSection = document.getElementById(pageId);
    const targetBtn = document.getElementById(btnId);

    if (targetSection) targetSection.classList.add('active');
    if (targetBtn) targetBtn.classList.add('active');
}