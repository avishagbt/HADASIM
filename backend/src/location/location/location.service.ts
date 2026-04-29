import { Injectable } from '@nestjs/common';
import { createLocationDto } from './dto/create-location.dto';

@Injectable()
export class LocationService {

  private locations: createLocationDto[] = [
  {
    id: 987654321,
    Coordinates: {
      Latitude:  { Degrees: 31, Minutes: 46, Seconds: 30 },
      Longitude: { Degrees: 35, Minutes: 12, Seconds: 40 },
    },
    Time: new Date().toISOString()
  },
  {
    id: 876543219,
    Coordinates: {
      Latitude:  { Degrees: 31, Minutes: 47, Seconds: 10 },
      Longitude: { Degrees: 35, Minutes: 13, Seconds: 5 },
    },
    Time: new Date().toISOString()
  },
  {
    id: 765432198,
    Coordinates: {
      Latitude:  { Degrees: 31, Minutes: 46, Seconds: 50 },
      Longitude: { Degrees: 35, Minutes: 11, Seconds: 55 },
    },
    Time: new Date().toISOString()
  },
  {
    id: 654321987,
    Coordinates: {
      Latitude:  { Degrees: 31, Minutes: 47, Seconds: 40 },
      Longitude: { Degrees: 35, Minutes: 12, Seconds: 20 },
    },
    Time: new Date().toISOString()
  },
  {
    id: 543219876,
    Coordinates: {
      Latitude:  { Degrees: 31, Minutes: 46, Seconds: 15 },
      Longitude: { Degrees: 35, Minutes: 13, Seconds: 30 },
    },
    Time: new Date().toISOString()
  },
  {
    id: 432198765,
    Coordinates: {
      Latitude:  { Degrees: 31, Minutes: 47, Seconds: 55 },
      Longitude: { Degrees: 35, Minutes: 11, Seconds: 40 },
    },
    Time: new Date().toISOString()
  },
  {
    id: 321987654,
    Coordinates: {
      Latitude:  { Degrees: 31, Minutes: 46, Seconds: 5 },
      Longitude: { Degrees: 35, Minutes: 12, Seconds: 10 },
    },
    Time: new Date().toISOString()
  },
  {
    id: 123456789,
    Coordinates: {
      Latitude:  { Degrees: 31, Minutes: 47, Seconds: 25 },
      Longitude: { Degrees: 35, Minutes: 13, Seconds: 50 },
    },
    Time: new Date().toISOString()
  },
];

  private teachersLocations: createLocationDto[] = [
        {
    id: 111111111,
    Coordinates: {
      Latitude: { Degrees: 31, Minutes: 46, Seconds: 45 }, 
      Longitude: { Degrees: 35, Minutes: 12, Seconds: 55 }
    },
    Time: new Date().toISOString()
  },
  {
    id: 222222222,
    Coordinates: {
      Latitude: { Degrees: 31, Minutes: 47, Seconds: 20 },
      Longitude: { Degrees: 35, Minutes: 12, Seconds: 30 }
    },
    Time: new Date().toISOString()
  },
  {
    id: 333333333,
    Coordinates: {
      Latitude: { Degrees: 31, Minutes: 46, Seconds: 10 },
      Longitude: { Degrees: 35, Minutes: 13, Seconds: 15 }
    },
    Time: new Date().toISOString()
  },
  {
    id: 777777777,
    Coordinates: {
      Latitude: { Degrees: 31, Minutes: 47, Seconds: 50 }, 
      Longitude: { Degrees: 35, Minutes: 11, Seconds: 50 }
    },
    Time: new Date().toISOString()
  },
  ];

  getAll() {
    return this.locations;
  }

  getById(id: number) {
    return this.locations.find(item => item.id === id);
  }

  save(location: createLocationDto) {

    const index = this.locations.findIndex(item => item.id === location.id);

    if (index !== -1) {
      this.locations[index] = location;
    } else {
      this.locations.push(location);
    }

    return { message: 'location updated' };
  }

}