"use client"
import colorHelper from '@/app/libs/colorHelpers';
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
// import ChartDataLabels from 'chartjs-plugin-datalabels';
import { useState } from 'react';
  
ChartJS.register(
ArcElement,
CategoryScale,
LinearScale,
BarElement,
Title,
Tooltip,
Legend
);

import { Doughnut } from 'react-chartjs-2';
import sliceThickness from './plugins/sliceThickness';
import doughnutInnerLabel from './plugins/doughnutInnerLabel';

interface Props {
    data:any,
    labelUnit:string,
    title?:string,
    footerStatistic?:any
}

const ChartDoughnut = (props: Props)=>{
    var arrLabel:String[] = []
    var arrValue:String[] = []
    
    var arrColor = ['#7197C4', '#BD5151','#1DD21A','#60A5FA', ' #f7dc6f',' #bb8fce', '#58d68d','#bb8fce']
    var valueIsNull = true
    props.data.map((item:any)=>{
        if (valueIsNull) {
            if (item.value > 0) {
                valueIsNull = false
            }
        }
        // console.log(item.value, "value doughnut")
        arrLabel.push(item.name)
        if (item.value > 0) {
            arrValue.push(Number.isInteger(item.value) ? parseFloat(item.value).toFixed(1) : item.value)            
        }

    })
    return(
        <div className='w-full'>
            <div className='flex justify-center'>
                <div className='w-48 items-center'>
                    {valueIsNull ? (
                        <div className='flex justify-center p-5 mb-3 bg-gray-100 mt-3 rounded-lg'>
                            No Data Found
                        </div>
                    ) : (
                        <Doughnut
                            // plugins=[ChartDataLabels]
                            plugins={[sliceThickness, doughnutInnerLabel]}
                            options={{
                                layout: {
                                    padding: 20
                                },
                                events: [
                                    'mousemove',
                                    'mouseout'
                                ],
                                onHover: (evt, activeEls)=>{
                                    if (activeEls.length === 0) {
                                        return
                                    }
                                    // console.log(activeEls[0].element.$animations)
                                    // activeEls[0].element.innerRadius += 20;
                                    // activeEls[0]._model.outerRadius += 20;
                                    // activeEls[0]._chart.draw();
                                },
                                responsive: true,
                                plugins: {
                                    
                                    legend:{
                                        fullSize: true,
                                        position: "top",
                                        display: false,
                                        textDirection: "top",
                                        align: 'center',
                                        labels: {
                                            useBorderRadius: true,
                                            borderRadius: 10,
                                            padding: 10,
                                            pointStyle: 'circle'
                                        },
                                        onClick: ()=>{
                                            // console.log('do nothing')
                                        },
                                        title: {
                                            position: 'center',
                                        }
                                    },
                                    tooltip: {
                                        position:"nearest",
                                        displayColors: false,
                                        callbacks: {
                                            title: (e)=>{
                                                return e[0].label
                                            },
                                            beforeBody: ()=>{
                                                return ''
                                            },
                                            label: (e)=>{
                                                return e.parsed + ' ' + props.labelUnit
                                            }
                                        }
                                    }
                                }
                            }}
                            data={{
                            labels: arrLabel,
                            datasets: [{
                                label: props.title,
                                data: arrValue,
                                // borderWidth: 8,
                                // hoverBorderWidth: 0,
                                hoverOffset: 10,
                                backgroundColor: arrColor
                            }]
                            }}
                        />
                    )}

                </div>
            </div>
            {/* <div className='flex justify-center gap-2 my-3 text-white font-medium'>
                {props.data.map((item:any, index:number)=>{
                    return(
                        <button className={`p-1 rounded-lg text-xs`} style={{
                            backgroundColor: arrColor[index]
                        }} key={`buttonLabel${index}`}>{item.name}</button>
                    )
                })}
            </div> */}
            <div className='w-full text-[#646464] mt-3'>
                {props.footerStatistic.map((item:any, index:number)=>{
                    return(
                        <div key={`footStat${index}`} className='flex justify-left gap-3'>
                            <div>{item.title}</div>
                            <div>:</div>
                            <div className='font-bold'>{item.value} {props.labelUnit}</div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default ChartDoughnut