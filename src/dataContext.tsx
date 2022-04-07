import React, { createContext, useEffect, useState} from 'react';
import jsonData from "./data.json";

export const DataContext = createContext ({} as any);

export const DataProvider: React.FC= (props:any) => {
   const [data, setData] = useState(jsonData);

        return (
            <div>
                <DataContext.Provider value={{
                  data: data,
                  setData: setData
                }}>
                    {props.children}
                </DataContext.Provider>
            </div>
        )
}