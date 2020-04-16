import React from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import './dayPicker.css';

export default class DayPicker extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      monday: false,
      tuesday: false,
      wednesday: false,
      thursday: false,
      friday: false,
      saturday: false,
      sunday: false,
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({ [event.target.name]: !this.state[event.target.name]}, () => {
      console.log(this.state);
    }); 
  }

  render() {
    return (
      <div>
        <FormControlLabel
          value="Mon"
          control={<Checkbox name="monday" color="primary" onChange={this.handleChange} />}
          label="M"
          labelPlacement="top"
          className="tight"
          />
        <FormControlLabel
          
          value="Tue"
          control={<Checkbox name="tuesday" color="primary" onChange={this.handleChange} />}
          label="T"
          labelPlacement="top"
          className="tight"
          />
        <FormControlLabel
          
          value="Wed"
          control={<Checkbox name="wednesday" color="primary" onChange={this.handleChange} />}
          label="W"
          labelPlacement="top"
          className="tight"
          />
        <FormControlLabel
          
          value="Thu"
          control={<Checkbox name="thursday" color="primary" onChange={this.handleChange} />}
          label="T"
          labelPlacement="top"
          className="tight"
          />
        <FormControlLabel
          
          value="Fri"
          control={<Checkbox name="friday" color="primary" onChange={this.handleChange} />}
          label="F"
          labelPlacement="top"
          className="tight"
          />
        <FormControlLabel
          
          value="Sat"
          control={<Checkbox name="saturday" color="primary" onChange={this.handleChange} />}
          label="S"
          labelPlacement="top"
          className="tight"
          />
        <FormControlLabel
          
          value="Sun"
          control={<Checkbox name="sunday" color="primary" onChange={this.handleChange} />}
          label="S"
          labelPlacement="top"
          className="tight"
          />
      </div>
    );
  }
}