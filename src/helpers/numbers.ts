const numberHelpers = {
    numberWithCommas: (x:string, commaCount:number = 2)=>{
        if (x) {
            // console.log(x)
            x = Number(x).toFixed(2)
            var parts = x.toString().split(".");
            parts[0]=parts[0].replace(/\B(?=(\d{3})+(?!\d))/g,".");
            var partsMerged = parts.join(",")
            // console.log(partsMerged)
            // console.log(numberHelpers.numberWithDot(numberHelpers.removeRibuanFloat(partsMerged).toFixed(2).replace('.', ',')))
            return partsMerged;
        }
        return x
    },
    numberWithDot: (x:string)=>{
        if (x) {
            var parts = x.toString().split(",");
            parts[0]=parts[0].replace(/\B(?=(\d{3})+(?!\d))/g,",");
            return parts.join(".");
        }
        return x
    },
    parsingRibuan: (number:string)=>{
        // console.log(number, "number")
        if (number) {
            var clean = number.split(".").join('')
            // export const parsingRibuan = (number = 0)=>{
            // number = number.replace('.', '')
            return clean.toString().replace(/\B(?=(\d{3})+(?!\d))/g,".");
        } else {
            return number
        }
        
        // }
    },
    removeRibuan: (number:string)=>{
        var clean = number.toString().split(".").join('')
        var parsed = parseFloat(clean)
        return parsed
    },
    removeRibuanFloat: (number:string)=>{
        var clean = number.toString().split(".").join('')
        var floatString = clean.replace(',', '.')
        var parsed = parseFloat(floatString)
        return parsed
    },
    numberOnly: (string:string)=>{
        return string.replace(/[^0-9.]/g, '').replace(/(\..*?)\..*/g, '$1')
    }
}

export default numberHelpers