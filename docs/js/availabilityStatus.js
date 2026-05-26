export function initAvailabilityStatus() {
    const Availability = { shortTerm: true, longTerm: false };

    const shortTermEl = document.getElementById('short-term-status');
    const longTermEl = document.getElementById('long-term-status');
    const onlineEl = document.getElementById('online-status');
    if (!shortTermEl || !longTermEl || !onlineEl) return;

    shortTermEl.innerText = Availability.shortTerm ? "YES" : "NO";
    shortTermEl.className = `status-indicator ${Availability.shortTerm ? 'yes' : 'no'}`;

    longTermEl.innerText = Availability.longTerm ? "YES" : "NO";
    longTermEl.className = `status-indicator ${Availability.longTerm ? 'yes' : 'no'}`;

    const now = new Date();
    const utcHours = now.getUTCHours();
    const gmt5Hours = (utcHours + 5) % 24;
    const isOnline = gmt5Hours >= 13 && gmt5Hours < 22;

    onlineEl.innerText = isOnline ? "YES" : "NO";
    onlineEl.className = `status-indicator ${isOnline ? 'yes' : 'no'}`;
}
