export class createLocationDto {
  id: number;

  Coordinates: {
    Longitude: {
      Degrees: number;
      Minutes: number;
      Seconds: number;
    };

    Latitude: {
      Degrees: number;
      Minutes: number;
      Seconds: number;
    };
  };

  Time: string;
}