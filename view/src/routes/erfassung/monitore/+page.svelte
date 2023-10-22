<script lang="ts">
	import EditComponent from '../../../components/edit-component.svelte';
	import ListeComponent from '../../../components/liste-component.svelte';
	import { pathMonitore, urlAPI } from '../../../dataenv.svelte';
	let showNew = false;
	let site = 'Liste';
	let editData: string[];

	let fields: string[][] = [
		['ArtNummer', 'ArtNummer', 'text'],
		['Hersteller', 'Hersteller', 'text', ''],
		['Model', 'Model', 'text', ''],
		['Baujahr', 'Baujahr', 'text', ''],
		[
			'Diagonale',
			'Diagonale',
			'text',
			'',
			'17:17,1:17,3:17,4:18,1:18,4:18,5:19:20:20,1:21:21,1:21,3:21,5:22:23:23,1:24:26:27:27,5:28:28,5:29:29,5:30:30,5:31:31,5:32:32,5'
		],
		[
			'Auflösung',
			'Auflösung',
			'text',
			'',
			'160x120:160x144:160x160:240x160:240x180:256x192:320x200:320x240:320x320:360x240:384x240:400x240:400x300:432x240:480x160:480x272:480x320:480x360:600x400:640x240:640x350:640x360:640x480:720x348:720x350:720x364:720x400:720x480:720x540:768x576:800x480:800x600:832x624:848x480:852x480:858x484:864x480:960x540:960x640:960x720:964x544:1024x576:1024x600:1024x768:1072x600:1152x864:1200x800:1200x900:1280x1024:1280x720:1280x768:1280x800:1280x960:1360x768:1366x768:1376x768:1400x1050:1400x900:1440x900:1440x960:1600x1024:1600x1200:1600x768:1600x900:1680x1050:1920x1080:1920x1200:1920x1400:1920x1440:2048x1080:2048x1152:2048x1536:2160x1080:2340x1080:2560x1080:2560x1440:2560x1600:2560x2048:2800x2100:2880x1440:2960x1440:3200x1800:3200x2048:3200x2400:3440x1440:3840x1080:3840x1200:3840x1600:3840x2160:3840x2400:4096x2160:4096x2304:4096x2304:4096x3072:4096x3072:5120x1440:5120x1440:5120x2160:5120x2160:5120x2880:5120x2880:5120x3200:5120x3200:5120x4096:5120x4096:6016x3384:6016x3384:6400x4096:6400x4096:6400x4800:6400x4800:7680x4320:7680x4320:7680x4800:7680x4800:8192x4320:8192x4320:15360x8640:15360x8640'
		],
		['DisplayTyp', 'DisplayTyp', 'text', '', 'TN:IPS'],
		['VGA', 'VGA', 'text', '', '1:2:3:4'],
		['DVI', 'DVI', 'text', '', '1:2:3:4'],
		['HDMI', 'HDMI', 'text', '', '1:2:3:4'],
		['DPort', 'DPort', 'text', '', '1:2:3:4'],
		['AudioIn', 'AudioIn', 'bool', ''],
		['AudioOut', 'AudioOut', 'bool', ''],
		['Stromversorgung', 'Stromversorgung', 'text', '', 'Kabel:Netzteil'],
		['Besonderheiten', 'Besonderheiten', 'text', ''],
		['Geprüft', 'Geprüft', 'bool', ''],
		['Abgabe', 'Abgabe', 'bool', ''],
		['Ausgabe Kunde', 'Ausgabe', 'bool', ''],
		['Schrott', 'Schrott', 'bool', '']
	];
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
		name="Monitore"
		url={urlAPI}
		path={pathMonitore}
		tableList={fields}
		bind:sitePrimary={site}
		bind:dataOne={editData}
		options={['Anzeigen', 'Löschen']}
	/>
{:else if (site = 'Neu')}
	<EditComponent
		urlAPIlocalExt={urlAPI}
		pathExt={pathMonitore}
		bind:sitePrimary={site}
		bind:dataOne={editData}
		tableList={fields}
		name="Monitore"
	/>
{/if}
