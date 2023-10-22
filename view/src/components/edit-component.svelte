<script lang="ts">
	// artikelnummer bei db2 wird nicht gespeichert und dataOne beim speicher mit db2 {} eintrag prüfen über log

	import { onMount } from 'svelte';
	import { pathUploads, urlAPI } from '../dataenv.svelte';

	export let tableList: any[];
	export let dataOne: { [key: string]: any } = [];
	let dataBool: boolean[] = [];
	export let name: string;
	export let sitePrimary: string;
	export let pathExt: string;
	export let urlAPIlocalExt: string;
	let artNummerRed: boolean = false;
	let valueOfArtNummer: string;
	$: valueOfArtNummer ? (dataOne['ArtNummer'] = valueOfArtNummer) : undefined;
	let id: string;
	let oldData: any[] = [];
	let newOrOldData: boolean = false;
	let clear: boolean = false;
	let files: any = [];
	let input: any;
	let image: any;
	let showImage = false;
	let externalData: any[] = [];
	let showDb3DataView: any[] = [];
	let simpleValid = true;
	onMount(async () => {
		const response = await fetch(urlAPIlocalExt + pathExt);
		const data = await response.json();
		externalData = await getExternalData();

		data.map((elm: any) => {
			if (elm.status === undefined || elm.status == 1) {
				oldData.push({ ArtNummer: elm['ArtNummer'] });
			}
		});

		if (dataOne['_id' as any]) {
			id = dataOne['_id' as any] as any;
			newOrOldData = false;
		} else {
			newOrOldData = true;
		}
		tableList.forEach((elm, i) => {
			if (dataOne && elm[2] === 'date') {
				dataOne[elm[1] as any] = getDateFromTimestamp(dataOne[elm[1] as any] ?? Date.now())
					.split('.')
					.reverse()
					.toString()
					.replaceAll(',', '-');
			} else if (elm[2] === 'bool') {
				dataBool[i] = dataOne[elm[1] as any] == 'true' ? true : false;
			}
			if (dataOne && elm[0] === 'ArtNummer') {
				simpleValid = false;
			}
		});
	});
	async function getExternalData() {
		let returnData: any = [];
		for (const element of tableList) {
			if (element[2] == 'db2') {
				const response = await fetch(element[3]);
				const data = await response.json();
				returnData[element[0] as any] = await data;
			} else if (element[2] == 'db3') {
				let c = 0;
				element.forEach((e: string) => {
					if (c == 0) {
						showDb3DataView[e] = false;
					}
					c++;
				});
				const response = await fetch(getUrlFromTableListElement(element[3]));
				const data = await response.json();
				returnData[element[0] as any] = await data;
			}
		}

		return returnData;
	}
	const getUrlFromTableListElement = (tableListParmsFrom3: string): string => {
		let collection = tableListParmsFrom3.split(':')[0];
		let url: string = urlAPI + 'api/' + collection;

		return url;
	};
	const handleFileInput = (event: any) => {
		files = Array.from(event.target.files);
	};
	const uploadFiels = () => {
		const formData = new FormData();

		files.forEach((file: any) => {
			formData.append('files', file);
		});

		fetch(urlAPIlocalExt + pathUploads, {
			method: 'POST',
			body: formData
		})
			.then((response) => response.json())
			.then((data) => {
				console.log(data);
			})
			.catch((error) => {
				console.log(error);
			});
	};

	const onChangeImage = () => {
		const file = input.files[0];
		if (file) {
			showImage = true;
			const reader = new FileReader();
			reader.addEventListener('load', () => {
				image.setAttribute('src', reader.result);
			});
			reader.readAsDataURL(file);
			return;
		}
		showImage = false;
	};
	const onClickSpeichern = (nextSite: string = 'Liste') => {
		let data: any[] = [];

		let sendData: any;
		for (let i = 0; i < tableList.length; i++) {
			if (tableList[i][2] == 'date') {
				data[i] =
					'"' + tableList[i][1] + '":"' + Date.parse(dataOne[tableList[i][1] as any] as any) + '"';
			} else if (tableList[i][2] == 'bool') {
				if (dataBool[i]) {
					data[i] = '"' + tableList[i][1] + '":"' + 'true"';
				} else {
					data[i] = '"' + tableList[i][1] + '":"' + 'false"';
				}
			} else if (tableList[i][2] == 'pic') {
				if (files.length > 0) {
					data[i] = '"' + tableList[i][1] + '":"' + files[0].name + '"';
				} else {
					data[i] = '"' + tableList[i][1] + '":"' + dataOne[tableList[i][1] as any] + '"';
				}
			} else {
				data[i] = '"' + tableList[i][1] + '":"' + dataOne[tableList[i][1] as any] + '"';
			}
		}

		if (id) {
			data.splice(0, 0, '"_id":"' + id + '"');
		}
		sendData = '{' + data.toString() + '}';
		if (files.length > 0) {
			uploadFiels();
		}

		fetch(urlAPIlocalExt + pathExt, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(JSON.parse(sendData))
		}).then(() => {
			sitePrimary = nextSite;
			oldData.push({ ArtNummer: dataOne['ArtNummer' as any] });
			if (clear) {
				tableList.forEach((form) => {
					dataOne['ArtNummer' as any] = '';
				});
				dataOne;
			} else {
				dataOne = [];
				let i = 0;
				tableList.forEach((form) => {
					if (form[1] != 'Datum') {
						dataOne[form[1] as any] = '';
					}
				});
				dataBool.forEach((e, i) => {
					dataBool[i] = e === true ? false : false;
				});
				dataOne['Datum' as any] = getDateFromTimestamp(Date.now().toString())
					.split('.')
					.reverse()
					.toString()
					.replaceAll(',', '-');
				dataOne;
			}
		});
	};
	const onClickAbbrechen = () => {
		dataOne = [];

		sitePrimary = 'Liste';
	};

	function getDateFromTimestamp(timestampString: string): string {
		return new Date(parseInt(timestampString, 10)).toLocaleDateString('de-DE', {
			day: '2-digit',
			month: '2-digit',
			year: 'numeric'
		});
	}
	function searchForArtNr(valueInput: string) {
		artNummerRed = searchInArray(valueInput);
	}
	function searchInArray(searchTerm: string): boolean {
		let results: any[] = [];
		oldData.forEach((item) => {
			Object.values(item).forEach((value) => {
				if (typeof value === 'string' && value.includes(searchTerm)) {
					results.push(item);
				}
			});
		});

		return results.length > 0 && oldData.length >= results.length ? true : false;
	}
	function searchInArrayWithArray(searchTerm: string, array: any[]): boolean {
		let results: any[] = [];
		array.forEach((item) => {
			Object.values(item).forEach((value) => {
				if (typeof value === 'string' && value == searchTerm) {
					results.push(item);
				}
			});
		});
		let result = results.length > 0 && array.length >= results.length ? true : false;

		return result;
	}
	function checkArtNummer(name: string | Object): boolean {
		return name === 'ArtNummer' ? true : false;
	}
	function checkFormat(name: any): boolean {
		let regx = new RegExp('[0-9]{1}-[0-9]{4}');
		if (name) {
			return name.length === 6 && regx.test(name) ? true : false;
		} else {
			return false;
		}
	}
	function setDataOneFromExternData(key: string, value: string) {
		dataOne[key] = value;
	}
</script>

<!-- 
{artNummerRed}
{dataOne['ArtNummer']} -->
<div class="row gap-3 ms-0">
	<div class="card col-4 m-0 p-0">
		<div class="card-header m-0 p-0">
			<h3 class="m-0 p-0 ms-3">{name} Erfassung</h3>
		</div>

		<div class="card-body m-0 p-0 mx-3">
			<div class="mb-3">
				{#each tableList as form, i}
					{#if checkArtNummer(form[1]) && artNummerRed}
						<label for="" class="form-label mb-0 text-danger">{form[0]} schon vorhanden!</label>
					{:else if checkArtNummer(form[1]) && dataOne['ArtNummer'] == ''}
						<label for="" class="form-label mb-0 text-danger">{form[0]} darf nicht leer sein!</label
						>
					{:else if checkArtNummer(form[1]) && !checkFormat(dataOne['ArtNummer'])}
						<label for="" class="form-label mb-0 text-danger"
							>{form[0]} falsches format! y-xxxx</label
						>
					{:else if form[2] == 'db2'}
						<label for="" class="form-label mb-0">{form[0]}</label>
					{:else if form[2] == 'db3'}
						<label for="" class="form-label mb-0">{form[0]}</label>
					{:else if form[2] != 'db'}
						<label for="" class="form-label mb-0">{form[0]}</label>
					{/if}
					{#if form.length < 5}
						{#if form[2] == 'text'}
							{#if form[1] == 'ArtNummer'}
								<input
									class={artNummerRed
										? 'form-control form-control-sm border-danger'
										: 'form-control form-control-sm'}
									name={form[0]}
									type="text"
									on:keyup={() => searchForArtNr(dataOne[form[1]])}
									bind:value={dataOne[form[1]]}
								/>
							{:else}
								<input
									class="form-control form-control-sm"
									name={form[0]}
									type="text"
									bind:value={dataOne[form[1]]}
								/>
							{/if}
						{:else if form[2] == 'date'}
							<input
								class="form-control form-control-sm"
								name={form[0]}
								type="date"
								bind:value={dataOne[form[1]]}
							/>
							<!-- <input class="form-control" name={form[0]} type="date" value="2023-02-02" /> -->
						{:else if form[2] == 'bool'}
							<div class="form-check">
								<input
									class="form-check-input"
									name={form[0]}
									type="checkbox"
									bind:checked={dataBool[i]}
								/>
							</div>
						{:else if form[2] == 'pic'}
							<div class="form-input">
								<input
									class="form-file-input"
									name={form[0]}
									type="file"
									bind:this={input}
									on:change={(e) => {
										handleFileInput(e);
										onChangeImage();
									}}
								/>
							</div>
						{:else if form[2] == 'db3'}
							<input
								class="form-control form-control-sm"
								id={'db_' + form[0]}
								type="button"
								value={dataOne[form[1]] ? dataOne[form[1]].split(':')[2] : 'auswählen'}
								on:click={() => {
									let wasTrue = showDb3DataView[form[0]];
									showDb3DataView = showDb3DataView.map((obj) => {
										for (const key in obj) {
											obj[key] = false;
										}
										return obj;
									});
									wasTrue ? false : (showDb3DataView[form[0]] = !showDb3DataView[form[0]]);
									//console.log(showDb3DataView);
								}}
							/>
							{#if showDb3DataView[form[0]] === true}
								<div class="extData">
									{#each externalData[form[0]] as item}
										{#if item.status != 0}
											<!-- svelte-ignore a11y-click-events-have-key-events -->
											<div
												class="extDataItem"
												on:click={() => {
													let itemDataname = item[form[3].split(':')[2]];
													if (form[3].split(':')[2].split('+').length > 1) {
														itemDataname = '';
														form[3]
															.split(':')[2]
															.split('+')
															.forEach((e) => {
																itemDataname += item[e] + ' ';
															});
													}
													setDataOneFromExternData(
														form[0],
														form[3].split(':')[0] + ':' + item._id + ':' + itemDataname
													);
													showDb3DataView = showDb3DataView.map((obj) => {
														for (const key in obj) {
															obj[key] = false;
														}
														return obj;
													});
												}}
											>
												{#each form[3]
													.toString()
													.split(':')[1]
													.replace('(', '')
													.replace(')', '')
													.split(',') as i, index}
													<span>
														{#if index !== 0 && i !== 'Bild'}
															{', '}
														{/if}
														{#if i === 'Bild'}
															<img
																class="extDataImg"
																alt=""
																src={'http://192.168.200.100:4300/uploads/hddbench/' + item[i]}
															/>
														{:else if i === 'Aussendurchmesser'}
															{i + ': ' + item[i] + 'mm'}
														{:else}
															{i + ': ' + item[i]}
														{/if}
													</span>
												{/each}
											</div>
										{/if}
									{/each}
								</div>
							{/if}
						{:else if form[2] == 'db2'}
							<input
								bind:value={valueOfArtNummer}
								on:select={(e) => {
									artNummerRed = !searchInArrayWithArray(valueOfArtNummer, externalData[form[0]]);
								}}
								on:keyup={(e) => {
									artNummerRed = !searchInArrayWithArray(valueOfArtNummer, externalData[form[0]]);
								}}
								class={artNummerRed
									? 'form-control form-control-sm border-danger'
									: 'form-control form-control-sm'}
								type="text"
								list="alphalist"
							/>
							<datalist id="alphalist">
								{#if externalData}
									{#each externalData[form[0]] as item}
										{#if item.status != 0}
											<option>{item.artNumber}</option>
										{/if}
									{/each}
								{/if}
							</datalist>
						{/if}
					{:else if form[4] != ''}
						<select class="form-select form-select-sm" bind:value={dataOne[form[1]]}>
							<option />
							{#each form[4].toString().split(':') as option}
								<option>{option}</option>
							{/each}
						</select>
					{/if}
				{/each}
			</div>
		</div>
		<div class="card-footer">
			<div style="display: flex; align-items: center;">
				{#if newOrOldData}
					<button
						disabled={simpleValid
							? false
							: artNummerRed || dataOne['ArtNummer'] === '' || !checkFormat(dataOne['ArtNummer'])}
						class="btn btn-sm btn-success btn-sm"
						on:click={() => {
							onClickSpeichern('Neu');
						}}
						>Speichern und Neu
					</button>

					<input
						style="height: 26px; width: 26px;"
						class="form-check-inline ms-1"
						type="checkbox"
						bind:checked={clear}
					/>
				{/if}
				<button
					disabled={simpleValid
						? false
						: artNummerRed || dataOne['ArtNummer'] === '' || !checkFormat(dataOne['ArtNummer'])}
					class="btn btn-sm btn-success btn-sm"
					on:click={() => {
						onClickSpeichern();
					}}>Speichern</button
				>
				<button
					class="btn btn-sm btn-danger btn-sm ms-1"
					on:click={() => {
						onClickAbbrechen();
					}}>Abbrechen</button
				>
			</div>
		</div>
	</div>
	{#if dataOne['Bild'] !== undefined || showImage}
		<div style="" class="col-4 p-0 m-0">
			{#if dataOne['Bild'] !== undefined}
				<img
					src={urlAPIlocalExt + pathUploads + 'hddbench/' + dataOne['Bild']}
					alt="hddbench"
					width="600px"
				/>
			{/if}
			{#if showImage}
				<img bind:this={image} src="" alt="hddbench" />
			{/if}
		</div>
	{/if}
</div>

<style>
	.extData {
		left: 101%;
		border: 1px solid black;
		border-radius: 0.375rem;
		position: absolute;
		padding: 10px 15px;
	}
	.extDataItem {
		display: flex;
		align-items: center;
		cursor: pointer;
		border-radius: 0.19rem;
	}
	.extDataItem:hover {
		background-color: darkgray;
	}
	.extDataItem span {
		white-space: nowrap;
	}
	.extDataItem span:not(:last-child) {
		margin-right: 5px;
	}
	.extDataImg {
		height: 100px;
	}
</style>
