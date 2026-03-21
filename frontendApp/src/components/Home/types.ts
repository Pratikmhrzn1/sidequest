export interface Country{
    name:string;
    cca2:string;
}
export type FieldKey = 'residence' | 'destination' | 'nationality';
export interface Field{
    key:FieldKey;
    label:string;
    backgroundColor:string;
}