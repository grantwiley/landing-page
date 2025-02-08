// Handle URL rewriting for clean URLs
document.addEventListener('DOMContentLoaded', function() {
    // Clean up current URL if needed
    if (window.location.pathname.endsWith('.html')) {
        const cleanUrl = window.location.pathname.replace('.html', '');
        history.replaceState({ url: cleanUrl }, '', cleanUrl);
    }
    // Handle navigation links
    document.querySelectorAll('a').forEach(link => {
        if (link.href.includes('.html')) {
            link.href = link.href.replace('.html', '');
        }
    });

    // Handle form submissions
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            const action = form.getAttribute('action') || '';
            if (action.includes('.html')) {
                form.setAttribute('action', action.replace('.html', ''));
            }
            form.submit();
        });
    });

    // Handle history navigation
    window.addEventListener('popstate', function(e) {
        if (e.state && e.state.url) {
            const cleanUrl = e.state.url.replace('.html', '');
            history.replaceState({ url: cleanUrl }, '', cleanUrl);
        }
    });
});