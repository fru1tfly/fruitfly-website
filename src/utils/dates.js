const defaultDateOptions = {
    month: 'numeric',
    day: 'numeric'
}

export const formatDate = (date, options = defaultDateOptions) => {
    const base = new Date(date);
    base.setMinutes(base.getMinutes() + base.getTimezoneOffset());
    const currentDate = new Date(Date.now());

    let dateOptions = {...options};
    if(base.getFullYear() !== currentDate.getFullYear()) {
        dateOptions.year = 'numeric';
    }

    return base.toLocaleDateString('en-US', dateOptions);
}

const defaultTimeOptions = {
    hour: 'numeric',
    hour12: true
}

export const formatTime = (time, options = defaultTimeOptions) => {
    const [hours, mins, secs] = time.split(':').map(Number);
    const base = new Date();

    let timeOptions = {...options}
    if(mins > 0) {
        timeOptions.minute = 'numeric';
    }

    base.setHours(hours, mins, secs);

    return base.toLocaleTimeString('en-US', timeOptions).replace(' ', '');
}