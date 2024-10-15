import {languages} from "../types/types";

interface MonthNames {
    [key: string]: string[];
}
const monthNames:MonthNames={
    'pt-br': [
        'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
        'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
    ],
}
export const getMonthName = (date:Date,short:boolean,locale = "pt-br"):string =>{
    const month = date.getMonth();
    const localeMonthNames = monthNames[locale];

    if (!localeMonthNames) {
        return '';
    }

    return short ? localeMonthNames[month].substring(0, 3) : localeMonthNames[month];
}
declare global{
    interface Date{
        getDayOfWeekName():string;
        daysOfWeek(language?:languages):string[];
    }
}
export function DateToStringInput(dat:Date):string{
    let date:Date = new Date(dat)
    return date.toISOString().split("T")[0]
}
export function DateToStringLocal(dat:Date){
    let date:Date = new Date(dat)
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // O mês é baseado em zero
    const year = date.getFullYear();
    console.log(`${day}/${month}/${year}`)

    // Retorna a data formatada como uma string
    return `${day}/${month}/${year}`;
}
