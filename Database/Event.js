const { getDb } = require('./database');

module.exports = class Events {
    constructor(Name, Email, EventType, Date, Message) {
        this.Name = Name;
        this.Email = Email;
        this.EventType = EventType;
        this.Date = Date;
        this.Message = Message;
    }

    save() {
        const db = getDb(); 
        return db.collection('Events').insertOne(this);
    }
};
