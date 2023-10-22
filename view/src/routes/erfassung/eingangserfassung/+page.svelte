<script lang="ts">
	import type EingangsNummer from './eingangsNummer.model';
	import type EingangWare from './eingangWare.model';
	import { Warengruppe } from './warengruppen.enum';

	let eingangsNummern: EingangsNummer[] = [];
	let eingangsWaren: EingangWare[] = [];
	let eingangsWare: EingangWare = {};

	function handleButtonClick(nummer: string | undefined) {
		eingangsWare.eingangsnummer = nummer;
	}

	function createNumbers() {
		let count = 0;
		let max = 9999;
		while (count <= max) {
			let random = Math.round(Math.random());
			eingangsNummern.push({
				id: crypto.randomUUID().toString(),
				nummer: 'E-' + count.toString().padStart(4, '0'),
				status: random
			});
			count++;
		}
	}
	createNumbers();
	let today: Date = new Date();
	let date: string =
		today.getFullYear().toString() +
		'-' +
		(today.getMonth() + 1).toString().padStart(2, '0') +
		'-' +
		today.getDate().toString().padStart(2, '0');
</script>

<div class="card">
	<div class="card-header">
		<h3>Eingangserfassung</h3>
	</div>
	<div class="card-body">
		<div>
			<div class="row">
				<div class="col-1">
					<label for="">Datum:</label>
					<input type="date" bind:value={date} />
				</div>
			</div>
			{eingangsWare.eingangsnummer == undefined ? 'E-----' : eingangsWare.eingangsnummer}
			<label for="">Abholort: <input on:keyup={() => {}} type="text" /></label>
			<label for=""
				>Warengruppe: <select>
					{#each Warengruppe.warengruppen as wg}
						<option>{wg}</option>
					{/each}
					<option>2</option>
					<option>3</option>
					<option>4</option>
					<option>5</option>
					<option>6</option>
				</select></label
			>
		</div>
	</div>
	<div class="card-footer">
		<div style="height:40em" class="overflow-auto">
			{#each eingangsNummern as num}
				{#if num.status === 1}
					<button
						on:click={() => {
							handleButtonClick(num.nummer);
						}}>{num.nummer}</button
					>
				{/if}
			{/each}
		</div>
	</div>
</div>
