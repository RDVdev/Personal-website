// beacon.js

// Function to get the type of the event object
function getEventObjectType(element) {
    if (element.tagName === 'IMG') return 'image';
    if (element.tagName === 'A') return 'link';
    if (element.tagName === 'BUTTON') return 'button';
    if (element.tagName === 'SELECT') return 'drop-down';
    if (element.tagName === 'INPUT') return 'input';
    if (element.tagName === 'TEXTAREA') return 'text-area';
    if (element.classList.contains('dropdown') || element.closest('.dropdown')) return 'drop-down';
    return 'other';
}

// Function to log the event
function logEvent(eventType, element) {
    const timestamp = new Date().toISOString();
    const eventObject = getEventObjectType(element);
    const logEntry = `${timestamp}, ${eventType}, ${eventObject}`;

    // Print log to the console (or send to a server if needed)
    console.log(logEntry);

    // Send log to server (if required)
    // fetch('/log-event', {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify({ log: logEntry })
    // });
}

// Avoid duplicate logs for pointerdown and click
let lastClickTime = 0;

// Capture click events
document.addEventListener('click', (event) => {
    logEvent('click', event.target);
    lastClickTime = Date.now();
});

// Capture pointerdown only if no recent click
document.addEventListener('pointerdown', (event) => {
    if (Date.now() - lastClickTime > 100) {
        logEvent('pointerdown', event.target);
    }
});

// Differentiate hover on dropdown vs other elements
document.addEventListener('mouseover', (event) => {
    const eventObject = getEventObjectType(event.target);
    if (eventObject === 'drop-down') {
        logEvent('pointerdown', event.target);
    } else {
        logEvent('view', event.target);
    }
});

// Capture page views on load
window.addEventListener('load', () => {
    logEvent('view', document.body);
});