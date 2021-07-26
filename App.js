
import React from 'react';

import { Typeahead } from 'react-bootstrap-typeahead';

import 'react-bootstrap-typeahead/css/Typeahead.css';
import './App.css';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      kitIds: [],
      selectedKit: [],
      fedexData: null
    };
  }

  componentDidMount() {

    fetch("/ids")
    .then(response => response.json())
    .then(
      (response) => {
        this.setState({
          isLoaded: true,
          kitIds: response
        });
      },

      (error) => {
        this.setState({
          isLoaded: true,
          error
        });
      }
    )
 ;

 }

 getFedexData(selectedKit) {

  console.log('fedex lookup: ' + selectedKit.labelKey) ;
 }


  render() {

    const { error, isLoaded, kitIds, isKitSelected, selectedKit  } = this.state;

    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (

     <div className="container">
      <h2 className="formheader">Biobot Kit Tracker</h2>
      <div class="row">
      <div class="col-sm">
          <Typeahead 
               clearButton
                id="kitid-typeahead"
                labelKey="label_id"
                options={kitIds}
                onChange={(selected) => {
                  this.setState({selectedKit: selected});
                  this.getFedexData(selected);
                }}
                placeholder="Enter kit ID"
              />
              </div>
              <div class="col-sm">{ selectedKit.length > 0 && 
          <pre>
            FedEx tracking information for {this.state.selectedKit[0].shipping_tracking_code}:
            
              </pre>
          }</div>

      </div>


      </div>

      );
    }
  }
}





export default App;
