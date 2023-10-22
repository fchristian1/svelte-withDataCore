<script lang="ts">
	import EditComponent from '../../../components/edit-component.svelte';
	import ListeComponent from '../../../components/liste-component.svelte';
	import ViewComponent from '../../../components/view-component.svelte';
	import { pathAlphachecker, urlAPI } from '../../../dataenv.svelte';
	let sitePrimary = 'Liste';
	let editData: any;
	let viewData: any;
	let fields = [
		['ArtNummer', 'artNumber', 'text'],
		['Datum', 'createDate', 'date']
	];
</script>

<button
	class={sitePrimary == 'Liste' ? 'btn btn-sm btn-dark' : 'btn btn-sm btn-light'}
	on:click={() => {
		sitePrimary = 'Liste';
		editData = [];
	}}>Liste</button
>
<button
	class={sitePrimary == 'Neu' ? 'btn btn-sm btn-dark' : 'btn btn-sm btn-light'}
	on:click={() => {
		sitePrimary = 'Neu';
		editData = [];
	}}>Neu</button
>
{#if sitePrimary == 'Liste'}
	<ListeComponent
		name={'Alphachecker'}
		url={urlAPI}
		path={pathAlphachecker}
		dataOne={editData}
		bind:sitePrimary
		bind:viewData
		tableList={fields}
		options={['Anzeigen', 'Löschen']}
	/>
{:else if sitePrimary == 'Neu'}
	<EditComponent
		urlAPIlocalExt={urlAPI}
		pathExt={pathAlphachecker}
		bind:sitePrimary
		bind:dataOne={editData}
		{fields}
		name="Alphachecker"
	/>
{:else if sitePrimary == 'Anzeige'}
	<ViewComponent data={viewData} />
{/if}
