import { Button, ButtonGroup } from '@material-ui/core';
import React, { useState } from 'react';
import { productsDBSchema } from '../customTypes';
import FormSec from './sections/FormSec';
import TableSec from './sections/TableSec';

export const ProductsDBContext = React.createContext<{ state: productsDBSchema[], setState: React.Dispatch<React.SetStateAction<productsDBSchema[]>> }>(undefined);

function App() {

  const [productsDB, setproductsDB] = useState<Array<productsDBSchema>>([]);
  const [menu, setmenu] = useState<string>('form')

  return (
    <ProductsDBContext.Provider value={{ state: productsDB, setState: setproductsDB }}>
      <div>
        <h1>Teste para avaliação Frontend Junior React</h1>
        <div>
          <ButtonGroup color="primary" aria-label="outlined primary button group">
            <Button disabled={menu === 'form' ? true : false} onClick={() => setmenu('form')}>Formulário</Button>
            <Button disabled={menu === 'table' ? true : false} onClick={() => setmenu('table')}>Tabela</Button>
          </ButtonGroup>
        </div>
        <br />
        {menu === 'form' ? <FormSec /> : <TableSec />}
      </div >
    </ProductsDBContext.Provider >
  );

}

export default App;
