function ToggleEndDatePicker(form)
{
    if ($("#repeatLessonCheck" + form).prop("checked")) {
        $("#endDateInput" + form).parent().removeClass("d-none");
    } else {
        $("#endDateInput" + form).parent().addClass("d-none");
    }
}

function FillInLessonDetails(lessonCard)
{
    lessonCard = $(lessonCard);
    endDate = lessonCard.data("end-date");
    endDate = endDate == null ? null : new Date(endDate);

    activeLessonId = lessonCard.attr("id");
    $("#subjectSelectEdit").val(lessonCard.data("subject"));
    $("#buildingSelectEdit").val(lessonCard.data("building"));
    $("#roomSelectEdit").val(lessonCard.data("room"));
    $("#groupSelectEdit").val(lessonCard.data("group"));
    $("#teacherSelectEdit").val(lessonCard.data("teacher"));
    $("#dateInputEdit").val(lessonCard.data("start-date").toLocaleString('ru', formDateOptions));
    $("#timeslotSelectEdit").val(lessonCard.data("timeslot"));
    $("#repeatLessonCheckEdit").prop("checked", endDate != null);
    ToggleEndDatePicker("Edit");
    $("#endDateInputEdit").val(endDate?.toLocaleString('ru', formDateOptions));

    if(lessonCard.data("start-date") <= new Date()) {
        $(`
        #editLesson select, 
        #editLesson input, 
        #editLessonModal .btn-primary`).attr("disabled", true);
        $("#editLesson .alert").removeClass("d-none");
    } else {
        $(`
        #editLesson select, 
        #editLesson input, 
        #editLessonModal .btn-primary`).attr("disabled", false);
        $("#editLesson .alert").addClass("d-none");
    }
}

function FillInDateTime(date = "", timeslot = 0)
{
    if (date == "") {
        $("#dateInputAdd").val("");
    } else {
        $("#dateInputAdd").datepicker("setDate", new Date(date));
    }
    $("#timeslotSelectAdd").val(timeslot);
}