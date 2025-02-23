console.log("slider.js loaded");

function createSlider(containerId, title, min, max, step, defaultVal, options = {}) {
    console.log("slider created");

    const {
        type = 'linear',
        onChange = null
    } = options;

    // Tworzenie struktury HTML dla suwaka
    // const sliderWrapper = document.createElement('div');
    // sliderWrapper.className = 'slider-wrapper';

    const sliderWrapper = $('<div>').addClass('slider-wrapper');

    const label = document.createElement('label');
    label.setAttribute('for', `${containerId}_slider`);
    label.textContent = title;

    const slider = document.createElement('input');
    slider.type = 'range';
    slider.id = `${containerId}_slider`;
    slider.min = min;
    slider.max = max;
    slider.step = step;
    slider.value = defaultVal;

    const result = document.createElement('span');
    result.className = 'result';
    result.id = `${containerId}_result`;
    result.textContent = '0';

    // Dodanie elementów do kontenera
    sliderWrapper.append(label, slider, result);
    container.append(sliderWrapper);

    let res;

    // Funkcja aktualizująca wynik
    const updateResult = () => {
        const val = parseFloat(slider.value);
        if (type === 'linear') {
            res = val;
            result.textContent = res;
        } else if (type === '10exp') {
            res = val < 0 ? 0 : Math.pow(10, val);
            result.textContent = res.toExponential(2);
        }
        console.log(`E: ${title} = ${res}`);

        // Wywołanie funkcji zwrotnej, jeśli została podana
        if (onChange && typeof onChange === 'function') {
            onChange(res);
        }
    };

    // Nasłuchiwanie zdarzenia 'input'
    slider.addEventListener('input', updateResult);

    // Wywołanie na początku, aby ustawić wynik
    updateResult();

    // Zwracanie obiektu suwaka
    return {
        sliderElement: slider,
        resultElement: result,
        name: title,
        getValue: () => parseFloat(res),
        getResult: () => result.textContent
    };
}














// Sprawdzenie, czy kontener istnieje
    // const container = document.getElementById(containerId);
    // if (!container) {
    //     console.error(`Container with id "${containerId}" not found.`);
    //     return;
    // }
