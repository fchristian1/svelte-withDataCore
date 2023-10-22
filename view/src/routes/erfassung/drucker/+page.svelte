<script>
	import Drucker from './drucker.svelte';
	import Tintetoner from './tintetoner.svelte';

	let seite = 'Drucker';
</script>

<div class="nav gap-3 mb-1">
	<button
		on:click={(e) => {
			seite = 'Drucker';
		}}
		class={seite == 'Drucker' ? 'btn btn-sm btn-dark' : 'btn btn-sm btn-light'}>Drucker</button
	>
	<button
		on:click={(e) => {
			seite = 'TinteToner';
		}}
		class={seite == 'TinteToner' ? 'btn btn-sm btn-dark' : 'btn btn-sm btn-light'}
		>Toner/Tinte</button
	>
</div>
{#if seite == 'Drucker'}
	<Drucker />
{:else if seite == 'TinteToner'}
	<Tintetoner />
{/if}
