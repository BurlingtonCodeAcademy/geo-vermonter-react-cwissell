import React from "react";
import L from "leaflet";
import countyData from "./county"
import borderData from "./border";
import leafletPip from "@mapbox/leaflet-pip";

const style = {
  width: "100vw",
  height: "95vh",
  margin: "0 auto"
};

class Map extends React.Component {
  constructor(props) {
    super(props);
    //this.checkInVt = this.checkInVt.bind(this);
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
    this.map.zoomControl.remove();
    this.map.scrollWheelZoom.disable();
    this.map.touchZoom.disable();
    this.map.dragging.disable();
    this.map.keyboard.disable();
    //this.props.checkInVt();
   

    // add marker
    this.countyData = L.geoJSON(countyData,{fillColor: "none", color: "none"});
    this.countyData.addTo(this.map)
    this.vtLayer = L.geoJSON(borderData, {fillColor: "none", color: "none"});
    //this.results = leafletPip.pointInLayer(this.vtLayer);
    this.vtLayer.addTo(this.map);
    this.marker = L.marker(this.props.markerPosition).addTo(this.map);
  }

 

  componentDidUpdate({ markerPosition }) {
    // check if position has changed
    if (this.props.markerPosition !== markerPosition) {
      this.marker.setLatLng(this.props.markerPosition);
      this.map.panTo(this.props.markerPosition);
      this.startMarker = L.marker(this.props.startMarker).addTo(this.map);
      const layerLength = leafletPip.pointInLayer(
        [markerPosition.lng, markerPosition.lat],
        this.vtLayer
      ).length;
      }
      this.map.setZoom(this.props.zoomLevel)
  }
  render() {
    return <div id="map" style={style} />;
  }
}

export default Map;
