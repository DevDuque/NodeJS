import { fastify } from 'fastify';

import { DatabaseMemory } from './database-memory.js';

const server = fastify();

// Create note route
server.post('/notes', () => {
    
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