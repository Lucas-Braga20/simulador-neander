<template>
    <div class="container-instruction">
        <div class="container-title">
            <i class="fas fa-code"></i>
            <h2>Instruções</h2>
        </div>
        <div class="container-body">
            <div id="table-address" class="container-table">
                <div class="table-header">
                    <div class="column-header column-pointer">P.</div>
                    <div class="column-header column-address">End.</div>
                    <div class="column-header column-data">Dado</div>
                    <div class="column-header column-mnemonic">Mnemônico</div>
                </div>
                <div class="table-body">
                    <table :key="key">
                        <TableInstructionRow 
                            v-for="(data, index) in memory.slice(0, 128)" 
                            :key="index" 
                            :class="{active: index == rowSelected}" 
                            @click.native="selectTableRow(index)"
                            :pointer = "pc == index"
                            :address = "index + '.'"
                            :data = data
                            :mnemonic = "formatMnemonic(listedMnemonic[index], listedMnemonic[index-1])"/>
                    </table>
                </div>
                <div class="table-footer"></div>
            </div>
            <div class="container-set-values">
                <div class="input-group input-group-address">
                    <label for="first-input-address">Endereço</label>
                    <input v-model="address" id="first-input-address" class="input input-set" type="number">
                </div>
                <div class="input-group input-group-value">
                    <label for="first-input-data">Valor</label>
                    <input v-on:keyup.enter="setInstruction" v-model="value" ref="inputValueInstruction" id="first-input-data" class="input input-set" type="number">
                </div>
                <div class="container-button">
                    <button @click="setInstruction" class="btn btn-set">Setar</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import TableInstructionRow from './TableInstructionRow.vue';

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

    export default {
        components: {
            TableInstructionRow, 
        },
        props: {
            mem: {
                type: Array,
                required: true,
            },
            pointerPc: {
                type: Number,
                required: true,
            },
            listMnemonic: {
                type: Object,
                required: true,
            },
            componentKey: {
                type: Number,
                required: true,
            },
        },
        data() {
            return {
                address: 0, // Atributo 'Endereço' do Input de Instruções.
                value: 0, // Atributo 'Valor' do Input de Instruções.
                
                pc: 0, // Apontador de Endereço.

                rowSelected: 0, // Linha Selecionada, por padrão se iniciará em 0.

                memory: [], // Cópia da memória importada do componente Neander através de 'props'.
                listedMnemonic: {}, // Cópia da lista de mnemônicos (execução) importada do componente Neander através de 'props'.

                valuePc: {}, // Objeto que contém enderço e mnemônico da instrução apontada pelo PC.

                key: 0, // Chave do elemento table, para forçar a renderização da tabela.
            };
        },
        watch: {
            // O pointerPc importado do Neander, é observado até que haja mudança em seu valor.
            pointerPc: {
                deep: true,
                handler(val) {
                    this.pc = val;
                    this.setPointedInstruction(); // Passa a nova instrução apontada pelo Pc.
                },
            },
            // A mem importada do Neander, é observada até que haja mudança em seu valor.
            mem: {
                deep: true,
                handler(val) {
                    this.memory = val;
                },
            },
            // o listMnemonic importado do Neander, é observado até que haja mudança em seu valor.
            listMnemonic: {
                deep: true,
                handler(val) {
                    this.listedMnemonic = val;
                },
            },
            // O componentKey importado do Neander, é observado até que haja mudança em seu valor.
            componentKey: {
                handler(val) {
                    this.key = val; 
                },
            },
        },
        created: function () {
            this.memory = this.mem; // Importa a memória.
            this.pc = this.pointerPc; // Importa o pontador.
            this.listedMnemonic = this.listMnemonic; // Importa a lista de mnemônicos.

            this.setPointedInstruction(); // Seta o endereço e mnemônico do pontador.
        },
        methods: {
            selectTableRow: function (i) {
                this.rowSelected = i;
                this.address = i;
                this.value = this.memory[this.address];
            },
            setPointedInstruction: function () {
                this.valuePc.address = this.pc;
                this.valuePc.mnemonic =  this.formatMnemonic(this.listedMnemonic[this.pc], this.listedMnemonic[this.pc-1]);
                this.$emit('emit-pc', this.valuePc);
            },
            setInstruction: async function () {
                this.memory[this.address] = Number.parseInt(this.value); // Atualiza a Memória.

                this.address = Number.parseInt(this.address == '' ? 0 : this.address) + 1; // Atualiza o input address incrementando 1 unidade.
                this.value = this.memory[this.address]; // Atualiza o input value com o valor do novo address.
                this.rowSelected = this.rowSelected + 1; // Atualiza a linha selecionada.

                await this.$emit('emit-data', this.memory, 0); // Passa a memória atualizada para o componente pai, Neander.

                this.setPointedInstruction(); // Passa a instrução apontada pelo pc para o componente Neander.

                this.$refs.inputValueInstruction.select(); // Seleciona o texto do input para agilizar o manuseio.
            },
            formatMnemonic(operation, previous) {
                if(!operation && !previous) {
                    return 'NOP'; // Se não houver valor no operation e no previous, não há instrução.
                } else if(!operation && previous) { // Caso o previous contenha uma instrução, a próxima casa irá conter o endereço.
                    let previousInstruction = previous.split('.')[0];

                    // Exceto as instrução que não dependem de endereços.
                    if(previousInstruction == '64' || previousInstruction == '80' || previousInstruction == '96' || previousInstruction == '240') {
                        return 'NOP';
                    }

                    return ' ';
                }

                let instruction = operation.split('.')[0];
                let address = operation.split('.')[1];
                let mnemonicFormatted = mnemonic[instruction] + ' ' + address.toString();

                return mnemonicFormatted; 
            },
        },
    };
</script>
