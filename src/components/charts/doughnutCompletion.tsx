"use client"
import {
    Chart as ChartJS,
    ArcElement,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
  
  ChartJS.register(
    ArcElement,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );

const ChartDoughnutCompletion = (props:any)=>{
    
    return(
        <div className='w-48'>
            <Doughnut
                options={{
                        responsive: true,
                }}
                plugins={[{
                        id: 'innerText',
                        afterDatasetDraw: function(chart){
                            var width = chart.width,
                            height = chart.height,
                            ctx = chart.ctx;
                            ctx.restore();
                            var fontSize = (height / 160).toFixed(2);
                            ctx.font = fontSize + "em sans-serif";
                            ctx.textBaseline = "top";
                            var text = props.progress + " %",
                            textX = Math.round((width - ctx.measureText(text).width) / 2),
                            textY = height / 2;
                            ctx.fillText(text, textX, textY);
                            ctx.save();
                        }
                }]}
                data={{
                    datasets: [{
                        label: '',
                        data: [ (parseInt(props.progress)),parseFloat(props.totalCount).toFixed(1)],
                        backgroundColor: [ '#1DD21A','#ff9600' ]
                    }]
                }}
            />
        </div>
    )

       //   data: [parseFloat(props.totalCount).toFixed(1), (100 - parseInt(props.progress))],
}

export default ChartDoughnutCompletion