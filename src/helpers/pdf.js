const PDFDocument = require('pdfkit');

const fs = require('fs');
const { db } = require('../models/index');
const moment = require('moment');

const Articulos = db.articulos;

exports.createPDF = async ( cliente, cotizacion, detalle ) => {

  const detalles = detalle.map(item => item.dataValues);

  // Create a document
  const doc = new PDFDocument();

  // Pipe its output somewhere, like to a file or HTTP response
  // See below for browser usage

  tempFile = `cotizacion-${ cotizacion.id.toString() }-${ moment( cotizacion.createdAt ).format( 'DD[-]MMM[-]YY' ) }.pdf`;

  doc.pipe( fs.createWriteStream( tempFile ) );

  doc
    .lineWidth(2.5)
    .font( 'Times-Roman' )
  
  // Add an image, constrain it to a given size, and center it vertically and horizontally
  
  doc
    .image( 'src/images/document/banner.jpeg', 25, 20, 
      {
        width: 550,
        height: 65,
      }
    );

  // Datos Cliente

  // Cuadro datos cliente
  doc
    .lineCap( 'round' )
    .rect(30, 100, 300, 150)
    .stroke( '#01588D' )

  // Header
  doc
    .lineCap( 'round' )
    .rect( 30, 100, 300, 30 )
    .fillAndStroke( '#01588D', '#01588D' )

  doc
    .fontSize( 16 )
    .fillColor( '#FFF' )
    .text( 'Datos del cliente', 125, 110 )

  // Nombre
  doc
    .fontSize( 14 )
    .fillColor( '#000' )
    .text( 'Nombre:', 40, 140,
      {
        width: 60,
        align: 'right'
      }
    )

  // Nombre
  doc
    .fontSize( 14 )
    .fillColor( '#000' )
    .text( `${ cliente.nombre }`, 110, 140 )

  // RFC
  doc
    .fontSize( 14 )
    .text( 'RFC:', 40, 170,
      {
        width: 60,
        align: 'right'
      }
    )

  // RFC
  doc
    .fontSize( 14 )
    .text( `${ cliente.rfc }`, 110, 170 )

  // Dirección
  doc
    .fontSize( 14 )
    .text( 'Dirección:', 40, 190,
      {
        width: 60,
        align: 'right'
      }
    )

  // Dirección
  doc
    .fontSize( 14 )
    .text(`${ cliente.direccion }`, 110, 190,
      {
        width: 200,
        align: 'justify'
      }
    )

  // Teléfono
  doc
    .fontSize( 14 )
    .text( 'Teléfono:', 40, 225,
      {
        width: 60,
        align: 'right'
      }
    )

  // Teléfono
  doc
    .fontSize( 14 )
    .text(`${ cliente.telefono }`, 110, 225,
      {
        width: 200,
        align: 'justify'
      }
    )

  // Datos documento
  doc
    .lineCap( 'round' )
    .rect( 360, 100, 200, 100 )
    .stroke( '#01588D' );

  // Datos documento
  doc
    .lineCap( 'round' )
    .rect( 360, 100, 200, 30 )
    .fillAndStroke( '#01588D', '#01588D' );

  // Folio
  doc
    .fontSize( 14 )
    .fillColor( '#FFF' )
    .text( 'COTIZACIÓN', 370, 110 )

  doc
    .fontSize( 14 )
    .fillColor( '#FFF' )
    .text( `${ cotizacion.folio }`, 500, 110 )

  // line cap settings
  doc
    .lineCap( 'butt' )
    .moveTo( 560, 126 )
    .lineTo( 360, 126 )
    .stroke();

  // line cap settings
  doc
    .lineCap( 'butt' )
    .moveTo( 460, 100 )
    .lineTo( 460, 200 )
    .stroke();

  // Fecha
  doc
    .fontSize( 14 )
    .fillColor( '#000' )
    .text( 'Fecha:', 370, 140 )

  doc
    .fontSize(14)
    .text( `${ moment( cotizacion.createdAt ).format( 'DD[-]MMM[-]YY' ) }`, 475, 140 )

  // Fecha vencimiento  
  doc
    .fontSize(14)
    .text( 'Vencimiento:', 370, 165 )

  doc
    .fontSize( 14 )
    .text( `${ moment( cotizacion.fecha_validez ).format( 'DD[-]MMM[-]YY' ) }`, 475, 165 )

  // Cuadro cotización
  doc
    .lineCap( 'round' )
    .rect( 30, 270, 530, 450 )
    .stroke( '#01588D' )

  // Header
  doc
    .lineCap( 'round' )
    .rect( 30, 270, 530, 30 )
    .fillAndStroke( '#01588D', '#01588D' )

  doc
    .fontSize( 18 )
    .fillColor( '#FFF' )
    .text( 'Descripcion', 40, 280 )

  // Tabla
  // Header

  doc
    .fontSize( 12 )
    .fillColor( '#000' )
    .text( `${ cotizacion.descripcion }`, 40, 310 )
    
  // Header
  doc
    .lineCap( 'round' )
    .rect( 30, 350, 530, 30 )
    .fillAndStroke( '#01588D', '#01588D' )

  doc
    .fontSize( 18 )
    .fillColor( '#FFF' )
    .text( 'Articulos', 250, 360 )

  let docY = 420;

  const detallesArticuloCantidad = detalles.map( detalle => detalle.cantidad )

  doc
    .fontSize( 14 )
    .fillColor( '#000' )
    .text( 'Cantidad', 40, 390 )

  docY = 420

  for ( const cantidad in detallesArticuloCantidad ) {
    if ( detallesArticuloCantidad.hasOwnProperty( cantidad ) ) {

      const element = detallesArticuloCantidad[ cantidad ];

      if ( detallesArticuloCantidad[ 0 ] ) {

        doc
          .text( `${ element }`, 60, docY )
        
      } else {
        doc
          .text( `${ element }`, 60, docY + 15 )
      }
    } 
    docY += 15
  }

  docY = 420;
  doc
    .fontSize( 14 )
    .text( 'Articulo', 120, 390 )

  const detallesArticulo_articuloId = detalles.map( detalle => detalle.articulo_id )
  
  for ( articulo_id in detallesArticulo_articuloId ) {
    if ( detallesArticulo_articuloId.hasOwnProperty( articulo_id ) ) {

      const id = detallesArticulo_articuloId[ articulo_id ];

      const articulos = await Articulos.findAll({
        where: {
          id: id
        }
      });

      const articulo = articulos.map( item => item.dataValues )
      const art = articulo.map( item => item.nombre )

      if ( detallesArticuloCantidad[ 0 ] ) {
        doc
          .text( `${ art }`, 120, docY )
      } else {
        doc
          .text( `${ art }`, 120, docY + 15 )
      }
    }
    docY += 15
  }

  doc
    .fontSize( 14 )
    .text( 'Precio unitario', 370, 390 )

  const detallesPrecio_unitario = detalles.map( detalle => detalle.precio_unitario )

  let docYPrecioUnitario = 420;
  let sumaPrecioUnitario = 0;

  for ( const precio_unitario in detallesPrecio_unitario ) {
    if ( detallesPrecio_unitario.hasOwnProperty( precio_unitario ) ) {
      
      const element = detallesPrecio_unitario[ precio_unitario ];

      if ( detallesPrecio_unitario[ 0 ] ) {

        doc
          .text( `$${ new Intl.NumberFormat().format( element ) }`, 390, docYPrecioUnitario )
        
      } else {
        doc
          .text( `$${ new Intl.NumberFormat().format( element ) }`, 60, docYPrecioUnitario + 15 )
      }
      sumaPrecioUnitario += element
    } 
    docYPrecioUnitario += 15
  }

  docY = 420;

  doc
    .fontSize( 14 )
    .text( 'Importe', 470, 390 )

  const detallesArticuloimporte = detalles.map( detalle => detalle.importe )

  console.log( 'importe de cada artículo' )
  console.log( detallesArticuloimporte )

  for ( const importe in detallesArticuloCantidad ) {
    if ( detallesArticuloimporte.hasOwnProperty( importe ) ) {

      const element = detallesArticuloimporte[ importe ];

      if ( detallesArticuloimporte[ 0 ] ) {

        doc
          .text( `$${ new Intl.NumberFormat().format( element ) }`, 470, docY )
        
      } else {
        doc
          .text( `$${ new Intl.NumberFormat().format( element ) }`, 470, docY + 15 )
      }
    } 
    docY += 15
  }

  doc
    .lineCap( 'round' )
    .rect( 30, 410, 530, 1 )
    .fillAndStroke( '#01588D', '#01588D' )

    
  // Cuadro Total
  doc
    .lineCap( 'round' )
    .rect( 390, 630, 170, 90 )
    .stroke( '#01588D' )

  // SUBTOTAL
  doc
    .fontSize( 14 )
    .text( 'Subtotal:', 400, 640,
      {
        width: 55,
        align: 'right'
      }
    )

  subtotal = 0
  detallesArticuloimporte.forEach( element => {
    subtotal += element
  });

  doc
    .fillColor( '#000' )
    .text( `$${ new Intl.NumberFormat().format( subtotal ) }`, 470, 640 )

  // IVA
  doc
    .fontSize( 14 )
    .fillColor( '#01588D' )
    .text( 'IVA:', 400, 670,
      {
        width: 55,
        align: 'right'
      }
    )

  doc
    .fillColor( '#000' )
    .text( `${ 0 }`, 470, 670 )

  // TOTAL
  doc
    .fontSize( 14 )
    .fillColor( '#01588D' )
    .text( 'Total:', 400, 700,
      {
        width: 55,
        align: 'right'
      }
    )

  doc
    .fillColor( '#000' )
    .text( `$${ new Intl.NumberFormat().format( subtotal ) }`, 470, 700 )

  // Finalize PDF file
  doc.end();

  console.log('Se ha creado correctamente')

  return tempFile
}

 