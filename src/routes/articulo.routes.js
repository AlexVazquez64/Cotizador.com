const router = require( 'express' ).Router();

const articulo = require( '../controllers/articulos' );

// Create a new Articulo
router.post( "/", articulo.create );

// Retrieve all Articulo
router.get( "/", articulo.findAll );

// // Retrieve all published Articulo
// // router.get("/published", usuario.findAllPublished);

// Retrieve a single Articulo with id
router.get( "/:id", articulo.findOne );

// Update a Articulo with id
router.put( "/:id", articulo.update );

// Delete a Articulo with id
router.delete( "/:id", articulo.delete );

// // Delete all Articulo
// router.delete( "/", usuario.deleteAll );

module.exports = router;
