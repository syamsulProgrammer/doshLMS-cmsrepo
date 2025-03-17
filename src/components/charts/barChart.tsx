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
import moment from 'moment';
  
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
const ChartBar = (props:any)=>{
  var objectByDate:any = {}
  var objectByDayWeek:any = {}
  var dayCount = 30

  if (props.duration === 'week') {
    dayCount = 6
  }

  const today = moment().format('YYYY-MM-DD')
  const pastWeek = moment().subtract(1, 'month').format('YYYY-MM-DD')
  for (let index = 6; index >= 0; index--) {
    objectByDate[moment().subtract(index, 'days').format('YYYY-MM-DD')] = {
      day: moment().subtract(index, 'days').format('ddd'),
      total: 0
    }
    objectByDayWeek[moment().subtract(index, 'days').format('ddd')] = {
      day: moment().subtract(index, 'days').format('ddd'),
      total: 0
    }
    // if (objectByDayWeek.hasOwnProperty(moment().subtract(index, 'days').format('ddd'))) {
    //   objectByDayWeek[moment().subtract(index, 'days').format('ddd')] = {
    //     day: moment().subtract(index, 'days').format('ddd'),
    //     total: 0
    //   }
    // } else {
    //   objectByDayWeek[moment().subtract(index, 'days').format('ddd')] = {
    //     day: moment().subtract(index, 'days').format('ddd'),
    //     total: 0
    //   }
    // }
    
  }

  var labels = []
  var datasetValue:Array<any> = []
  props.data ? props.data.map((item:any)=>{
    if (objectByDate.hasOwnProperty(item.dt)) {
      objectByDate[item.dt].total =  objectByDate[item.dt].total + parseFloat(item.total)
    }
    if (objectByDayWeek.hasOwnProperty(moment(item.dt).format('ddd'))) {
      objectByDayWeek[moment(item.dt).format('ddd')].total =  objectByDayWeek[moment(item.dt).format('ddd')].total + parseFloat(item.total)
    }
  }) : null
  if (props.duration === 'week') {
    for (let property in objectByDate) {
      labels.push(objectByDate[property].day)
      datasetValue.push(objectByDate[property].total)
    }    
  } else {
    for (let property in objectByDayWeek) {
      labels.push(objectByDayWeek[property].day)
      datasetValue.push(objectByDayWeek[property].total)
    }    
  }

  // for (let property2 in objectByDayWeek) {
  //   labels.push(objectByDate[property2].day)
  //   datasetValue.push(objectByDate[property2].total)
  // }

  return(
    <Bar
      options={{
        responsive: true,
        // maintainAspectRatio: false,
        scales: {
          x: {
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
          legend: {
            display: false
          }
        }
      }}
      data={{
        labels: labels,
        datasets: [{
          label: 'Dataset 1',
          data: datasetValue,
          backgroundColor: '#1DD11A',
          borderRadius: 5
        }]
      }}
    />
  )
}

export default ChartBar