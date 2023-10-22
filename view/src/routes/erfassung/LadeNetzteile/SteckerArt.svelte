<script lang="ts">
	import EditComponent from '../../../components/edit-component.svelte';
	import ListeComponent from '../../../components/liste-component.svelte';
	import Upload from '../../../components/upload.svelte';
	import { pathLadeNetzteilSteckerArt, urlAPI } from '../../../dataenv.svelte';
	import { user } from '../../../stores/login.store';

	let site = 'Liste';
	let login = false;
	user.subscribe((u) => {
		login = u;
	});
	let editData: any;
	let fields: string[][] = [
		['Nr', 'Nr', 'text', ''],
		['Name', 'Name', 'text', ''],
		['Bild', 'Bild', 'pic', ''],
		['Aussendurchmesser mm', 'Aussendurchmesser', 'text', ''],
		['Innendurchmesser mm', 'Innendurchmesser', 'text', ''],
		['Länge mm', 'Länge', 'text', ''],
		['PinAnzahl', 'PinAnzahl', 'text', '']
	];
</script>

<div class="nav gap-3 mb-1">
	<button
		on:click={() => {
			site = 'Liste';
			editData = [];
		}}
		class={site == 'Liste' ? 'btn btn-sm btn-dark' : 'btn btn-sm btn-light'}>Liste</button
	>
	<button
		on:click={() => {
			site = 'Neu';
			editData = [];
		}}
		class={site == 'Neu' ? 'btn btn-sm btn-dark' : 'btn btn-sm btn-light'}>Neu</button
	>
	{#if login}
		<button
			on:click={() => {
				site = 'Upload';
				editData = [];
			}}
			class={site == 'Upload' ? 'btn btn-sm btn-dark' : 'btn btn-sm btn-light'}>MultiUpload</button
		>
	{/if}
</div>
{#if site == 'Liste'}
	<ListeComponent
		name="SteckerArt"
		url={urlAPI}
		path={pathLadeNetzteilSteckerArt}
		tableList={fields}
		bind:sitePrimary={site}
		bind:dataOne={editData}
		options={['Anzeigen', 'Löschen']}
	/>
{/if}
{#if site == 'Neu'}
	<EditComponent
		urlAPIlocalExt={urlAPI}
		pathExt={pathLadeNetzteilSteckerArt}
		bind:sitePrimary={site}
		bind:dataOne={editData}
		tableList={fields}
		name="SteckerArt"
	/>
{/if}
{#if site == 'Upload'}
	<Upload />
{/if}
