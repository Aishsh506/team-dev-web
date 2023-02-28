Date.prototype.addDays = function(days) {
    var date = new Date(this.valueOf());
    date.setDate(date.getDate() + days);
    return date;
}

function addMinutes(date, minutes) {
    return new Date(date.getTime() + minutes*60000);
}

function TomskToLocalHours(TomskHours) {
    date = new Date();
    date.setUTCHours(TomskHours - 7);
    return date;
}

function padTo2Digits(num) {
    return String(num).padStart(2, '0');
}

$(document).ready(function() {
    const searchParams = new Proxy(new URLSearchParams(window.location.search), {
        get: (searchParams, prop) => searchParams.get(prop),
        });
    GenerateTable(parseInt(searchParams.week));
})

function GenerateTable(week) {
    if (Number.isNaN(week)) {
        week = 0;
    }
    weekDate = new Date();
    weekDate = weekDate.addDays(7 * week);
    weekStart = (weekDate.addDays(1 - weekDate.getDay()));

    //заполнение названия недели
    $("#weekStart").text(new Intl.DateTimeFormat('ru', { dateStyle:"long"}).format(weekStart));
    $("#weekEnd").text(new Intl.DateTimeFormat('ru', { dateStyle:"long"}).format(weekStart.addDays(5)));

    //заполнение дат в названиях столбцов таблицы
    $("thead th").each(function(i) {
        $('<br><span class="fw-light text-secondary">'
            + new Intl.DateTimeFormat('ru', { day: "numeric", month: "short"}).format(weekStart.addDays(i))
            + '</span>').appendTo(this);
    })

    //создание ячеек таблицы с id типа 'lesson{timeslot}-{weekDay}'
    $("tbody tr").each(function(timeslot) {
        for(let weekDay = 1; weekDay <= 6; weekDay++)
        {
            $(`<td id="lesson${timeslot}-${weekDay}"></td>`).appendTo(this);
        }
    })

    //перевод времени пар с Томского времени в местное
    $("tbody th").each(function() {
        startTime = new Date();
        startTime.setUTCHours($(this).text().split(":")[0] - 7);
        startTime.setMinutes($(this).text().split(":")[1]);
        endTime = addMinutes(startTime, 95);
        $(this).text(startTime.getHours() + ":" + padTo2Digits(startTime.getMinutes())
            + " - " + endTime.getHours() + ":" + padTo2Digits(endTime.getMinutes()));
    })
}