function Validate(jQueryInput, predicate, invalidMsg = "") {
    jQueryInput.parent().find(".validation-msg").remove();
    if (!predicate(jQueryInput.val())) {
        jQueryInput.addClass("border-danger");
        jQueryInput.after(`<div class="validation-msg text-danger fs-6">${invalidMsg}</div>`);
        return false;
    } else {
        jQueryInput.removeClass("border-danger");
        return true;
    }
}