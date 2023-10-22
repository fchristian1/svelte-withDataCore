<script lang="ts">
	import EditComponent from '../../../components/edit-component.svelte';
	import ListeComponent from '../../../components/liste-component.svelte';
	import { pathLadeNetzteil, urlAPI } from '../../../dataenv.svelte';
	let fields: string[][] = [
		['Hersteller', 'Hersteller', 'text', ''],
		['Typ', 'Typ', 'text', ''],
		['VoltAusgang', 'VoltAusgang', 'text', ''],
		['AmpereAusgang', 'AmpereAusgang', 'text', ''],
		['SteckerArt', 'SteckerArt', 'db3', 'LadeNetzteilSteckerArt:(Nr,Aussendurchmesser,Bild):Nr'],
		[
			'Lagerplatz',
			'Lagerplatz',
			'db3',
			'LadeNetzteilLagerplatz:(LagerplatzNummer, KistenNummer):LagerplatzNummer+KistenNummer'
		],
		['Ausgabe Kunde', 'Ausgabe', 'bool', '']
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
		name="LadeNetzteile"
		url={urlAPI}
		path={pathLadeNetzteil}
		tableList={fields}
		bind:sitePrimary={site}
		bind:dataOne={editData}
		bind:search
		options={['Anzeigen', 'Löschen']}
	/>
{:else if (site = 'Neu')}
	<EditComponent
		urlAPIlocalExt={urlAPI}
		pathExt={pathLadeNetzteil}
		bind:sitePrimary={site}
		bind:dataOne={editData}
		tableList={fields}
		name="LadeNetzteile"
	/>
{/if}
