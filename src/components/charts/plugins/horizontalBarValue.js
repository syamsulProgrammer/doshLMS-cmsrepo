const horizontalBarValue = {
    id: 'horizontalBarValue',
    beforeDatasetsDraw(chart,args, plugin){
        const {ctx, data, chartArea: {top, bottom, left, right, width, height}, scales:{x, y}} = chart
        ctx.save()
        ctx.fillStyle = 'rgba(0,0,0,.8)'
        data.datasets[0].data.forEach((datapoint, index)=>{
            ctx.textAlign = "center";
            ctx.fillText(datapoint, width - 5, y.getPixelForValue(index) + 5);
            ctx.globalCompositeOperation='destination-over';
        })

    }
}

export default horizontalBarValue