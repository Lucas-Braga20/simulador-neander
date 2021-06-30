<template>
    <tr>
        <td class="column-body column-pointer"><i v-if="pointer" class="fas fa-chevron-right"></i></td>
        <td class="column-body column-address">{{ address }}</td>
        <td class="column-body column-data">{{ data }}</td>
        <td class="column-body column-mnemonic">{{ mnemonic }}</td>
    </tr>
</template>

<script>
    export default {
        props: {
            pointer: {
                type: Boolean,
            },
            address: {
                type: String, 
            },
            data: {
                type: Number,
            },
            mnemonic: {
                type: String,
            },
        },
    };
</script>