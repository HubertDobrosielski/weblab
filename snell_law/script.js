function snellsLaw(n1, n2, theta1) {
    return Math.asin((n1 / n2) * Math.sin(theta1));
}
function rad2deg(radians) {
    return radians * (180 / Math.PI);
}
function deg2rad(degrees) {
    return degrees * (Math.PI / 180);
}

function drawPlot(theta1rad, theta2rad) {

    const theta1RadForChart = -theta1rad;
    const theta2RadForChart = -theta2rad - Math.PI;

    const line1 = { x: [0, Math.sin(theta1RadForChart)], y: [0, Math.cos(theta1RadForChart)] };
    const line2 = { x: [0, Math.sin(theta2RadForChart)], y: [0, Math.cos(theta2RadForChart)] };

    const layout = {
        title: 'Snell\'s Law Visualization',
        showlegend: false, // Ukrywa legendę
        autosize: true, // Automatyczne dopasowanie rozmiaru wykresu
        margin: { l: 0, r: 0, t: 0, b: 0 }, // Minimalne marginesy
        xaxis: {
            range: [-1, 1],
            showgrid: false, // Ukrywa siatkę (kratkę) na osi X
            showline: false, // Ukrywa linię osi X
            showticklabels: false // Ukrywa etykiety osi X
        },
        yaxis: {
            range: [-1, 1],
            showgrid: false, // Ukrywa siatkę (kratkę) na osi Y
            showline: false, // Ukrywa linię osi Y
            showticklabels: false // Ukrywa etykiety osi Y
        }
        //annotations: annotations
    };

    Plotly.newPlot('plot',
        [
            { x: line1.x, y: line1.y, mode: 'lines', name: 'Incident Ray', line: { color: 'red', width: 2 } },
            { x: line2.x, y: line2.y, mode: 'lines', name: 'Refracted Ray', line: { color: 'blue', width: 2 } },
            { x: [-1, 1], y: [0, 0], mode: 'lines', name: 'Border', line: { color: 'black', width: 4 } },
            { x: [0, 0], y: [-1, 1], mode: 'lines', name: 'Normal', line: { color: 'green', width: 2, dash: 'dash' } },
            //{ x: incidentArc.x, y: incidentArc.y, mode: 'lines', name: 'Incident Angle', line: { color: 'orange', width: 2 } },
            //{ x: refractedArc.x, y: refractedArc.x, mode: 'lines', name: 'Refracted Angle', line: { color: 'purple', width: 2 } },
        ]
        , layout);
}

function updatePlot() {
    console.log("update");
    const n1 = slider_n1.GetVal();
    const n2 = slider_n2.GetVal();
    const theta1 = slider_theta1.GetVal();
    const theta1rad = deg2rad(theta1);
    const theta2rad = snellsLaw(n1, n2, theta1rad);
    console.log("n1: ", n1, "n2: ", n2, "theta1: ", theta1, "theta1rad: ", theta1rad, "theta2rad: ", theta2rad);
    drawPlot(theta1rad, theta2rad);
}

// ******************************************************************************
const slider_n1 = createSlider({ containerId: 'n1_param', min: 1, max: 2, step: 0.1, onChange: updatePlot })
const slider_n2 = createSlider({ containerId: 'n2_param', min: 1, max: 2, step: 0.1, onChange: updatePlot })
const slider_theta1 = createSlider({ containerId: 'theta1_param', min: 0, max: 90, step: 1, onChange: updatePlot })

updatePlot();

$(window).on('resize', function() {
    updatePlot();
});





// Dodanie tekstu opisującego kąty
// const annotations = [
//     {
//         x: 0.2 * Math.cos((-90 + theta1 / 2) * Math.PI / 180), y: 0.2 * Math.sin((-90 + theta1 / 2) * Math.PI / 180),
//         text: `θ₁ = ${theta1.toFixed(1)}°`,
//         showarrow: false,
//         font: { size: 12, color: 'orange' }
//     },
//     {
//         x: 0.2 * Math.cos((-90 - (refractedAngle * 180 / Math.PI) / 2) * Math.PI / 180), y: 0.2 * Math.sin((-90 - (refractedAngle * 180 / Math.PI) / 2) * Math.PI / 180),
//         text: `θ₂ = ${(refractedAngle * 180 / Math.PI).toFixed(1)}°`,
//         showarrow: false,
//         font: { size: 12, color: 'purple' }
//     }
// ];
