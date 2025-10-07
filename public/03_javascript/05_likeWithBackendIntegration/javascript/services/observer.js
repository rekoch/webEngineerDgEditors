// Event-Typen Enum für typsichere Events
export const ObserverEvents = Object.freeze({
    USER_ID_CHANGED: 'USER_ID_CHANGED',
    BLOG_PAGE_ID_CHANGED: 'BLOG_PAGE_ID_CHANGED',
    LIKE_BUTTON_CLICKED: 'LIKE_BUTTON_CLICKED',
    LIKE_COUNT_CHANGED: 'LIKE_COUNT_CHANGED',
});

export class Observer {
    constructor() {
        // Singleton-Pattern: Verhindert mehrere Instanzen
        if (Observer.instance) {
            return Observer.instance;
        }
        
        this.subscribers = {};
        this.lastValues = {}; // Speichert den letzten Wert pro Event-Type
        this.allowedEvents = new Set(Object.values(ObserverEvents));
        
        Observer.instance = this;
    }

    // Typsichere Event-Subscription
    subscribe(eventType, callback, replayLast = false) {
        this._validateEventType(eventType);
        
        if (!this.subscribers[eventType]) {
            this.subscribers[eventType] = [];
        }
        
        this.subscribers[eventType].push(callback);
        
        // Falls replayLast=true und ein letzter Wert existiert, sofort callback aufrufen
        if (replayLast && this.lastValues[eventType] !== undefined) {
            try {
                callback(this.lastValues[eventType], eventType);
            } catch (error) {
                console.error(`Error in replay callback for ${eventType}:`, error);
            }
        }
        
        // Unsubscribe-Funktion zurückgeben
        return () => {
            this.subscribers[eventType] = this.subscribers[eventType].filter(sub => sub !== callback);
        };
    }

    // Event mit Daten auslösen
    emit(eventType, data = null) {
        this._validateEventType(eventType);
        
        // Letzten Wert speichern (für spätere Subscriber)
        this.lastValues[eventType] = data;
        
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
    
    // Aktuellen/letzten Wert für einen Event-Type abrufen
    getCurrentValue(eventType) {
        this._validateEventType(eventType);
        return this.lastValues[eventType];
    }
    
    // Prüfen ob ein Event-Type bereits einen Wert hat
    hasValue(eventType) {
        this._validateEventType(eventType);
        return this.lastValues[eventType] !== undefined;
    }
}

// Globale Singleton-Instanz exportieren
export const appObserver = new Observer();

/* Usage Examples:

// 1. Normales Event-Subscribe
appObserver.subscribe(ObserverEvents.USER_ID_CHANGED, (data) => {
    console.log('User ID changed:', data.userId);
});

// 2. Subscribe mit Replay (erhält sofort letzten Wert, falls vorhanden)
appObserver.subscribe(ObserverEvents.USER_ID_CHANGED, (data) => {
    console.log('User ID (with replay):', data.userId);
}, true); // replayLast = true

// 3. Event senden (wird automatisch als letzter Wert gespeichert)
appObserver.emit(ObserverEvents.USER_ID_CHANGED, { userId: 42 });

// 4. Späteren Subscriber hinzufügen (mit Replay)
setTimeout(() => {
    appObserver.subscribe(ObserverEvents.USER_ID_CHANGED, (data) => {
        console.log('Late subscriber got:', data.userId); // Erhält sofort 42
    }, true);
}, 5000);

// 5. Aktuellen Wert manuell abrufen
const currentUserId = appObserver.getCurrentValue(ObserverEvents.USER_ID_CHANGED);
console.log('Current user ID:', currentUserId?.userId);

// 6. Prüfen ob Wert existiert
if (appObserver.hasValue(ObserverEvents.USER_ID_CHANGED)) {
    console.log('User ID has been set before');
}

*/

