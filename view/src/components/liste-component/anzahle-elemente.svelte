<script lang="ts">
	export let anzahl: number;
</script>

<nobr>
	Elemente: <span style="font-weight: bolder;">{anzahl.toString().padStart(2, '0')}</span> die angezeigt
	werden
</nobr>
