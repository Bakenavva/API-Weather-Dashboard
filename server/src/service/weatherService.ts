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
  private async fetchWeatherData(coordinates: Coordinates) {
    const response = await fetch(this.buildWeatherQuery(coordinates));
    if (!response) {
      throw new Error("Error fetching weather data");
    }
    return response.json();
  }
  
  // TODO: Build parseCurrentWeather method
  private parseCurrentWeather(response: any) { 
    if (!response || !response.list || !response.city) {
      throw new Error("Invalid weather data")
    }

    const weatherData = response.list[0];
    const cityData = response.city;

    const currentWeather = new Weather(
      weatherData.main.temp,
      weatherData.main.humidity,
      weatherData.wind.speed,
      weatherData.dt_txt.split(" ")[0],
      weatherData.weather[0].icon,
      weatherData.weather[0].description,
      cityData.name
    )
    console.log(weatherData.main.temp);
    return currentWeather;
  }
  
  // TODO: Complete buildForecastArray method
  private buildForecastArray(weatherData: any[], name: string): Weather[] {
    const forecastMap: { [key: string]: Weather } = {};

    weatherData.forEach(item => {
      const date = new Date(item.dt * 1000).toISOString().split("T")[0];

      if (!forecastMap[date] && Object.keys(forecastMap).length < 5) {
        forecastMap[date] = new Weather(
          item.main.temp,
          item.main.humidity,
          item.wind.speed,
          item.dt_txt.split(" ")[0],
          item.weather[0].icon,
          item.weather[0].description,
          name
        );
      }
    })
    return Object.values(forecastMap);
  }
  
  // TODO: Complete getWeatherForCity method
  async getWeatherForCity(city: string) {
    const coordinates = await this.fetchAndDestructureLocationData(city);
    const weatherData = await this.fetchWeatherData(coordinates);
    const currentWeather = this.parseCurrentWeather(weatherData);
    const forecastArray = this.buildForecastArray(weatherData.list, weatherData.city.name);
  
    return [ 
      currentWeather,
      ...forecastArray
    ]
  }

}

export default new WeatherService();
