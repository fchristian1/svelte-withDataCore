<script lang="ts">
	import EditComponent from '../../../components/edit-component.svelte';
	import ListeComponent from '../../../components/liste-component.svelte';
	import { pathDrucker, pathMonitore, urlAPI } from '../../../dataenv.svelte';
	let showNew = false;
	let site = 'Liste';
	let editData: string[];

	let fields: string[][] = [
		['ArtNummer', 'ArtNummer', 'text'],
		['Hersteller', 'Hersteller', 'text', ''],
		['Model', 'Model', 'text', ''],
		['Baujahr', 'Baujahr', 'text', ''],
		['Druckertyp', 'Druckertyp', 'text', '', 'Laser:Tinte'],
		['Farbe', 'Farbe', 'text', '', 'Schwarz:Farbe'],
		['Typ', 'Typ', 'text', '', 'Drucker:Multifunktion'],
		['Größe', 'Groesse', 'text', '', 'A4:A3'],
		['USB', 'USB', 'bool', ''],
		['Netzwerk', 'Netzwerk', 'bool', ''],
		['WLan', 'WLan', 'bool', ''],
		['Stromversorgung', 'Stromversorgung', 'bool', '', 'Kaltgeräte:Extern'],
		['Besonderheiten', 'Besonderheiten', 'text', ''],
		['Geprüft', 'Geprüft', 'bool', ''],
		['Abgabe', 'Abgabe', 'bool', ''],
		['Ausgabe Kunde', 'Ausgabe', 'bool', ''],
		['Schrott', 'Schrott', 'bool', '']
	];
</script>

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

{#if site == 'Liste'}
	<ListeComponent
		name="Drucker"
		url={urlAPI}
		path={pathDrucker}
		tableList={fields}
		bind:sitePrimary={site}
		bind:dataOne={editData}
		options={['Anzeigen', 'Löschen']}
	/>
{:else if (site = 'Neu')}
	<EditComponent
		urlAPIlocalExt={urlAPI}
		pathExt={pathDrucker}
		bind:sitePrimary={site}
		bind:dataOne={editData}
		tableList={fields}
		name="Drucker"
	/>
{/if}
