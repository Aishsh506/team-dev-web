Date.prototype.addDays = function(days) {
    var date = new Date(this.valueOf());
    date.setDate(date.getDate() + days);
    return date;
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

    //заполнение дат начала и конца недели
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
}

function DisplayLesson(lessonDTO, weekDay) {
    newLessonCard = lessonCard.clone();
    newLessonCard.appendTo($("#lesson0-" + weekDay))
    newLessonCard.removeClass("d-none");
    newLessonCard.attr("id", lessonDTO.id);
    newLessonCard.find(".subject").text(lessonDTO.subject);
}