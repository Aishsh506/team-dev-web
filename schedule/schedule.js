$(document).ready(function() {
    const search_params = new URL(window.location.href).searchParams;
    searchMethod = search_params.get("method");
    searchId1 = search_params.get("id1");
    searchId2 = search_params.get("id2")
    GenerateTable(parseInt(search_params.get("week")));
    DisplayLesson( {id: "dfsfsfl", subject: "3", timeslot: 2, startDate: new Date("03/07/23"), endDate: new Date("03/07/23") }, 2 );
})

function GenerateTable(week) {
    week = Number.isNaN(week) ? 0 : week;
    weekDate = new Date();
    weekDate = weekDate.addDays(7 * week);
    weekStart = (weekDate.addDays(1 - weekDate.getDay()));

    //заполнение заголовка таблицы
    switch (searchMethod) {
        case "byGroup":
            $("#tableHeader").append("Расписание группы " + groups.find(item => item.id === searchId1)?.number);
            break;
        case "byTeacher":
            $("#tableHeader").append("Расписание преподавателя " + teachers.find(item => item.id === searchId1)?.name);
            break;
        case "byRoom":
            $("#tableHeader").append(`
                Расписание аудитории ${rooms.find(item => item.id === searchId1)?.number} (${buildings.find(item => item.id === searchId2)?.title})`);
            break;
    }

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
            cell = $(`<td class="empty-cell align-middle text-center" id="lesson${timeslot}-${weekDay}"></td>`)
                .appendTo(this)
                .hover(
                function() {
                    if ($(this).is(".empty-cell")) $(this).find(".plus").removeClass("d-none");
                }, function() {
                    if ($(this).is(".empty-cell")) $(this).find(".plus").addClass("d-none");
                });
            if (( week == 0 && weekDay > (new Date()).getDay() ) || week > 0) {
                cell.append($("#plus").clone().removeAttr("id").attr({
                    "data-date": weekStart.addDays(weekDay - 1),
                    "data-timeslot": timeslot }));
            }
        }
    })
    $("td .plus").click(function() { FillInDateTime($(this).attr("data-date"), $(this).attr("data-timeslot")) })
}

function DisplayLesson(lessonDTO, weekDay) {
    subject = subjects.find(item => item.id === lessonDTO.subject)?.name;
    building = buildings.find(item => item.id === lessonDTO.building)?.title;
    room = rooms.find(item => item.id === lessonDTO.room)?.number;
    group = groups.find(item => item.id === lessonDTO.group)?.number;
    teacher = teachers.find(item => item.id === lessonDTO.teacher)?.name;

    newLessonCard = $("#lessonCard").clone();

    newLessonCard.attr("id", lessonDTO.id);
    newLessonCard.find(".subject").text(subject);
    newLessonCard.find(".room").text(building + ', ' + room);
    newLessonCard.find(".group").text(group);
    newLessonCard.find(".teacher").text(teacher);

    newLessonCard.data("subject", lessonDTO.subject);
    newLessonCard.data("building", lessonDTO.building);
    newLessonCard.data("room", lessonDTO.room);
    newLessonCard.data("group", lessonDTO.group);
    newLessonCard.data("teacher", lessonDTO.teacher);
    newLessonCard.data("week-day", weekDay);
    newLessonCard.data("timeslot", lessonDTO.timeslot);
    newLessonCard.data("start-date", lessonDTO.startDate);
    newLessonCard.data("end-date", lessonDTO.endDate);
    
    $(`#lesson${lessonDTO.timeslot}-${weekDay}`).append(newLessonCard).removeClass("empty-cell");
    newLessonCard.removeClass("d-none");
}