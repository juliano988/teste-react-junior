import React, { useContext, useEffect, useState } from "react";
import '../styles/TableSec-styles.scss'
import DataTable from "react-data-table-component";
import { ProductsDBContext } from "../App";
import { IconButton, makeStyles, Snackbar, TextField } from "@material-ui/core";
import MuiAlert from '@material-ui/lab/Alert';
import DeleteIcon from '@material-ui/icons/Delete';
import { productsDBSchema } from "../../customTypes";
import Swal from 'sweetalert2'

export default function TableSec() {

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

  const productsDBState = useContext(ProductsDBContext)

  const [filtredContent, setfiltredContent] = useState<productsDBSchema[]>([])
  const [tableContent, settableContent] = useState<productsDBSchema[]>([]);
  const [itemToDelete, setitemToDelete] = useState<number>();
  const [open, setOpen] = React.useState(false);

  function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }

  useEffect(function () {
    const tempArr = productsDBState.state.map(function (val) { val['excluir'] = <DeleteBtn sku={val.sku} setitemToDelete={setitemToDelete} />; return val })
    settableContent(tempArr)
    setfiltredContent(tempArr);
  }, [productsDBState.state])

  useEffect(function () {
    if (itemToDelete) {
      Swal.fire({
        title: 'Você tem certeza?',
        text: 'O item de SKU: ' + itemToDelete + ' será excluído permanentemente nesta ação.',
        icon: 'question',
        showCancelButton: true,
        cancelButtonText: 'Cancelar!',
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sim, eu tenho!'
      }).then((result) => {
        if (result.isConfirmed) {
          const tempArr = productsDBState.state.filter(function (val) { return val.sku !== itemToDelete });
          productsDBState.setState(tempArr);
          handleOpen();
        } else {
          setitemToDelete(undefined)
        }
      })
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
      <TableFilter setfiltredContent={setfiltredContent} tableContent={tableContent} />
      <DataTable
        title="Tabela de produtos"
        fixedHeader={true}
        fixedHeaderScrollHeight="50vh"
        responsive={true}
        columns={columns}
        data={filtredContent}
        noDataComponent={<p>Não há registros para serem exibidos.</p>}
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

function TableFilter(props: { setfiltredContent: React.Dispatch<React.SetStateAction<productsDBSchema[]>>, tableContent: productsDBSchema[] }) {

  const categories = [
    {
      value: '',
      label: 'Selecionar',
    },
    {
      value: 'Leite',
      label: 'Leite',
    },
    {
      value: 'Doce',
      label: 'Doce',
    },
    {
      value: 'Iogurte',
      label: 'Iogurte',
    }
  ];

  const [skuFilterParam, setskuFilterParam] = useState<string>();
  const [nomeFilterParam, setnomeFilterParam] = useState<string>();
  const [categoriaFilterParam, setcategoriaFilterParam] = useState<string>();
  const [precoFilterParam, setprecoFilterParam] = useState<string>();

  useEffect(function () {
    props.setfiltredContent(props.tableContent.filter(function (val) {
      return (
        val.sku.toString(10).match(new RegExp(skuFilterParam)) &&
        val.nome.match(new RegExp(nomeFilterParam)) &&
        val.categoria.match(new RegExp(categoriaFilterParam)) &&
        val.preco.match(new RegExp(precoFilterParam)))
    }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categoriaFilterParam, nomeFilterParam, precoFilterParam, skuFilterParam])

  useEffect(function () {
    setskuFilterParam('')
    setnomeFilterParam('')
    setcategoriaFilterParam('')
  }, [props.tableContent])

  return (
    <div id="filter-div">
      <TextField
        label="SKU"
        type="number"
        variant="outlined"
        InputLabelProps={{
          shrink: true,
        }}
        placeholder="Ex.: 9612610"
        fullWidth={true}
        value={skuFilterParam}
        onChange={(e) => setskuFilterParam(e.target.value)} />

      <TextField
        label="Nome"
        type="text"
        variant="outlined"
        InputLabelProps={{
          shrink: true,
        }}
        placeholder="Ex.: Doce de Leite"
        fullWidth={true}
        value={nomeFilterParam}
        onChange={(e) => setnomeFilterParam(e.target.value)} />

      <TextField
        label="Preço"
        type="text"
        variant="outlined"
        InputLabelProps={{
          shrink: true,
        }}
        placeholder="Ex.: 31,85"
        fullWidth={true}
        value={precoFilterParam}
        onChange={(e) => setprecoFilterParam(e.target.value)} />

      <TextField
        select
        label="Categoria"
        value={categoriaFilterParam}
        onChange={(e) => setcategoriaFilterParam(e.target.value)}
        SelectProps={{
          native: true,
        }}
        InputLabelProps={{
          shrink: true,
        }}
        fullWidth={true}
        variant="outlined"
      >
        {categories.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </TextField>
    </div>
  )
}