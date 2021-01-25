import { useState, useEffect } from 'react';
import { Observable} from 'rxjs';

export function useObservable<T>(
  input$: Observable<T>,
  initState?: T
): T | undefined {

  const [value, setValue] = useState(initState)

  useEffect(
    () => {      
      const subcription = input$.subscribe( data => setValue(data))
      return () => subcription.unsubscribe()
    },
    []
  )
  return value
}