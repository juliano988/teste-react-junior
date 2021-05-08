import React, { useState } from 'react';
import { productsDBSchema } from './customTypes';
import FormSec from './sections/FormSec';

export const ProductsDBContext = React.createContext<{ state: productsDBSchema[], setState: React.Dispatch<React.SetStateAction<productsDBSchema[]>> }>(undefined);

function App() {

  const [productsDB, setproductsDB] = useState<Array<productsDBSchema>>([]);

  return (
    <ProductsDBContext.Provider value={{ state: productsDB, setState: setproductsDB }}>
      <div>
        <h1>Teste para avaliação Frontend Junior React</h1>
        <FormSec />
      </div>
    </ProductsDBContext.Provider>
  );

}

export default App;
