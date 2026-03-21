import { Field } from "./types";
export const FIELDS: Field[] = [
    {
        key:'residence',
        label:'Country of residence',
         backgroundColor:'#10B981'
    },
    {
        key: 'destination',
        label: 'Travel Destination',
        backgroundColor: '#8B5CF6'
    },
    { 
        key: 'nationality',
        label: 'Country Of Nationality',
        backgroundColor: '#3B82F6' 
    }
];
export const getFlagEmoji = (cca2:string):string =>{
    if(!cca2 || cca2.length!==2)
        return '';
    const codePoints = cca2.toUpperCase().split('')
    .map(char =>0x1f1e6+ char.charCodeAt(0) - 65);
    return String.fromCodePoint(...codePoints);
}
export const getResponsiveValue =
    (width:number,
    small:number,
    medium:number,
    large:number): number =>{
        if(width<375)
            return small;
        if(width<768)
            return medium;
        return large;
    }
