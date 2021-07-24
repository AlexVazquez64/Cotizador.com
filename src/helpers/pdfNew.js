const PDFDocument = require('pdfkit');

const fs = require('fs');
const {
  db
} = require('../models/index');
const moment = require('moment');

const Articulos = db.articulos;

exports.createPDF = async (cliente, cotizacion, detalle) => {

  const detalles = detalle.map(item => item.dataValues);

  // Create a document
  const doc = new PDFDocument();

  // Pipe its output somewhere, like to a file or HTTP response
  // See below for browser usage

  tempFile = `cotizacion-${ cotizacion.id.toString() }-${ moment( cotizacion.createdAt ).format( 'DD[-]MMM[-]YY' ) }.pdf`;
  fechaCreacion = moment(cotizacion.createdAt).format('DD[-]MMM[-]YY');
  fechaValidez = moment(cotizacion.fecha_validez);

  doc.pipe(fs.createWriteStream(tempFile));

  doc
    .lineWidth(2.5)
    .font('Times-Roman')

  // Cajón Cotización
  doc
    .lineCap('round')
    .rect(250, 8, 120, 20)
    .fillAndStroke('#e3f4ff', '#e3f4ff')


  doc
    .fontSize(20)
    .fillColor('#000')
    .text('COTIZACIÓN', 250, 10)

  doc
    .image('src/images/document/rci-logo-ajustado_orig.jpg', 400, 15, {
      width: 200,
      height: 80,
    });

  // Cajón primer leyenda
  doc
    .lineCap('round')
    .rect(10, 10, 215, 80)
    .fillAndStroke('#ededed', '#ededed')

  doc
    .fontSize(12)
    .fillColor('#000')
    .text('Red contra incendio', 15, 15)

  doc
    .text('Parlamento Real 716, Real Carolinas', 15, 27)

  doc
    .text('Chihuahua, Chihuahua 31136', 15, 39)

  doc
    .text('Teléfono: (614) 557 61 02, (614) 280 2593', 15, 51)

  doc
    .text('ricardo@redcontraincendio.com', 15, 63)

  doc
    .text('redcontraincendio.com', 15, 75)

  // Cajón cliente, dirección
  doc
    .lineCap('round')
    .rect(10, 100, 215, 30)
    .fillAndStroke('#ffc2c2', '#ffc2c2')

  doc
    .fontSize(10)
    .fillColor('#000')
    .text(`${ cliente.nombre }`, 15, 105)

  doc
    .text(`${ cliente.direccion }`, 15, 117)


  doc
    .lineCap('round')
    .rect(10, 140, 585, 70)
    .fillAndStroke('#ededed', '#ededed')

  doc
    .fontSize(12)
    .fillColor('#000')
    .text('Propuesta para realizar modificaciones al Sistema Contra Incendio, Sistema de Detección de Humo, Planta de Emergencia, Hidroneumatico o Mantenimiento de Edificio realizando las modificaciones de acuerdo a los estándares de la NFPA y NOM-002, y base a los estatutos de protección civil, todos los dispositivos mencionados en la siguiente cotización están aprobados y certificados para un desempeño óptimo.', 15, 155, {
      width: 585,
      height: 65,
    })

  doc
    .lineCap('round')
    .rect(30, 225, 560, 25)
    .fillAndStroke('#c7c7c7', '#000');


  // cuadro rojo docto
  doc
    .lineCap('round')
    .rect(30, 250, 560, 25)
    .fillAndStroke('#ffc2c2', '#000')

  doc
    .fontSize(14)
    .fillColor('#000')
    .text('Número de cliente', 35, 230)

  doc
    .fontSize(14)
    .fillColor('#000')
    .text(`${ cotizacion.cliente_id }`, 80, 260)

  doc
    .lineCap('butt')
    .moveTo(155, 225)
    .lineTo(155, 275)
    .stroke();

  doc
    .fontSize(14)
    .fillColor('#000')
    .text('Número de Documento', 160, 230)

  doc
    .fontSize(14)
    .fillColor('#000')
    .text(`${ cotizacion.folio }`, 220, 260)

  doc
    .lineCap('butt')
    .moveTo(300, 225)
    .lineTo(300, 275)
    .stroke();

  doc
    .fontSize(14)
    .fillColor('#000')
    .text('Página', 320, 230)

  doc
    .fontSize(14)
    .fillColor('#000')
    .text(`1 / 1`, 330, 260)

  doc
    .lineCap('butt')
    .moveTo(380, 225)
    .lineTo(380, 275)
    .stroke();

  doc
    .fontSize(14)
    .fillColor('#000')
    .text('Fecha', 410, 230)

  doc
    .fontSize(14)
    .text(`${ moment( cotizacion.createdAt ).format( 'DD[/]MMM[/]YY' ) }`, 400, 260)

  doc
    .lineCap('butt')
    .moveTo(470, 225)
    .lineTo(470, 275)
    .stroke();

  doc
    .fontSize(14)
    .fillColor('#000')
    .text('Válido hasta', 490, 230, {
      width: '40px'
    })

  doc
    .fontSize(14)
    .text(`${ moment( cotizacion.fecha_validez ).format( 'DD[/]MMM[/]YY' ) }`, 500, 260, {
      width: '40px'
    })

  doc
    .lineCap('round')
    .rect(30, 280, 560, 70)
    .fillAndStroke('#ffc2c2', '#000')

  doc
    .fontSize(14)
    .fillColor('#000')
    .text('Observaciones', 40, 290)

  doc
    .fontSize(12)
    .fillColor('#000')
    .text(`${ cotizacion.descripcion }`, 40, 305, {
      width: 560,
      height: 65,
    })

  doc
    .fontSize(14)
    .fillColor('#000')
    .text('Tiempo de entrega:', 30, 360)

  doc
    .lineCap('round')
    .rect(145, 360, 100, 15)
    .fillAndStroke('#ffc2c2')

  doc
    .fontSize(12)
    .fillColor('#000')
    .text(`${ fechaValidez.diff(fechaCreacion, 'days') } dias habiles`, 150, 362, {
      width: 560,
      height: 65,
    })

  doc
    .lineCap('round')
    .rect(30, 380, 560, 25)
    .fillAndStroke('#c7c7c7', '#000');

  // Cuadro Rojo de Detalle
  doc
    .lineCap('round')
    .rect(30, 405, 560, 295)
    .fillAndStroke('#ffc2c2', '#000');

  let docY = 420;

  const detallesArticuloCantidad = detalles.map(detalle => detalle.cantidad)

  doc
    .font('Times-Bold')
    .fontSize(12)
    .fillColor('#000')
    .text('Cantidad', 310, 390)

  docY = 410
  let banderaCantidad = true

  for (const cantidad in detallesArticuloCantidad) {
    if (detallesArticuloCantidad.hasOwnProperty(cantidad)) {

      const element = detallesArticuloCantidad[cantidad];

      if (banderaCantidad) {

        banderaCantidad = false

        doc
          .text(`${ element }`, 350, docY, {
            width: '200px',
            align: 'right'
          })

      } else {
        doc
          .text(`${ element }`, 350, docY + 60, {
            width: '200px',
            height: '500px',
            align: 'right'
          })
        docY += 60
      }
    }
    docY += 15
  }

  docY = 410;
  let banderaArticulo = true

  doc
    .font('Times-Bold')
    .fontSize(12)
    .text('Articulo', 40, 390)

  const detallesArticulo_articuloId = detalles.map(detalle => detalle.articulo_id)

  for (articulo_id in detallesArticulo_articuloId) {
    if (detallesArticulo_articuloId.hasOwnProperty(articulo_id)) {

      const id = detallesArticulo_articuloId[articulo_id];

      const articulos = await Articulos.findAll({
        where: {
          id: id
        }
      });

      const articulo = articulos.map(item => item.dataValues)
      const art = articulo.map(item => item.nombre)
      const descripcion = articulo.map(item => item.descripcion)

      if (banderaArticulo) {
        banderaArticulo = false
        doc
          .font('Times-Roman')
          .text(`${ art }\n\n${ descripcion }`, 45, docY)
      } else {
        doc
          .font('Times-Roman')
          .text(`${ art }\n\n${ descripcion }`, 45, docY + 60)
        docY += 60
      }
    }
    console.log(docY)
    docY += 15
  }
  const detallesArticuloUnidad = detalles.map(detalle => detalle.unidad)

  // doc
  //   .font('Times-Bold')
  //   .fontSize(12)
  //   .text('Unidad', 390, 390)

  // docY = 410
  // let banderaUnidad = true

  // for (const unidad in detallesArticuloUnidad) {
  //   if (detallesArticuloUnidad.hasOwnProperty(unidad)) {

  //     const element = detallesArticuloUnidad[unidad];

  //     if (banderaUnidad) {

  //       banderaUnidad = false

  //       doc
  //         .text(`${ element }`, 370, docY, {
  //           width: '200px',
  //           align: 'right'
  //         })

  //     } else {
  //       doc
  //         .text(`${ element }`, 370, docY + 60, {
  //           width: '200px',
  //           height: '500px',
  //           align: 'right'
  //         })
  //       docY += 60
  //     }
  //   }
  //   docY += 15
  // }


  doc
    .font('Times-Bold')
    .fontSize(12)
    .text('Precio', 460, 390)

  const detallesPrecio_unitario = detalles.map(detalle => detalle.precio_unitario)

  let docYPrecioUnitario = 410;
  let sumaPrecioUnitario = 0;
  let banderaPrecio = true

  for (const precio_unitario in detallesPrecio_unitario) {
    if (detallesPrecio_unitario.hasOwnProperty(precio_unitario)) {

      const element = detallesPrecio_unitario[precio_unitario];

      if (banderaPrecio) {

        banderaPrecio = false

        doc
          .text(`$${ new Intl.NumberFormat().format( element ) }`, 470, docYPrecioUnitario, {
            width: '200px',
            align: 'right'
          })

      } else {
        doc
          .text(`$${ new Intl.NumberFormat().format( element ) }`, 470, docYPrecioUnitario + 60, {
            width: '200px',
            height: '500px',
            align: 'right'
          })
        docYPrecioUnitario += 60
      }
      sumaPrecioUnitario += element
    }
    docYPrecioUnitario += 15
  }

  docY = 410;
  let bandera = true

  doc
    .font('Times-Bold')
    .fontSize(12)
    .text('Importe total', 515, 390, {
      width: '100px'
    })

  const detallesArticuloimporte = detalles.map(detalle => detalle.importe)

  console.log('importe de cada artículo')
  console.log(detallesArticuloimporte)

  for (const importe in detallesArticuloCantidad) {
    if (detallesArticuloimporte.hasOwnProperty(importe)) {

      const element = detallesArticuloimporte[importe];

      if (bandera) {
        console.log(detallesArticuloimporte[0] + 'detallesArticuloimporte')

        console.log('object')
        bandera = false

        doc
          .text(`$${ new Intl.NumberFormat().format( element ) }`, 540, docY, {
            width: '200px',
            height: '500px',
            align: 'left'
          })

      } else {
        doc
          .text(`$${ new Intl.NumberFormat().format( element ) }`, 560, docY + 60, {
            width: '200px',
            height: '500px',
            align: 'left'
          })
        docY += 60
      }
    }
    docY += 15
  }


  subtotal = 0
  detallesArticuloimporte.forEach(element => {
    subtotal += element
  });

  // TOTAL
  doc
    .fontSize(14)
    .fillColor('#000')
    .text('Importe total:', 300, 680, {
      width: '100px',
    })

  doc
    .fillColor('#000')
    .text(`$${ new Intl.NumberFormat().format( subtotal ) }`, 560, 680, {
      width: '200px',
      height: '500px',
      align: 'right'
    })

  doc
    .fontSize(14)
    .fillColor('#000')
    .text('Ing. Ricardo Lazos', 55, 745, {
      width: '100px',
    })

  doc
    .fontSize(12)
    .fillColor('#000')
    .text('Estos precios son antes de IVA y en pesos mexicanos', 250, 710, {
      width: '100px',
      height: '300px'
    })

  doc
    .fontSize(10)
    .fillColor('#000')
    .text('Condiciones de pago: 50% de anticipo y el resto a contra entrega del pedido.', 250, 730, {
      width: '100px',
      height: '300px'
    })

  doc
    .lineWidth(.5)
    .fontSize(9)
    .fillColor('#545454')
    .text('RFC: NUCC860525PZ1 | CLAUDIA NUÑEZ CONTRERAS | FERNANDO MAYO 15103-8, CHIHUAHUA 2000 | CP 31136 | CHIHUAHUA CHIH.', 30, 780, {
      width: '600',
      height: '300'
    })

  doc
    .opacity(.2)
    .image('src/images/document/marca-agua.jpeg', 0, 0, {
      width: 612,
      height: 790,
    })

  // Finalize PDF file
  doc.end();

  console.log('Se ha creado correctamente')

  return tempFile
}