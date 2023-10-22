<script lang="ts">
	import Button from './button.component.svelte';

	let activeDoku: string | null = null;
</script>

<Button bind:active={activeDoku} name="Alphachecker" />
<Button bind:active={activeDoku} name="Komponenten" />
<Button bind:active={activeDoku} name="HDD-Benchmark" />
<Button bind:active={activeDoku} name="Monitore" />
