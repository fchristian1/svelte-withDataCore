<script lang="ts">
	import ListeComponent from '../../../components/liste-component.svelte';
	import { pathSteckkarten, urlAPI } from '../../../dataenv.svelte';
	let site = 'Liste';
	let editData: any;
</script>

<div class="nav gap-3 mb-3">
	<button
		class={site == 'Liste' ? 'btn btn-sm btn-dark' : 'btn btn-sm btn-light'}
		on:click={() => {
			site = 'Liste';
			editData = [];
		}}>Liste</button
	>
	<button
		class={site == 'Neu' ? 'btn btn-sm btn-dark' : 'btn btn-sm btn-light'}
		on:click={() => {
			site = 'Neu';
			editData = [];
		}}>Neu</button
	>
</div>
{#if site == 'Liste'}
	<ListeComponent
		name="Steckkarten"
		url={urlAPI}
		path={pathSteckkarten}
		tableList={[
			['ArtNummer', 'ArtNummer'],
			['Datum', 'Datum']
		]}
		bind:sitePrimary={site}
		bind:dataOne={editData}
		options={['Anzeigen', 'Löschen']}
	/>
{/if}
