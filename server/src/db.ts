import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import config from '../config';
import path from 'path';

export async function openDb() {
  try {
    return open({
      filename: path.resolve(config.__dirname, '../database/storage.db'),
      driver: sqlite3.Database
    });
  } catch (error) {
    return Promise.reject(error);
  }
}
