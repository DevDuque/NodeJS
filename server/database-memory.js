import { randomUUID } from "node:crypto";

export class DatabaseMemory {
    // Using Map as a DataStructure -_-
    #notes = new Map();

    // Read all notes - Make the ID be part of the NoteObject and get a QueryParam
    list(search) {
        return Array.from(this.#notes.entries()).map((noteArray) => {
            const noteID = noteArray[0];
            const data = noteArray[1];

            return {
                noteID,
                ...data,
            }
        }).filter(note => {
            if(search) {
                return note.title.includes(search);
            }

            return true;
        });
    }

    // Create a note with a UUID & Date
    create(note) {
        const noteID = randomUUID();
        const createdAt = new Date();

        this.#notes.set(noteID, note, createdAt);

    }

    // Update a note with the UUID registered
    update(id, note) {
        this.#notes.set(id, note);
    }

    // Delete a note just getting the Key (UUID)
    delete(id) {
        this.#notes.delete(id);
    }
}