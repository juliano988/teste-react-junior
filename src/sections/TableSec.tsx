import React, { useContext, useEffect, useState } from "react";
import '../styles/TableSec-styles.scss'
import DataTable from "react-data-table-component";
import { ProductsDBContext } from "../App";
import { IconButton, makeStyles } from "@material-ui/core";
import DeleteIcon from '@material-ui/icons/Delete';
import { productsDBSchema } from "../../customTypes";

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
  {
    name: 'Excluir',
    selector: 'excluir',
    sortable: true,
    right: true,
  },
];

export default function TableSec() {

  const productsDBState = useContext(ProductsDBContext)

  const [tableContent, settableContent] = useState<productsDBSchema[]>([]);

  useEffect(function () {
    const tempArr = productsDBState.state.map(function (val) { val['excluir'] = <DeleteBtn sku={val.sku}/>; return val })
    settableContent(tempArr)
  },[productsDBState.state])

  return (
    <section id="table-section">
      <DataTable
        title="Tabela de produtos"
        fixedHeader={true}
        fixedHeaderScrollHeight="50vh"
        responsive={true}
        columns={columns}
        data={tableContent}
      />
    </section>
  )
}

function DeleteBtn(props:{ sku: number }) {

  const productsDBState = useContext(ProductsDBContext)

  const useStyles = makeStyles((theme) => ({
    margin: {
      margin: theme.spacing(1),
    },
    extendedIcon: {
      marginRight: theme.spacing(1),
    },
  }));

  const classes = useStyles();

  function handleClick(){
    const tempArr = productsDBState.state.filter(function(val){return val.sku !== props.sku});
    productsDBState.setState(tempArr)
  }

  return (
    <IconButton onClick={handleClick} aria-label="delete" className={classes.margin}>
      <DeleteIcon fontSize="small" />
    </IconButton>
  )
}