<template>
    <div class="container-simulador-neander">
        <Instruction 
            :pointerPc="programCounter" 
            :mem="memory" 
            :listMnemonic="listedMnemonic"
            :componentKey="componentInstructionKey"
            @emit-data="updateMemory"
            @emit-pc="refreshValuePc"/>

        <div class="container-neander">
            <div class="container-title">
                <i class="fas fa-microchip"></i>
                <h2>Neander</h2>
            </div>
            <div class="container-body">
                <div class="row">
                    <div class="container-result-bin">
                        <table>
                            <thead>
                                <tr>
                                    <td>Bin:</td>
                                    <td>128</td>
                                    <td>64</td>
                                    <td>32</td>
                                    <td>16</td>
                                    <td>8</td>
                                    <td>4</td>
                                    <td>2</td>
                                    <td>1</td>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>AC:</td>
                                    <td v-for="(digit, index) in convertBin(acumulator)" :key="index">{{ digit }}</td>
                                </tr>
                                <tr>
                                    <td>PC:</td>
                                    <td v-for="(digit, index) in convertBin(programCounter)" :key="index">{{ digit }}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div class="container-result-decimal">
                        <div class="result-header">
                            <h3>Valores Decimais:</h3>
                        </div>
                        <div class="result-body">
                            <div class="result-ac">
                                <span>AC:</span>
                                <span id="ac-value">{{ acumulator }}</span>
                            </div>
                            <div class="result-pc">
                                <span>PC:</span>
                                <span id="pc-value">{{ programCounter }}</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="container-state">
                        <div class="state-header">
                            <h3>Estado AC:</h3>
                        </div>
                        <div class="state-body">
                            <div id="ac-negative" class="state ac-negative" :class="{active: acumulator < 0}">Negativo</div>
                            <div id="ac-null" class="state ac-null" :class="{active: acumulator == 0}">Nulo</div>
                        </div>
                    </div>
                    <div class="container-instruction-pc">
                        <div class="instruction-header">
                            <h3>Instrução no PC:</h3>
                        </div>
                        <div class="instruction-body">
                            <div class="instruction-address">
                                <span>Endereço:</span>
                                <span id="instruction-address">{{ pcAddress }}</span>
                            </div>
                            <div class="instruction-mnemonic">
                                <span>Mnemônico:</span>
                                <span id="instruction-mnemonic">{{ pcMnemonic }}</span>
                            </div>
                        </div>
                    </div>
                    <div class="container-total-execution">
                        <div class="execution-header">
                            <h3>Execução Total:</h3>
                        </div>
                        <div class="execution-body">
                            <div class="execution-access">
                                <span>Acessos:</span>
                                <span id="execution-acess">{{ countAcessInstruction + countAcessData }}</span>
                            </div>
                            <div class="execution-instruction">
                                <span>Instruções:</span>
                                <span id="execution-instruction">{{ countInstruction }}</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="contaier-execution">
                        <button v-on:click="executNeander()" class="btn btn-execution">Executar</button>
                    </div>
                    <div class="contaier-execution">
                        <button v-on:click="executPassNeander()" class="btn btn-execution">Executar Passo a Passo</button>
                    </div>
                </div>
                <div class="row">
                    <div class="container-reset">
                        <button v-on:click="resetAcumulator()" class="btn btn-reset">Resetar Ac</button>
                    </div>
                    <div class="container-reset">
                        <button v-on:click="resetProgramCounter()" class="btn btn-reset">Resetar Pc</button>
                    </div>
                    <div class="container-reset">
                        <button v-on:click="resetInstruction()" class="btn btn-reset">Resetar Inst.</button>
                    </div>
                    <div class="container-rese">
                        <button v-on:click="resetData()" class="btn btn-reset">Resetar Dados</button>
                    </div>
                </div>
                <div class="row">
                    <div class="container-reset-all">
                        <button v-on:click="resetAll()" class="btn btn-reset-all">Resetar Tudo</button>
                    </div>
                </div>
            </div>
        </div>

        <Data :mem="memory" @emit-data="updateMemory" :componentKey="componentDataKey"/>
    </div>
</template>

<script>
    import Instruction from './Instruction.vue';
    import Data from './Data.vue';

    // Lista de Mnemônicos.
    const mnemonic = {
        '0': 'NOP',
        '16': 'STA',
        '32': 'LDA',
        '48': 'ADD',
        '64': 'OR',
        '80': 'AND',
        '96': 'NOT',
        '128': 'JMP',
        '144': 'JN',
        '160': 'JZ',
        '240': 'HLT',
    };
    // Lista de valores de incremento para o PC durante a execução.
    const incrementValues = {
        '16': 2, // Instrução - End (2 Posições).
        '32': 2, // Instrução - End (2 Posições).
        '48': 2, // Instrução - End (2 Posições).
        '64': 0, // NÃO IMPLEMENTADO.
        '80': 0, // NÃO IMPLEMENTADO.
        '96': 1, // Instrução (1 Posição).

        // Tendo em vista que as instruções (128, 144 e 160) já realizam alterações no ProgramCounter, ele não deve ser incrementado de forma automática, por isso o valor 0.
        // Porém, nas ocasiões onde Jump on negative e Jump on null não forem executadas, o pc automaticamente deverá ser incrementado para prosseguir com a leitura normal da memória.
        // Portanto, dentro dos métodos 144 (JN) e 160 (JZ) foi feito uma verificação, caso entre no else o ProgramCounter é incrementado.
        '128': 0, // Manipula o PC.
        '144': 0, // Manipula o PC.
        '160': 0, // Manipula o PC.

        '240': 1, // Instrução (1 Posição).
    };
    // Lista de valores de acesso (área de Instrução [0 - 128[ ) que cada Instrução executa.
    const acessInstruction = {
        '16': 2, // Instrução - End (2 Acessos).
        '32': 2, // Instrução - End (2 Acessos).
        '48': 2, // Instrução - End (2 Acessos).
        '64': 1, // NÃO IMPLEMENTADO.
        '80': 1, // NÃO IMPLEMENTADO.
        '96': 1, // Instrução (1 Acesso).
        '128': 2, // Instrução - End (2 Acessos).
        '144': 1, // Instrução - End Porém, se trata de uma instrução condicional, caso ela não seja executada terá acesso apenas ao campo instrução, caso contrário o acesso do endereço será contabilizado dentro do próprio método.
        '160': 1, // Instrução - End Porém, se trata de uma instrução condicional, caso ela não seja executada terá acesso apenas ao campo instrução, caso contrário o acesso do endereço será contabilizado dentro do próprio método.
        '240': 1, // Instrução (1 Acesso).
    }
    // Lista de valores de acesso (área de Dados [128 - 256[ ) que cada Instrução executa.
    const acessData = {
        '16': 1, // Escrita na memória.
        '32': 1, // Leitura na memória.
        '48': 1, // Adição com valor da memória.
        '64': 0, 
        '80': 0,
        '96': 0,
        '128': 0,
        '144': 0,
        '160': 0,
        '240': 0,
    }

    export default {
        components: {
            Instruction,
            Data,
        },
        data() {
            return {
                memory: 0, // Memória do Simulador Neander, exportada para os componentes filhos.
                acumulator: 0, // Acumulador.
                programCounter: 0, // Apontador Pc.

                listedMnemonic: {}, // Mnemônicos listados.

                countAcessInstruction: 0, // Quantidade de acessos na área de instruções (0-127).
                countAcessData: 0, // Quantidade de acessos na área de dados (128-255).
                countInstruction: 0, // Quantidade de instruções.

                pcAddress: 0, // Endereço do Pc, atualizado pelo componente Instruction.
                pcMnemonic: 'NOP', // Mnemônico do Pc, atualizado pelo componente Instruction.

                componentInstructionKey: 0, // Key do componente Instruction, para forçar renderização.
                componentDataKey: 0, // Key do componente Data, para forçar renderização.
            };
        },
        computed: {
            convertBin: function () {
                return value => {
                    let arrayBin = value.toString(2).split(''); // Transforma um valor decimal em um array de dígitos binários.

                    // Caso o valor seja negativo, o sinal é retirado.
                    if(arrayBin[0] == '-') {
                        arrayBin = arrayBin.slice(1);
                    }

                    // Caso o array contenha menos que 8 índices, é adicionado zeros na posição inicial.
                    for(let i = arrayBin.length; i < 8; i++) {
                        arrayBin.unshift(0);
                    }

                    return arrayBin;
                }
            },
        },
        created: function () {
            this.resetAll();
            this.listedMnemonic = this.getListMnemonic(this.memory);
        },
        methods: {
            getListMnemonic(data) {
                let listedMnemonic = Object.create(null); // Cria um objeto vazio.
                
                // Indicadores Booleanos.
                let instructionFound = false; 
                let addressFound = false;

                // Variável para armazenar endereço e instrução.
                let address;
                let instruction;

                for(let i = 0; i < 128; i++) {
                    // Verifica se o valor da memória é 96 (NOT), que não é acompanhado por endereço.
                    if(!instructionFound && data[i] == 96) {
                        listedMnemonic[i] = '96. ';
                        continue; // Incrementa a instrução e avança para a próxima casa.
                    }
                    // Verifica se o valor da memória é 240 (HLT), que não é acompanhado por endereço.
                    if(!instructionFound && data[i] == 240) {
                        listedMnemonic[i] = '240. ';
                        continue; // Finaliza a busca na memória, pois 240 finaliza o programa.
                    }

                    // Verifica o endereço, só é analisado quando a instrução já estiver sido encontrada.
                    if(instructionFound && !addressFound) {
                        address = data[i];
                        addressFound = !addressFound; // Atualiza o estado de encontrado do endereço.
                    }

                    // Encontra a instrução, quando instrução ainda não foi encontrada, diferente de 0 e se for um dos valores do objeto mnemonic.
                    if(!instructionFound && data[i] != 0 && mnemonic[data[i]] != undefined) {
                        instruction = data[i];
                        instructionFound = !instructionFound; // Atualiza o estado de encontrado da instrução.
                    }

                    // Quando o par instrução e endereço for encontrado:
                    if(instructionFound && addressFound) {
                        listedMnemonic[i-1] = `${instruction}.${address}`;

                        instructionFound = addressFound = false;
                    }
                }

                return listedMnemonic;
            },

            updateMemory: function (data, init) {
                for(let i = init; i < data.length - (128 - init); i++) {
                    this.memory[i] = data[i];
                }

                this.listedMnemonic = this.getListMnemonic(this.memory); // Retorna a lista de Mnemônicos.
            },

            refreshValuePc: function (value) {
                this.pcAddress = value.address;
                this.pcMnemonic = value.mnemonic;
            },

            resetMemory() {
                let newMem = new Array();

                for(let i = 0; i < 256; i++) {                    
                    newMem.push(0); 
                }

                this.memory = newMem;

                this.listedMnemonic = this.getListMnemonic(this.memory); 
            },

            resetData() {
                for(let i = 128; i < 256; i++) {
                    this.memory[i] = 0;
                }

                this.forceRerender(); // Força a atualização do componentes filhos, para que o valores sejam atualizados em tempo real.
            },

            resetInstruction() {
                for(let i = 0; i < 128; i++) {
                    this.memory[i] = 0;
                }

                this.listedMnemonic = this.getListMnemonic(this.memory); // Atualiza a lista de mnemônicos.

                this.forceRerender(); // Força a atualização do componentes filhos, para que o valores sejam atualizados em tempo real.
            },

            resetProgramCounter() {
                this.programCounter = 0;
                this.forceRerender(); // Força a atualização do componentes filhos, para que o valores sejam atualizados em tempo real.
            },

            resetAcumulator() {
                this.acumulator = 0;
                this.forceRerender(); // Força a atualização do componentes filhos, para que o valores sejam atualizados em tempo real.
            },

            resetAll() {
                this.resetMemory();
                this.acumulator = 0;
                this.programCounter = 0;
                this.countAcessInstruction = 0;
                this.countAcessData = 0;
                this.countInstruction = 0;
                this.forceRerender(); // Força a atualização do componentes filhos, para que o valores sejam atualizados em tempo real.
            },

            // STA - Escrita.
            '16': function (end) {
                this.memory[end] = this.acumulator;
            },

            // LDA - Leitura.
            '32': function (end) {
                this.acumulator = this.memory[end];
            },

            // ADD - Adicionar.
            '48': function (end) {
                this.acumulator = this.acumulator + this.memory[end];
            },

            // OR.
            '64': function () {
                this.programCounter++;
                // Ainda não implementado.
            },

            // AND.
            '80': function () {
                this.programCounter++;
                // Ainda não implementado.
            },

            // NOT - Inversão do Acumulador.
            '96': function () {
                this.acumulator = ~this.acumulator;
            },

            // JMP - Jump.
            '128': function (end) {
                this.programCounter = Number.parseInt(end);
            },

            // JN - Jump se o Acumulador for negativo.
            '144': function (end) {
                if(this.acumulator < 0) {
                    this.countAcessInstruction++; // Contabiliza a posição da memória acessada.
                    this.programCounter = Number.parseInt(end);
                } else {
                    this.countInstruction--; // Decrementa o contador de instruções executadas, pois não entra na execução do JN.
                    this.programCounter++; // Continua a leitura normal do programa.
                }
            },

            // JZ - Jump se o Acumulador for Nulo.
            '160': function (end) {
                if(this.acumulator == 0) {
                    this.countAcessInstruction++; // Contabiliza a posição da memória acessada.
                    this.programCounter = Number.parseInt(end);
                } else {
                    this.countInstruction--; // Decrementa o contador de instruções executadas, pois não entra na execução do JZ.
                    this.programCounter++; // Continua a leitura normal do programa.
                }
            },

            // HLT - Finaliza o programa.
            '240': function () {
                console.log('Finaliza o Programa');
            },

            executNeander() {
                let instruction;
                let address;

                while(this.programCounter < 128 && instruction != '240') {
                    if(this.listedMnemonic[this.programCounter]) {
                        instruction = this.listedMnemonic[this.programCounter].split('.')[0];
                        address = this.listedMnemonic[this.programCounter].split('.')[1];

                        address != ' ' ? 
                            this[instruction](address) : // Executa as operações que contém endereço.
                            this[instruction](); // Executa as operações que não contém endereço.

                        this.countInstruction++; // Incrementa o contador de instruções executadas.
                        this.countAcessInstruction += acessInstruction[instruction]; // Incrementa o acesso de instruções.
                        this.countAcessData += acessData[instruction]; // Incrementa o acesso de dados.

                        // Instruções com endereço, incrementa o programCounter em duas posições (1 - Instruction; 2 - Address).
                        // Instruções sem endereço, incrementa o programCounter em uma posição (1 - Instruction).
                        // Instruções que manipulam o programCounter, não incrementa o programCounter de forma automática.
                        this.programCounter += incrementValues[instruction];
                    } else {
                        this.countAcessInstruction++;
                        this.programCounter++;
                    }
                }

                this.forceRerender(); // Força a atualização do componentes filhos, para que o valores sejam atualizados em tempo real.
            },

            executPassNeander() {
                let instruction;
                let address;

                if(this.listedMnemonic[this.programCounter]) {
                    instruction = this.listedMnemonic[this.programCounter].split('.')[0];
                    address = this.listedMnemonic[this.programCounter].split('.')[1];

                    address != ' ' ? 
                        this[instruction](address) : // Executa as operações que contém endereço.
                        this[instruction](); // Executa as operações que não contém endereço.

                    this.countInstruction++; // Incrementa o contador de instruções executadas.
                    this.countAcessInstruction += acessInstruction[instruction]; // Incrementa o acesso de instruções.
                    this.countAcessData += acessData[instruction]; // Incrementa o acesso de dados.

                    // Instruções com endereço, incrementa o programCounter em duas posições (1 - Instruction; 2 - Address).
                    // Instruções sem endereço, incrementa o programCounter em uma posição (1 - Instruction).
                    // Instruções que manipulam o programCounter, não incrementa o programCounter de forma automática.
                    this.programCounter += incrementValues[instruction];
                } else {
                    this.countAcessInstruction++;
                    this.programCounter++;
                }

                this.forceRerender(); // Força a atualização do componentes filhos, para que o valores sejam atualizados em tempo real.
            },

            forceRerender() {
                this.componentInstructionKey += 1;
                this.componentDataKey += 1;
            },
        },
    };
</script>