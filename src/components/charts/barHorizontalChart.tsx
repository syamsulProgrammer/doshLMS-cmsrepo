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

import ChartDataLabels from 'chartjs-plugin-datalabels';
  
ChartJS.register(
    ArcElement,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);
  
import { Bar } from 'react-chartjs-2';
import horizontalBarBlock from './plugins/horizontalBlackTrack';
import horizontalBarValue from "./plugins/horizontalBarValue"

interface Props{
  data:Array<any>
}

const ChartBarHorizontal = (props:Props)=>{
  var labels:any = []
  var dataValue:any = []
  // console.log(props)
  props.data.map((item)=>{
    // console.log(item)
    labels.push(item.fullname)
    dataValue.push(parseFloat(item.total))
  })
  if (props.data.length > 0) {
    return(
      <Bar
      plugins={[horizontalBarBlock, horizontalBarValue]}
      options={{
        indexAxis: 'y',
        responsive: true,
        maintainAspectRatio: true,
        scales: {
          x: {
            display: false,
            grid:{
              display: false
            }
          },
          y: {
            grid:{
              display: false
            }
          }
        },
        plugins: {
          tooltip: {
            enabled: false
          },
            legend: {
                display: false
            },
            datalabels: {
                color: 'black',
                align: 'end',
                anchor: 'end'
            }
        }
      }}
      data={{
        labels: labels,
        datasets: [{
          label: 'Dataset 1',
          data: dataValue,
          backgroundColor: '#E4B719',
          borderRadius: 5
        }]
      }}
    />
    )
  } else {
    return(
      <div className='flex pt-3 justify-center h-full items-center mb-3'>
        <div className='h-full p-5 bg-gray-100 w-full rounded-lg text-center flex items-center justify-center'>
        No Data Found
        </div>
      </div>
    )
  }

    
}

export default ChartBarHorizontal