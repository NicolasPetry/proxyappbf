import React from 'react';
import { useContextAppMode } from './useContextAppMode';

export function MainContext(props: any) {
    const {
        children
    } = props;

    const [appMode, setAppMode] = React.useState<boolean>(true);

    const ContextAppMode = useContextAppMode();

    return (

        <ContextAppMode.Provider value={{appMode, setAppMode}}>
            {children}
          
           
        </ContextAppMode.Provider>
    )
}