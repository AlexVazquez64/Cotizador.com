const PDFDocument = require('pdfkit');
const fs = require('fs');
const moment = require('moment');

exports.createPDF = (  ) => {


    // Create a document
  const doc = new PDFDocument();

  // Pipe its output somewhere, like to a file or HTTP response
  // See below for browser usage
  doc.pipe(
    fs.createWriteStream(
      `cotizaion-${moment()
        .format('DD[-]MM[-]YY')}.pdf`)
    );

  doc
    .lineWidth(2.5)
    .font('Times-Roman')
  
  // Add an image, constrain it to a given size, and center it vertically and horizontally
  
  doc
    .image('src/images/document/banner.jpeg', 25, 20, 
      {
        width: 550,
        height: 65,
      }
    );

  // Datos Cliente

  // Cuadro datos cliente
  doc
    .lineCap('round')
    .rect(30, 100, 300, 150)
    .stroke('#196CB6')

  // Header
  doc
    .lineCap('round')
    .rect(30, 100, 300, 30)
    .fillAndStroke('#196CB6', '#196CB6')

  doc
    .fontSize(16)
    .fillColor('#FFF')
    .text('Datos del cliente', 125, 110)

  // Nombre
  doc
    .fontSize(14)
    .fillColor('#000')
    .text('Nombre:', 40, 140)

  // Nombre
  doc
    .fontSize(14)
    .fillColor('#000')
    .text('Alejandro Vázquez', 110, 140)

  // RFC
  doc
    .fontSize(14)
    .text('RFC:', 40, 170)

  // RFC
  doc
    .fontSize(14)
    .text('VACE930918', 110, 170)

  // Dirección
  doc
    .fontSize(14)
    .text('Dirección:', 40, 190)

  // Dirección
  doc
    .fontSize(14)
    .text('Privada Montes de oca #209, col. Nombre de Dios', 110, 190,
    {
      width: 200,
      align: 'justify'
    })

  // Teléfono
  doc
    .fontSize(14)
    .text('Teléfono:', 40, 225)

  // Teléfono
  doc
    .fontSize(14)
    .text('6146020945', 110, 225,
    {
      width: 200,
      align: 'justify'
    })

  // Datos documento
  doc
    .lineCap('round')
    .rect(360, 100, 200, 100)
    .stroke('#196CB6');

  // Datos documento
  doc
    .lineCap('round')
    .rect(360, 100, 200, 30)
    .fillAndStroke('#196CB6', '#196CB6');

  // Folio
  doc
    .fontSize(14)
    .fillColor('#FFF')
    .text('Folio', 390, 110)

  doc
    .fontSize(14)
    .fillColor('#FFF')
    .text('1', 500, 110)

  // line cap settings
  doc
    .lineCap('butt')
    .moveTo(560, 126)
    .lineTo(360, 126)
    .stroke();

  // line cap settings
  doc
    .lineCap('butt')
    .moveTo(460, 100)
    .lineTo(460, 200)
    .stroke();

  // Fecha
  doc
    .fontSize(14)
    .fillColor('#000')
    .text('Fecha:', 370, 140)

  doc
    .fontSize(14)
    .text('10/01/21', 475, 140)

  // Fecha vencimiento  
  doc
    .fontSize(14)
    .text('Vencimiento:', 370, 165)

  doc
    .fontSize(14)
    .text('20/01/21', 475, 165)

  // Cuadro cotización
  doc
    .lineCap('round')
    .rect(30, 270, 530, 450)
    .stroke('#196CB6')

  // Header
  doc
    .lineCap('round')
    .rect(30, 270, 530, 30)
    .fillAndStroke('#196CB6', '#196CB6')

  doc
    .fontSize(18)
    .fillColor('#FFF')
    .text('Descripcion', 40, 280)

  // Tabla
  // Header

  doc
    .fontSize(12)
    .fillColor('#000')
    .text('Cotizaciónsdfdsfdsfdsfdsfdfdsfdsfdsfdsfdsfdsfdsfsdassdsadsadasdasdasdsasdasdasdasdasdasdasdasdasdasdasdasd', 40, 310)
    
  // Header
  doc
    .lineCap('round')
    .rect(30, 350, 530, 30)
    .fillAndStroke('#196CB6', '#196CB6')

  doc
    .fontSize(18)
    .fillColor('#FFF')
    .text('Articulos', 250, 360)

  doc
    .fontSize(14)
    .fillColor('#000')
    .text('Cantidad', 40, 390)

  doc
    .fontSize(14)
    .text('Articulo', 120, 390)

  doc
    .fontSize(14)
    .text('Precio unitario', 370, 390)

  doc
    .fontSize(14)
    .text('Importe', 490, 390)

  doc
    .lineCap('round')
    .rect(30, 410, 530, 1)
    .fillAndStroke('#196CB6', '#196CB6')

    
  // Cuadro Total
  doc
    .lineCap('round')
    .rect(390, 630, 170, 90)
    .stroke('#196CB6')

  doc
    .fontSize(14)
    .text('Subtotal:', 400, 640,
      {
        width: 55,
        align: 'right'
      }
    )

  doc
    .fontSize(14)
    .text('IVA:', 400, 670,
      {
        width: 55,
        align: 'right'
      }
    )

  doc
    .fontSize(14)
    .text('Total:', 400, 700,
      {
        width: 55,
        align: 'right'
      }
    )









  // Add another page
  doc
    .addPage()
    .fontSize(25)
    .text('Here is some vector graphics...', 100, 100);

  // Draw a triangle
  doc
    .save()
    .moveTo(100, 150)
    .lineTo(100, 250)
    .lineTo(200, 250)
    .fill('#FF3300');

  // Apply some transforms and render an SVG path with the 'even-odd' fill rule
  doc
    .scale(0.6)
    .translate(470, 380)
    .path('M 250,75 L 323,301 131,161 369,161 177,301 z')
    .fill('red', 'even-odd')
    .restore();

  // Add some text with annotations
  doc
    .addPage()
    .fillColor('blue')
    .text('Here is a link!', 100, 100)
    .underline(100, 100, 160, 27, { color: '#0000FF' })
    .link(100, 100, 160, 27, 'http://google.com/');

  // Finalize PDF file
  doc.end();

  console.log('Se ha creado correctamente')
}

