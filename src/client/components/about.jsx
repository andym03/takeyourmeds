import React, { Component } from 'react';
import lifecycle from 'react-pure-lifecycle';

const methods = {
  componentDidMount(props) {
    console.log('I mounted! Here are my props: ', props);
  }
};

const About = props => (
  <h1>Hello</h1>
)

export default lifecycle(methods)(About);

// export default class About extends React.Component {
//   componentWillMount() {
//     this.state = {
//       id: this.props.router.params.id
//     };

//     // fire action to update redux project store
//     this.props.dispatch(fetchProject(this.props.router.params.id));
//   }

//   componentDidUpdate(prevProps, prevState) {
//     /**
//        * this is the initial render
//        * without a previous prop change
//        */
//     if (prevProps == undefined) {
//       return false;
//     }

//     /**
//        * new Project in town ?
//        */
//     if (this.state.id != this.props.router.params.id) {
//       this.props.dispatch(fetchProject(this.props.router.params.id));
//       this.setState({ id: this.props.router.params.id });
//     }

//     render({ <About .../> });
//   }
// }
