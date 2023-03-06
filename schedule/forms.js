let addLessonForm = $("#addLesson");

$(document).ready(function() {
    LessonForms();
    ScheduleElementForms();
    $(".form-check-label").disableSelection();
    addLessonForm = $("#addLesson")
})

function LessonForms()
{
    selectInput = addLessonForm.find(".select-input").clone();
    selectInputSelect = selectInput.find("select");
    selectInputLabel = selectInput.find("label")

    selectInputSelect.attr("id", "groupSelectAdd");
    selectInputLabel.attr("for", "groupSelectAdd").html("<b>Группа</b>");
    selectInput.clone().prependTo(addLessonForm);

    selectInputSelect.attr("id", "roomSelectAdd");
    selectInputLabel.attr("for", "roomSelectAdd").html("<b>Аудитория</b>");
    selectInput.clone().prependTo(addLessonForm);

    selectInputSelect.attr("id", "buildingSelectAdd");
    selectInputLabel.attr("for", "buildingSelectAdd").html("<b>Корпус</b>");
    selectInput.clone().prependTo(addLessonForm);

    selectInputSelect.attr("id", "subjectSelectAdd");
    selectInputLabel.attr("for", "subjectSelectAdd").html("<b>Дисциплина</b>");
    selectInput.clone().prependTo(addLessonForm);

    selectInputSelect.attr("id", "timeslotSelectAdd").prop("disabled", false);
    selectInputLabel.attr("for", "timeslotSelectAdd").html("<b>Таймслот</b>");
    timeslots.forEach(function(slot, i) {
        selectInputSelect.append($(`<option value="${i}">${slot}</option>`));
    })
    selectInput.clone().insertAfter(addLessonForm.find(".date-input"))

    modal = $("#newModal").clone().attr("id", "addLessonModal").appendTo("#modals");
    modal.find("h1").text("Добавить пару");
    modal.find(".modal-body").append(addLessonForm);

    modal = modal.clone().appendTo("#modals").attr("id", "editLessonModal");
    modal.find("h1").text("Редактировать пару");
    modal.find("#addLesson").attr("id", "editLesson");
    modal.find("#repeatLessonCheckAdd").attr("onclick", "ToggleEndDatePicker('Edit')");

    modal.find("#editLesson").children().each(function() {
        inputLabel = $(this).find("label");
        input = $(this).find("input, select");
        inputLabel.attr("for", inputLabel.attr("for").slice(0, -3) + "Edit");
        input.attr("id", input.attr("id").slice(0, -3) + "Edit");
    })

    $('.datepicker').datepicker({
        format: dateFormat,
        weekStart: 1,
        startDate: "0d",
        maxViewMode: 0,
        daysOfWeekDisabled: "0",
        daysOfWeekHighlighted: "0",
        todayHighlight: true,
        disableTouchKeyboard: true,
        language: 'ru'
    });
}

function ScheduleElementForms()
{
    form = $('.schedule-element-form');
    label = form.find("label");
    input = form.find("input");

    form.attr("id", "addSubject");
    label.attr("for", "subjectName").html("<b>Название</b>");
    input.attr("id", "subjectName");
    emptyModal = $("#newModal").clone();
    emptyModal.attr("id", "addSubjectModal").appendTo($("#modals"));
    emptyModal.find("h1").text("Добавить дисциплину");
    emptyModal.find(".modal-body").append(form.clone());

    form.attr("id", "addBuilding");
    label.attr("for", "buildingName").html("<b>Название</b>");
    input.attr("id", "buildingName");
    emptyModal = $("#newModal").clone();
    emptyModal.attr("id", "addBuildingModal").appendTo($("#modals"));
    emptyModal.find("h1").text("Добавить корпус");
    emptyModal.find(".modal-body").append(form.clone());

    form.attr("id", "addRoom");
    label.attr("for", "roomName").html("<b>Номер</b>");
    input.attr("id", "roomName");
    emptyModal = $("#newModal").clone();
    emptyModal.attr("id", "addRoomModal").appendTo($("#modals"));
    emptyModal.find("h1").text("Добавить аудиторию");
    emptyModal.find(".modal-body").append(form.clone());
    $("#addRoom").prepend(`
        <div class="mb-3">
            <label for="roomBuildingSelect" class="form-label"><b>Корпус</b></label>
            <select id="roomBuildingSelect" class="form-select" disabled></select>
        </div>`);

    form.attr("id", "addGroup");
    label.attr("for", "groupNumber").html("<b>Номер</b>");
    input.attr("id", "groupNumber");
    emptyModal = $("#newModal").clone();
    emptyModal.attr("id", "addGroupModal").appendTo($("#modals"));
    emptyModal.find("h1").text("Добавить группу");
    emptyModal.find(".modal-body").append(form.clone());

    form.attr("id", "addTeacher");
    label.attr("for", "teacherName").html("<b>Ф.И.О</b>");
    input.attr("id", "teacherName");
    emptyModal = $("#newModal").clone();
    emptyModal.attr("id", "addTeacherModal").appendTo($("#modals"));
    emptyModal.find("h1").text("Добавить преподавателя");
    emptyModal.find(".modal-body").append(form);
}

function ToggleEndDatePicker(form)
{
    if ($("#repeatLessonCheck" + form).prop("checked")) {
        $("#endDateInput" + form).parent().removeClass("d-none");
    } else {
        $("#endDateInput" + form).parent().addClass("d-none");
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
    $("#dateInputEdit").datepicker("setDate", weekStart.addDays(lessonCard.data("week-day") - 1));
    $("#timeslotSelectEdit").val(lessonCard.data("timeslot"));
    $("#repeatLessonCheckEdit").prop("checked", endDate != null);
    ToggleEndDatePicker("Edit");
    $("#endDateInputEdit").datepicker("setDate", endDate);
}