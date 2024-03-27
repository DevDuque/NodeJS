import { fastify } from 'fastify';

import { DatabaseMemory } from './database-memory.js';
import { DatabasePostgres } from './database-postgres.js';

const server = fastify();

// const database = new DatabaseMemory();

const database = new DatabasePostgres();

// Create note route
server.post('/notes', async(request, reply) => {
    // Get the values from the RequestBody
    const {
        title, 
        description, 
        start_At, 
        end_At, 
        priority } = request.body;

    await database.create({
        title,
        description,
        start_At,
        end_At,
        priority,
    });

    return reply.status(201).send();
});

// Read notes route (Got a QueryParam)
server.get('/notes', async (request, reply) => {
    const search = request.query.search;

    const notes = await database.list(search);

    return notes;
    
});

// Update note route (Got a RouteParam)
server.put('/notes/:id', async (request, reply) => {
    const noteID = request.params.id;

    const {
        title, 
        description, 
        start_At, 
        end_At, 
        priority } = request.body;

    // Update the note by its ID
    await database.update(noteID, {
        title, 
        description,
        start_At,
        end_At,
        priority
    });

    return reply.status(204).send();
});

// Delete note route (Got a RouteParam)
server.delete('/notes/:id', async (request, reply) => {
    const noteID = request.params.id;

    await database.delete(noteID);

    return reply.status(204).send();
})

// Return the port where the server is running
server.listen({
    port: 3333,
});