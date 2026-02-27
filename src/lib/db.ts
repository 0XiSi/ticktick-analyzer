
import sqlite3 from 'sqlite3';
import {Database, open} from 'sqlite';

// Let's declare a global variable to hold the database connection.
// This is to avoid re-opening the connection on every request.
let db: Database | null = null;

// This function will open a connection to the SQLite database.
export async function openDb() {
  // If we already have a connection, don't do anything.
  if (db) {
    return db;
  }

  // Otherwise, open a new connection.
  // The database file will be created if it doesn't exist.
  db = await open({
    filename: 'C:/Users/Mohammad/AppData/Roaming/Tick_Tick/TickTick.db',
    driver: sqlite3.Database,
    mode: sqlite3.OPEN_READONLY
  });

  return db;
}

export async function habitnameById() {

}
