This cartodb.js extension allows to work with non webmercator projections

## usage

```
```

```

<script src="http://libs.cartocdn.com/cartodb.js/v3/3.11/cartodb.js"></script>
<script src="cartodb.proj.js"></script>

var map = new L.Map('map', {
  center: center,
  zoom: 4,
  // use proj4 text for desired SRID
  crs: cartodb.proj('+proj=stere +lat_0=90 +lat_ts=90 +lon_0=0 +k=0.994 +x_0=2000000 +y_0=2000000 +datum=WGS84 +units=m +no_defs', '32661')
});

cartodb.createLayer(map, {
  user_name: 'documentation',
  type: 'cartodb',
  sublayers: [{
     sql: 'select area, iso2, st_transform(ST_Intersection(the_geom, ST_MakeEnvelope(-180, 0, 180, 90, 4326)), 32661) as the_geom_webmercator from tm_world_borders_simpl_0_4',
     cartocss: '#layer { polygon-fill: #F00; polygon-opacity: 0.3; line-color: #F00; }',
     interactivity: 'area, iso2'
  }]
})
.addTo(map)
```

## license
MIT
