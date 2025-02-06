function generateSliders() {
    const sliders = {};
    const sliderElements = document.querySelectorAll('.slider');

    sliderElements.forEach(slider => {
      const id = slider.id;

      // Tworzymy element input typu range (slider)
      const inputSlider = document.createElement('input');
      inputSlider.type = 'range';
      inputSlider.min = 0;
      inputSlider.max = 100;
      inputSlider.value = 0;
      inputSlider.style.width = '100%';

      // Tworzymy element span, aby pokazać wartość
      const valueDisplay = document.createElement('span');
      valueDisplay.textContent = '0';

      // Dodajemy elementy do DOM
      slider.appendChild(inputSlider);
      slider.appendChild(valueDisplay);

      // Aktualizowanie wartości podczas zmiany suwaka
      inputSlider.addEventListener('input', () => {
        valueDisplay.textContent = inputSlider.value; // Zaktualizuj wartość wyświetlaną obok suwaka
      });

      // Zapisz referencję do slidera
      sliders[id] = {
        input: inputSlider,
        display: valueDisplay,
        getValue: () => inputSlider.value,  // Zwróci wartość slidera
        setValue: (value) => {
          inputSlider.value = value;
          valueDisplay.textContent = value;
        }
      };
    });

    return sliders;
  }