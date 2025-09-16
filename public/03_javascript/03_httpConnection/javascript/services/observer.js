// Event-Typen Enum für typsichere Events
export const ObserverEvents = Object.freeze({
    USER_ID_CHANGED: 'USER_ID_CHANGED',
    BLOG_PAGE_ID_CHANGED: 'BLOG_PAGE_ID_CHANGED',
    LIKE_COUNT_CHANGED: 'LIKE_COUNT_CHANGED',
});

export class Observer {
    constructor() {
        this.subscribers = {};
        this.values = {};
        this.allowedEvents = new Set(Object.values(ObserverEvents));
    }

    // Typsichere Event-Subscription
    subscribe(eventType, callback) {
        this._validateEventType(eventType);
        
        if (!this.subscribers[eventType]) {
            this.subscribers[eventType] = [];
        }
        
        this.subscribers[eventType].push(callback);
        
        // Unsubscribe-Funktion zurückgeben
        return () => {
            this.subscribers[eventType] = this.subscribers[eventType].filter(sub => sub !== callback);
        };
    }

    // Event mit Daten auslösen
    emit(eventType, data = null) {
        this._validateEventType(eventType);
        
        if (this.subscribers[eventType]) {
            this.subscribers[eventType].forEach(callback => {
                try {
                    callback(data, eventType);
                } catch (error) {
                    console.error(`Error in observer callback for ${eventType}:`, error);
                }
            });
        }
    }

    // Observable Property definieren (alte Funktionalität beibehalten)
    defineObservableProperty(key, initialValue, eventType = null) {
        this.values[key] = initialValue;
        
        Object.defineProperty(this, key, {
            get: () => this.values[key],
            set: (newValue) => {
                const oldValue = this.values[key];
                this.values[key] = newValue;
                
                // Falls ein Event-Type definiert ist, diesen verwenden
                if (eventType) {
                    this.emit(eventType, { key, newValue, oldValue });
                }
            },
            enumerable: true,
            configurable: true
        });
    }

    // Event-Type validieren
    _validateEventType(eventType) {
        if (!this.allowedEvents.has(eventType)) {
            throw new Error(
                `Invalid event type: "${eventType}". Allowed events: ${Array.from(this.allowedEvents).join(', ')}`
            );
        }
    }

    // Alle Subscriber für einen Event-Type abrufen
    getSubscriberCount(eventType) {
        this._validateEventType(eventType);
        return this.subscribers[eventType] ? this.subscribers[eventType].length : 0;
    }

    // Alle Subscriber für einen Event-Type entfernen
    unsubscribeAll(eventType) {
        this._validateEventType(eventType);
        this.subscribers[eventType] = [];
    }
}

/* Usage Examples:

// 1. Event-basierte Kommunikation (empfohlen)
const observer = new Observer();

// Like-Events abonnieren
const unsubscribe = observer.subscribe(ObserverEvents.BLOG_PAGE_LIKED, (data) => {
    console.log('Blog page liked:', data);
});

// Event auslösen
observer.emit(ObserverEvents.BLOG_PAGE_LIKED, { 
    blogPageId: 37832, 
    userId: 1, 
    timestamp: Date.now() 
});

// 2. Observable Properties (falls gewünscht)
observer.defineObservableProperty('userId', 1, ObserverEvents.USER_ID_CHANGED);
observer.userId = 2; // Löst USER_ID_CHANGED Event aus

// 3. Fehlerbehandlung
try {
    observer.emit('INVALID_EVENT', data); // Wirft Fehler
} catch (error) {
    console.error(error.message);
}

*/