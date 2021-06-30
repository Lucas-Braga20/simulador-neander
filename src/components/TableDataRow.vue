<template>
    <tr>
        <td class="column-body column-address">{{ address }}</td>
        <td class="column-body column-data">{{ data }}</td>
    </tr>
</template>

<script>
    export default {
        props: {
            address: {
                type: String,
            },
            data: {
                type: Number,
            },
        },
    };
</script>