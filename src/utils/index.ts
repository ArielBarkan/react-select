export const generateTitle = (options:[]):string=>{
    return options.map((item:any, index:number)=> `${item.label}`).join("\n")
}