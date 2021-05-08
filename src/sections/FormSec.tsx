import React, { useContext, useState } from 'react';
import '../styles/FormSec-styles.scss';
import { useForm } from "react-hook-form";
import { Controller } from "react-hook-form";
import { Button, makeStyles, TextField, Snackbar } from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';
import SaveIcon from '@material-ui/icons/Save';
import { ProductsDBContext } from '../App';
import { productsDBSchema } from '../../customTypes';

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
  button: {
    margin: theme.spacing(1),
  },
}));

const categories = [
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

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function FormSec() {

  const [open, setOpen] = React.useState(false);
  const [submitStatus, setsubmitStatus] = useState<boolean>(true)

  const handleClick = (success: boolean) => {
    if (success) {
      setsubmitStatus(true)
    } else {
      setsubmitStatus(false)
    }
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  const productsDBState = useContext(ProductsDBContext)

  const { register, handleSubmit, control, reset, setValue, formState: { errors } } = useForm();
  function onSubmit(data: productsDBSchema) {
    const tempArr = productsDBState.state.slice(0);

    if (tempArr.find(function (val) { return val.sku === data.sku })) {
      handleClick(false);
    } else {
      handleClick(true);
      tempArr.push(data);
      productsDBState.setState(tempArr)
      reset();
      setValue('categoria', 'Leite');
    }
  }

  const classes = useStyles();

  return (
    <section>
      <form className={classes.root} onSubmit={handleSubmit(onSubmit)}>

        <div id="form-div">

          <div>
            <div>
              <TextField
                label="SKU"
                type="number"
                variant="outlined"
                InputLabelProps={{
                  shrink: true,
                }}
                placeholder="Ex.: 9612610"
                helperText={errors.sku ? 'Formato incorreto.' : 'Inserir numeração do código SKU.'}
                error={errors.sku ? true : false}
                {...register("sku", { required: true })} />
            </div>
            <div>
              <TextField
                label="Nome"
                type="text"
                variant="outlined"
                InputLabelProps={{
                  shrink: true,
                }}
                placeholder="Ex.: Doce de Leite"
                helperText={errors.nome ? 'Formato incorreto.' : 'Inserir numeração do código SKU.'}
                error={errors.nome ? true : false}
                {...register("nome", { required: true })} />
            </div>
          </div>

          <div>
            <div>
              <TextField
                label="Preço"
                type="text"
                variant="outlined"
                InputLabelProps={{
                  shrink: true,
                }}
                placeholder="Ex.: 31,85"
                helperText={errors.preco ? 'Formato incorreto.' : 'Inserir o valor em reais.'}
                error={errors.preco ? true : false}
                {...register("preco", { required: true, pattern: /^[0-9]+,[0-9]{1,2}(?!.)/ })} />
            </div>
            <div>
              <Controller
                control={control}
                name="categoria"
                defaultValue="Leite"
                render={({ field: { onChange, value } }) => (
                  <TextField
                    id="categoria"
                    select
                    label="Categoria"
                    value={value}
                    onChange={onChange}
                    SelectProps={{
                      native: true,
                    }}
                    helperText="Escolher categoria do produto."
                    variant="outlined"
                  >
                    {categories.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </TextField>
                )}
              />
            </div>
          </div>

          <div id="button-div">
            <Button
              variant="contained"
              color="primary"
              size="large"
              className={classes.button}
              startIcon={<SaveIcon />}
              type="submit"
            >Salvar</Button>
          </div>

        </div>
      </form>
      <Snackbar open={open} autoHideDuration={5000} onClose={handleClose} anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
        <Alert onClose={handleClose} severity={submitStatus ? 'success' : 'error'}>
          {submitStatus ? 'Produto inserido com sucesso!' : 'Erro: SKU duplicado.'}
        </Alert>
      </Snackbar>
    </section>
  )
}