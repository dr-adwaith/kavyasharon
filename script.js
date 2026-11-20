const opening = document.querySelector('#opening');
const openButton = document.querySelector('#open-invitation');
const toast = document.querySelector('#toast');

function openInvitation() {
  opening.classList.add('is-open');
  document.body.classList.remove('is-locked');
  window.setTimeout(() => opening.setAttribute('aria-hidden', 'true'), 850);
}

openButton.addEventListener('click', openInvitation);

document.querySelector('.skip-link').addEventListener('click', () => {
  openInvitation();
});

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach((element) => revealObserver.observe(element));

const eventDate = new Date('2026-12-12T11:30:00+05:30');
const countdown = document.querySelector('#countdown');
const today = new Date();
const daysRemaining = Math.ceil((eventDate - today) / 86400000);

if (daysRemaining > 1) {
  countdown.textContent = `${daysRemaining} days until Kavya & Sharon say “I do.”`;
} else if (daysRemaining === 1) {
  countdown.textContent = 'Tomorrow, Kavya & Sharon say “I do.”';
} else if (daysRemaining === 0) {
  countdown.textContent = 'Today is the day - we cannot wait to celebrate with you.';
} else {
  countdown.textContent = 'A beautiful day, held close in memory.';
}

function calendarFile() {
  const content = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'CALSCALE:GREGORIAN',
    'PRODID:-//Kavya and Sharon//Wedding Invitation//EN',
    'BEGIN:VEVENT',
    'UID:kavya-sharon-wedding-20261212@invitation',
    'DTSTAMP:20261120T000000Z',
    'DTSTART;TZID=Asia/Kolkata:20261212T113000',
    'DTEND;TZID=Asia/Kolkata:20261212T120000',
    'SUMMARY:Wedding of Dr. Kavya Sreejith and Sharon Dinesh',
    'LOCATION:Krishnakripa Kalyanamandapam, Near New Bus Stand, Vadakara, Kerala',
    'DESCRIPTION:With the blessings of our families.',
    'END:VEVENT',
    'END:VCALENDAR'
  ].join('\r\n');
  const blob = new Blob([content], { type: 'text/calendar;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = 'kavya-sharon-wedding.ics';
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
  toast.classList.add('is-visible');
  window.setTimeout(() => toast.classList.remove('is-visible'), 3500);
}

document.querySelector('#calendar-button').addEventListener('click', calendarFile);
