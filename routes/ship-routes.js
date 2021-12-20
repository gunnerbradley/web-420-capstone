// /*
// ============================================
// ; Title:  ship-routes.js
// ; Author: Gunner Bradley
// ; Date:   18 December 2021
// ; Description: api routes file for  WEB 420 RESTful APIs capstone project
// ;===========================================
// */

const Ship = require("../models/ship");

const express = require("express");

const router = express.Router();


/**
 * findAllShip
 * @openapi
 * /api/ship:
 *   get:
 *     tags:
 *       - Ship
 *     description: returns all ship documents
 *     summary: returns an array of ships in JSON format.
 *     responses:
 *       '200':
 *         description: Array of ships
 *       '500':
 *         description: Server Exception
 *       '501':
 *         description: MongoDB Exception
 */

router.get('/ship', async (req, res) => {
  try {
    Ship.find({}, (err, ships) => {
      if (err) {
        console.log(err);
        res.status(501).send({message: `MongoDB Exception: ${err}`});

      } else {
        console.log(ships);
        res.json(ships);
      }
    });

  } catch (err) {
    console.log(err);
    res.status(500).send({ message: `Server Exception: ${err.message}`});
  }
});



/**
findAllCrewByShipId
 * @openapi
 * /api/ship/:id:
 *   get:
 *     tags:
 *       - Ship
 *     description:  API for returning a ship document
 *     summary: returns a ship document
 *     parameters:
 *       - name: ID
 *         in: path
 *         required: true
 *         description: ship document ID
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: ship document
 *       '500':
 *         description: Server exception
 *       '501':
 *         description: MongoDB Exception
 */
router.get('/ship/:id', async(req, res) => {
    try {
        Ship.findOne({'_id': req.params.id}, (err, shipById) => {
            if (err) {
                console.log(err);
                res.status(500).send({
                    'message': `MongoDB Exception: ${err}`
                })
            } else {
                console.log(shipById.crew);
                res.json(shipById.crew);
            }
        })
    } catch (err) {
        console.log(err);
        res.status(500).send({
            'message': `Server Exception: ${err.message}`
        })
    }
})


/**
 * createShip
 * @openapi
 * /api/ship:
 *   post:
 *     tags:
 *       - Ship
 *     name: createShip
 *     description: Creates a new ship document for ship Database
 *     summary: Creates a new ship document
 *     requestBody:
 *       description: Ship data
 *       content:
 *         application/json:
 *           schema:
 *             required:
 *               - name
 *               - purpose
 *               - crew
 *             properties:
 *              name:
 *                 type: string
 *              purpose:
 *                 type: string
 *              crew:
 *                  type: array
 *                  items:
 *                      type: object
 *                      properties:
 *                          firstName:
 *                              type: string
 *                          lastName:
 *                              type: string
 *                          position:
 *                              type: string
 *     responses:
 *       '200':
 *         description: Ship created
 *       '500':
 *         description: Server Exception
 *       '501':
 *         description: MongoDB Exception
 */

router.post('/ship', async (req, res) => {
  try {
    const ship = {
        name: req.body.name,
        purpose: req.body.purpose,
        crew: req.body.crew
    };

    await Ship.create(newPerson, (err, person) => {
      if (err) {
        console.log(err);
        res.status(501).send({ message: `MongoDB Exception: ${err}`});

      } else {
        console.log(ship);
        res.json(ship);
      }
    });

  } catch (err) {
    console.log(err);
    res.status(500).send({ message: `Server Exception: ${err}`});
  }
});


/**
 * assignMemberToShip
 * @openapi
 * /api/ship/:name
 *   post:
 *     tags:
 *       - ship
 *     name: assignMemberToShip
 *     summary: Creates a new member By ship name document
 *     requestBody:
 *       description: ship information
 *       content:
 *         application/json:
 *           schema:
 *             required:
 *              - name
 *               - name
 *               - purpose
 *               - crew
 *           properties:
 *              name:
 *                 type: string
 *              purpose:
 *                 type: string
 *              crew:
 *                  type: array
 *                  items:
 *                      type: object
 *                      properties:
 *                          firstName:
 *                              type: string
 *                          lastName:
 *                              type: string
 *                          position:
 *                              type: string
 *                
 *     responses:
 *       '200':
 *         description: member added to MongoDB Atlas
 *       '500':
 *         description: Server Exception
 *       '501':
 *         description: MongoDB Exception
 */
router.post('/ship/:name', async(req, res) => {
   
   try {
        Ship.findOne({'name': req.params.name}, (err, shipData) => {
            if (err) {
                console.log(err);
                res.status(501).send({
                    'message': `MongoDB Exception: ${err}`
                })
            } else if (shipData){
    
                const shipUpdate = shipData

                const newMember = {
                    firstName: req.body.firstName,
                    lastName: req.body.lastName,
                    position: req.body.position
                }

                shipUpdate.crew.push(newMember);
                console.log(shipUpdate)

                shipUpdate.save(shipUpdate)
                    .then(()=>{
                        res.status(200).send({
                            'message': `Member added to crew`
                        })
                });              

            } else if (!shipData) {
                console.log('Invalid ship name');
                res.status(401).send({ 'message': `Invalid Ship`})   
            }
        })
    } catch (err) {
        console.log(err);
        res.status(500).send({'message': `Server Exception: ${err}`})
    }
})


/**
 * deleteShipById
 * @openapi
 * /api/ship/{id}:
 *   delete:
 *     tags:
 *       - Ship
 *     description:  API for deleting a ship document
 *     summary: deletes a ship document
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ship document id
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: ship deleted
 *       '500':
 *         description: Server exception
 *       '501':
 *         description: MongoDB Exception
 */
router.delete('/ship/:id', async(req, res) => {
    try {
        Ship.findByIdAndDelete({'_id': req.params.id},  (err, ship) => {
            if (err){
                console.log(err)
            }
            else{
                res.status(200).send({
                'message': `Ship Deleted: ${ship}`
                })
            }
        })

    } catch (err) {
        console.log(err);
        res.status(500).send({
            'message': `Server Exception: ${err.message}`
        })
    }
})






module.exports = router;