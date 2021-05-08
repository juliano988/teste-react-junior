import React, { useContext, useEffect, useState } from "react";
import '../styles/TableSec-styles.scss'
import DataTable from "react-data-table-component";
import { ProductsDBContext } from "../App";
import { IconButton, makeStyles, Snackbar } from "@material-ui/core";
import MuiAlert from '@material-ui/lab/Alert';
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
    name: 'Preço (R$)',
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
  const [itemToDelete, setitemToDelete] = useState<number>();
  const [open, setOpen] = React.useState(false);

  function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }

  useEffect(function () {
    const tempArr = productsDBState.state.map(function (val) { val['excluir'] = <DeleteBtn sku={val.sku} setitemToDelete={setitemToDelete} />; return val })
    settableContent(tempArr)
  }, [productsDBState.state])

  useEffect(function () {
    if (itemToDelete) {
      const tempArr = productsDBState.state.filter(function (val) { return val.sku !== itemToDelete });
      productsDBState.setState(tempArr);
      handleOpen();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [itemToDelete])

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

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
      <Snackbar open={open} autoHideDuration={5000} onClose={handleClose} anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
        <Alert onClose={handleClose} severity="info">
          SKU: {itemToDelete} excluído com sucesso!
        </Alert>
      </Snackbar>
    </section>
  )
}

function DeleteBtn(props: { sku: number, setitemToDelete: React.Dispatch<React.SetStateAction<number>> }) {

  const useStyles = makeStyles((theme) => ({
    margin: {
      margin: theme.spacing(1),
    },
    extendedIcon: {
      marginRight: theme.spacing(1),
    },
  }));

  const classes = useStyles();

  return (
    <IconButton onClick={() => props.setitemToDelete(props.sku)} aria-label="delete" className={classes.margin}>
      <DeleteIcon fontSize="small" />
    </IconButton>
  )
}