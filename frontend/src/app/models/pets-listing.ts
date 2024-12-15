import { behavior } from "./behaviorModel";
export interface PetsListing {
    petid: number, 
    date_added: Date, 
    name: string, 
    gender: string, 
    age: number, 
    type: string, 
    race: string, 
    behaviors: behavior[],
    photo: string,
    shelterid: number,
    description: string,
}
