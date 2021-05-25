const PDFDocument = require('pdfkit');
const fs = require('fs');
const { db } = require('../models/index');
const moment = require('moment');

const Articulos = db.articulos;

exports.createPDF = async ( clientes, cotizacion, detalle ) => {


  console.log(cotizacion.createdAt)

  console.log(clientes)

  console.log(detalle)

  const detalles = detalle.map(item => item.dataValues)
  console.log('detalles dentro del pedeefe')
  console.log(detalles)

  

  // const articulo = articulos.map(articulo => articulo.dataValues)
  // console.log(articulo)

    // Create a document
  const doc = new PDFDocument();

  // Pipe its output somewhere, like to a file or HTTP response
  // See below for browser usage
  doc.pipe(
    fs.createWriteStream(
      `cotizaion-${ cotizacion.folio }-${moment()
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
    .text(`${ clientes.nombre }`, 110, 140)

  // RFC
  doc
    .fontSize(14)
    .text('RFC:', 40, 170)

  // RFC
  doc
    .fontSize(14)
    .text(`${ clientes.rfc }`, 110, 170)

  // Dirección
  doc
    .fontSize(14)
    .text('Dirección:', 40, 190)

  // Dirección
  doc
    .fontSize(14)
    .text(`${ clientes.direccion }`, 110, 190,
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
    .text(`${ clientes.telefono }`, 110, 225,
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
    .text(`${ cotizacion.folio }`, 500, 110)

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
    .text(`${ moment( cotizacion.createdAt ).format( 'DD[-]MM[-]YY' ) }`, 475, 140)

  // Fecha vencimiento  
  doc
    .fontSize(14)
    .text('Vencimiento:', 370, 165)

  doc
    .fontSize(14)
    .text(`${ moment( cotizacion.fecha_validez ).format( 'DD[-]MM[-]YY' ) }`, 475, 165)

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
    .text(`${cotizacion.descripcion }`, 40, 310)
    
  // Header
  doc
    .lineCap('round')
    .rect(30, 350, 530, 30)
    .fillAndStroke('#196CB6', '#196CB6')

  doc
    .fontSize(18)
    .fillColor('#FFF')
    .text('Articulos', 250, 360)

  
  let docY = 420;

  const detallesArticulo = detalles.map(detalle => detalle.cantidad)

  // for (const articulo_id in detallesArticulo) {
  //   const articulos = await Articulos.findOne({articulo_id})

  //   console.log('articulos')
  //   console.log(articulos)

  //   for (const articulo in articulos) {
  //     if (articulos.hasOwnProperty(articulo)) {
  //       const element = articulos[articulo];
  //       console.log('dataValues')
  //       console.log(element)

  //       // const element = detallesArticulo[articulo_id];

  //     if ( detallesArticulo[0] ) {

  //       doc
  //         .text(`${ element }`, 60, docY,)
        
  //     } else {
  //       doc
  //       .text(`${ element }`, 60, docY + 15,)
  //       }
    
  //   docY += 15
  //     }
  //   }
    
  // }

  docY = 420;
  doc
    .fontSize(14)
    .fillColor('#000')
    .text('Cantidad', 40, 390)

  // const detallesArticulo = detalles.map(detalle => detalle.cantidad)
  console.log(detallesArticulo)
  
  

  for (const cantidad in detallesArticulo) {
    if (detallesArticulo.hasOwnProperty(cantidad)) {

      const element = detallesArticulo[cantidad];

      if ( detallesArticulo[0] ) {

        doc
          .text(`${ element }`, 60, docY,)
        
      } else {
        doc
        .text(`${ element }`, 60, docY + 15,)
        }
    } 
    docY += 15
  }
  


  doc
    .fontSize(14)
    .text('Articulo', 120, 390)

    const detallesNombre = detalles.map(detalle => detalle.nombre)
    console.log(detallesNombre)

    doc
    .text(`${ detallesNombre.join('') }`, 120, 420,
    {
      width: 5
    })

  doc
    .fontSize(14)
    .text('Precio unitario', 370, 390)

  const detallesPrecio_unitario = detalles.map(detalle => detalle.precio_unitario)

  // doc
  //   .text(`${ detallesPrecio_unitario.join('') }`, 390, 420,
  //   {
  //     width: 25,
  //     align: 'left'
  //   })

    let docYPrecioUnitario = 420;

  for (const precio_unitario in detallesPrecio_unitario) {
    if (detallesPrecio_unitario.hasOwnProperty(precio_unitario)) {
      
      const element = detallesPrecio_unitario[precio_unitario];

      if ( detallesPrecio_unitario[0] ) {

        doc
          .text(`${ element }`, 390, docYPrecioUnitario,)
        
      } else {
        doc
        .text(`${ element }`, 60, docYPrecioUnitario + 15,)
        }
    } 
    docYPrecioUnitario += 15
  }

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



  // Finalize PDF file
  doc.end();


  console.log('Se ha creado correctamente')
}

