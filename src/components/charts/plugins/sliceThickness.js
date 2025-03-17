const sliceThickness = {
    id: 'sliceThickness',
    beforeDatasetsDraw(chart,args, plugin){
        const {ctx} = chart

        chart.getDatasetMeta(0).data.forEach((datapoint, index)=>{
            if (datapoint.active === true) {
                chart.getDatasetMeta(0).data[index].innerRadius = 30
                chart.getDatasetMeta(0).data[index].outerRadius = 85
            } else {
                chart.getDatasetMeta(0).data[index].innerRadius = 37.5
                chart.getDatasetMeta(0).data[index].outerRadius = 75
            }
        })

    }
}

export default sliceThickness