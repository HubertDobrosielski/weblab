function isCreateSliderValidationError(containerId, min, max, step, defaultVal) {
    const container = $(`#${containerId}`);
    if (container.length === 0) {
        console.error(`Container with id ${containerId} not found.`);
        return true;
    }
    if ($(`#${containerId}_slider`).length > 0) {
        console.error(`Slider with id ${containerId}_slider already exists.`);
        return true;
    }
    if (min >= max) {
        console.error('Min value must be less than max value.');
        return true;
    }
    if (defaultVal < min || defaultVal > max) {
        console.error('Default value must be between min and max.');
        return true;
    }
    if (step <= 0) {
        console.error('Step must be greater than 0.');
        return true;
    }
    return false;
}



function createSlider(options) {
    let {
        containerId = null,
        title = "slider",
        min = 0,
        max = 10,
        step = 1,
        defaultVal = min,
        type = 'linear',
        onChange = null,
        consoleLog = false,
    } = options;

    function dispConsoleLog(text) {
        if (consoleLog) {
            console.log(text);
        }
    }

    // *****************************************************************************
    // VALIDATION
    dispConsoleLog("Slider " + containerId + " validating...");
    if (isCreateSliderValidationError(containerId, min, max, step, defaultVal)) {
        dispConsoleLog("Slider", containerId, "validation error");
        return;
    }
    dispConsoleLog("Slider " + containerId + " validation succesful");
    // *****************************************************************************

    //

    // *****************************************************************************
    // HTML STRUCTURE CREATING
    const container = $(`#${containerId}`);

    const sliderWrapper = $('<div>').addClass('slider-wrapper');

    const sliderLabel = $('<label>')
        .attr('for', `${containerId}_slider`)
        .text(title);

    const sliderInput = $('<input>').attr({
        type: 'range',
        id: `${containerId}_slider`,
        min: min,
        max: max,
        step: step,
        value: defaultVal
    }).addClass('slider-input');

    const minValue = $('<span>').addClass('min-value').text(min);
    const maxValue = $('<span>').addClass('max-value').text(max);
    const currentValue = $('<span>').addClass('current-value').text(defaultVal);
    const valuesContainer = $('<div>').addClass('values-container');
    valuesContainer.append(minValue, sliderInput, maxValue);

    sliderWrapper.append(sliderLabel, valuesContainer, currentValue);
    container.append(sliderWrapper);
    console.log("Slider", containerId, "was creted");
    // *****************************************************************************



    sliderInput.on('input', function () {
        const value = this.value;
        currentValue.text(value);
        if (onChange && typeof onChange === 'function') {
            onChange(parseFloat(value));
        }
    });

    return {
        GetVal: function () {
            return parseFloat(sliderInput.val());
        },
        Disabled: function (isDisabled) {
            sliderInput.prop('disabled', isDisabled);
        },
        SetVal: function (value) {
            if (value >= min && value <= max) {
                sliderInput.val(value).trigger('input');
            } else {
                console.error('Value must be between min and max.');
            }
        },
        SetMin: function (newMin) {
            if (newMin >= max) {
                console.error('New min value must be less than max value.');
                return;
            }
            min = newMin;
            sliderInput.attr('min', min);

            minValue.text(min);
            if (sliderInput.val() < min) {
                sliderInput.val(min).trigger('input');
            }
        },
        SetMax: function (newMax) {
            if (newMax <= min) {
                console.error('New max value must be greater than min value.');
                return;
            }
            max = newMax;
            sliderInput.attr('max', max);
            maxValue.text(max);
            if (sliderInput.val() > max) {
                sliderInput.val(max).trigger('input');
            }
        },
        SetStep: function (newStep) {
            if (newStep <= 0) {
                console.error('Step must be greater than 0.');
                return;
            }
            step = newStep;
            sliderInput.attr('step', step);
        }
    };


}