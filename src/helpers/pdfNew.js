const PDFDocument = require('pdfkit');

const fs = require('fs');
const {
  db
} = require('../models/index');
const moment = require('moment');
moment.locale('es')

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

  doc
    .font('Helvetica-Bold')
    .fontSize(18)
    .fillColor('#000')
    .text('COTIZACIÓN', 250, 15)

  doc
    .image('src/images/document/rci-logo-ajustado_orig.jpg', 320, 40, {
      width: 270,
      height: 100,
    });

  // Texto 
  doc
    .font('Helvetica')
    .fontSize(10)
    .fillColor('#000')
    .text('Red contra incendio', 15, 27, {
      align: 'left'
    })

  doc
    .text('Parlamento Real 716, Real Carolinas', 15, 39)

  doc
    .text('Chihuahua, Chihuahua 31136', 15, 51)

  doc
    .text('Teléfono: (614) 557 61 02, (614) 280 2593', 15, 63)

  doc
    .text('ricardo@redcontraincendio.com', 15, 75)

  doc
    .text('redcontraincendio.com', 15, 87)

  // Datos Cliente

  doc
    .fillColor('#000')
    .text(`${ cliente.nombre }`, 40, 117)

  doc
    .text(`${ cliente.direccion }`, 40, 129)

  // Texto 2

  doc
    .fillColor('#000')
    .text('Propuesta para realizar modificaciones al Sistema Contra Incendio, Sistema de Detección de Humo, Planta de Emergencia, Hidroneumatico o Mantenimiento de Edificio realizando las modificaciones de acuerdo a los estándares de la NFPA y NOM-002, y base a los estatutos de protección civil, todos los dispositivos mencionados en la siguiente cotización están aprobados y certificados para un desempeño óptimo.', 15, 150, {
      width: 585,
      height: 65,
    })

  // Cuadro Datos Docto
  doc
    .lineWidth(1)
    .lineCap('round')
    .rect(30, 205, 560, 20)
    .fillAndStroke('#c7c7c7', '#000')

  // Cuadro de datos Docto que cambian
  doc
    .lineCap('round')
    .rect(30, 225, 560, 20)

  doc
    .font('Helvetica-Bold')
    .fillColor('#000')
    .text('Número de cliente', 50, 210)

  doc
    .font('Helvetica')
    .fillColor('#000')
    .text(`${ cotizacion.cliente_id }`, 80, 230)

  doc
    .lineCap('butt')
    .moveTo(155, 205)
    .lineTo(155, 245)
    .stroke();

  doc
    .font('Helvetica-Bold')
    .fillColor('#000')
    .text('Número de Documento', 175, 210)

  doc
    .font('Helvetica')
    .fillColor('#000')
    .text(`${ cotizacion.folio }`, 220, 230)

  doc
    .lineCap('butt')
    .moveTo(300, 205)
    .lineTo(300, 245)
    .stroke();

  doc
    .font('Helvetica-Bold')
    .fillColor('#000')
    .text('Página', 320, 210)

  doc
    .font('Helvetica')
    .fillColor('#000')
    .text(`1 / 1`, 330, 230)

  doc
    .lineCap('butt')
    .moveTo(380, 205)
    .lineTo(380, 245)
    .stroke();

  doc
    .font('Helvetica-Bold')
    .fillColor('#000')
    .text('Fecha', 410, 210)

  doc
    .font('Helvetica')
    .text(`${ moment( cotizacion.createdAt ).format( 'DD[/]MMM[/]YY' ) }`, 400, 230)

  doc
    .lineCap('butt')
    .moveTo(470, 205)
    .lineTo(470, 245)
    .stroke();

  doc
    .font('Helvetica-Bold')
    .fillColor('#000')
    .text('Válido hasta', 490, 210, {
      width: '40px'
    })

  doc
    .font('Helvetica')
    .text(`${ moment( cotizacion.fecha_validez ).format( 'DD[/]MMM[/]YY' ) }`, 500, 230, {
      width: '40px'
    })

  // Tiempo de entrega
  doc
    .font('Helvetica-Bold')
    .fillColor('#000')
    .text(`TIEMPO DE ENTREGA ${ cotizacion.valido_hasta } DIAS DESPUÉS DE OC`, 40, 255)

  // Descripcion de cotizacion
  doc
    .font('Helvetica')
    .fillColor('#000')
    .text(`${ cotizacion.descripcion }`, 40, 270, {
      width: 550,
      height: 65,
    })

  // Cuadro Header Datos Docto Detalle
  doc
    .font('Helvetica-Bold')
    .lineCap('round')
    .rect(30, 335, 560, 20)
    .fillAndStroke('#c7c7c7', '#000');


  // Cuadro de datos Docto que cambian
  doc
    .lineCap('round')
    .rect(30, 355, 560, 320)
    .stroke('#000')

  // Separacoòn -Articulo / Cantidad-
  doc
    .lineCap('butt')
    .moveTo(340, 335)
    .lineTo(340, 675)
    .stroke();

  // Separacoòn -Cantidad / Unidad-
  doc
    .lineCap('butt')
    .moveTo(400, 335)
    .lineTo(400, 675)
    .stroke();

  // Separacoòn -Unidad / Precio-
  doc
    .lineCap('butt')
    .moveTo(450, 335)
    .lineTo(450, 675)
    .stroke();

  // Separacoòn -Importe Total-
  doc
    .lineCap('butt')
    .moveTo(520, 335)
    .lineTo(520, 675)
    .stroke();

  let docY = 420;

  const detallesArticuloCantidad = detalles.map(detalle => detalle.cantidad)

  doc
    .fillColor('#000')
    .text('Cantidad', 350, 340)

  docY = 360
  let banderaCantidad = true

  for (const cantidad in detallesArticuloCantidad) {
    if (detallesArticuloCantidad.hasOwnProperty(cantidad)) {

      const element = detallesArticuloCantidad[cantidad];

      if (banderaCantidad) {

        banderaCantidad = false

        doc
          .font('Helvetica')
          .text(`${ element }`, 370, docY, {
            width: '200px',
            align: 'right'
          })

      } else {
        doc
          .font('Helvetica')
          .text(`${ element }`, 370, docY + 50, {
            width: '200px',
            align: 'right'
          })
        docY += 50
      }
    }
    docY += 15
  }

  docY = 360;
  let banderaArticulo = true

  doc
    .font('Helvetica-Bold')
    .text('Articulo', 35, 340)

  let detallesArticulo_articuloId = detalles.map(detalle => detalle.articulo_id)

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
          .font('Helvetica')
          .text(`${ art }\n${ descripcion }`, 35, docY, {
            width: 300,
            height: 700
          })
      } else {
        doc
          .font('Helvetica')
          .text(`${ art }\n${ descripcion }`, 35, docY + 50, {
            width: 300,
            height: 700
          })
        docY += 50
      }
    }
    console.log(docY)
    docY += 15
  }

  const detallesUnidadCantidad = detalles.map(detalle => detalle.unidad)

  console.log(detallesUnidadCantidad)

  doc
    .font('Helvetica-Bold')
    .fillColor('#000')
    .text('Unidad', 410, 340)

  docY = 360
  let banderaUnidad = true

  detallesArticulo_articuloId = detalles.map(detalle => detalle.articulo_id)

  for (articulo_id in detallesArticulo_articuloId) {
    if (detallesArticulo_articuloId.hasOwnProperty(articulo_id)) {

      const id = detallesArticulo_articuloId[articulo_id];

      const articulos = await Articulos.findAll({
        where: {
          id: id
        }
      });

      const articulo = articulos.map(item => item.dataValues)
      const unidad = articulo.map(item => item.unidad_venta)

      if (banderaUnidad) {
        banderaUnidad = false
        doc
          .font('Helvetica')
          .text(`${ unidad }`, 420, docY)
      } else {
        doc
          .font('Helvetica')
          .text(`${ unidad }`, 420, docY + 50)
        docY += 50
      }
    }
    docY += 15
  }


  doc
    .font('Helvetica-Bold')
    .text('Precio', 470, 340)

  const detallesPrecio_unitario = detalles.map(detalle => detalle.precio_unitario)

  let docYPrecioUnitario = 360;
  let sumaPrecioUnitario = 0;
  let banderaPrecio = true

  for (const precio_unitario in detallesPrecio_unitario) {
    if (detallesPrecio_unitario.hasOwnProperty(precio_unitario)) {

      const element = detallesPrecio_unitario[precio_unitario];

      if (banderaPrecio) {

        banderaPrecio = false

        doc
          .font('Helvetica')
          .text(`$${ new Intl.NumberFormat().format( element ) }`, 460, docYPrecioUnitario, {
            align: 'right',
            width: '200px'
          })
          

      } else {
        doc
          .font('Helvetica')
          .text(`$${ new Intl.NumberFormat().format( element ) }`, 460, docYPrecioUnitario + 50, {
            width: '200px',
            align: 'right'
          })
        docYPrecioUnitario += 50
      }
      sumaPrecioUnitario += element
    }
    docYPrecioUnitario += 15
  }

  docY = 360;
  let bandera = true

  doc
    .font('Helvetica-Bold')
    .text('Importe total', 525, 340, {
      width: '100px'
    })

  const detallesArticuloimporte = detalles.map(detalle => detalle.importe)

  for (const importe in detallesArticuloCantidad) {
    if (detallesArticuloimporte.hasOwnProperty(importe)) {

      const element = detallesArticuloimporte[importe];

      if (bandera) {

        bandera = false

        doc
          .font('Helvetica')
          .text(`$${ new Intl.NumberFormat().format( element ) }`, 530, docY, {
            width: '200px'
          })

      } else {
        doc
          .font('Helvetica')
          .text(`$${ new Intl.NumberFormat().format( element ) }`, 530, docY + 50, {
            width: '200px'
          })
        docY += 50
      }
    }
    docY += 15
  }


  subtotal = 0
  detallesArticuloimporte.forEach(element => {
    subtotal += element
  });

  // TOTAL del DOCTO
  doc
    .font('Helvetica-Bold')
    .fillColor('#000')
    .text('Importe total:', 440, 680, {
      width: '100px',
    })

  doc
    .font('Helvetica')
    .fillColor('#000')
    .text(`$${ new Intl.NumberFormat().format( subtotal ) }`, 545, 680, {
      width: '200px',
      height: '500px',
      align: 'right'
    })

  doc
    .fillColor('#000')
    .text('Ing. Ricardo Lazos', 55, 745, {
      width: '100px',
    })

  doc
    .fillColor('#000')
    .text('Estos precios son antes de IVA y en pesos mexicanos', 250, 710, {
      width: '100px',
      height: '300px'
    })

  doc
    .fillColor('#000')
    .text('Condiciones de pago: 50% de anticipo y el resto a contra entrega del pedido.', 250, 730, {
      width: '100px',
      height: '300px'
    })

  doc
    .lineWidth(.5)
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