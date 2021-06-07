const router = require( 'express' ).Router();

const cotizacion = require( '../controllers/cotizaciones' );

// Create a new Customer
router.post( '/', cotizacion.create );

// Open PDF
router.get( `/cotizacion-:id-:createdAt`, cotizacion.openCotizacionPDF );

router.get( '/cotizaciones/:id', cotizacion.sendCotizacionPDF );

// Retrieve all Customer
router.get( '/', cotizacion.findAll );

// Retrieve a single Customer with id
router.get( '/', cotizacion.findOne );

// Update a Customer with id
router.put( '/:id', cotizacion.update );

// Delete a Customer with id
router.delete( '/:id', cotizacion.delete );

// // Delete all Customer
// router.delete( "/", usuario.deleteAll );

module.exports = router;
