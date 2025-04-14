function startLogger() {
    if (window.loggerStarted) return;
    window.loggerStarted = true;

    alert("Event Logger Activated! Open the console to see click and view logs.");

    function getTimestamp() {
        return new Date().toLocaleString();
    }

    function getElementType(el) {
        if (!el) return 'unknown';

        const dropdownHeader = el.closest('h2[onclick]');
        if (dropdownHeader && dropdownHeader.innerText.toLowerCase().includes('project')) {
            return 'dropdown';
        }

        if (el.tagName === 'IMG') return 'image';
        if (el.tagName === 'A') return 'link';
        if (el.tagName === 'P') return 'paragraph';
        if (['H1', 'H2', 'H3'].includes(el.tagName)) return 'heading';
        if (['UL'].includes(el.tagName)) return 'list';
        if (el.tagName === 'SECTION') return 'section';
        return el.tagName.toLowerCase();
    }

    document.addEventListener('click', function (e) {
        const elementType = getElementType(e.target);
        const timestamp = getTimestamp();
        console.log(`[${timestamp}] | click | ${elementType}`);
    });

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const elementType = getElementType(entry.target);
                const timestamp = getTimestamp();
                console.log(`[${timestamp}] | view | ${elementType}`);
            }
        });
    }, {
        threshold: 0.1
    });

    document.querySelectorAll('section, img, p, a, h1, h2, h3, ul, li, button').forEach(el => {
        observer.observe(el);
    });

    console.log("Logger activated");
}

document.addEventListener('DOMContentLoaded', () => {
    const loggerLink = document.getElementById('start-logger');
    if (loggerLink) {
        loggerLink.addEventListener('click', function (e) {
            e.preventDefault();
            startLogger();
        });
    }
});
