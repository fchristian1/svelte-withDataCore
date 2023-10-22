<script lang="ts">
	import { PDFDocument, rgb } from 'pdf-lib';

	var currentCategory = 'E';
	var currentNumber = 0;
	var change: boolean = false;
	let pdfUrl: any = null;
	async function createPDF() {
		// Create a new PDF document
		const pdfDoc = await PDFDocument.create();

		// Define page dimensions
		const pageWidth = 595; // A4 width in points
		const pageHeight = 842; // A4 height in points

		// Define margin in millimeters
		const marginXmm = 8;
		const marginYmm = 13.5;

		// Convert millimeters to points
		const marginX = marginXmm * 2.83465;
		const marginY = marginYmm * 2.83465;

		// Define box dimensions and spacing
		const boxWidth = (pageWidth - 2 * marginX) / 4;
		const boxHeight = (pageHeight - 2 * marginY) / 16;
		const boxSpacingX = (pageWidth - 2 * marginX - 4 * boxWidth) / 3;
		const boxSpacingY = marginY / 15;

		// Add a new page to the PDF document
		const page = pdfDoc.addPage([pageWidth, pageHeight]);

		// Set the page background color to white
		page.drawRectangle({
			x: 0,
			y: 0,
			width: pageWidth,
			height: pageHeight,
			color: rgb(1, 1, 1)
		});

		// Define text content and options
		const text1 = 'BBG-RecycleWerk ' + new Date(Date.now()).getFullYear().toString();
		const fontSize1 = 8;
		const font1 = await pdfDoc.embedFont('Helvetica-Bold');
		const textWidth1 = font1.widthOfTextAtSize(text1, fontSize1);

		// Draw the boxes on the page and add text to each box
		for (let row = 0; row < 16; row++) {
			for (let col = 0; col < 4; col++) {
				const boxX = marginX + col * (boxWidth + boxSpacingX);
				const boxY = pageHeight - marginY - (row + 1) * boxHeight;

				// Define text content and options
				const text2 = currentCategory + '-' + currentNumber.toString().padStart(4, '0');
				currentNumber++;

				const fontSize2 = 28;
				const font1 = await pdfDoc.embedFont('Helvetica-Bold');
				const textWidth2 = font1.widthOfTextAtSize(text2, fontSize2);
				const textX2 = boxX + (boxWidth - textWidth2) / 2;
				const textY2 = boxY + (boxHeight - fontSize2) / 2;

				// Add text to the box
				page.drawText(text1, {
					x: boxX + (boxWidth - textWidth1) / 2,
					y: boxY + boxHeight - 10,
					size: fontSize1
				});
				page.drawText(text2, { x: textX2, y: textY2, size: fontSize2 });
			}
		}

		const pdfBytes = await pdfDoc.save();
		const pdfBlob = new Blob([pdfBytes], { type: 'application/pdf' });

		pdfUrl = URL.createObjectURL(pdfBlob);
	}
	const handleNumberInput = (event: any) => {
		const maxLength = 4;
		const input = event.target.value;
		if (input.length > maxLength) {
			event.target.value = input.slice(0, maxLength);
		}
		if (input < 0) {
			event.target.value = 0;
		}
		currentNumber = event.target.value;
		change = true;
	};
</script>

<div class="row">
	<div class="col">
		<h5>Erstellung</h5>
		<table class="">
			<tr>
				<th>Warengruppe</th>
				<th class="">-</th>
				<th>Die erste Laufende Nummer</th>
				<th />
			</tr>
			<tr>
				<td
					><select
						class="form-select"
						bind:value={currentCategory}
						on:change={() => {
							change = true;
						}}
					>
						<option value="E">E</option>
						<option value="1">1</option>
						<option value="2">2</option>
						<option value="3">3</option>
						<option value="4">4</option>
						<option value="5">5</option>
						<option value="6">6</option>
					</select></td
				>
				<td>-</td>
				<td
					><input
						class="form-control"
						bind:value={currentNumber}
						on:change={() => {
							change = true;
						}}
						on:input={handleNumberInput}
						type="number"
					/></td
				>
				<td />
			</tr>
		</table>
	</div>
	<div class="col">
		<h5>Warengruppen</h5>
		<table>
			<tr><td>1-PCs</td></tr>
			<tr><td>2-Komponenten (Alles was eingebaut werden kann)</td></tr>
			<tr><td>3-Monitore</td></tr>
			<tr><td>4-Ein-Ausgabegeräte (Alles was von aussen angeschlossen wird)</td></tr>
			<tr><td>5-Unterhaltungselektronik (TV HiFi Audio)</td></tr>
			<tr><td>6-Sonstiges</td></tr>
		</table>
	</div>
	<div class="row mt-3">
		<div class="col col-2">
			<p class="">
				{currentCategory +
					'-' +
					(currentNumber == null ? '____' : currentNumber.toString().padStart(4, '0'))}
			</p>
		</div>
	</div>
</div>

<div class="row">
	<div class="col col-2">
		<p class="">
			<button
				class="btn btn-sm btn-dark"
				on:click={() => {
					createPDF();
					change = false;
				}}>Erstellen</button
			>
		</p>
	</div>
</div>

{#if pdfUrl && change == false}
	<a href={pdfUrl} download="etiketten.pdf">PDF herunterladen</a>
{/if}
