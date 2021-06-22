const { getItem, getItems, addItem, deleteItem, updateItem } = require('../controllers/items.controller');

//Item schema
const Item = {
    type: 'object',
    properties: {
        id: { type: 'string' },
        name: { type: 'string' }
    }
}

// Options for get all items
const getItemsOpts = {
    schema: {
        response: {
            200: {
                type: 'array',
                items: Item
            }
        }
    },
    handler: getItems
}

// Option for get individual item
const getItemOpts = {
    schema: {
        response: {
            200: Item
        }
    },
    handler: getItem
}

// Option for get individual item
const postItemOpts = {
    schema: {
        body: {
            type: 'object',
            required: ['name'],
            properties: {
                name: { type: 'string' }
            }
        },
        response: {
            201: Item
        }
    },
    handler: addItem
}

// Delete Item options
const deleteItemOpts = {
    schema: {
        response: {
            200: {
                type: 'object',
                properties: {
                    message: { type: 'string' },
                }
            }
        }
    },
    handler: deleteItem
}

// Update Item Options
const updateItemOpts = {
    schema: {
        response: {
            200: Item
        }
    },
    handler: updateItem
}


function itemRoutes (fastify, options, done) {

    // Get all items
    fastify.get('/items', getItemsOpts)
    
    // Get single Items
    fastify.get('/items/:id', getItemOpts)

    // Add Item
    fastify.post('/items', postItemOpts)

    // Delete Item
    fastify.delete('/items/:id', deleteItemOpts)

    // Update Item
    fastify.put('/items/:id', updateItemOpts)
        
    done()
}

module.exports = itemRoutes;