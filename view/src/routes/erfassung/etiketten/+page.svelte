<script>
	import Nummer from './nummer.svelte';
	import Password from './password.svelte';
	var site = 1;
</script>

<h3>Etiketten - für 3667er Bögen von AVERY Zweckform</h3>
<button
	class={site === 1 ? 'btn btn-sm btn-dark' : 'btn btn-sm btn-light'}
	on:click={() => {
		site = 1;
	}}>Nummern</button
>
<button
	class={site === 2 ? 'btn btn-sm btn-dark' : 'btn btn-sm btn-light'}
	on:click={() => {
		site = 2;
	}}>Password</button
>

{#if site === 1}
	<Nummer />
{:else if site === 2}
	<Password />
{/if}
