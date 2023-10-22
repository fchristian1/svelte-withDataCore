<script lang="ts">
	import EditComponent from '../../../components/edit-component.svelte';
	import ListeComponent from '../../../components/liste-component.svelte';
	import { pathPCs, urlAPI } from '../../../dataenv.svelte';

	let activeSite = 'Liste';
	let editData: string[];
	let name = 'PCs';
	let fields: string[][] = [
		['ArtNummer', 'ArtNummer', 'text'],
		['Hersteller', 'Hersteller', 'text', ''],
		['Model', 'Model', 'text', ''],

		['Arbeitsspeicher', 'Arbeitsspeicher', 'db4', ''],
		['Datenträger', 'Datenträger', 'db4', ''],
		['Netzteil', 'Netzteil', 'db4', ''],
		['Laufwerk', 'Laufwerk', 'db4', ''],

		['VGA', 'VGA', 'bool', ''],
		['DVI', 'DVI', 'bool', ''],
		['HDMI', 'HDMI', 'bool', ''],
		['DPort', 'DPort', 'bool', ''],
		['Besonderheiten', 'Besonderheiten', 'text', ''],
		['Geprüft', 'Geprüft', 'bool', ''],
		['Abgabe', 'Abgabe', 'bool', ''],
		['Ausgabe Kunde', 'Ausgabe', 'bool', ''],
		['Schrott', 'Schrott', 'bool', '']
	];
</script>

<nav class="mb-1">
	<button
		class={'btn btn-sm ' + (activeSite == 'Liste' ? 'btn-dark' : 'btn-light')}
		on:click={() => (activeSite = 'Liste')}>Liste</button
	>
	<button
		class={'btn btn-sm ' + (activeSite == 'Neu' ? 'btn-dark' : 'btn-light')}
		on:click={() => (activeSite = 'Neu')}>Neu</button
	>
</nav>
{#if activeSite == 'Liste'}
	<ListeComponent
		{name}
		url={urlAPI}
		path={pathPCs}
		tableList={fields}
		bind:sitePrimary={activeSite}
		bind:dataOne={editData}
		options={['Anzeigen', 'Löschen']}
	/>
{:else if activeSite == 'Neu'}
	<EditComponent
		urlAPIlocalExt={urlAPI}
		pathExt={pathPCs}
		bind:sitePrimary={activeSite}
		bind:dataOne={editData}
		tableList={fields}
		{name}
	/>
{/if}
