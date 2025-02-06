

function generatePN_Diode(Wp, Wn, divId,RANGE) {
    const layout = {
        title: 'Struktura diody PN',
        xaxis: {
            title: 'Pozycja',
            range: RANGE,  // Przestrzeń na całej szerokości diody
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
function generateRHO(q,Na,Nd,Wp,Wn,RANGE, divId) {

    
    const qNa = q*Na;
    const qNd = q*Nd;

    console.log("q", q)
    console.log("Na", Na)
    console.log("Nd", Nd)
    console.log("qNd", qNd)
    console.log("qNa", qNa)

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
        xaxis: { title: 'X-axis', zeroline: true, range: RANGE},
        yaxis: { title: 'Y-axis', zeroline: true },
        showlegend: false
    };

    // Renderowanie wykresu
    Plotly.newPlot(divId, [rhoP, rhoN], layout);
}



// Stałe fizyczne
const q = 1.6e-19; // Ładunek elementarny (C)
const epsilon_s = 11.7 * 8.85e-12; // Przenikalność elektryczna krzemu (F/m)

// Funkcja obliczająca W, Wn i Wp
function obliczWnWp(N_A, N_D, V_b, V) {
    // N_A i N_D w jednostkach [m^-3]
    // V_b i V w jednostkach [V]

    // Całkowita szerokość warstwy zubożonej
    const W = Math.sqrt((2 * epsilon_s * (V_b - V) / q) * ((N_A + N_D) / (N_A * N_D)));

    // Obliczenia dla Wn i Wp
    const Wp = W * (N_D / (N_A + N_D));
    const Wn = W * (N_A / (N_A + N_D));

    // Zwracanie wyników
    return {
        W: W,
        Wn: Wn,
        Wp: Wp
    };
}

function update() {
    const mantysaNA = parseInt($('#sliderNAMantysa').val());
    const rzadNA = parseInt($('#sliderNARzad').val());
    const N_A = mantysaNA * Math.pow(10, rzadNA);
    const mantysaND = parseInt($('#sliderNDMantysa').val());
    const rzadND = parseInt($('#sliderNDRzad').val());
    const N_D = mantysaND * Math.pow(10, rzadND);
    const V_b = parseFloat($('#sliderVb').val());
    const V = parseFloat($('#sliderV').val());
    const { Wn, Wp } = obliczWnWp(N_A, N_D, V_b, V);
    const mantysaL = parseInt($('#sliderLMantysa').val());
    const rzadL = parseInt($('#sliderLRzad').val());
    const L = mantysaL * Math.pow(10, rzadL);

    $('#valueL').text(`${mantysaL}e${rzadL}`);
    $('#valueNA').text(N_A.toExponential(2));
    $('#valueND').text(N_D.toExponential(2));
    $('#valueVb').text(V_b.toFixed(2));
    $('#valueV').text(V.toFixed(2));

    $('#resultWn').text(Wn.toExponential(2));
    $('#resultWp').text(Wp.toExponential(2));

    const Wdiode = L;
    const RANGE = [-L,L];
    const WWn = Wn / Wdiode;
    const WWp = Wp / Wdiode;

    console.log("Wn =", Wn, "m");
    console.log("Wp =", Wp, "m");

    // Rysowanie wykresu
    generatePN_Diode(Wp, Wn, 'P-N_diode', RANGE);
    generateRHO(q,N_A,N_D,Wp,Wn, RANGE, "charge-density");
}

$('input[type="range"]').on('input', update);
$(document).ready(update);

