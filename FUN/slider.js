function createSlider(containerId, title, min, max, step, defaultVal, options = {}) {

    const {
        Type = 'linear',
        TrueZero = false
    } = options;

    if (TrueZero == true) {
        min = min - step;
    }

    const container = $('#' + containerId);

    // Tworzymy strukturę HTML dla suwaka
    const sliderWrapper = $('<div class="slider-wrapper"></div>');
    const label = $('<label for="' + containerId + '_slider">' + title + '</label>');
    const slider = $('<input type="range" id="' + containerId + '_slider" min="' + min + '" max="' + max + '" step="' + step + '" value=' + defaultVal + '>');
    const result = $('<span class="result" id="' + containerId + '_result">0</span>');


    // Dodajemy elementy do kontenera
    sliderWrapper.append(label, slider, result);
    container.append(sliderWrapper);


    let res;

    slider.on('input', function () {
        const val = parseFloat(this.value);
        if (Type === 'linear') {
            res = val;
            result.text(res);
        }
        else if (Type === '10exp') {
            res = ((val < 0) ? 0 : Math.pow(10, val));
            result.text(res.toExponential(2));
        }
        console.log("E: ", title, " = ", res);
    });


    // Wywołanie na początku, aby ustawić wynik
    slider.trigger('input');

    // Zwracamy obiekt suwaka, aby móc odczytać jego nazwę i inne dane
    return {
        sliderElement: slider,
        resultElement: result,
        name: title,
        getValue: function () {
            return parseFloat(res);
        },
        getResult: function () {
            return result.text();
        }
    };
}