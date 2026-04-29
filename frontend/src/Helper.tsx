 const jerusalemCoordinates = [
        { Latitude: { Degrees: 31, Minutes: 46, Seconds: 6  }, Longitude: { Degrees: 35, Minutes: 12, Seconds: 49 } },
        { Latitude: { Degrees: 31, Minutes: 47, Seconds: 20 }, Longitude: { Degrees: 35, Minutes: 13, Seconds: 10 } },
        { Latitude: { Degrees: 31, Minutes: 46, Seconds: 45 }, Longitude: { Degrees: 35, Minutes: 14, Seconds: 5  } },
        { Latitude: { Degrees: 31, Minutes: 45, Seconds: 30 }, Longitude: { Degrees: 35, Minutes: 13, Seconds: 50 } },
        { Latitude: { Degrees: 31, Minutes: 48, Seconds: 0  }, Longitude: { Degrees: 35, Minutes: 12, Seconds: 30 } },
        { Latitude: { Degrees: 31, Minutes: 44, Seconds: 15 }, Longitude: { Degrees: 35, Minutes: 11, Seconds: 20 } },
        { Latitude: { Degrees: 31, Minutes: 49, Seconds: 33 }, Longitude: { Degrees: 35, Minutes: 15, Seconds: 40 } },
        { Latitude: { Degrees: 31, Minutes: 43, Seconds: 50 }, Longitude: { Degrees: 35, Minutes: 10, Seconds: 55 } },
    ];


export async function createNewLocation (stusentId: number) {
        const rand = jerusalemCoordinates[Math.floor(Math.random() * jerusalemCoordinates.length)];
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

