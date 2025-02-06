

function generatePN_diode(divId, Wp, Wn, Range) {
    const layout = {
        title: 'Struktura diody PN',
        xaxis: {
            title: 'Pozycja',
            range: Range,  // Przestrzeń na całej szerokości diody
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
                x0: -1, x1: 0,
                y0: 0, y1: 1,
                fillcolor: 'rgba(0, 0, 255, 1)',
                line: { width: 2, color: 'blue' },
                name: 'p-typ'
            },
            // Obszar n-typ (czerwony)
            {
                type: 'rect',
                x0: 0, x1: 1,
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

function generateChargeDensityChart(divId, qNa, qNd, Wp, Wn, RangeX, RangeY) {

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
        xaxis: { title: 'X-axis', zeroline: true, range: RangeX },
        yaxis: { title: 'Y-axis', zeroline: true, range: RangeY },
        showlegend: false
    };

    // Renderowanie wykresu
    Plotly.newPlot(divId, [rhoP, rhoN], layout);
}



// Stałe fizyczne
const q = 1.6e-19; // Ładunek elementarny (C)
const epsilon_s = 11.7 * 8.85e-12; // Przenikalność elektryczna krzemu (F/m)



function update() {
    const Nd = parseInt($('#sliderNDMantysa').val()) * Math.pow(10, parseInt($('#sliderNDRzad').val()));
    const Na = parseInt($('#sliderNAMantysa').val()) * Math.pow(10, parseInt($('#sliderNARzad').val()));
    const L = parseInt($('#sliderLMantysa').val()) * Math.pow(10, parseInt($('#sliderLRzad').val()));
    const V_b = parseFloat($('#sliderVb').val());
    const V = parseFloat($('#sliderV').val());

    $('#valueL').text(L.toExponential(2));
    $('#valueNA').text(Nd.toExponential(2));
    $('#valueND').text(Na.toExponential(2));
    $('#valueVb').text(V_b.toFixed(2));
    $('#valueV').text(V.toFixed(2));

    const W = Math.sqrt((2 * epsilon_s * (V_b - V) / q) * ((Nd + Na) / (Nd * Na)));
    const Wn = W * (Na / (Nd + Na));
    const Wp = W * (Nd / (Nd + Na));

    const qNa = q * Na;
    const qNd = q * Nd;

    const maxQNDA = (qNa > qNd) ? qNa : qNd;
    const RangeY = [-maxQNDA, maxQNDA];
    const RangeX = [-L, L];

    // Wyswietlanie danych
    $('#resultWn').text(Wn.toExponential(2));
    $('#resultWp').text(Wp.toExponential(2));

    // Rysowanie wykresu
    generatePN_diode('P-N_diode', Wp, Wn, RangeX);
    generateChargeDensityChart('charge-density', qNa, qNd, Wp, Wn, RangeX, RangeY);
}

$('input[type="range"]').on('input', update);
$(document).ready(update);

