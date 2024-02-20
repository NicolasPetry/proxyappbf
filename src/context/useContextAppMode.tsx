import React from "react";

interface AppModeContextType {
    appMode: boolean,
    setAppMode: (appMode: boolean) => void
}
const context = React.createContext<AppModeContextType>( {
    appMode: true,
    setAppMode: () => { }
});

export function useContextAppMode() {
    return context;
}