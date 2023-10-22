<script lang="ts">
	import Anleitung from './anleitung.svelte';
	import Erklrungen from './erklärungen.svelte';

	let aktiveComponent: string | null = null;

	function handleButtonClick(name: string) {
		if (aktiveComponent == name) {
			aktiveComponent = null;
		} else {
			aktiveComponent = name;
		}
	}
</script>

<button
	class={aktiveComponent == 'Erklärung' ? 'btn btn-sm btn-dark' : 'btn btn-sm btn-light'}
	on:click={() => handleButtonClick('Erklärung')}>Erklärungen</button
>
<button
	class={aktiveComponent == 'Anleitung' ? 'btn btn-sm btn-dark' : 'btn btn-sm btn-light'}
	on:click={() => handleButtonClick('Anleitung')}>Anleitung</button
>

{#if aktiveComponent == null}
	Test
{:else if aktiveComponent == 'Erklärung'}
	<Erklrungen />
{:else if aktiveComponent == 'Anleitung'}
	<Anleitung />
{/if}
