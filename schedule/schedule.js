$(document).ready(function() {
    const searchParams = new Proxy(new URLSearchParams(window.location.search), {
        get: (searchParams, prop) => searchParams.get(prop),
        });
    GenerateTable(parseInt(searchParams.week));
    DisplayLesson( {id: "dfsfsfl", subject: "Math"}, 5 );
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
            $(`<td class="empty-cell align-middle text-center" id="lesson${timeslot}-${weekDay}"></td>`)
                .appendTo(this)
                .hover(
                function() {
                    if ($(this).is(".empty-cell")) $(this).find(".plus").removeClass("d-none");
                }, function() {
                    if ($(this).is(".empty-cell")) $(this).find(".plus").addClass("d-none");
                })
                .append($("#plus").clone().removeAttr("id").attr({
                    "data-date": weekStart.addDays(weekDay - 1),
                    "data-timeslot": timeslot }));
        }
    })
    $("td .plus").click(function() { FillInDateTime($(this).attr("data-date"), $(this).attr("data-timeslot")) })
}

function DisplayLesson(lessonDTO, weekDay) {
    newLessonCard = $("#lessonCard").clone();
    newLessonCard.attr("id", lessonDTO.id);
    newLessonCard.find(".subject").text(lessonDTO.subject);
    newLessonCard.appendTo($("#lesson0-" + weekDay))
    $("#lesson0-" + weekDay).append(newLessonCard).removeClass("empty-cell");
    newLessonCard.removeClass("d-none");
}