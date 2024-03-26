import { randomUUID } from "node:crypto";
import { sql } from "./db.js";
import { format } from "date-fns";

export class DatabasePostgres {
    // Using Map as a DataStructure -_-
    #notes = new Map();

    // Read all notes - Make the ID be part of the NoteObject and get a QueryParam
    async list(search) {
        let notes;

        if(search) {
            notes = await sql`SELECT * FROM notes WHERE title ilike ${'%' + search + '%'}`
        } else {
            notes = await sql`SELECT * FROM notes`;
        }

        return notes;
    }

    // Create a note with a UUID & Date
    async create(note) {
        const noteID = randomUUID();
        const date = new Date();

        // Format the date
        const formattedDate = format(date, 'dd/MM/yyyy HH:mm:ss');

        const {
            title, 
            description, 
            start_At, 
            end_At, 
            priority,
            } = note;

        await sql`INSERT INTO notes (id, title, 
            description, 
            start_At, 
            end_At, 
            priority,
            created_At) VALUES (${noteID}, ${title}, ${description}, ${start_At}, ${end_At}, ${priority}, ${formattedDate} ) `
    }

    // Update a note with the UUID registered
    async update(id, note) {
        const {
            title, 
            description, 
            start_At, 
            end_At, 
            priority,
            } = note;

        await sql`UPDATE notes set title =${title}, description = ${description}, start_At = ${start_At}, end_At = ${end_At}, priority = ${priority} WHERE ID = ${id}`
    }

    // Delete a note just getting the Key (UUID)
    async delete(id) {
       await sql`DELETE FROM notes WHERE id=${id}`
    }
}