
import { createContext, useState } from "react";

export const OptionsContext = createContext();

export const OptionsProvider = ({ children }) => {

    const [options, setOptions] = useState({
        appId: 'c1524ecb52da48a88e4bd610d33c2334',
        token: '007eJxTYFCNOqQQ3WXVp3VZR0nj3xJXc+cVOZ/cDslYJe0REky9f1aBIdnQ1MgkNTnJ1Cgl0cQi0cIi1SQpxczQIMXYONnI2Njko4tV8pmp1smC0TysjAwQCOLzMJSkFpfoJmck5uWl5jAwAAC0lyGt',
        channel: 'test-channel',
    });

    return (
        <OptionsContext.Provider value={{ options, setOptions }}>
            {children}
        </OptionsContext.Provider>
    )
}
