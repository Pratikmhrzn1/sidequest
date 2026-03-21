export interface VisaDetails {
  // Backend schema uses Mixed — text can be a plain string (type:'string')
  // or an array of strings (type:'list'). Always normalise before rendering.
  type?: 'string' | 'list';
  text?: string | string[];
}
 
export interface VisaDestination {
  details?: VisaDetails;
}
 
export interface VisaOrigin {
  country?:     string;
  nationality?: string;
  destination?: VisaDestination[];
}
 
export interface VisaInfo {
  origin?: VisaOrigin[];
}