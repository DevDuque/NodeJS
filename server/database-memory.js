import { randomUUID } from "node:crypto";

export class DatabaseMemory {
    // Using Map as a DataStructure -_-
    #notes = new Map();

    // Read all notes
    list() {
        return this.#notes.values();
    }

    // Create a note with a UUID
    create(note) {
        const noteID = randomUUID();

        this.#notes.set(noteID, note);
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