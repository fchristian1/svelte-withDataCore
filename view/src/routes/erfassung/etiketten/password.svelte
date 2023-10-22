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
				const text2 = 'Passwort: bbg';

				const fontSize2 = 16;
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
	createPDF();
</script>

<h5>Passwort Etiketten</h5>
<div class="row">
	<div class="col col-2">
		<p class="" />
	</div>
</div>

{#if pdfUrl && change == false}
	<a href={pdfUrl} download="etiketten.pdf">PDF herunterladen</a>
{/if}
