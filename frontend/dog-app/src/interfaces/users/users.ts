export interface User{
  username:string,
  password:string,
  type:string
}

export interface UserDates{
  username:string,
  password:string,
  type:string
  dates:uDate[]
}


export interface uDate{
  date:Date,
  doctor:string,
  owner:string,
  dog:number,
}