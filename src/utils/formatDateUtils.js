export function formatDate1(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2)
        month = '0' + month;
    if (day.length < 2)
        day = '0' + day;

    return [year, month, day].join('-');
}

// export function getCurrentDay(date) {
//     var d = new Date(date),
//         current_day = d.getDay()

//     if (current_day === 0) {
//         current_day = "Chủ nhật"
//     } else if (current_day === 1) {
//         current_day = "Thứ hai"
//     } else if (current_day === 2) {
//         current_day = "Thứ ba"
//     } else if (current_day === 3) {
//         current_day = "Thứ tư"
//     } else if (current_day === 4) {
//         current_day = "Thứ năm"
//     } else if (current_day === 5) {
//         current_day = "Thứ sáu"
//     } else if (current_day === 6) {
//         current_day = "Thứ bảy"
//     }
//     return current_day;
// }

export function formatDate2(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2)
        month = '0' + month;
    if (day.length < 2)
        day = '0' + day;

    return [day, month, year].join('/');
}

export function formatDate3(date) {
    var d = new Date(date),
        minus = d.getMinutes(),
        hour = d.getHours(),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (minus < 10) {
        minus = '0' + minus;
    }
    if (hour < 10) {
        hour = '0' + hour;
    }
    if (month.length < 2) {
        month = '0' + month;
    }
    if (day.length < 2) {
        day = '0' + day;
    }
    var dateConvert = year + "/" + month + "/" + day + " " + hour + ":" + minus
    return dateConvert;
}

export function formatDate4(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + (d.getDate() - 1),
        year = d.getFullYear();

    if (month.length < 2)
        month = '0' + month;
    if (day.length < 2)
        day = '0' + day;
    if (day < 1)
        day = '01';

    return [year, month, day].join('-');
}

export function formatDate5(date) {
    var d = new Date(date),
        seconds = d.getSeconds(),
        minus = d.getMinutes(),
        hour = d.getHours()

    if (seconds < 10) {
        seconds = '0' + seconds;
    }
    if (minus < 10) {
        minus = '0' + minus;
    }
    if (hour < 10) {
        hour = '0' + hour;
    }
    var dateConvert = hour + ":" + minus + ":" + seconds
    return dateConvert;
}

export function formatDate6(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + (d.getDate() - 1),
        year = d.getFullYear();

    if (month.length < 2)
        month = '0' + month;
    if (day.length < 2)
        day = '0' + day;

    return [year, month, day].join('-');
}

export function formatDate7(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + (d.getDate() + 1),
        year = d.getFullYear();

    if (month.length < 2)
        month = '0' + month;
    if (day.length < 2)
        day = '0' + day;

    return [year, month, day].join('-');
}

export function formatDate8(date) {
    var d = new Date(date),
        current_day = d.getDay(),
        seconds = d.getSeconds(),
        minus = d.getMinutes(),
        hour = d.getHours(),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (current_day === 0) {
        current_day = "Chủ nhật"
    } else if (current_day === 1) {
        current_day = "Thứ hai"
    } else if (current_day === 2) {
        current_day = "Thứ ba"
    } else if (current_day === 3) {
        current_day = "Thứ tư"
    } else if (current_day === 4) {
        current_day = "Thứ năm"
    } else if (current_day === 5) {
        current_day = "Thứ sáu"
    } else if (current_day === 6) {
        current_day = "Thứ bảy"
    }
    if (month.length < 2) {
        month = '0' + month;
    }
    if (day.length < 2) {
        day = '0' + day;
    }
    var dateConvert = current_day + "," + " " + day + "/" + month
    return dateConvert;
}

export function formatDate9(date) {
    var dateConvert = '';
    if (date != null && date != "") {
        var d = new Date(date),
            minus = d.getMinutes(),
            hour = d.getHours(),
            seconds = d.getSeconds(),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();

        if (seconds < 10) {
            seconds = '0' + seconds;
        }
        if (minus < 10) {
            minus = '0' + minus;
        }
        if (hour < 10) {
            hour = '0' + hour;
        }
        if (month.length < 2) {
            month = '0' + month;
        }
        if (day.length < 2) {
            day = '0' + day;
        }
        dateConvert = hour + ":" + minus + ":" + seconds + " " + day + "/" + month + "/" + year
    }
    return dateConvert;
}


export function convertLocalDate(date) {
    var d = new Date(date),
        seconds = d.getSeconds(),
        minus = d.getMinutes(),
        hour = d.getHours(),
        current_day = d.getDay(),
        day = '' + d.getDate(),
        month = '' + (d.getMonth() + 1),
        year = d.getFullYear();

    if (current_day === 0) {
        current_day = "Chủ nhật"
    } else if (current_day === 1) {
        current_day = "Thứ hai"
    } else if (current_day === 2) {
        current_day = "Thứ ba"
    } else if (current_day === 3) {
        current_day = "Thứ tư"
    } else if (current_day === 4) {
        current_day = "Thứ năm"
    } else if (current_day === 5) {
        current_day = "Thứ sáu"
    } else if (current_day === 6) {
        current_day = "Thứ bảy"
    }

    if (seconds < 10) {
        seconds = '0' + seconds;
    }
    if (minus < 10) {
        minus = '0' + minus;
    }
    if (hour < 10) {
        hour = '0' + hour;
    }
    if (day < 10) {
        day = '0' + day;
    }
    if (month < 10) {
        month = '0' + month;
    }
    return { seconds, minus, hour, current_day, day, month, year };
}

export function formatDateUTC(date) {
    var d = new Date(date)
    var dateConvert = d.toISOString();
    return dateConvert;
}