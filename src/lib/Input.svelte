<script lang="ts">
    export let name: string;
    export let type = 'text';
    export let placeholder = '';
    export let label = ''
    export let onChange: any;
</script>

<label>
<p>{label}</p>
<input {name} type={type} placeholder={placeholder} on:input={onChange} />
</label>
<style>
    label{
        width: 100%;
    }
    input {
        width: 100%;
        padding: 10px;
        border: 1px solid #ccc;
        border-radius: 5px;
        outline: none;
        box-shadow: none;
        transition: all 0.2s ease-in-out;
    }
    label p{
        font-size: 0.9rem;
        margin-bottom: 10px;
    }
    input:focus {
        border: 1px solid #1A74E2;
        box-shadow: 0 0 0 4px #1A74E230;
        transition: all 0.2s ease-in-out;
    }
</style>