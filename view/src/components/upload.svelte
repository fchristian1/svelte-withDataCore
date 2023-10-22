<script lang="ts">
	import { pathUploads, urlAPI } from '../dataenv.svelte';

	let files: any = [];
	let input: any;
	let image: any;
	let showImage = false;

	const handleFileInput = (event: any) => {
		files = Array.from(event.target.files);
	};
	const uploadFiles = () => {
		const formData = new FormData();

		files.forEach((file: any) => {
			formData.append('files', file);
		});

		fetch(urlAPI + pathUploads, {
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
</script>

<h3>Upload</h3>
<div class="mb-3">
	<label for="formFileMultiple" class="form-label">Mehere Dateien hochladen:</label>
	<input
		class="form-control"
		type="file"
		id="formFileMultiple"
		multiple
		bind:this={input}
		on:change={(e) => {
			handleFileInput(e);
		}}
	/>
	<br />
	<button on:click={uploadFiles} class="btn btn-sm btn-light">Upload</button>
</div>
