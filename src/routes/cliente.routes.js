const router = require( 'express' ).Router();

const cliente = require( '../controllers/cliente' );

// Create a new Customer
router.post( "/", cliente.create );

// Retrieve all Customer
router.get( "/", cliente.findAll );

// // Retrieve all published Customer
// // router.get("/published", usuario.findAllPublished);

// Retrieve a single Customer with id
router.get( "/:id", cliente.findOne );

// Update a Customer with id
router.put( "/:id", cliente.update );

// Delete a Customer with id
router.delete( "/:id", cliente.delete );

// // Delete all Customer
// router.delete( "/", usuario.deleteAll );

module.exports = router;
