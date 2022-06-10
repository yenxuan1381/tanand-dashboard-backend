type Json = string | number | boolean | null | { [property: string | number]: Json } | Json[];

type DeviceData = {
    timestamp:number, 
    deviceId:string, 
    temperature:number, 
    humidity:number
}

type DeviceQuery = {
    result: string,
    table: number,
    _start: number, //timestamp
    _stop: number,  //timestamp
    _time: string,
    _value: number,
    _field: string,
    _measurement: string,
    deviceID: string
  }