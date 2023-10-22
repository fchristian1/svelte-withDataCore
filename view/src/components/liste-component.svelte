<script lang="ts">
	import { onMount } from 'svelte';
	import ArrowDownShort from './arrow-down-short.svelte';
	import ArrowUpShort from './arrow-up-short.svelte';

	import Empty16 from './empty16.svelte';

	import { urlAPI } from '../dataenv.svelte';
	import AnzahleElemente from './liste-component/anzahle-elemente.svelte';
	export let name: string;
	export let sitePrimary;
	export let dataOne: string[];
	export let viewData: any = {};
	export let url: string;
	export let path: string;
	export let tableList: string[][];
	export let options: string[];
	export let search: string = '';

	let showStatus = true;
	let datas: any[] = [];
	let datasSearch: any[] = [];
	let order = true;
	let sortBy = tableList[0][1];
	let anzahlAufSeite = 10;
	let windowHeight: number = 0;
	let aktuelleSeite = 1;
	let anzahlSeiten = 0;
	$: siteData = datasSearch
		.sort((a: any, b: any) => {
			if (siteData) {
				if (order) {
					return a[sortBy] != undefined && b[sortBy] != undefined
						? a[sortBy].localeCompare(b[sortBy], 'de', { numeric: true })
						: null;
				} else {
					return a[sortBy] != undefined && b[sortBy] != undefined
						? b[sortBy].localeCompare(a[sortBy], 'de', { numeric: true })
						: null;
				}
			}
		})
		.slice(
			(aktuelleSeite - 1) * anzahlAufSeite,
			(aktuelleSeite - 1) * anzahlAufSeite + anzahlAufSeite
		);

	async function getData(url: string) {
		const response = await fetch(url);
		const data = await response.json();
		const externalDataI = await getExternalData();
		for (const element of tableList) {
			if (element[2] == 'db') {
				data.map((e: any) => {
					let obj = externalDataI[element[0] as any].find((ee) => ee.ArtNummer == e.ArtNummer);
					e['HDD-Bench'] = obj != undefined ? '+' : '-';
				});
			}
		}
		//console.log(data);

		return await data;
	}
	async function getExternalData() {
		let returnData: any[][] = [];
		for (const element of tableList) {
			if (element[2] == 'db') {
				const response = await fetch(element[3]);
				const data = await response.json();
				returnData[element[0] as any] = await data;
			}
		}

		return returnData;
	}
	async function switchShow() {
		aktuelleSeite = 1;
		showStatus = !showStatus;
		if (showStatus) {
			await setData();
		} else {
			await setData();
		}
	}

	function setSiteCount() {
		anzahlSeiten = Math.ceil(datasSearch.length / anzahlAufSeite);
	}
	async function setData() {
		let results: any[] = [];
		datas = [];
		datas = await getData(url + path);
		if (search != '') {
			datas.forEach((item) => {
				Object.values(item).forEach((value) => {
					if (typeof value === 'string' && value.includes(search)) {
						results.push(item);
					}
				});
			});
		} else {
			datas.forEach((elm) => {
				if (showStatus) {
					if (elm.status === undefined || elm.status == '1') {
						results.push(elm);
					}
				} else {
					if (elm.status == '0') {
						results.push(elm);
					}
				}
			});
		}

		datasSearch = results;
		anzahlSeiten = Math.ceil(datasSearch.length / anzahlAufSeite);
	}
	onMount(async function () {
		await setData();
		window.addEventListener('resize', handleResizeWindow);
		await handleResizeWindow();
		return () => {
			window.removeEventListener('resize', handleResizeWindow);
		};
	});

	async function handleResizeWindow() {
		windowHeight = window.innerHeight;
		let tableTop = window.document.getElementById('datatable')?.getBoundingClientRect().top;
		let tableHeight = window.document.getElementById('datatable')?.clientHeight;
		let moreRows = Math.round((windowHeight - tableTop! - tableHeight!) / 32);
		anzahlAufSeite = moreRows > 0 ? anzahlAufSeite + moreRows : 10;
		anzahlSeiten = Math.ceil(datasSearch.length / anzahlAufSeite);
	}
	function heandleOrder(sortByButton: string) {
		if (sortByButton === sortBy) {
			order = !order;
		} else {
			order = true;
			sortBy = sortByButton;
		}
	}
	async function searchInArray(searchTerm: string) {
		let results: any[] = [];

		if (searchTerm === '') {
			setData();
		}
		datas.forEach((item: any) => {
			Object.values(item).forEach((value) => {
				if (typeof value === 'string' && value.includes(searchTerm)) {
					let ok = true;
					for (const res of results) {
						ok = res.ArtNummer === item.ArtNummer ? false : true;
					}
					if (ok) results.push(item);
				}
			});
		});
		datasSearch = results;
		aktuelleSeite = 1;
	}
	function getDateFromTimestamp(timestampString: string): string {
		return new Date(parseInt(timestampString, 10)).toLocaleDateString('de-DE', {
			day: '2-digit',
			month: '2-digit',
			year: 'numeric'
		});
	}
	function heandleMousewheel(event: any) {
		if (event.deltaY >= 0) {
			aktuelleSeite == anzahlSeiten ? (aktuelleSeite = anzahlSeiten) : aktuelleSeite++;
		} else {
			aktuelleSeite > 1 ? aktuelleSeite-- : (aktuelleSeite = 1);
		}
	}
</script>

<svelte:head>
	<title>{name} Liste</title>
</svelte:head>
<div class="card m-0 p-0">
	<div class="card-header m-0 p-0">
		<h3 style="font-family: 'Source Code Pro', monospace;" class="ms-3 m-0 p-0">
			{name} Liste
		</h3>
	</div>
	<div class="card-body p-0">
		<table class="table table-bordered m-0" style="" id="optionstable">
			<tbody>
				<tr>
					<td class="ms-3">
						<span>Ansicht: </span>
					</td>
					<td>
						<AnzahleElemente anzahl={anzahlAufSeite} />
					</td>

					<td>
						<nobr>
							Seite: <span style="font-weight: bolder;"
								>{aktuelleSeite.toString().padStart(3, '0')}</span
							>
							von
							<span style="font-weight: bolder;">{anzahlSeiten.toString().padStart(3, '0')}</span>
							über
							{datasSearch.length} Datensätze
						</nobr>
					</td>
				</tr><tr>
					<td class="col-2">
						<button
							class="btn btn-sm btn-success btn-sm col-5"
							on:click={switchShow}
							hidden={showStatus === false}>Normal</button
						>
						<button
							class="btn btn-sm btn-danger btn-sm col-5"
							on:click={switchShow}
							hidden={showStatus === true}>Gelöscht</button
						>
					</td>

					<td
						><nobr>
							<button
								class="btn btn-sm btn-dark btn-sm col-2"
								on:click={() => {
									anzahlAufSeite > 1 ? anzahlAufSeite-- : (anzahlAufSeite = 1);
									setSiteCount();
								}}>Weniger</button
							>

							<button
								class="btn btn-sm btn-dark btn-sm col-2"
								on:click={() => {
									anzahlAufSeite < datasSearch.length
										? anzahlAufSeite++
										: (anzahlAufSeite = datasSearch.length);
									setSiteCount();
									aktuelleSeite = 1;
								}}>Mehr</button
							>
						</nobr>
					</td>

					<td>
						<nobr>
							<button
								class="btn btn-sm btn-dark btn-sm col-2"
								on:click={() => {
									aktuelleSeite === 1 ? (aktuelleSeite = 1) : aktuelleSeite--;
								}}>Zurück</button
							>
							<button
								class="btn btn-sm btn-dark btn-sm col-2"
								on:click={() => {
									aktuelleSeite === anzahlSeiten ? (aktuelleSeite = anzahlSeiten) : aktuelleSeite++;
								}}>Vor</button
							>
						</nobr>
					</td>
				</tr>
				<tr
					><td>Suche: </td>
					<td
						><nobr>
							<div>
								<input
									on:keyup={() => {
										searchInArray(search);
									}}
									bind:value={search}
									class="form-control form-control-sm"
									type="text"
									name=""
									id=""
								/>
							</div></nobr
						>
					</td>
					<td
						><button
							class="btn btn-sm btn-sm btn-dark col-2"
							on:click={() => {
								search = '';
								setData();
							}}>X</button
						></td
					>
				</tr>
			</tbody>
		</table>
	</div>
	<div class="card-footer m-0 p-0 px-1">
		<table class="table m-0" id="datatable" on:wheel={(e) => heandleMousewheel(e)}>
			<thead>
				<tr>
					<th class="p-0" />
					{#each tableList as item, i}
						<th class="p-0" id={item[1]}
							><nobr
								><button
									on:click={() => {
										heandleOrder(item[1]);
									}}
									class="btn btn-sm btn-sm btn-light px-0"
									>{item[0]}
									{#if sortBy === item[1]}
										{#if order}
											<ArrowDownShort />
										{:else}
											<ArrowUpShort />
										{/if}
									{:else}
										<Empty16 />
									{/if}
								</button>
								<!--<input type="checkbox" name="" id="" checked />-->
							</nobr></th
						>
					{/each}
					<th />
				</tr>
			</thead>
			<tbody style="height: 25px;">
				{#if siteData && siteData.length > 0}
					{#each siteData as hwi, i}
						<tr
							on:mouseenter={(e) => {}}
							style={i % 2 == 1 ? 'background-color: darkgrey' : ''}
							hidden={(showStatus && hwi.status === 0) ||
								(!showStatus && (hwi.status === undefined || hwi.status === 1))}
							id={hwi._id}
							><td class="p-0 m-0">
								{#if options.find((elm) => elm == 'Anzeigen')}
									{#if name == 'Alphachecker'}
										<button
											style="height: 28px;"
											class="btn btn-sm btn-dark py-0"
											on:click={async () => {
												let response = await fetch(urlAPI + 'api/lshws/' + hwi.artNumber);
												let data = await response.json();
												viewData = data;
												sitePrimary = 'Anzeige';
											}}>Anzeigen</button
										>
									{:else}
										<button
											style="height: 28px;"
											class="btn btn-sm btn-dark py-0"
											on:click={(event) => {
												dataOne = hwi;
												sitePrimary = 'Neu';
											}}>Anzeigen</button
										>
									{/if}
								{/if}
							</td>
							{#each tableList as item}
								{#if item[2] == 'date'}
									<td class="p-0">{getDateFromTimestamp(hwi[item[1]])}</td>
								{:else if item[2] == 'bool'}
									<td class="p-0"
										>{hwi[item[1]] === null ? '-' : hwi[item[1]] === 'true' ? '✓' : '-'}</td
									>
								{:else if item[2] == 'db'}
									<td class="p-0">
										{hwi[item[0]] === null ? '-' : hwi[item[0]] === '+' ? '✓' : '-'}
									</td>
								{:else if item[2] == 'db3'}
									<td class="p-0">
										{hwi[item[0]] === null ? '-' : hwi[item[0]].split(':')[2]}
									</td>
								{:else}
									<td class="p-0"><nobr>{hwi[item[1]]}</nobr></td>
								{/if}
							{/each}
							<td class="p-0 m-0">
								{#if options.find((elm) => elm == 'Löschen')}
									{#if hwi.status === undefined || hwi.status === 1}
										<button
											style="height: 28px;"
											class="btn btn-sm btn-danger btn-sm py-0"
											on:click={async () => {
												await fetch(url + path + hwi._id + '/0');
												setData();
											}}>Löschen</button
										>
									{:else if hwi.status === 0}
										<button
											class="btn btn-sm btn-success btn-sm py-0"
											on:click={async () => {
												await fetch(url + path + hwi._id + '/1');
												setData();
											}}>Wiederherstellen</button
										>
									{/if}
								{/if}
							</td>
						</tr>
					{/each}
				{/if}
			</tbody>
		</table>
	</div>
</div>

<style>
	#optionstable tbody td {
		margin: 0;
		padding: 0px 5px;
	}
</style>
