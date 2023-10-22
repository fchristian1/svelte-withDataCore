<script lang="ts">
	import { Auflösungen, Diagonale, DisplayTyp } from './monitor.model';
	import type Monitor from './monitor.model';

	let monitore: Monitor[] = [];
	let newMonitor: Monitor = {};
</script>

<h5>Neuer Monitor</h5>
<div class="row">
	<div class="col-3">
		<label class="form-label" for="artNumber">ArtNummer: </label>
		<input class="form-control" id="artNumber" type="text" bind:value={newMonitor.a_artNumber} />
		<label class="form-label" for="artNumber">Hersteller: </label>
		<input class="form-control" id="artNumber" type="text" bind:value={newMonitor.b_hersteller} />
		<label class="form-label" for="artNumber">Typbezeichnung: </label>
		<input class="form-control" id="artNumber" type="text" bind:value={newMonitor.c_typ} />
		<label class="form-label" for="artNumber">Baujahr: </label>
		<input class="form-control" id="artNumber" type="number" bind:value={newMonitor.d_baujahr} />
		<label class="form-label" for="artNumber">Diagonale: </label>
		<select class="form-control" bind:value={newMonitor.e_diagonale}>
			{#each Object.values(Diagonale).filter((v) => isNaN(Number(v))) as elm}
				<option value={elm}>{elm}</option>
			{/each}
		</select>

		<label class="form-label" for="artNumber">Auflösung: </label>
		<select class="form-control" bind:value={newMonitor.f_auflösung}>
			{#each Object.values(Auflösungen).filter((v) => isNaN(Number(v))) as elm}
				<option value={elm}>{elm}</option>
			{/each}
		</select>
		<label class="form-label" for="artNumber">Display Typ: </label>
		<select class="form-control" bind:value={newMonitor.g_displayTyp}>
			{#each Object.values(DisplayTyp).filter((v) => isNaN(Number(v))) as elm}
				<option value={elm}>{elm}</option>
			{/each}
		</select>
		<label class="form-label" for="artNumber">VGA: </label>
		<input class="form-check" type="checkbox" bind:value={newMonitor.h_anschlussVGA} />
		<label class="form-label" for="artNumber">DVI: </label>
		<input class="form-check" type="checkbox" bind:value={newMonitor.i_anschlussDVI} />
		<label class="form-label" for="artNumber">HDMI: </label>
		<input class="form-check" type="checkbox" bind:value={newMonitor.j_anschlussHDMI} />
		<label class="form-label" for="artNumber">DPort: </label>
		<input class="form-check" type="checkbox" bind:value={newMonitor.k_anschlussDPort} />
		<label class="form-label" for="artNumber">Besonderheiten: </label>
		<input class="form-control" id="artNumber" type="text" bind:value={newMonitor.l_besonderheit} />
		<label class="form-label" for="artNumber">AudioEingang: </label>
		<input class="form-check" type="checkbox" bind:value={newMonitor.m_anschlussAudioEin} />
		<label class="form-label" for="artNumber">AudioAusgang: </label>
		<input class="form-check" type="checkbox" bind:value={newMonitor.n_anschlussAudioAus} />
		<label class="form-label" for="artNumber">Netzteil: </label>
		<input class="form-check" type="checkbox" bind:value={newMonitor.o_netzteil} />
		<label class="form-label" for="artNumber">Kaltgerätebuchse: </label>
		<input class="form-check" type="checkbox" bind:value={newMonitor.p_kaltgerätestecker} />
		<label class="form-label" for="artNumber">Informationen: </label>
		<input
			class="form-control"
			id="artNumber"
			type="text"
			bind:value={newMonitor.q_informationen}
		/>
		<button class="mt-3 btn btn-light btn-sm btn-outline-success">Abschicken</button>
	</div>
</div>
