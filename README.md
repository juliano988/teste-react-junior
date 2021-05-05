Teste para avaliação Frontend Junior React
==========================================

Este é o arquivo de requisitos para o teste de candidatos à vaga de desenvolvedor Frontend React Junior.

Seu objetivo será programar um aplicativo em React que fará um CRUD local para cadastro de produtos.

Crie um repositório **público** no GitHub ou GitLab e inicie seu projeto com o create-react-app ou create-next-app.
Depois de finalizado, enviar o link do repositório para o avaliador que entrou em contato.

O projeto **DEVE** ser programado em Typescript.

------

Formulário
----------

A página terá um componente que será o formulário de criação, que conterá os seguintes campos:

* Código do SKU (int)
* Nome do produto (string)
* Preço (string)
* Categoria (string) -- Tipo select
    * Opções do select: Leite, Doce, Iogurte

O botão SALVAR irá adicionar as informações do produto em um ContextAPI local que será de repositório dos produtos cadastrados.

Se adicionado com sucesso, limpar todos os dados do formulário.

Caso o código do SKU já estiver adicionado no repositório, exibir uma mensagem que o código do SKU já está cadastrado. Neste caso, não limpar os dados preenchidos, fazendo com que o usuário possa alterar os dados para adicionar novamente.

Tabela
------

Exibir uma tabela com Filtro e Ordenação com as seguintes colunas:

* SKU
* Nome
* Preço
* Categoria
* Ações

Na coluna de ações, adicionar um botão com ícone de lixeira, que ao clicar, irá apagar aquele registro do produto.


Repositório de dados
--------------------

Criar um ContextAPI que irá englobar a tela para salvar o repositório de dados dos produtos cadastrados. Não é necessário fazer a persistência dos dados (em localStorage ou API), o dado pode ser apenas local e em memória dentro do próprio ContextAPI.

**IMPORTANTE: utilizar ContextAPI. Não utilizar Redux.**

-----


Bibliotecas para utilização
---------------------------

* **MaterialUI [Obrigatório]**
* react-data-table-component
* react-hook-form

-----


Pontos de avaliação [OBRIGATÓRIO]
---------------------------------

- [ ] Typescript
- [ ] Formulário
- [ ] Validação de SKU duplicado
- [ ] Tabela com visualização dos dados
- [ ] Botão de remover registro
- [ ] Realizar commits bem descritos e bom gerenciamento do repositório GIT
- [ ] Documentação mínima


Pontos de avaliação [Opcional/Extra/Diferencial]
------------------------------

- [ ] Validação complexa dos dados (dinheiro para preço do produto)
- [ ] Modal de feedback de erros
- [ ] Modal de confirmação de remoção de registro
- [ ] Modal de visualização dos dados de cada registro
- [ ] Edição de dados do registro
- [ ] Utilização da biblioteca react-data-table-component
- [ ] Utilização da biblioteca react-hook-form
- [ ] Utilização de bibliotecas que simulam APIs (ou desenvolver uma API) para consumo e persistência dos dados
- [ ] Boa documentação
- [ ] Testes de unidade

