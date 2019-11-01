# Google Maps Data Aggregator

## Requirements

- `NodeJs`, `Npm`
- Export your own Google Maps API key at `./src/api-key.js`;

## Startup

- `Node server.js`

Send a request with `street`, `city`, `state` and `country` values in the JSON body, and the app will return a response in the format of the following sample:

```
{
  "lat": 49.2829257,

  "lng": -123.1106525,

  "elevation": 19.50615501403809,

  "timeZoneId": "America/Vancouver",

  "offsetHoursUTC": -8
}
```

### APIs Used

- https://developers.google.com/maps/documentation/geocoding/start
- https://developers.google.com/maps/documentation/elevation/start
- https://developers.google.com/maps/documentation/timezone/start