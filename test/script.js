document.addEventListener("DOMContentLoaded", function() {
    const n1Slider = document.getElementById('n1');
    const n2Slider = document.getElementById('n2');
    const theta1Slider = document.getElementById('theta1');

    const n1Value = document.getElementById('n1-value');
    const n2Value = document.getElementById('n2-value');
    const theta1Value = document.getElementById('theta1-value');

    let n1 = parseFloat(n1Slider.value);
    let n2 = parseFloat(n2Slider.value);
    let theta1 = parseFloat(theta1Slider.value);

    function updatePlot() {
        const theta2 = Math.asin((n1 / n2) * Math.sin(theta1 * Math.PI / 180)) * 180 / Math.PI;

        const trace1 = {
            x: [0, Math.cos(theta1 * Math.PI / 180)],
            y: [0, Math.sin(theta1 * Math.PI / 180)],
            mode: 'lines',
            name: 'Promień padający',
            line: { color: 'blue', width: 2 }
        };

        const trace2 = {
            x: [0, Math.cos(theta2 * Math.PI / 180)],
            y: [0, -Math.sin(theta2 * Math.PI / 180)],
            mode: 'lines',
            name: 'Promień załamany',
            line: { color: 'red', width: 2 }
        };

        const layout = {
            xaxis: { range: [-1, 1], title: 'X' },
            yaxis: { range: [-1, 1], title: 'Y' },
            title: 'Wizualizacja Prawa Snelliusa',
            showlegend: true
        };

        Plotly.newPlot('plot', [trace1, trace2], layout);
    }

    n1Slider.addEventListener('input', function() {
        n1 = parseFloat(this.value);
        n1Value.textContent = this.value;
        updatePlot();
    });

    n2Slider.addEventListener('input', function() {
        n2 = parseFloat(this.value);
        n2Value.textContent = this.value;
        updatePlot();
    });

    theta1Slider.addEventListener('input', function() {
        theta1 = parseFloat(this.value);
        theta1Value.textContent = this.value;
        updatePlot();
    });

    updatePlot();
});