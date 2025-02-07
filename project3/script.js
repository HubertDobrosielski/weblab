function generatePN_diode(divId, Wp, Wn, maxAbsX) {
    const layout = {
        title: 'Struktura diody PN',
        xaxis: {
            title: 'Pozycja',
            range: [-maxAbsX, maxAbsX],  // Przestrzeń na całej szerokości diody
            showgrid: false,
            zeroline: false,
        },
        yaxis: {
            title: 'Obszar',
            range: [0, 1],  // Jedna wysokość dla diody
            showgrid: false,
            zeroline: false
        },

        shapes: [
            // Obszar p-typ (niebieski)
            {
                type: 'rect',
                x0: -maxAbsX, x1: 0,
                y0: 0, y1: 1,
                fillcolor: 'rgba(0, 0, 255, 1)',
                line: { width: 2, color: 'blue' },
                name: 'p-typ'
            },
            // Obszar n-typ (czerwony)
            {
                type: 'rect',
                x0: 0, x1: maxAbsX,
                y0: 0, y1: 1,
                fillcolor: 'rgba(255, 0, 0, 1)',
                line: { width: 2, color: 'red' },
                name: 'n-typ'
            },
            // Obszar zubożony n-typ (żółty)
            {
                type: 'rect',
                x0: 0, x1: Wn,
                y0: 0, y1: 1,
                fillcolor: 'rgba(255, 230, 0, 0.49)',
                line: { width: 2, color: 'yellow' },
                name: 'n-typ'
            },
            // Obszar zubożony p-typ (żółty)
            {
                type: 'rect',
                x0: -Wp, x1: 0,
                y0: 0, y1: 1,
                fillcolor: 'rgba(255, 230, 0, 0.49)',
                line: { width: 2, color: 'yellow' },
                name: 'n-typ'
            }
        ]
    };

    Plotly.newPlot(divId, [], layout);
}

function generateChargeDensityChart(divId, qNa, qNd, Wp, Wn, maxAbsX, maxAbsY) {

    var rhoP = {
        x: [-Wp, 0, 0, -Wp, -Wp], // Zamykamy kwadrat wracając do -0.5
        y: [-qNa, -qNa, 0, 0, -qNa],
        mode: 'lines',
        fill: 'toself',
        name: 'Kwadrat -1',
        line: { color: 'blue' }
    };

    // Drugi trace (kwadrat o wartości +1)
    var rhoN = {
        x: [0, Wn, Wn, 0, 0],
        y: [0, 0, qNd, qNd, 0],
        mode: 'lines',
        fill: 'toself',
        name: 'Kwadrat +1',
        line: { color: 'red' }
    };

    // Układ wykresu (layout)
    var layout = {
        title: 'Charge density',
        xaxis: { title: 'X-axis', zeroline: true, range: [-maxAbsX, maxAbsX] },
        yaxis: { title: 'Y-axis', zeroline: true, range: [-maxAbsY, maxAbsY] },
        showlegend: false
    };

    // Renderowanie wykresu
    Plotly.newPlot(divId, [rhoP, rhoN], layout);
}

// Stałe fizyczne
const q = 1.6e-19; // Ładunek elementarny (C)
const epsilon_s = 11.7 * 8.85e-12; // Przenikalność elektryczna krzemu (F/m)

const Vb_Slider = createSlider10exp('Vb_Slider', 'Bias Voltage', -5, 5, 0.1, 0.1, { TrueZero: true, Type: 'linear' });
const Vth_Slider = createSlider10exp('Vth_Slider', 'Threshold Voltage', 0.1, 1, 0.05, 0.7, { TrueZero: true, Type: 'linear' });

const Na_Slider = createSlider10exp('Na_Slider', 'Na', 0, 20, 0.1, 10, { TrueZero: true, Type: '10exp' });
const Nd_Slider = createSlider10exp('Nd_Slider', 'Nd', 0, 20, 0.1, 10, { TrueZero: true, Type: '10exp' });
const DiodeL_Slider = createSlider10exp('DiodeL_Slider', 'Diode length', 0, 20, 0.1, 10, { TrueZero: true, Type: '10exp' });


function update() {
    const Na = Na_Slider.getValue();
    const Nd = Nd_Slider.getValue();
    const DiodeL = DiodeL_Slider.getValue();
    const Vb = Vb_Slider.getValue();
    const Vth = Vth_Slider.getValue();

    // console.log("  Na=", Na, "  Nd=", Nd, "  DiodeL=", DiodeL, "  V_b=", V_b, "  V=", V);

    // onlu fo Vb > 0
    const W = (Vb < Vth) ? (Math.sqrt((2 * epsilon_s * (Vth - Vb) / q) * ((Nd + Na) / (Nd * Na)))) : 0;
    // const W = Math.sqrt((2 * epsilon_s / q * Nd) * (V_b - V));

    const Wn = W * (Na / (Nd + Na));
    const Wp = W * (Nd / (Nd + Na));

    const qNa = q * Na;
    const qNd = q * Nd;

    const maxQNDA = (qNa > qNd) ? qNa : qNd;
    const maxAbsX = DiodeL / 2;
    const maxAbsY = maxQNDA;

    // Wyswietlanie danych
    $('#resultWn').text(Wn.toExponential(2));
    $('#resultWp').text(Wp.toExponential(2));

    // Rysowanie wykresu
    generatePN_diode('P-N_diode', Wp, Wn, maxAbsX, maxAbsY);
    generateChargeDensityChart('charge-density', qNa, qNd, Wp, Wn, maxAbsX, maxAbsY);
}

$('input[type="range"]').on('input', update);
$(document).ready(update);

