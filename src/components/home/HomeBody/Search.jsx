import React from 'react';
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from 'react-places-autocomplete';
import './Search.css';

const searchOptions = {
  types: []
}

export default class LocationSearchInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      address: this.props.address,
      inFocus: this.props.address ? true : false,
    }
  }

  handleChange = address => {
    this.setState({
      address: address
    })
  };
  applySelectedValue(index, address, extraData) {
    this.props.changeCity(index, address, extraData);
    this.setState({
      address: address
    })
  }
  handleSelect = address => {
    let location = {
      lat: "",
      long: ""
    }
    geocodeByAddress(address)
      .then(results => {/*console.log('Process results from geocode');console.log(results); */location.lat = results[0].geometry.location.lat(); location.long = results[0].geometry.location.lng(); getLatLng(results[0]); })
      .then(latLng => {/*console.log('Success', latLng); console.log(address);*/ this.applySelectedValue(this.props.index, address, { location: location }) })
      .catch(error => console.error('Error', error));
  };
  onInputBlur = () => {
    debugger;
    this.setState({ inFocus: false })
  }

  render() {
    /*console.log("LocationSearchInput render");
    console.log(this.state.address);
    console.log(this.props.address);*/
    var opts = {};
    if (this.props.readOnlyOn) {
      opts['readOnly'] = 'readOnly';
    }
    return (
      <PlacesAutocomplete
        value={this.state.address}
        onChange={this.handleChange}
        onSelect={this.handleSelect}
        searchOptions={searchOptions}
      >
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) =>
          (
            <React.Fragment>
              <div className={"d-flex align-items-center col-12 " + this.props.classDiv} onBlur={() => { if (!this.state.address) { this.setState({ inFocus: false }) } }}>
                <span className={this.props.spanText ? "" : " d-none"} style={{ display: this.state.inFocus ? "" : "none" }}>{this.props.spanText}</span>
                <input id={this.props.id}
                  onFocus={() => {
                    this.setState({ inFocus: true })
                  }}

                  {...getInputProps({
                    placeholder: !this.state.inFocus ? this.props.placeholder : "",
                    className: '' + this.props.classInput,
                  })}
                  {...opts}
                />
                {this.props.readOnlyOn ?
                  <p/>:
                  <i style={{ display: this.state.inFocus ? "" : "none" }} onClick={() => { this.setState({ address: "" }) }} />
                }

              </div>

              <div className={"autocomplete-dropdown-container " + this.props.classDropdown}>
                {loading && <div>Loading...</div>}
                {suggestions.map(suggestion => {
                  const className = suggestion.active
                    ? 'suggestion-item--active'
                    : 'suggestion-item--active';
                  // inline style for demonstration purpose
                  const style = suggestion.active
                    ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                    : { backgroundColor: '#ffffff', cursor: 'pointer' };
                  return (
                    <div
                      {...getSuggestionItemProps(suggestion, {
                        className,
                        style,
                      })}
                    >
                      <span>{suggestion.description}</span>
                    </div>
                  );
                })}
              </div>
            </React.Fragment>
          )}

      </PlacesAutocomplete>
    );
  }
}