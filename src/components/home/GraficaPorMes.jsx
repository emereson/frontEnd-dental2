import React, { useEffect } from 'react';
import Chart from 'chart.js/auto';

const GraficaPorMes = ({ allConsultas }) => {
  const consultasPorMes = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]; // Inicializamos un array con 12 elementos, uno para cada mes
  console.log(allConsultas);

  allConsultas?.forEach((consulta) => {
    // Obtenemos el mes de la fecha de creación del paciente
    const mesCreacion = new Date(consulta.createdAt).getMonth();

    // Incrementamos el contador de pacientes para el mes correspondiente
    consultasPorMes[mesCreacion]++;
  });

  useEffect(() => {
    // Datos de ejemplo para el gráfico
    const datosConsultasPorMes = {
      labels: [
        'Enero',
        'Febrero',
        'Marzo',
        'Abril',
        'Mayo',
        'Junio',
        'Julio',
      ],
      datasets: [
        {
          label: 'Consultas',
          data: consultasPorMes, // Aquí deberías reemplazar estos datos con tus datos reales
          borderColor: 'rgba(54, 162, 235, 1)',
          borderWidth: 2,
          fill: false,
          tension: 0.4, // Curvatura de la línea
          showLine: true,
          cubicInterpolationMode: 'monotone',
          pointStyle: 'rectRot', // Estilo de los puntos
          pointRadius: 5, // Tamaño de los puntos
        },
      ],
    };

    // Obtén el contexto del lienzo (canvas)
    const ctx = document
      .getElementById('consultasPorMesChart')
      .getContext('2d');

    // Crea el gráfico de líneas con flechas
    const consultasPorMesChart = new Chart(ctx, {
      type: 'line',
      data: datosConsultasPorMes,
      options: {
        elements: {
          line: {
            arrow: {
              enabled: true,
              angle: 45,
              length: 10,
              width: 5,
              backgroundColor: 'rgba(54, 162, 235, 1)',
            },
          },
        },
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });

    // Devuelve una función de limpieza para destruir el gráfico al desmontar el componente
    return () => {
      consultasPorMesChart.destroy();
    };
  }, [allConsultas]); // El efecto se ejecutará solo una vez al montar el componente

  return (
    <section className="home__sectionTwo">
      <h1>Consultas por Mes</h1>
      <canvas id="consultasPorMesChart"></canvas>
    </section>
  );
};

export default GraficaPorMes;
