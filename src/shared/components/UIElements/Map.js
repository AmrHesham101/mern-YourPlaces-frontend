import React, { useRef, useEffect } from "react";
import "ol/ol.css"; // Import OpenLayers CSS
import { Map as M, View } from "ol"; // Import OpenLayers Map and View classes
import TileLayer from "ol/layer/Tile"; // Import OpenLayers TileLayer class
import OSM from "ol/source/OSM"; // Import OpenLayers OSM (OpenStreetMap) source
import { fromLonLat } from "ol/proj";
import Feature from "ol/Feature"; // Import OpenLayers Feature class
import Point from "ol/geom/Point"; // Import OpenLayers Point class
import { Vector as VectorLayer } from "ol/layer"; // Import OpenLayers VectorLayer class
import { Vector as VectorSource } from "ol/source"; // Import OpenLayers VectorSource class
import { Icon, Style } from "ol/style"; // Import OpenLayers Icon and Style classes

import "./Map.css";

const Map = (props) => {
  const mapRef = useRef();

  const { center, zoom } = props;

  useEffect(() => {
    const map = new M({
      target: mapRef.current.id,
      layers: [
        new TileLayer({
          source: new OSM(),
        }),
      ],
      view: new View({
        center: fromLonLat([center.lng, center.lat]),
        zoom: zoom,
      }),
    });

    // Add a marker to the map
    const marker = new Feature({
      geometry: new Point(fromLonLat([center.lng, center.lat])),
    });

    const markerStyle = new Style({
      image: new Icon({
        anchor: [0.5, 1],
        src: "https://openlayers.org/en/latest/examples/data/icon.png", // Replace with the path to your marker icon
      }),
    });

    marker.setStyle(markerStyle);

    const vectorSource = new VectorSource({
      features: [marker],
    });

    const vectorLayer = new VectorLayer({
      source: vectorSource,
    });

    map.addLayer(vectorLayer);

    return () => {
      map.setTarget(null); // Remove the map from the target element
      map.dispose(); // Dispose of the map instance
    };
  }, [center, zoom]);

  return (
    <div
      ref={mapRef}
      className={`map ${props.className}`}
      style={props.style}
      id="map"
    ></div>
  );
};

export default Map;
