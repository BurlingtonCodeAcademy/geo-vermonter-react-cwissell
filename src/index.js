import React from "react";
import ReactDOM from "react-dom";
import Map from "./Map";
import GuessForm from "./GuessForm";
import L from "leaflet";
//import countyData from "./county"
import borderData from "./border";
import leafletPip from "@mapbox/leaflet-pip";

// class GuessForm extends React.Component {

//   prevent(event) {
//     event.preventDefault();
//   }
//   render() {
//   if (this.props.guess){
//     return (<form onSubmit={this.prevent}>
//       <select name="counties" id="counties">
//  <option value="Addison">Addison</option>
//  <option value="Bennington">Bennington</option>
//  <option value="Caledonia">Caledonia</option>
//  <option value="Chittenden">Chittenden</option>
//  <option value="Essex">Essex</option>
//  <option value="Franklin">Franklin</option>
//  <option value="Grand Isle">Grand Isle</option>
//  <option value="Lamoille">Lamoille</option>
//  <option value="Orange">Orange</option>
//  <option value="Orleans">Orleans</option>
//  <option value="Rutland">Rutland</option>
//  <option value="Washington">Washington</option>
//  <option value="Windham">Windham</option>
//  <option value="Windsor">Windsor</option>
// </select>
//        <input type="submit" value="Select County"></input>
//       </form>)
//   }
//   else {
//     return <div></div>
//   }
// }
// }

class App extends React.Component {
  constructor() {
    super();
    this.moveMarkerEast = this.moveMarkerEast.bind(this);
    this.moveMarkerWest = this.moveMarkerWest.bind(this);
    this.moveMarkerNorth = this.moveMarkerNorth.bind(this);
    this.moveMarkerSouth = this.moveMarkerSouth.bind(this);
    this.checkInVt = this.checkInVt.bind(this);
    this.startGame = this.startGame.bind(this);
    this.state = {
      zoomLevel: 18,
      confirmGuess: false,
      isDisabledStart: false,
      isStarted: true,
      guess: false,
      startMarker: { lat: null, lng: null },
      markerPosition: { lat: this.randomLat(), lng: this.randomLng() },
      score: 500,
      town: "",
      county: ""
    };
  }

  setTown(lat, lng) {
    fetch(
      `https://nominatim.openstreetmap.org/reverse.php?format=html&lat=${lat}&lon=${lng}&zoom=12&format=json`
    )
      .then(request => request.json())
      .then(townJson => {
        this.setState({
          //town: townJson.address.city,
          county: townJson.address.county
        });
        alert(this.state.county);
      });
  }

  startGame() {
    console.log("about to restart the game");
    this.setState({
      isDisabledStart: !this.state.isDisabledStart,
      isStarted: !this.state.isStarted,
      startMarker: {
        lat: this.state.markerPosition.lat,
        lng: this.state.markerPosition.lng
      }
    });
    console.log({state: this.state});
    console.log("restarted!");
  }

  checkInVt() {
    let vtLayer = L.geoJSON(borderData, { fillColor: "none", color: "none" });
    console.log(vtLayer);
    let newLat =
      Math.random() * (45.00541896831666 - 42.730315121762715) +
      42.730315121762715;
    let newLng =
      (Math.random() * (71.51022535353107 - 73.35218221090553) +
        73.35218221090553) *
      -1;
    let results = leafletPip.pointInLayer([newLng, newLat], vtLayer).length;
    console.log(results);
    while (!results) {
      //this.setState({ markerPosition: { lat: this.randomLat(), lng: this.randomLng() }})
      newLat =
        Math.random() * (45.00541896831666 - 42.730315121762715) +
        42.730315121762715;
      newLng =
        (Math.random() * (71.51022535353107 - 73.35218221090553) +
          73.35218221090553) *
        -1;
      //this.marker = L.marker([newLat, newLng]).addTo(this.map);
      results = leafletPip.pointInLayer([newLng, newLat], vtLayer).length;
    }
    this.setTown(newLat, newLng);

    this.setState({
      markerPosition: { lat: newLat, lng: newLng },
      startMarker: { lat: newLat, lng: newLng }
    });
  }

  randomLat() {
    let lat =
      Math.random() * (45.00541896831666 - 42.730315121762715) +
      42.730315121762715;
    return lat;
  }
  randomLng() {
    let lng =
      (Math.random() * (71.51022535353107 - 73.35218221090553) +
        73.35218221090553) *
      -1;
    return lng;
  }

  moveMarkerNorth = () => {
    const { lat, lng } = this.state.markerPosition;
    const { score } = this.state;
    this.setState({
      markerPosition: {
        lat: lat + 0.001,
        lng: lng
      },
      score: score - 1
    });
  };

  moveMarkerEast = () => {
    const { lat, lng } = this.state.markerPosition;
    const { score } = this.state;
    this.setState({
      markerPosition: {
        lat: lat,
        lng: lng + 0.001
      },
      score: score - 1
    });
  };

  moveMarkerSouth = () => {
    const { lat, lng } = this.state.markerPosition;
    const { score } = this.state;
    this.setState({
      markerPosition: {
        lat: lat - 0.001,
        lng: lng
      },
      score: score - 1
    });
  };

  moveMarkerWest = () => {
    const { lat, lng } = this.state.markerPosition;
    const { score } = this.state;
    this.setState({
      markerPosition: {
        lat: lat,
        lng: lng - 0.001
      },
      score: score - 1
    });
  };

  returnToStart = () => {
    this.setState({
      markerPosition: {
        lat: this.state.startMarker.lat,
        lng: this.state.startMarker.lng
      }
    });
  };

  countySelector = () => {
    this.setState({ guess: true });
  };

  componentDidMount() {
    document.getElementById("start").disabled = this.state.isDisabledStart;
    document.getElementById("guess").disabled = this.state.isStarted;
    document.getElementById("quit").disabled = this.state.isStarted;
    this.checkInVt();
  }
  componentDidUpdate() {
    if (
      this.state.markerPosition.lat !== this.state.startMarker.lat &&
      this.state.markerPosition.lng !== this.state.startMarker.lng
    ) {
      this.setState({
        score: this.state.score - 1,
        startMarker: this.state.markerPosition
      });
    }
  }

  confirmGuess = event => {
    if (
      this.state.county ===
      document.getElementById("counties").value + " County"
    ) {
      alert(
        `You are right it is ${this.state.county}! To play again press Restart.`
      );
      this.setState({
        confirmGuess: !this.state.confirmGuess,
        zoomLevel: 8
      });
    } else {
      alert(
        "Wrong, try again next time! Want to play again? Just press Restart."
      );
      console.log(this.state.county, document.getElementById("counties").value);
    }
  };

  quitGame = event => {
    this.setState({ isStarted: true, isDisabledStart: false });
    if (this.state.isStarted === true) {
    }
  };

  render() {
    const { markerPosition, startMarker, guess, county } = this.state;
    return (
      <div id="mapContainer">
        <GuessForm
          guess={guess}
          county={county}
          selectCounty={this.confirmGuess}
        />
        <Map
          zoomLevel={this.state.zoomLevel}
          markerPosition={markerPosition}
          startMarker={startMarker}
        />
        <h1 id="score">Score:{this.state.score}</h1>

        <button
          id="north"
          onClick={this.moveMarkerNorth}
          disabled={this.state.isStarted}
        >
          North
        </button>

        <button
          id="east"
          onClick={this.moveMarkerEast}
          disabled={this.state.isStarted}
        >
          East
        </button>

        <button
          id="south"
          onClick={this.moveMarkerSouth}
          disabled={this.state.isStarted}
        >
          South
        </button>

        <button
          id="west"
          onClick={this.moveMarkerWest}
          disabled={this.state.isStarted}
        >
          West
        </button>

        <div id="gameButtons">
          {this.state.confirmGuess ? (
            <button
              id="restart"
              onClick={this.startGame}
              disabled={this.state.isDisabledStarted}
            >
              Restart
            </button>
          ) : (
            <button
              id="start"
              onClick={this.startGame}
              disabled={this.state.isDisabledStart}
            >
              Start
            </button>
          )}

          <button
            id="guess"
            onClick={this.countySelector}
            disabled={this.state.isStarted}
          >
            Guess
          </button>

          <button
            id="quit"
            disabled={this.state.isStarted}
            onClick={() => this.setState({zoomLevel: 8})}
          >
            Quit
          </button>

          <button
            id="return"
            onClick={this.returnToStart}
            disabled={this.state.isStarted}
          >
            Return
          </button>
        </div>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root"));
