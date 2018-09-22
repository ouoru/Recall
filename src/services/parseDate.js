import _ from 'lodash'

export function stampToDate(stamp) {
    var a = new Date(stamp);
    var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    var year = a.getFullYear();
    var month = months[a.getMonth()];
    var date = a.getDate();
    return `Taken on ${month} ${date}, ${year}`;
}

export function stampToDateObj(stamp) {
    var a = new Date(stamp);
    var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    var year = a.getFullYear();
    var month = months[a.getMonth()];
    var date = a.getDate();
    var hour = a.getHours();
    var min = a.getMinutes();
    return { year, month, date, hour, min };
}

export function filterPastWeek(library, text) {
    var week = 7 * 24 * 60 * 60 * 1000
    var weekAgo = Date.now() - week
    return _.sortBy(_.filter(library.photos, a => a.timestamp > weekAgo), b => -b.timestamp)
}