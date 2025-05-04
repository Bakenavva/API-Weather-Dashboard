import fs from 'fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// TODO: Define a City class with name and id properties
class City {

  constructor(
    public id: number,
    public name: string,
  ) {}
  
}

// TODO: Complete the HistoryService class
class HistoryService {
  filePath: string;
  cities: City[];

  constructor() {
    this.filePath = path.join(__dirname, '../../db/searchHistory.json'); 
    this.cities = [];
  }

  // TODO: Define a read method that reads from the searchHistory.json file
  // private async read() {}
  private async read() {
    try {
      const data = await fs.readFile(this.filePath, 'utf-8');
      return JSON.parse(data);
    } catch (error) {
      console.error('Error reading file:', error);
      return [];
    }
  }

  // TODO: Define a write method that writes the updated cities array to the searchHistory.json file
  // private async write(cities: City[]) {}
  private async write(cities: City[]) {
    try {
      await fs.writeFile(this.filePath, JSON.stringify(cities, null, 2));
    } catch (error) {
      console.error('Error writing file:', error);
    }
  }  
  
  // TODO: Define a getCities method that reads the cities from the searchHistory.json file and returns them as an array of City objects
  // async getCities() {}
  
  
  // TODO Define an addCity method that adds a city to the searchHistory.json file
  // async addCity(city: string) {}
  
  
  // * BONUS TODO: Define a removeCity method that removes a city from the searchHistory.json file
  // async removeCity(id: string) {}
}

export default new HistoryService();
