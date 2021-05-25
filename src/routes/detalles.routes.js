const router = require( 'express' ).Router();

const detalle = require( '../controllers/detalles' );

// Create a new Detalle
router.post( "/", detalle.create );

// Retrieve all Detalle
router.get( "/", detalle.findAll );

// Retrieve a single Detalle with id
router.get( "/:id", detalle.findOne );

// Update a Detalle with id
router.put( "/:id", detalle.update );

// Delete a Detalle with id
router.delete( "/:id", detalle.delete );

// // Delete all Detalle
// router.delete( "/", usuario.deleteAll );

module.exports = router;
