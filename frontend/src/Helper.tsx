 const jerusalemCoordinates = [
        { Latitude: { Degrees: 31, Minutes: 46, Seconds: 6  }, Longitude: { Degrees: 35, Minutes: 12, Seconds: 49 } },
        { Latitude: { Degrees: 31, Minutes: 47, Seconds: 20 }, Longitude: { Degrees: 35, Minutes: 13, Seconds: 10 } },
        { Latitude: { Degrees: 31, Minutes: 46, Seconds: 45 }, Longitude: { Degrees: 35, Minutes: 14, Seconds: 5  } },
        { Latitude: { Degrees: 31, Minutes: 45, Seconds: 30 }, Longitude: { Degrees: 35, Minutes: 13, Seconds: 50 } },
        { Latitude: { Degrees: 31, Minutes: 48, Seconds: 0  }, Longitude: { Degrees: 35, Minutes: 12, Seconds: 30 } },
        { Latitude: { Degrees: 31, Minutes: 44, Seconds: 15 }, Longitude: { Degrees: 35, Minutes: 11, Seconds: 20 } },
        { Latitude: { Degrees: 31, Minutes: 49, Seconds: 33 }, Longitude: { Degrees: 35, Minutes: 15, Seconds: 40 } },
        { Latitude: { Degrees: 31, Minutes: 43, Seconds: 50 }, Longitude: { Degrees: 35, Minutes: 10, Seconds: 55 } },
        { Latitude: { Degrees: 31, Minutes: 46, Seconds: 22 }, Longitude: { Degrees: 35, Minutes: 12, Seconds: 5  } },
        { Latitude: { Degrees: 31, Minutes: 47, Seconds: 8  }, Longitude: { Degrees: 35, Minutes: 13, Seconds: 35 } },
        { Latitude: { Degrees: 31, Minutes: 45, Seconds: 50 }, Longitude: { Degrees: 35, Minutes: 12, Seconds: 15 } },
        { Latitude: { Degrees: 31, Minutes: 46, Seconds: 38 }, Longitude: { Degrees: 35, Minutes: 11, Seconds: 45 } },
        { Latitude: { Degrees: 31, Minutes: 47, Seconds: 30 }, Longitude: { Degrees: 35, Minutes: 13, Seconds: 10 } },
        { Latitude: { Degrees: 31, Minutes: 47, Seconds: 10 }, Longitude: { Degrees: 35, Minutes: 11, Seconds: 50 } },
        { Latitude: { Degrees: 31, Minutes: 45, Seconds: 50 }, Longitude: { Degrees: 35, Minutes: 12, Seconds: 20 } },
        { Latitude: { Degrees: 31, Minutes: 46, Seconds: 0  }, Longitude: { Degrees: 35, Minutes: 13, Seconds: 40 } },
        { Latitude: { Degrees: 31, Minutes: 47, Seconds: 0  }, Longitude: { Degrees: 35, Minutes: 12, Seconds: 10 } },
        { Latitude: { Degrees: 31, Minutes: 45, Seconds: 40 }, Longitude: { Degrees: 35, Minutes: 11, Seconds: 30 } },
        { Latitude: { Degrees: 31, Minutes: 46, Seconds: 20 }, Longitude: { Degrees: 35, Minutes: 13, Seconds: 0  } },
        { Latitude: { Degrees: 31, Minutes: 46, Seconds: 10 }, Longitude: { Degrees: 35, Minutes: 11, Seconds: 50 } }
    ];

const farLocations = [
    { Latitude: { Degrees: 31, Minutes: 49, Seconds: 10 }, Longitude: { Degrees: 35, Minutes: 12, Seconds: 40 } },
    { Latitude: { Degrees: 31, Minutes: 49, Seconds: 25 }, Longitude: { Degrees: 35, Minutes: 13, Seconds: 5  } },
    { Latitude: { Degrees: 31, Minutes: 49, Seconds: 15 }, Longitude: { Degrees: 35, Minutes: 11, Seconds: 30 } },
    { Latitude: { Degrees: 31, Minutes: 49, Seconds: 0  }, Longitude: { Degrees: 35, Minutes: 15, Seconds: 0  } },
    { Latitude: { Degrees: 31, Minutes: 50, Seconds: 10 }, Longitude: { Degrees: 35, Minutes: 14, Seconds: 20 } },
    { Latitude: { Degrees: 31, Minutes: 49, Seconds: 30 }, Longitude: { Degrees: 35, Minutes: 10, Seconds: 30 } }
];



export async function createNewLocation (stusentId: number, far: boolean) {
    const rand = far? farLocations[Math.floor(Math.random() * farLocations.length)]: 
                      jerusalemCoordinates[Math.floor(Math.random() * jerusalemCoordinates.length)];
    await fetch("http://localhost:3000/location", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
            id: stusentId,
            Coordinates: rand,
            Time: new Date().toISOString()
            })
    });
};

export function ToRadians( degrees: number)
{
    return degrees * Math.PI / 180.0;
}

export function distance(lat1: number, lon1: number, lat2: number, lon2: number ){
    const radiusOfEarthKm = 6371; 
    const lat1Rad = ToRadians(lat1);
    const lon1Rad = ToRadians(lon1);
    const lat2Rad = ToRadians(lat2);
    const lon2Rad = ToRadians(lon2);

    const deltaLat = lat2Rad - lat1Rad;
    const deltaLon = lon2Rad - lon1Rad;

    const a = Math.sin(deltaLat / 2) * Math.sin(deltaLat / 2) +
            Math.cos(lat1Rad) * Math.cos(lat2Rad) *
            Math.sin(deltaLon / 2) * Math.sin(deltaLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = radiusOfEarthKm * c;

return distance;
}

function convertDMSToDecimal(degrees: number, minutes: number, seconds: number): number {
  return Number(degrees) + Number(minutes) / 60 + Number(seconds) / 3600;
}

export function map(locationData:any){
    const mapped = locationData
                .filter((item: any) => item.Coordinates && item.Coordinates.Latitude && item.Coordinates.Longitude)
                .map((item: any) => ({
                    id: item.id,
                    geocode: [
                    convertDMSToDecimal(
                    item.Coordinates.Latitude.Degrees,
                    item.Coordinates.Latitude.Minutes,
                    item.Coordinates.Latitude.Seconds
                    ),
                    convertDMSToDecimal(
                    item.Coordinates.Longitude.Degrees,
                    item.Coordinates.Longitude.Minutes,
                    item.Coordinates.Longitude.Seconds
                    ),
                ] as [number, number],
    }   )   );
    return mapped;
}

