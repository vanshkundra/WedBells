const { getDb } = require('./database');

module.exports = class Event {
  constructor(name, email, eventType, date, message) {
    this.name = name;
    this.email = email;
    this.eventType = eventType;

    // ✅ Always store date as a string: "YYYY-MM-DD"
    const d = new Date(date);
    const yyyy = d.getFullYear();
    const mm = String(d.getMonth() + 1).padStart(2, '0');
    const dd = String(d.getDate()).padStart(2, '0');
    this.date = `${yyyy}-${mm}-${dd}`;

    this.message = message;
  }

  save() {
    const db = getDb();
    return db.collection('Bookings').insertOne(this);
  }
};
