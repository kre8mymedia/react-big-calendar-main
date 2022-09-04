export const reformatEvents = (events) => {
  return events.map(function (event) {
    var newObj = {};
    newObj["_id"] = event._id;
    newObj["title"] = event.title;
    newObj["bgColor"] = event.project ? event.project.color : event.bgColor;
    newObj["description"] = event.description;
    newObj["hours"] = event.hours ? event.hours : 0;
    newObj["project"] = event.project ? event.project : null;
    newObj["notifications"] = event.notifications ? event.notifications : [];
    newObj["start"] = new Date(
      Date.parse(new Date(Date.parse(event.start)).toISOString().slice(0, 16))
    );
    newObj["end"] = new Date(
      Date.parse(new Date(Date.parse(event.end)).toISOString().slice(0, 16))
    );
    return newObj;
  });
};

export const fixDatesAsIso = (event) => {
  const starter = new Date(Date.parse(event.start));
  starter.setMinutes(starter.getMinutes() - starter.getTimezoneOffset());
  const ender = new Date(Date.parse(event.end));
  ender.setMinutes(ender.getMinutes() - ender.getTimezoneOffset());

  return {
    start: starter.toISOString().slice(0, 16),
    end: ender.toISOString().slice(0, 16)
  };
};

export const fixDatesAsTimestamps = (event) => {
  const starter = new Date(Date.parse(event.start));
  starter.setMinutes(starter.getMinutes() - starter.getTimezoneOffset());
  const ender = new Date(Date.parse(event.end));
  ender.setMinutes(ender.getMinutes() - ender.getTimezoneOffset());

  return {
    start: Date.parse(starter),
    end: Date.parse(ender)
  };
};

export function truncate(str, n){
  return (str.length > n) ? str.slice(0, n-1) + '...' : str;
};