# Teste para avaliação Frontend Junior React - Thorson Tecnologia


## Proposta:

Programar um aplicativo em React que fará um CRUD local para cadastro de produtos.
O projeto contará com um formulário e uma tabela.

## Formulário:
A página terá um componente que será o formulário de criação, que conterá os seguintes campos:

- Código do SKU (int)
- Nome do produto (string)
- Preço (string)
- Categoria (string) - Tipo select
  - Opções do select:
    - Leite
    - Doce
    - Iogurte

## Tabela:
Exibir uma tabela com ordenação com as seguintes colunas:

- SKU
- Nome
- Preço
- Categoria
 -Ações

Na coluna de ações, adicionar um botão com ícone de lixeira, que ao clicar, irá apagar aquele registro do produto.

## Repositório de dados:
Os dados do projeto serão armazenados em uma estrutura de ContextAPI.

## Tecnologias exigidas:
- Typescript
- MaterialUI
- react-data-table-component
- react-hook-form

## Pontos de avaliação:

- [x] Typescript
- [x] Formulário
- [x] Validação de SKU duplicado
- [x] Tabela com visualização dos dados
- [x] Botão de remover registro
- [x] Realizar commits bem descritos e bom gerenciamento do repositório GIT
- [x] Documentação mínima


## Pontos extras:

- [x] Validação complexa dos dados (dinheiro para preço do produto)
- [x] Modal de feedback de erros
- [x] Modal de confirmação de remoção de registro
- [ ] Modal de visualização dos dados de cada registro
- [ ] Edição de dados do registro
- [ ] Utilização de bibliotecas que simulam APIs (ou desenvolver uma API) para consumo e persistência dos dados
- [ ] Boa documentação
- [ ] Testes de unidade

## Utilização:
No terminal, acessar a diretório deste projeto e executar o comando:

>``
>yarn start
>``