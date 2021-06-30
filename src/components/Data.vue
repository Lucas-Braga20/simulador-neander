<template>
    <div class="container-data">
        <div class="container-title">
            <i class="fas fa-database"></i>
            <h2>Dados</h2>
        </div>
        <div class="container-body">
            <div class="container-table">
                <div id="table-data" class="table-header">
                    <div class="column-header column-address">End.</div>
                    <div class="column-header column-data">Dado</div>
                </div>
                <div class="table-body">
                    <table :key="key">
                        <TableDataRow 
                            v-for="(data, index) in memory.slice(128, 256)" 
                            :key="index + 128" 
                            :class="{active: (index + 128) == rowSelected}" 
                            @click.native="selectTableRow(index + 128)"
                            :address="(index + 128) + '.'"
                            :data="data"/>
                    </table>
                </div>
                <div class="table-footer"></div>
            </div>
            <div class="container-set-values">
                <div class="input-group input-group-address">
                    <label for="second-input-address">Endereço</label>
                    <input v-model="address" id="second-input-address" class="input input-set" type="number">
                </div>
                <div class="input-group input-group-value">
                    <label for="second-input-data">Valor</label>
                    <input v-on:keyup.enter="setInstruction" v-model="value" ref="inputValueData" id="second-input-data" class="input input-set" type="number">
                </div>
                <div class="container-button">
                    <button @click="setInstruction" class="btn btn-set">Setar</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import TableDataRow from './TableDataRow.vue';

    export default {
        components: {
            TableDataRow,
        },
        props: {
            mem: {
                type: Array,
                required: true,
            },
            componentKey: {
                type: Number,
                required: true,
            },
        },
        data() {
            return {
                address: 128, // Atributo 'Endereço' do Input de Dados.
                value: 0, // Atributo 'Valor' do Input de Instruções.

                rowSelected: 128, // Linha Selecionada, por padrão se iniciará em 128.

                memory: [], // Cópia da memória importada do componente Neander através de 'props'.

                key: 0, // Chave do elemento table, para forçar a renderização da tabela.
            };
        },
        watch: {
            // A mem importada do Neander, é observada até que haja mudança em seu valor.
            mem: {
                deep: true,
                handler(val) {
                    this.memory = val;
                },
            },
            // O componentKey importado do Neander, é observado até que haja mudança em seu valor.
            componentKey: {
                deep: true,
                handler(val) {
                    this.key = val; 
                },
            },
        },
        created: function () {
            this.memory = this.mem; // Importa a memória.
        },
        methods: {
            setInstruction: async function () {
                this.memory[this.address] = Number.parseInt(this.value); // Atualiza a Memória.

                this.address = Number.parseInt(this.address == '' ? 0 : this.address) + 1; // Atualiza o input address incrementando 1 unidade.
                this.value = this.memory[this.address]; // Atualiza o input value com o valor do novo address.
                this.rowSelected = this.rowSelected + 1; // Atualiza a linha selecionada.

                await this.$emit('emit-data', this.memory, 128); // Passa a memória atualizada para o componente pai, Neander.

                this.$refs.inputValueData.select(); // Seleciona o texto do input para agilizar o manuseio.
            },
            selectTableRow: function (i) {
                this.rowSelected = i;
                this.address = i;
                this.value = this.memory[this.address];
            },
        },
    };
</script>