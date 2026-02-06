const eventLog = document.getElementById('event-log');
const clearBtn = document.getElementById('clear-log');
const btn = document.getElementById('btn');
const box = document.getElementById('box');
const box2 = document.getElementById('box-2');
function logEvent(eventType, elementId, phase) {
  const timestamp = new Date().toLocaleTimeString();
  const logEntry = document.createElement('div');
  logEntry.className = 'log-entry';
  logEntry.textContent = `[${timestamp}] ${eventType} on #${elementId} (${phase})`;
  eventLog.appendChild(logEntry);
  eventLog.scrollTop = eventLog.scrollHeight;
}
clearBtn.addEventListener('click', () => {
  eventLog.innerHTML = '';
});
const elements = [
  { element: btn, id: 'btn' },
  { element: box2, id: 'box-2' },
  { element: box, id: 'box' }
];
elements.forEach(({ element, id }) => {
  element.addEventListener('click', (e) => {
    logEvent('click', id, 'capturing');
  }, true);
  element.addEventListener('click', (e) => {
    logEvent('click', id, 'bubbling');
  }, false);
});
