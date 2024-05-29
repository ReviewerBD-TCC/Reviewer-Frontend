import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

interface ChartData {
  label: string;
  data: number[];
}

interface Props {
  data: ChartData[];
}

const Graphic: React.FC<Props> = ({ data }) => {
  const chartRef = useRef<Chart>();

  const labels = ['Enviados', 'Respondidos'];
  const datat = {
    labels: labels,
    datasets: [{
      label: 'Taxa de adesão',
      
      data: [100, 100],
      backgroundColor: [
        '#18837E',
        '#9E2896',
        ],
      },
    ],
  };

  useEffect(() => {
    if (chartRef.current) {
      chartRef.current.destroy();
    }

    const ctx = document.getElementById('myChart') as HTMLCanvasElement;
    chartRef.current = new Chart(ctx, {
      type: 'doughnut',
      data: datat,
      options: {
        plugins: {
          tooltip: {
            callbacks: {
              label: function(context) {
                let label = context.label || '';

                if (label) {
                  label += ': ';
                }
                if (context.parsed) {
                  label += context.parsed.toFixed(0) + '%';
                }
                return label;
              }
            }
          }
        }
      }
    });

    return () => {
      if (chartRef.current) {
        chartRef.current.destroy();
      }
    };
  }, [data]);

  return <canvas id="myChart" />;
};

export default Graphic;
