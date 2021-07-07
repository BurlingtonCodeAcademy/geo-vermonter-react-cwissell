import React from "react";

const style = {
  position: "absolute",
  top: "0",
  left: "0",
  "z-index": "500"
};

class GuessForm extends React.Component {
  
  prevent(event) {
    event.preventDefault();
  }
  render() {
  if (this.props.guess){
    return (
      <div style={style}>
      <form onSubmit={this.prevent}>
      <select name="counties" id="counties">
 <option value="Addison">Addison</option>
 <option value="Bennington">Bennington</option>
 <option value="Caledonia">Caledonia</option>
 <option value="Chittenden">Chittenden</option>
 <option value="Essex">Essex</option>
 <option value="Franklin">Franklin</option>
 <option value="Grand Isle">Grand Isle</option>
 <option value="Lamoille">Lamoille</option>
 <option value="Orange">Orange</option>
 <option value="Orleans">Orleans</option>
 <option value="Rutland">Rutland</option>
 <option value="Washington">Washington</option>
 <option value="Windham">Windham</option>
 <option value="Windsor">Windsor</option>
</select>
       <input type="submit" value="Select County" onClick={this.props.selectCounty}></input>
      </form>
      </div>)
  }
  else {
    return <div></div>
  }
}
}

export default GuessForm