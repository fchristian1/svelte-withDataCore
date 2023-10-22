<script lang="ts">
	import EditComponent from '../../../components/edit-component.svelte';
	import ListeComponent from '../../../components/liste-component.svelte';
	import { pathNetzteil, urlAPI } from '../../../dataenv.svelte';
	let fields: string[][] = [
		['ArtNummer', 'ArtNummer', 'text', ''],

		['Hersteller', 'Hersteller', 'text', ''],
		['Modell', 'Modell', 'text', ''],
		['Leistung', 'Leistung', 'text', ''],

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
		name="Netzteil"
		url={urlAPI}
		path={pathNetzteil}
		tableList={fields}
		bind:sitePrimary={site}
		bind:dataOne={editData}
		bind:search
		options={['Anzeigen', 'Löschen']}
	/>
{:else if (site = 'Neu')}
	<EditComponent
		urlAPIlocalExt={urlAPI}
		pathExt={pathNetzteil}
		bind:sitePrimary={site}
		bind:dataOne={editData}
		tableList={fields}
		name="Netzteil"
	/>
{/if}
