import { StringMappingType } from "typescript"


export interface Dog{
  dni:number,
  name:string,
  race:string,
  genre:String,
  birth: Date,
  pic:string,
}

export interface DogFile{
  dni:string,
  name:string,
  race:string,
  genre:string,
  birth:string,
  pic:File,
}



export interface FinDogRequest{
  name:string,
}

export interface DogDiag{
  ID:number,
  dni:number,
  name:string,
  race:string,
  genre:String,
  birth: Date,
  pic:string,
  diagnostics:Diagnostic[]
}

export interface Diagnostic{
  symptom     :string ,
	medicines   :string  ,
	price       :number, 
	bloodResult :string,
  date:Date,  
	xrayPic     :string , 
	dogID       :number,
  diagnostic :string, 
  doctor:string,   
}