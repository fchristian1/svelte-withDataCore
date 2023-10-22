<script lang="ts">
	import Arbeitsspeicher from './arbeitsspeicher.svelte';
	import Datentraeger from './datentraeger.svelte';
	import Laufwerke from './laufwerke.svelte';
	import Netzteile from './netzteile.svelte';
	import { siteKomponente } from './site.enum';

	let site: siteKomponente | null = siteKomponente.Arbeitsspeicher;
</script>

<div class="nav gap-3 mb-1">
	<button
		class={site == 1 ? 'btn btn-sm btn-dark' : 'btn btn-sm btn-light'}
		on:click={() => (site = siteKomponente.Arbeitsspeicher)}>{siteKomponente[1]}</button
	>
	<button
		class={site == 2 ? 'btn btn-sm btn-dark' : 'btn btn-sm btn-light'}
		on:click={() => (site = siteKomponente.Datenträger)}>{siteKomponente[2]}</button
	>
	<button
		class={site == 3 ? 'btn btn-sm btn-dark' : 'btn btn-sm btn-light'}
		on:click={() => (site = siteKomponente.Netzteile)}>{siteKomponente[3]}</button
	>
	<button
		class={site == 4 ? 'btn btn-sm btn-dark' : 'btn btn-sm btn-light'}
		on:click={() => (site = siteKomponente.Laufwerke)}>{siteKomponente[4]}</button
	>
</div>

{#if site === 1}
	<Arbeitsspeicher />
{:else if site == 2}
	<Datentraeger />
{:else if site == 3}
	<Netzteile />
{:else if site == 4}
	<Laufwerke />
{/if}
