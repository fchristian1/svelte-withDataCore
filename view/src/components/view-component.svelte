<script lang="ts">
	export let data: any = {};
	let decodingData = data.data;
	$: console.log(hwData);
	let hwData = {
		cpu: getRegex(
			/CPU [Pp]rodu[ck]t:\s*([a-zA-Z0-9@.()\s\-]*)\s*(vendor:|Hersteller:)/,
			decodingData
		),
		cores: getRegex(/cores=([0-9]*)/, decodingData),
		threads: getRegex(/threads=([0-9]*)/, decodingData),
		all: decodingData ?? ''
	};
	function getDecodesBase64(data: string) {
		return atob(data) ?? '';
	}
	function getRegex(pattern: any, searchIn: string) {
		let result = searchIn.match(pattern) ?? '';
		return result[1] ?? '';
	}
</script>

<code />
<hr />
<table>
	<tr>
		<td>CPU:</td>
		<td>{hwData.cpu}</td>
	</tr>
	<tr>
		<td>Cores:</td>
		<td>{hwData.cores}</td>
	</tr>
	<tr>
		<td>Threads:</td>
		<td>{hwData.threads}</td>
	</tr>
	<tr>
		<td>All:</td>
		<td>{hwData.all}</td>
	</tr>
</table>
