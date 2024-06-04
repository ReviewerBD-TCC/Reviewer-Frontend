import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import { ChartInterface } from 'interfaces/DashboardInterface/Chart';

const Graphic: React.FC<ChartInterface> = ({ data }) => {
  const chartRef = useRef<HTMLCanvasElement>(null);
  const chartInstance = useRef<Chart>();

  useEffect(() => {
    if (chartRef.current) {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }

      const ctx = chartRef.current.getContext('2d');
      if (ctx) {
        chartInstance.current = new Chart(ctx, {
          type: 'doughnut',
          data: {
            labels: ['Enviados', 'Respondidos'],
            datasets: [{
              label: 'Taxa de adesão',
              data: data,
              backgroundColor: [
                '#18837E',
                '#9E2896',
              ],
            }]
          },
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
      }
    }
  }, [data]);

  return <canvas ref={chartRef} />;
};

export default Graphic;
