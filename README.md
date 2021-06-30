# Simulador Neander

## Sobre o projeto

O simulador Neander foi implementado para facilitar a compreensão do funcionamento do processador. O projeto em questão foi desenvolvido para ser executado no navegador e tornar o acesso mais simples e fácil, desta forma, usuários com sistemas diferentes que contenham um browser poderão executar a aplicação independente da extensão. Inspirado no simulador dos professores Raul Fernando Weber e Taisy Silva Weber, da UFRGS (Universiudade Federal do Rio Grande do Sul).

## Características do Neander:

- 1 acumulador de 8 bits (AC).
- 1 apontador de programa de 8 bits (PC).
- Largura de endereços e dados de 8 Bits.
- 1 registrador de estado (Negativo ou Nulo).

## Instruções Implementadas:

- 0 - NOP (Não realiza nenhuma operação);
- 16 - STA end (Store - Armazena o Acumulador em um endereço);
- 32 - LDA end (Load - Carrega um valor de um endereço para o Acumulador);
- 48 - ADD end (Adição - Realiza a operação de soma entre o acumulador e o valor de um endereço);
- 64 - OR end (Operação Lógica "Ou") (Ainda não implementado);
- 80 - AND end (Operação Lógica "E") (Ainda não implementado);
- 96 - NOT (Complemento - Inverte o valor do acumulador);
- 128 - JMP end (Desvio incondicional - Altera o valor do Contador de Programa "PC" para um endereço);
- 144 - JN end (Desvio condicional - Desvia se o acumulador for negativo);
- 160 - JZ end (Desvio condicional - Desvia se o acumulador for nulo);
- 240 - HLT (Halt - Finaliza a execução);

## Interface

O projeto conta com 3 seções, uma para instruções (barra lateral esquerda), outra para dados (barra lateral direita) e a parte principal, o painel principal do neander.

![Layout](./assets/layout.png)

### Seção de Instruções

Na seção de **instruções**, há uma tabela que informa as colunas: *P* (uma flecha que irá apontar para a linha do ProgramCounter), *End.* (Endereçamento das instruções que possuem o intervalo de [0, 128[ posições de memória), *Dado* (Valor que está contido em uma determinada posição de memória) e *Mnemônico* (Indica a instrução e o endereçamento. Ex: LDA 128).

Abaixo, há dois campos (Endereço e Valor) e o Botão (Setar), permitindo que o usuário especifique os valores (instrução - endereço) para as posições de memória, caso o usuário informe um valor que não seja uma instrução e não seja precedido de instrução, a aplicação não irá quebrar, apenas seguir com a leitura ignorando valores que não representam instrução ou endereço.

### Seção de Dados

Na seção de **dados**, há uma tabela que informa as colunas: *End.* (Endereçamento dos dados que possuem o intervalo de [128, 256[ posições de memória), *Dado* (Valor que está contido em uma determinada posição de memória).

Abaixo, há dois campos (Endereço e Valor) e o Botão (Setar), permitindo que o usuário especifique os dados que serão transformados através do programa executado pelo simulador.

### Seção do painel do Neander

Na seção **Neander**, há a representação do Acumulador (AC) e Contador de Programa (PC) nas bases decimal e binária. Além do registrador de estado que informa estado negativo em verde e o estado nulo em verde, caso ambos os estados sejam falsos ficará com a cor cinza.

Há um campo "Instrução no PC" que informa o endereço apontado pelo PC e o mnemônico do endereço. No campo de "Execução Total" informa o total de acessos a memória tanto na parte de instruções quanto na parte de dados, além do total de instruções realizadas.

Algumas instruções realizam dois acessos na área de instrução, um acesso para buscar a instrução e outro acesso para buscar o endereço. Instruções que não necessitam de endereço realizam apenas um acesso. Instruções que acessam a região de dados contabiliza mais uma unidade de acesso.

## Funcionalidades

Os Botões "Setar" podem alterar o valor das linhas que correspondem a posição de memória do Neander, cada seção ("Instruções" e "Dados") possui seus próprios campos e botões. Com o campo "Valor" ativo é possível abertar o botão "enter" para executar o processo de "set" semelhantemente ao clique no Botão.

O Botão "Executar" faz a leitura de toda seção de Instruções [0, 128[ executando os comandos, caso houver uma instrução 240, o programa é finalizado com antecedência. É recomendado alocar a memória na seção de Dados, porém não é impedido que o usuário digite valores aleatórios na seção de instrução, o simulador é capaz de identificar o par de instrução e endereço que sejam adjacentes.

O Botão "Executar Passo a Passo" faz a leitura de um par instrução e endereço para executá-lo ou pula valores que não representem uma instrução.

O Botão "Resetar Ac" aloca o valor 0 para o acumulador. O Botão "Resetar Pc" aloca o valor 0 para o contador de programa. O Botão "Resetar Inst." aloca 0 para todas as posições da seção de instrução. O Botão "Resetar Dados" aloca 0 para todas as posições da seção de Dados. O Botão "Resetar Tudo" realiza todos os outros reset além de limpar os dados da execução gittotal.

## Tecnologias Utilizadas

- HTML / CSS / JavaScript
- Pré-processador SASS
- Vue.JS
