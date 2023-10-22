<script lang="ts">
	export let name: string;
	export let active: string | null;
</script>

<button
	class={active == 'Alphachecker' ? 'btn btn-sm btn-dark' : 'btn btn-sm btn-light'}
	on:click={() => (active = name)}>{name}</button
>
