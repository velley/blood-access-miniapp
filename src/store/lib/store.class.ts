import { BehaviorSubject, Observable } from 'rxjs';
import { filter } from 'rxjs/operators';

export class STORE<T> {

  static storeNames: string[]      = [];
  static storeList: STORE<any>[]   = [];

  public  name: string;
  public  key: number;
  private stateNames: string[];
  private publisherhub: { [propName: string]: BehaviorSubject<T> }; 

  static checkStore(name: string) {
    return STORE.storeNames.includes(name)
  }

  static findStoreByKey(key: number) {
    const index = STORE.storeList.findIndex( item => item.key === key )
    if(index > -1) {
      return STORE.storeList[index]
    } else {      
      throw new Error('can not find store what key is ' + key)      
    }
  }
  
  constructor(name: string) {    
    this.name               = name    
    this.stateNames         = []     
    this.publisherhub       = {}      
    this.key                = new Date().getTime()
    STORE.storeNames.push(name)    
    STORE.storeList.push(this)  
    console.log(STORE.storeList)
  }  

  private createPlublisher(
    stateName: keyof T, 
    data: T, 
    observable?: Observable<T>    
  ) {    
    this.publisherhub[stateName as string] = new BehaviorSubject<T>(data) 
    this.stateNames.push(stateName as string)
    if(observable) 
      observable.subscribe(data => this.publisherhub[stateName as string].next(data))        
  }    

  public get(stateName: keyof T) {    
    let index = this.stateNames.indexOf(stateName as string)
    if(index === -1) {
      this.createPlublisher(stateName, null)
    }
    return this.publisherhub[stateName as string].pipe( filter( data => Boolean(data) ))
  }

  public set(stateName: keyof T, data: T): void {    
    if(this.stateNames.includes(stateName as string)){      
      this.publisherhub[stateName as string].next(data)
    } else {         
      this.createPlublisher(stateName, data)
    }
  }  
  
  public checkStateName(stateName: keyof T) {
    return this.stateNames.includes(stateName as string)
  }

  public destroy() {
    for(let key in this.publisherhub){
      this.publisherhub[key].complete()
    }
    const index = STORE.storeList.findIndex( item => item.name === this.name )
    STORE.storeList.splice(index, 1)
    STORE.storeNames.splice(index, 1)    
  }
}