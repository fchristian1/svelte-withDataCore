<script lang="ts">
	import EditComponent from '../../../components/edit-component.svelte';
	import ListeComponent from '../../../components/liste-component.svelte';
	import { pathDatentraeger, urlAPI } from '../../../dataenv.svelte';
	let site = 'Liste';
	let editData: string[];
	let fields: string[][] = [
		['ArtNummer', 'ArtNummer', 'text'],
		['Anschluss', 'Anschluss', 'text', '', 'SATA:SAS'],
		['Typ', 'Typ', 'text', '', 'HDD:SSD'],
		['Größe in Zoll', 'Groesse', 'text', '', '2,5:3,5'],
		['Kapazität', 'Kapazitaet', 'text', ''],
		['Einheit', 'EinheitKapazitaet', 'text', '', 'GB:TB'],
		['Lagerplatz', 'Lagerplatz', 'text', '', 'true:false'],
		['DBAN', 'DBAN', 'bool', ''],
		['Geprüft', 'Geprueft', 'bool', ''],
		[
			'HDD-Bench',
			"{ feld: 'ArtNummer', vergleich: '==', feldExtern: 'ArtNummer', dbExtern: 'benchs' }",
			'db',
			urlAPI + 'api/benchs'
		],
		['Verbaut', 'Abgabe', 'bool', ''],
		['Ausgabe Kunde', 'Ausgabe', 'bool', ''],
		['Schrott', 'Schrott', 'bool', '']
	];
</script>

<div class="nav gap-3 mb-1">
	<button
		class={site == 'Liste' ? 'btn btn-sm btn-dark' : 'btn btn-sm btn-light'}
		on:click={() => {
			editData = [];
			site = 'Liste';
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
		name="Datenträger"
		url={urlAPI}
		path={pathDatentraeger}
		tableList={fields}
		bind:sitePrimary={site}
		bind:dataOne={editData}
		options={['Anzeigen', 'Löschen']}
	/>
{:else if (site = 'Neu')}
	<EditComponent
		urlAPIlocalExt={urlAPI}
		pathExt={pathDatentraeger}
		bind:sitePrimary={site}
		bind:dataOne={editData}
		tableList={fields}
		name="Datenträger"
	/>
{/if}
