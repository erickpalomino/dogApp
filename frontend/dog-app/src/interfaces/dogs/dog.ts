export interface Dog{
  dni:string,
  name:string,
  race:string,
  genre:string,
  birth:string,
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
