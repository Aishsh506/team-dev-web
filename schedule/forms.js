let addLessonForm = $("#addLesson");

$(document).ready(function() {
    LessonForm();
    $(".form-check-label").disableSelection();
    addLessonForm = $("#addLesson")
})

function LessonForm()
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

    addLessonForm.find('.datepicker').datepicker({
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

    modal = $("#newModal").clone().attr("id", "addLessonModal").appendTo("#modals");
    modal.find("h1").text("Добавить пару");
    modal.find(".modal-body").append(addLessonForm);
}

function ToggleEndDatePicker()
{
    if ($("#repeatLessonCheckAdd").prop("checked")) {
        $("#endDateInputAdd").parent().removeClass("d-none");
    } else {
        $("#endDateInputAdd").parent().addClass("d-none");
    }
}

function FillInDateTime(date = "", timeslot = 0)
{
    if (date == "") {
        addLessonForm.find("#dateInputAdd").val("");
    } else {
        addLessonForm.find("#dateInputAdd").datepicker("setDate", new Date(date));
    }
    addLessonForm.find("#timeslotSelectAdd").val(timeslot);
}