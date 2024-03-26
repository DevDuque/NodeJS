import { fastify } from 'fastify';

import { DatabaseMemory } from './database-memory.js';

const server = fastify();

const database = new DatabaseMemory();

// Create note route
server.post('/notes', (request, reply) => {
    // Get the values from the RequestBody
    const {
        title, 
        description, 
        start_At, 
        end_At, 
        priority } = request.body;

    database.create({
        title,
        description,
        start_At,
        end_At,
        priority,
    });

    console.log(database.list());

    return reply.status(201).send();
});

// Read notes route
server.get('/notes', () => {
    return 'Hello Fastify';
});

// Update note route (Got a RouteParam)
server.put('/notes/:id', () => {
    return 'Hello Fastify';
});

// Delete note route (Got a RouteParam)
server.delete('/notes/:id', () => {
    
})

// Return the port where the server is running
server.listen({
    port: 3333,
});