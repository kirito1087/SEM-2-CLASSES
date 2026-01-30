## WEATHER

## NEED DATA --> API
## DATA IN A PARTICULAR FORMAT
## UI CREATE
JSON
{
    "location": {
        "name": "Kanpur",
        "region": "Uttar Pradesh",
        "country": "India",
        "lat": 26.4667,
        "lon": 80.35,
        "tz_id": "Asia/Kolkata",
        "localtime_epoch": 1769142801,
        "localtime": "2026-01-23 10:03"
    },
    "current": {
        "last_updated_epoch": 1769142600,
        "last_updated": "2026-01-23 10:00",
        "temp_c": 17.3,
        "temp_f": 63.1,
        "is_day": 1,
        "condition": {
            "text": "Mist",
            "icon": "//cdn.weatherapi.com/weather/64x64/day/143.png",
            "code": 1030
        },
        "wind_mph": 14.1,
        "wind_kph": 22.7,
        "wind_degree": 125,
        "wind_dir": "SE",
        "pressure_mb": 1019.0,
        "pressure_in": 30.09,
        "precip_mm": 0.0,
        "precip_in": 0.0,
        "humidity": 72,
        "cloud": 0,
        "feelslike_c": 17.3,
        "feelslike_f": 63.1,
        "windchill_c": 20.1,
        "windchill_f": 68.2,
        "heatindex_c": 20.1,
        "heatindex_f": 68.2,
        "dewpoint_c": 6.9,
        "dewpoint_f": 44.3,
        "vis_km": 2.0,
        "vis_miles": 1.0,
        "uv": 3.5,
        "gust_mph": 16.2,
        "gust_kph": 26.1,
        "short_rad": 196.64,
        "diff_rad": 63.37,
        "dni": 0.0,
        "gti": 62.11
    }
} 

## REQUIRMENT(DATA SOURCE)

## API --> http://api.weatherapi.com/v1/current.json?key=fc92e8629322498785842934262301&q=Uttar Pradesh&aqi=no

## FLOW -->
## DUMMY UI 
1.WITH DUMMY DATA 
2.CALL API GET ACTUAL DATA. (TO-DO)
3.DOM UPDATE