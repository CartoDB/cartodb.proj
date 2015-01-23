var proj4 = require('proj4');

// creates a projection object for leaflet
// - proj4text: proj4j proyection definition string
// - srid: srid description
// usage:
// L.Map({
//   crs: CRS('+proj=stere +lat_0=90 +lat_ts=90 +lon_0=0 +k=0.994 +x_0=2000000 +y_0=2000000 +datum=WGS84 +units=m +no_defs', '32661')
//
// })
function CRS(proj4text, srid) {
  var projection = proj4(proj4text);
  var mercator = proj4('EPSG:3857')

  function WGS84ToMap(pt) {
    var p = mercator.inverse(projection.forward([pt.lng, pt.lat]));
    var ll = new L.LatLng(p[1], p[0])
    return ll;
  }

  function mapToWGS84(pt) {
    pt = projection.inverse(mercator.forward([pt.lng, pt.lat]));
    return new L.LatLng(pt[1], pt[0])
  }

  return L.extend({}, L.CRS, {
    code: srid,

    projection: {
      project: function(latlng) {
        return L.Projection.SphericalMercator.project(WGS84ToMap(latlng));
      },
      unproject: function(point) {
        return mapToWGS84(L.Projection.SphericalMercator.unproject(point));
      }
    },

    transformation: new L.Transformation(0.5 / Math.PI, 0.5, -0.5 / Math.PI, 0.5),

    project: function (latlng) {
      var projectedPoint = this.projection.project(latlng),
          earthRadius = 6378137;
      return projectedPoint.multiplyBy(earthRadius);
    }

  });
}

module.exports = CRS;
