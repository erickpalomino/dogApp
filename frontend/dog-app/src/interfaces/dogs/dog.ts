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
