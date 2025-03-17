const horizontalBlackTrack = {
    id: 'horizontalBlackTrack',
    beforeDatasetsDraw(chart,args, plugin){
        const {ctx, data, chartArea: {top, bottom, left, right, width, height}, scales:{x, y}} = chart
        ctx.save()
        const barThickness = chart.getDatasetMeta(0).data[0].height
        ctx.fillStyle = 'rgba(0,0,0,.1)'
        let longestIndex = 0
        data.datasets[0].data.forEach((datapoint, index)=>{
            // console.log(datapoint, "datapoint")
            if(longestIndex < datapoint) 
            longestIndex = datapoint;
            // ctx.fillRect(left,y.getPixelForValue(index) - (barThickness / 2),width - 40,barThickness)
        })
        data.datasets[0].data.forEach((datapoint, index)=>{
            ctx.fillRect(left,y.getPixelForValue(index) - (barThickness / 2),width,barThickness)
        })

    }
}

export default horizontalBlackTrack