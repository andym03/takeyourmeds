/* eslint-disable no-alert */
/* eslint-disable padded-blocks */
import React from 'react';
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, KeyboardTimePicker } from '@material-ui/pickers';
import {
  makeStyles, createMuiTheme, withStyles, ThemeProvider
} from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import DayPicker from './dayPicker';

import './emailForm.css';


const theme = createMuiTheme({
  overrides: {
    // Style sheet name ⚛️
    MuiButton: {
      // Name of the rule
      text: {
        // Some CSS
        backgroundColor: '#e84393',
        borderRadius: 3,
        border: 0,
        color: 'white',
        height: 48,
        boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
      },
    },
  },
});

export default class EmailForm extends React.Component {


  useStyles = makeStyles(theme => ({
    root: {
      '& > *': {
        margin: theme.spacing(1),
        width: '25ch',
      },
    },
  }));

  StyledButton = withStyles({
    root: {
      backgroundColor: '#34495e',
    },
  })(MenuItem);

  constructor(props) {
    super(props);
    this.state = {
      selectedTime: new Date(),
      frequency: '',
      advancedFrequency: '',
      email: '',
      medication: '',
      showAdvancedSettings: false,
    };

    this.dayPickerRef = React.createRef();

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleAdvancedFrequency = this.handleAdvancedFrequency.bind(this);
  }

  handleChange(event) {
    // check it out: we get the evt.target.name (which will be either "email" or "password")
    // and use it to target the key on our `state` object with the same name, using bracket syntax
    console.log(event);
    if (event.target && event.target.name === 'frequency-simple') {
      if (event.target.value === 'Custom') {
        this.setState({ frequency: '', showAdvancedSettings: true });
      } else {
        this.setState({ frequency: event.target.value, showAdvancedSettings: false });
      }
    }
    if (event instanceof Date) {
      this.setState({ selectedTime: event });
    } else {
      this.setState({ [event.target.name]: event.target.value });
    }
  }

  handleAdvancedFrequency(value) {
    console.log(value);
    console.log(this.state);
    this.setState({ advancedFrequency: value });
  }

  sendData() {
    console.log(this.state);
    const url = 'http://localhost:8081/api/setMedReminder';
    fetch(url, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: this.state.email,
        notificationTime: { hours: this.state.selectedTime.getHours(), minutes: this.state.selectedTime.getMinutes() },
        medicationName: this.state.medication,
        frequency: this.state.frequency,
        emailConfirmed: false,
      })
    });
  }

  async handleSubmit(event) {
    
    alert(`A confirmation email was sent to ${this.state.email}`);
    event.preventDefault();
    const advNotif = this.dayPickerRef.current;
    if (advNotif && advNotif.state) {
      if (Object.keys(advNotif.state).every(k => advNotif.state[k] !== false)) {
        await this.setState({ frequency: Object.values(advNotif.state) }, () => this.sendData());
      }
    }
    if (typeof this.state.frequency === 'string') {
      console.log("Typeof frequency" + typeof this.state.frequency);
      this.setState({ frequency: [this.state.frequency] }, () => this.sendData());
    } else {
      this.sendData();
    }
  }

  render() {
    return (
      <div className="formContainer">
        <form onSubmit={this.handleSubmit}>
          <TextField id="standard-basic" label="Email" type="email" onChange={this.handleChange} name="email" className="form-input" />
          <TextField id="standard-basic" label="Medication" onChange={this.handleChange} name="medication" className="form-input" />
          <Select
            name="frequency-simple"
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            placeholder="Frequency"
            onChange={this.handleChange}
            className="form-input"
            value={this.state.frequency}
          >
            <MenuItem value="Daily">Daily</MenuItem>
            <MenuItem value="Weekly">Weekly</MenuItem>
            <MenuItem value="First day of the month">First day of the month</MenuItem>
            <MenuItem value="Custom"><span>Custom&nbsp;&nbsp;</span><span className="MuiIconButton-label"><svg className="MuiSvgIcon-root" focusable="false" viewBox="0 0 24 24" aria-hidden="true"><path d="M17 12h-5v5h5v-5zM16 1v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2h-1V1h-2zm3 18H5V8h14v11z"></path><path fill="none" d="M0 0h24v24H0z"></path></svg></span></MenuItem>
          </Select>
          
          
          { this.state.showAdvancedSettings && <DayPicker ref={this.dayPickerRef} /> }
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardTimePicker
              margin="normal"
              id="time-picker"
              value={this.state.selectedTime}
              onChange={this.handleChange}
              label=" Notification Time"
              KeyboardButtonProps={{
                'aria-label': 'change time',
              }}
              className="form-input"
              minutesStep={5}
              name="selectedTime"
            />
          </MuiPickersUtilsProvider>
          <ThemeProvider theme={theme}>
            <Button type="submit" className="submit-button">Submit</Button>
          </ThemeProvider>
        </form>
      </div>
    );
  }
}
