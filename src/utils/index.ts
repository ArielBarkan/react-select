export const generateTitle = (options:[]):string=>{
    return options.map((item:any, index:number)=> `${index+1} - ${item.label}`).join("\n")
}