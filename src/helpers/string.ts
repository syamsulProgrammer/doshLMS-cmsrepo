export const get_random_array = (list:any) => {
    return list[Math.floor((Math.random()*list.length))];
}

export const numberOnly = (string:string)=>{
    return string.replace(/[^0-9.]/g, '').replace(/(\..*?)\..*/g, '$1')
}

export const getFirstChar = (string:string)=>{
    const arr = string.split("")
    return arr[0]
}

export const toBase64 = (file:any) => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
});