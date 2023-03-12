function GenerateTable(week) {
    week = Number.isNaN(week) ? 0 : week;
    weekDate = new Date();
    weekDate = weekDate.addDays(7 * week);
    weekStart = (weekDate.addDays(1 - weekDate.getDay()));

    //заполнение заголовка таблицы
    switch (searchMethod) {
        case "byGroup":
            $("#tableHeader").append("Расписание группы " + groups.find(item => item.id === searchId1)?.name);
            break;
        case "byTeacher":
            $("#tableHeader").append("Расписание преподавателя " + teachers.find(item => item.id === searchId1)?.name);
            break;
        case "byRoom":
            $("#tableHeader").append(`
                Расписание аудитории ${rooms.find(item => item.id === searchId1)?.name} (${buildings.find(item => item.id === searchId2)?.title})`);
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

async function FillInTable()
{
    let schedule;
    try {
        schedule = await GetSchedule(weekStart.toISOString(), searchMethod, searchId1);
    } catch(e) {
        alert("Ошибка при получении расписания с сервера");
        console.log(e.message);
        return;
    }

    schedule.days.forEach(day => {
        day.lessons.forEach(lesson => {
            DisplayLesson(lesson, day.dayOfTheWeek);
        })
    });
}

function DisplayLesson(lesson, weekDay) {
    newLessonCard = $("#lessonCard").clone();

    newLessonCard.attr("id", lesson.id);
    newLessonCard.find(".subject").text(lesson.subject.name);
    newLessonCard.find(".room").text(lesson.building.title + ', ' + lesson.room.name);
    newLessonCard.find(".group").text(lesson.group.name);
    newLessonCard.find(".teacher").text(lesson.teacher.name);

    newLessonCard.data("subject", lesson.subject.id);
    newLessonCard.data("building", lesson.building.id);
    newLessonCard.data("room", lesson.room.id);
    newLessonCard.data("group", lesson.group.id);
    newLessonCard.data("teacher", lesson.teacher.id);
    newLessonCard.data("week-day", weekDay);
    newLessonCard.data("timeslot", lesson.timeslot);
    newLessonCard.data("start-date", lesson.startDate);
    newLessonCard.data("end-date", lesson.endDate);
    
    $(`#lesson${lesson.timeslot}-${weekDay}`).append(newLessonCard).removeClass("empty-cell");
    newLessonCard.removeClass("d-none");
}

async function GetLists()
{
    subjects = await GetSubjects();
    buildings = await GetBuildings();
    groups = await GetGroups();
    teachers = await GetTeachers();
}