const { getDb } = require('./database');

module.exports = class Event {
    constructor(name, email, eventType, date, message) {
        this.name = name;
        this.email = email;
        this.eventType = eventType;
        this.date = date;
        this.message = message;
    }

    save() {
        const db = getDb();
        return db.collection('Bookings').insertOne(this);
    }
};
