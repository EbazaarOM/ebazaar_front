const eventTypes = ['keypress', 'keydown'];

export const keyEventHandler = (fn) => (event) => eventTypes.indexOf(event.type) > -1 && event.key === 'Enter' && fn();
