

createSlider(divId);


const c = 3000000000;
let E0, omega, lambda, k, t, v, f;

// Funkcja do aktualizacji parametrów na podstawie wartości sliderów
function updateParams() {

    E0 = parseFloat($('#amplitude').val());  // Amplituda
    lambda = parseFloat($('#wavelength').val());  // Długość fali
    t = parseFloat($('#time').val());  // Czas
    v = parseFloat($('#velocity').val());
    f = c / lambda;
    omega = 2 * Math.PI * f;  // Częstotliwość kątowa
    k = 2 * Math.PI / lambda;  // Liczba falowa



    // Obliczamy E i B przy zaktualizowanych parametrach
    const Z = Array.from({ length: 1000 }, (_, i) => i * 0.01);
    const E = Z.map(z => E0 * Math.cos(omega * t - k * z));
    const B = Z.map(z => (E0 / v) * E0 * Math.cos(omega * t - k * z));
    const ZERO = Z.map(() => 0);

    const electricTrace = {x: E, y: ZERO, z: Z, mode: 'lines', line: { color: 'red', width: 3 }, name: 'Pole elektryczne', type: 'scatter3d'};
    const magneticTrace = {x: ZERO, y: B, z: Z, mode: 'lines', line: { color: 'blue', width: 3 }, name: 'Pole magnetyczne', type: 'scatter3d'};

    const layout = {
        title: 'Animowany Wykres Fali Elektromagnetycznej',
        scene: {
            dragmode: false,
            xaxis: {
                title: 'Oś X (Propagacja)',
                range: [-10, 10]
            },
            yaxis: {
                title: 'Oś Y (Pole elektryczne)',
                range: [-10, 10]
            },
            zaxis: {
                title: 'Oś Z (Pole magnetyczne)',
                range: [0, 10]
            },
            camera: {
                eye: { x: 0.5, y: 0.5, z: 0.5 },  // Ustawienie pozycji kamery
                up: { x: 1, y: 0, z: 0 }         // Ustawienie orientacji "góry" wykresu
            }
        },
        dragmode: 'turntable',  // Można ustawić na 'zoom' lub 'pan' do innych trybów
        
    };

    // Aktualizowanie wykresu za każdym razem po zmianie parametrów
    Plotly.react($('#chart')[0], [electricTrace, magneticTrace], layout);
}

updateParams();  // Ustawienie początkowych wartości
