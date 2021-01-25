import { createContext } from "react";

export interface ContextIns {
  name: string;
  value: React.Context<number>
}

export class CONTEXT {
  
  protected static contexts: ContextIns[] = []

  public name: string;
  public value: React.Context<number>;

  constructor(name: string) {
    this.name = name
    this.value = createContext(0)
    CONTEXT.contexts.push(this)
  }

  static gainContext(name: string) {
    const index = CONTEXT.contexts.findIndex( item => item.name === name )    
    if(index > -1) {
      return CONTEXT.contexts[index]
    } else {      
      return new CONTEXT(name)
    }
  }
  
}