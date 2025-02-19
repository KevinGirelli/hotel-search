# Hotel Search

Este é um projeto de busca de quartos de hotel, desenvolvido com [Next.js](https://nextjs.org) e estilizado com [Material UI](https://mui.com/). O objetivo é permitir que os usuários encontrem quartos de hotel com base em filtros específicos, como nome, faixa de preço, capacidade e características como Wi-Fi e ar condicionado.

## Funcionalidades

- **Busca de Quartos**: Os usuários podem buscar quartos de hotel usando filtros como nome, faixa de preço, capacidade e características.
- **Filtros Dinâmicos**: Os filtros são atualizados dinamicamente conforme o usuário interage com a interface.
- **Interface Responsiva**: A aplicação é responsiva e se adapta a diferentes tamanhos de tela.

## Tecnologias Utilizadas

- **Next.js**: Framework React para desenvolvimento de aplicações web.
- **Material UI**: Biblioteca de componentes de interface do usuário para React.
- **Zustand**: Biblioteca para gerenciamento de estado.
- **Tailwind CSS**: Framework de CSS para estilização rápida e responsiva.

## Como Iniciar o Projeto

### Pré-requisitos

- Node.js instalado na máquina.
- Gerenciador de pacotes como npm ou yarn.

### Passos para Iniciar

1. **Clone o repositório:**

   ```bash
   git clone https://github.com/KevinGirelli/hotel-search.git
   cd hotel-search
   ```

2. **Entre na pasta principal (hotel-search) e instale as dependências**

   ```bash
   npm install
   ```

3. **Entre na pasta da API (api) e instale as dependências**

    ```bash
    npm install
    ```
    
3. **Inicie o servidor front-end na pasta (hotel-search):**

   ```bash
   npm run dev
   ```

4. **Inicie o servidor de desenvolvimento na pasta (api):**

    ```bash
    npm run back
    ```


4. **Abra o navegador e acesse:**

   ```
   http://localhost:3000
   ```

## Como Usar a Funcionalidade de Busca

1. **Filtros de Busca:**
   - **Nome do Quarto**: Digite o nome do quarto que deseja buscar.
   - **Faixa de Preço**: Ajuste o controle deslizante para definir a faixa de preço desejada.
   - **Capacidade**: Insira o número de pessoas que o quarto deve acomodar.
   - **Características**: Marque as caixas de seleção para Wi-Fi e Ar Condicionado conforme necessário.

2. **Resultados da Busca:**
   - Os resultados são exibidos em cartões, mostrando o nome do quarto, preço por noite, capacidade e características.

3. **Atualização Dinâmica:**
   - Os resultados são atualizados automaticamente conforme os filtros são ajustados.