<script lang="ts">
	import EditComponent from '../../../components/edit-component.svelte';
	import ListeComponent from '../../../components/liste-component.svelte';
	import { pathArbeitsspeicher, urlAPI } from '../../../dataenv.svelte';
	let fields: string[][] = [
		['ArtNummer', 'ArtNummer', 'text', ''],
		['Bauart', 'Bauart', 'text', '', 'DIMM:SO-DIMM'],
		['Typ', 'Typ', 'text', '', 'DDR 1:DDR 2:DDR 3:DDR 4'],
		['Größe', 'Groesse', 'text', '', '1:2:4:8:16'],
		['Einheit', 'GroesseEinheit', 'text', '', 'GB:TB'],
		['Lager', 'Lager', 'text', '', 'true:false'],
		['Geprüft', 'Geprueft', 'bool', ''],
		['Verbaut', 'Ausgabe', 'bool', ''],
		['Ausgabe Kunde', 'Ausgabe', 'bool', ''],
		['Schrott', 'Schrott', 'bool', ''],
		['Datum', 'Datum', 'date', '']
	];
	let site = 'Liste';
	let editData: any;
	let search: string = '';
</script>

<div class="nav gap-3 mb-1">
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
		name="Arbeitsspeicher"
		url={urlAPI}
		path={pathArbeitsspeicher}
		tableList={fields}
		bind:sitePrimary={site}
		bind:dataOne={editData}
		bind:search
		options={['Anzeigen', 'Löschen']}
	/>
{:else if (site = 'Neu')}
	<EditComponent
		urlAPIlocalExt={urlAPI}
		pathExt={pathArbeitsspeicher}
		bind:sitePrimary={site}
		bind:dataOne={editData}
		tableList={fields}
		name="Arbeitsspeicher"
	/>
{/if}
