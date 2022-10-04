import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import config from '../../config';
import path from 'path';

export async function openDb() {
  return open({
    filename: path.resolve(config.__dirname, 'server/database/storage.db'),
    driver: sqlite3.Database
  });
}
