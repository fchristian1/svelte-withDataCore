<script lang="ts">
	import LadeNetzteile from './LadeNetzteile.svelte';
	import Lagerplatz from './Lagerplatz.svelte';
	import SteckerArt from './SteckerArt.svelte';
	import { siteKomponente } from './site.enum';

	let site: siteKomponente | null = siteKomponente.LadeNetzteile;
</script>

<div class="nav gap-3 mb-1">
	<button
		class={site == 1 ? 'btn btn-sm btn-dark' : 'btn btn-sm btn-light'}
		on:click={() => (site = siteKomponente.LadeNetzteile)}>{siteKomponente[1]}</button
	>
	<button
		class={site == 2 ? 'btn btn-sm btn-dark' : 'btn btn-sm btn-light'}
		on:click={() => (site = siteKomponente.SteckerArt)}>{siteKomponente[2]}</button
	>
	<button
		class={site == 3 ? 'btn btn-sm btn-dark' : 'btn btn-sm btn-light'}
		on:click={() => (site = siteKomponente.Lagerplatz)}>{siteKomponente[3]}</button
	>
</div>

{#if site === 1}
	<LadeNetzteile />
{:else if site == 2}
	<SteckerArt />
{:else if site == 3}
	<Lagerplatz />
{/if}
