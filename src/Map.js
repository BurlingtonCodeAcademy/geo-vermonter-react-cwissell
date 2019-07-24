import React from "react";
import L from "leaflet";
//import countyData from "./county"
import borderData from "./border";
import leafletPip from "@mapbox/leaflet-pip";

const style = {
  width: "50%",
  height: "600px",
  margin: "0 auto"
};

class Map extends React.Component {
  constructor(props) {
    super(props);
    this.checkInVt = this.checkInVt.bind(this);
  }
  componentDidMount() {
    // create map
    this.map = L.map("map", {
      center: [this.props.markerPosition.lat, this.props.markerPosition.lng],
      zoom: 18,
      //minZoom: 18,
      //maxZoom:18,
      layers: [
        L.tileLayer(
          "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
          {
            attribution:
              "Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community"
          }
        )
      ]
    });
    //this.map.zoomControl.remove();
    //this.map.scrollWheelZoom.disable();
    //this.map.touchZoom.disable();
    //this.map.dragging.disable();
    //this.map.keyboard.disable();
    this.checkInVt();

    // add marker
    //this.countyData = L.geoJSON(countyData);
    //this.countyData.addTo(this.map)
    this.vtLayer = L.geoJSON(borderData, {fillColor: "none", color: "none"});
    //this.results = leafletPip.pointInLayer(vtLayer);
    this.vtLayer.addTo(this.map);
    this.marker = L.marker(this.props.markerPosition).addTo(this.map);
  }

  checkInVt() {
    this.vtLayer = L.geoJSON(borderData, {fillColor: "none", color: "none"}).addTo(this.map);
    console.log(this.vtLayer);
    this.results = leafletPip.pointInLayer(
      [this.props.markerPosition.lng, this.props.markerPosition.lat],
      this.vtLayer
    ).length;
    console.log(this.results);
    while (!this.results) {
      let newLat =
        Math.random() * (45.00541896831666 - 42.730315121762715) +
        42.730315121762715;
      let newLng =
        (Math.random() * (71.51022535353107 - 73.35218221090553) +
          73.35218221090553) *
        -1;
      this.marker = L.marker([newLat, newLng]).addTo(this.map);
      this.results = leafletPip.pointInLayer(
        [this.props.markerPosition.lng, this.props.markerPosition.lat],
        this.vtLayer
      ).length;
    }

    this.marker = L.marker(this.props.markerPosition).addTo(this.map);
  }

  componentDidUpdate({ markerPosition }) {
    // check if position has changed
    if (this.props.markerPosition !== markerPosition) {
      this.marker.setLatLng(this.props.markerPosition);
      this.map.panTo(this.props.markerPosition);
      const layerLength = leafletPip.pointInLayer(
        [markerPosition.lng, markerPosition.lat],
        this.vtLayer
      ).length;
    }
  }
  render() {
    return <div id="map" style={style} />;
  }
}

export default Map;
