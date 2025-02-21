

// Funkcja do obliczania kąta załamania zgodnie z prawem Snella
function snellsLaw(n1, n2, theta1) {
    return Math.asin((n1 / n2) * Math.sin(theta1));
}

function Rad2Angle(angle_rad) {
    return angle_rad * Math.PI / 180;
}

// Funkcja do rysowania wizualizacji
function drawPlot(n1, n2, theta1) {
    const theta1Rad = Rad2Angle(theta1);
    const theta2Rad = snellsLaw(n1, n2, theta1Rad);

    const theta1RadForChart = -theta1Rad; 
    const theta2RadForChart = -theta2Rad - Math.PI; 

    // Współrzędne dla promienia padającego
    const line1 = { x: [0, Math.sin(theta1RadForChart)], y: [0, Math.cos(theta1RadForChart)] };
    const line2 = { x: [0, Math.sin(theta2RadForChart)], y: [0, Math.cos(theta2RadForChart)] };

    const layout = {
        title: 'Snell\'s Law Visualization',
        xaxis: { range: [-1, 1], title: 'X Axis' },
        yaxis: { range: [-1, 1], title: 'Y Axis' },
        showlegend: true,
        //annotations: annotations
    };

    Plotly.newPlot('plot',
        [
            { x: line1.x, y: line1.y, mode: 'lines', name: 'Incident Ray', line: { color: 'red', width: 2 } },
            { x: line2.x, y: line2.y, mode: 'lines', name: 'Refracted Ray', line: { color: 'blue', width: 2 } },
            { x: [-1,1], y: [0,0] , mode: 'lines', name: 'Border', line: { color: 'black', width: 4 } },
            //{ x: normalX, y: normalY, mode: 'lines', name: 'Normal', line: { color: 'green', width: 2, dash: 'dash' } },
            //{ x: incidentArc.x, y: incidentArc.y, mode: 'lines', name: 'Incident Angle', line: { color: 'orange', width: 2 } },
            //{ x: refractedArc.x, y: refractedArc.x, mode: 'lines', name: 'Refracted Angle', line: { color: 'purple', width: 2 } },
        ]
        , layout);
}



// ******************************************************************************

// Początkowe wartości parametrów
let n1 = 1.0;
let n2 = 1.5;
let theta1 = 45;

// Funkcja do aktualizacji wykresu
function updatePlot() {
    n1 = parseFloat(document.getElementById('n1').value);
    n2 = parseFloat(document.getElementById('n2').value);
    theta1 = parseFloat(document.getElementById('theta1').value);
    drawPlot(n1, n2, theta1);
}

// Inicjalizacja wykresu
drawPlot(n1, n2, theta1);








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
