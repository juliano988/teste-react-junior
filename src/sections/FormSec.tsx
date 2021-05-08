import React, { useContext } from 'react';
import '../styles/FormSec-styles.scss';
import { useForm } from "react-hook-form";
import { Controller } from "react-hook-form";
import { Button, makeStyles, TextField } from '@material-ui/core';
import SaveIcon from '@material-ui/icons/Save';
import { ProductsDBContext } from '../App';
import { productsDBSchema } from '../customTypes';

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

export default function FormSec() {

  const productsDBState = useContext(ProductsDBContext)

  const { register, handleSubmit, control, reset, setValue, formState: { errors } } = useForm();
  function onSubmit(data: productsDBSchema) {
    const tempArr = productsDBState.state.slice(0)
    tempArr.push(data);
    productsDBState.setState(tempArr)
    reset();
    setValue('categoria','Leite');
  }

  const classes = useStyles();

  return (
    <section>
      <form className={classes.root} onSubmit={handleSubmit(onSubmit)}>

        <div id="form-div">

          <div>
            <div>
              <TextField id="SKU" label="SKU" type="number" variant="outlined" {...register("sku")} />
              {errors.SKU && <span>This field is required</span>}
            </div>
            <div>
              <TextField id="nome" label="Nome" type="text" variant="outlined" {...register("nome")} />
              {errors.nome && <span>This field is required</span>}
            </div>
          </div>

          <div>
            <div>
              <TextField id="preco" label="Preço" type="text" variant="outlined" {...register("preco")} />
              {errors.nome && <span>This field is required</span>}
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
    </section>
  )
}