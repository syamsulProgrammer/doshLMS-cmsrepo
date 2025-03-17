const doughnutInnerLabel = {
    id: 'doughnutInnerLabel',
    afterDatasetsDraw(chart,args, plugin){
        const {ctx, data} = chart

        const generalData = chart.getDatasetMeta(0).data[0]
        const xCenter = generalData.x
        const yCenter = generalData.y
        // console.log(ctx)
        // console.log(data)
        var totalData = 0
        data.datasets[0].data.forEach((value, index)=>{
            totalData = parseFloat(totalData) + parseFloat(value)
        })


        chart.getDatasetMeta(0).data.forEach((datapoint, index)=>{
            // console.log(datapoint, "datapoint")
            // if (datapoint.active === true) {
            //     chart.getDatasetMeta(0).data[index].innerRadius = 30
            //     chart.getDatasetMeta(0).data[index].outerRadius = 85
            // } else {
            //     chart.getDatasetMeta(0).data[index].innerRadius = 37.5
            //     chart.getDatasetMeta(0).data[index].outerRadius = 75
            // }
            const startAngle = datapoint.startAngle
            const endAngle = datapoint.endAngle
            const radius = datapoint.innerRadius + 18
            const centerAngle = (startAngle + endAngle) / 2
            const xPos = radius * Math.cos(centerAngle)
            const yPos = radius * Math.sin(centerAngle)
            ctx.save();
            ctx.translate(xCenter, yCenter)
            if (datapoint.active === true) {
                // ctx.translate(xCenter, yCenter)
                const newRad = datapoint.innerRadius + 30
                const newCenterAngle = (startAngle + endAngle) / 2
                const newXPos = newRad * Math.cos(newCenterAngle)
                const newYPos = newRad * Math.sin(newCenterAngle)
                ctx.font = 'bold 16px sans-serif'
                ctx.fillStyle = '#FFFFFF'
                ctx.textAlign = 'center'
                ctx.textBaseline = 'middle'
                ctx.fillText(parseFloat(((data.datasets[0].data[index]) / totalData) * 100).toFixed(0) +'%', newXPos, newYPos)
                // ctx.zIndex(99)
                ctx.restore()
            } else {
                ctx.font = 'bold 14px sans-serif'
                ctx.fillStyle = '#FFFFFF'
                ctx.textAlign = 'center'
                ctx.textBaseline = 'middle'
                ctx.fillText(parseFloat(((data.datasets[0].data[index]) / totalData) * 100).toFixed(0) +'%', xPos, yPos)
                // ctx.zIndex(99)
                ctx.restore()
            }

        })

    }
}

export default doughnutInnerLabel