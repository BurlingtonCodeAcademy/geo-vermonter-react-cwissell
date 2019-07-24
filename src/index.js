import React from 'react';
import ReactDOM from 'react-dom';
import Map from './Map';



class App extends React.Component {
  constructor() {
    super()
    this.state = { 
      markerPosition: { lat: this.randomLat(), lng: this.randomLng() },
      score: 100
    };
 }  



  
randomLat () {
  let lat = Math.random() * (45.00541896831666 - 42.730315121762715) + 42.730315121762715;
  return(lat);
}
randomLng (){
  let lng = (Math.random() * (71.51022535353107 - 73.35218221090553) + 73.35218221090553) * -1;
return (lng);
}
  
  moveMarkerNorth = () => {
    const { lat, lng } = this.state.markerPosition;
    const {score} = this.state
    this.setState({
      markerPosition: {
        lat: lat + 0.001,
        lng: lng,
       },
       score: score-1
    });
  };

  moveMarkerEast = () => {
    const { lat, lng } = this.state.markerPosition;
    const {score} = this.state
    this.setState({
      markerPosition: {
        lat: lat,
        lng: lng + 0.001,
       },
       score: score-1
    });
  };

  moveMarkerSouth = () => {
    const { lat, lng } = this.state.markerPosition;
    const {score} = this.state
    this.setState({
      markerPosition: {
        lat: lat - 0.001,
        lng: lng,
       },
      score: score-1
    });
  };

  moveMarkerWest = () => {
    const { lat, lng } = this.state.markerPosition;
    const {score} = this.state
    this.setState({
      markerPosition: {
        lat: lat,
        lng: lng - 0.001,
       },
      score: score-1
    });
  };

  componentDidMount() {
    document.getElementById("start").disabled = false;
    document.getElementById("guess").disabled = true;
    document.getElementById("quit").disabled = true;
    document.getElementById("return").disabled = true;

  }
 

  render() {
    const { markerPosition } = this.state;
    return (
      <div>
        <Map markerPosition={markerPosition} />
        <div id="score"></div>
        <button
          onClick={this.moveMarkerNorth}
        >
          North
        </button>
        <button
          onClick={this.moveMarkerEast}
        >
          East
        </button>
        <button
          onClick={this.moveMarkerSouth}
        >
          South
        </button>
        <button
          onClick={this.moveMarkerWest}
        >
          West
        </button>
        <button id="start">
        
          Start
        </button>
        <button id="guess">
         
         Guess
        </button>
        <button id="quit">
          
          Quit
        </button>
        <button id="return">
        
         Return
        </button>
      </div>
    );
  }
}


ReactDOM.render(<App />,
  document.getElementById('root')
)