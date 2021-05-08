import React, { useContext, useEffect } from "react";
import '../styles/TableSec-styles.scss'
import DataTable from "react-data-table-component";
import { ProductsDBContext } from "../App";

const data = [{ id: 1, title: 'Conan the Barbarian', year: '1982' }];
const columns = [
  {
    name: 'SKU',
    selector: 'sku',
    sortable: true,
  },
  {
    name: 'Nome',
    selector: 'nome',
    sortable: true,
  },
  {
    name: 'Preço',
    selector: 'preco',
    sortable: true,
  },
  {
    name: 'Categoria',
    selector: 'categoria',
    sortable: true,
  },
];

export default function TableSec() {

  const productsDBState = useContext(ProductsDBContext)
  
  return (
    <section id="table-section">
      <DataTable
      title="Tabela de produtos"
      fixedHeader={true}
      fixedHeaderScrollHeight="50vh"
      responsive={true}
        columns={columns}
        data={productsDBState.state}
      />
    </section>
  )
}