document.addEventListener('DOMContentLoaded', function () {
  const calendarEl = document.getElementById('calendar');

  const events = [
    {
      id: 1,
      title: 'Sunday Service',
      start: '2025-07-06',
      flyer: 'images/flyers/sunday.jpg',
      description: 'Main Worship Service starts at 9:00 AM',
      fullDetails: 'Join us for an uplifting time of worship. Dress code: white. Pastor Joseph will be ministering.'
    },
    {
      id: 2,
      title: 'Youth Prayer Night',
      start: '2025-07-12',
      flyer: 'images/flyers/youth-night.jpg',
      description: 'Overnight vigil with youth worship team – 8:00 PM',
      fullDetails: 'Powerful night of fire and revival. Come fasting. Guest: Minister Praise.'
    },
    {
      id: 3,
      title: 'Get Ready for Change - Day 1',
      start: '2025-07-16',
      flyer: 'images/flyers/get-ready.jpg',
      description: 'Evening event with Minister Vanessa Gyamfi',
      fullDetails: 'Isaiah 51:11 – Joy shall be upon your head! Time: 6:30PM. Venue: Atico Junction.'
    }
  ];

  const calendar = new FullCalendar.Calendar(calendarEl, {
    initialView: 'dayGridMonth',
    height: 'auto',
    events: events.map(evt => ({
      id: evt.id,
      title: evt.title,
      start: evt.start,
      extendedProps: evt
    })),
    eventClick: function (info) {
      const eventId = info.event.id;
      window.location.href = `event-details.html?id=${eventId}`;
    }
  });

  calendar.render();
});
