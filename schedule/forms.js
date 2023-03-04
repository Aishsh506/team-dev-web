const timeslots = [
    "8:45 - 10:20",
    "10:35 - 12:10",
    "12:25 - 14:00",
    "14:45 - 16:20",
    "16:35 - 18:10",
    "18:25 - 20:00",
    "20:15 - 21:50"
]

$(document).ready(function() {
    LessonForm();
    $(".form-check-label").disableSelection();
})

$.fn.extend({ 
    disableSelection: function() { 
        this.each(function() { 
            if (typeof this.onselectstart != 'undefined') {
                this.onselectstart = function() { return false; };
            } else if (typeof this.style.MozUserSelect != 'undefined') {
                this.style.MozUserSelect = 'none';
            } else {
                this.onmousedown = function() { return false; };
            }
        }); 
    } 
});

function LessonForm()
{
    form = $("#addLesson");
    selectInput = form.find(".select-input").clone();
    selectInputSelect = selectInput.find("select");
    selectInputLabel = selectInput.find("label")

    selectInputSelect.attr("id", "groupSelect");
    selectInputLabel.attr("for", "groupSelect").html("<b>Группа</b>");
    selectInput.clone().prependTo(form);

    selectInputSelect.attr("id", "roomSelect");
    selectInputLabel.attr("for", "roomSelect").html("<b>Аудитория</b>");
    selectInput.clone().prependTo(form);

    selectInputSelect.attr("id", "buildingSelect");
    selectInputLabel.attr("for", "buildingSelect").html("<b>Корпус</b>");
    selectInput.clone().prependTo(form);

    selectInputSelect.attr("id", "subjectSelect");
    selectInputLabel.attr("for", "subjectSelect").html("<b>Дисциплина</b>");
    selectInput.clone().prependTo(form);

    selectInputSelect.attr("id", "timeslotSelect").prop("disabled", false);
    selectInputLabel.attr("for", "timeslotSelect").html("<b>Таймслот</b>");
    timeslots.forEach(function(slot, i) {
        selectInputSelect.append($(`<option value="${i}">${slot}</option>`));
    })
    selectInput.clone().insertAfter(form.find(".date-input"))

    form.find('.datepicker').datepicker({
        format: "dd/mm/yy",
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
    modal.find(".modal-body").append(form);
}

function ToggleEndDatePicker()
{
    if ($("#repeatLessonCheck").prop("checked")) {
        $("#endDateInput").parent().removeClass("d-none");
    } else {
        $("#endDateInput").parent().addClass("d-none");
    }
}