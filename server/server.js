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

    return reply.status(201).send();
});

// Read notes route
server.get('/notes', () => {
    const notes = database.list();

    return notes;
    
});

// Update note route (Got a RouteParam)
server.put('/notes/:id', (request, reply) => {
    const noteID = request.params.id;

    const {
        title, 
        description, 
        start_At, 
        end_At, 
        priority } = request.body;

    // Update the note by its ID
    database.update(noteID, {
        title, 
        description,
        start_At,
        end_At,
        priority
    });

    return reply.status(204).send();
});

// Delete note route (Got a RouteParam)
server.delete('/notes/:id', (request, reply) => {
    const noteID = request.params.id;

    database.delete(noteID);

    return reply.status(204).send();
})

// Return the port where the server is running
server.listen({
    port: 3333,
});