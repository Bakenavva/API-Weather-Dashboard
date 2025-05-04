import dotenv from 'dotenv';
dotenv.config();

// TODO: Define an interface for the Coordinates object
interface Coordinates {
  name: string;
  lat: number;
  long: number;
  country: string;
  state: string;
}

// TODO: Define a class for the Weather object
class Weather {
  constructor(
    public tempF: number,
    public humidity: number,
    public windSpeed: number,
    public date: string,
    public icon: string,
    public iconDescription: string,
    public city: string
  ) {}
}

// TODO: Complete the WeatherService class
class WeatherService {
  // TODO: Define the baseURL, API key, and city name properties
  private baseURL?: string;
  private apiKey?: string;

  constructor() {
    this.baseURL = process.env.API_BASE_URL || "https://placeholder-url-for-debugging.com";
    this.apiKey = process.env.API_KEY || "placeholder-api-key-for-debugging";
  }
  
  // TODO: Create fetchLocationData method
  private async fetchLocationData(city: string) { 
    const url = this.buildGeocodeQuery(city);
    const response = await fetch(url);
    return response.json();
  }
  
  // TODO: Create destructureLocationData method
  private destructureLocationData(locationData: any): Coordinates { 
    return {
      name: locationData.name,
      lat: locationData.coord.lat,
      long: locationData.coord.lon,
      country: locationData.sys.country,
      state: locationData.state || ""
    }
  }
  
  // TODO: Create buildGeocodeQuery method
  private buildGeocodeQuery(city: string): string { 
    return `${this.baseURL}/data/2.5/weather?q=${city}&appid=${this.apiKey}`;
  }
  
  // TODO: Create buildWeatherQuery method
  private buildWeatherQuery(coordinates: Coordinates): string {
    const weatherQuery = `${this.baseURL}/data/2.5/forecast?lat=${coordinates.lat}&lon=${coordinates.long}&units=imperial&appid=${this.apiKey}`;
    return weatherQuery;
  }
  
  // TODO: Create fetchAndDestructureLocationData method
  private async fetchAndDestructureLocationData(city: string) { 
    const locationData = await this.fetchLocationData(city);
    return this.destructureLocationData(locationData);
  }
  
  // TODO: Create fetchWeatherData method
  // private async fetchWeatherData(coordinates: Coordinates) {}
  
  
  // TODO: Build parseCurrentWeather method
  // private parseCurrentWeather(response: any) {}
  
  
  // TODO: Complete buildForecastArray method
  // private buildForecastArray(currentWeather: Weather, weatherData: any[]) {}
  
  
  // TODO: Complete getWeatherForCity method
  // async getWeatherForCity(city: string) {}


}

export default new WeatherService();
