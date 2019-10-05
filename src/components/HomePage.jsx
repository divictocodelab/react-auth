import React, { useState, Component} from 'react';
import { Link, Router } from 'react-router-dom';
import { connect } from 'react-redux';
import { userActions } from '../_actions';
import SideBar from './sidebar/SideBar';
import Content from './content/Content';
import { history } from '../_helpers';

// const [isOpen, setOpen] = useState(true)
// const toggle = () => setOpen(!isOpen)
// class HomePage extends Component {
//     state = { isOpen: true, setOpen: true };
 
//     // constructor(props) {
//     //     super(props);
//     //     this.state = {
//     //         setOpen : true,
//     //         setOpen : true
//     //     }
//     //     console.log(this.state.setOpen)
//     //     console.log(this.state.isOpen)
//     //     console.log(props);

//     //     // history.listen((location, action) => {
//     //     //   dispatch();
//     //     // });
        
//     //     // const [isOpen, setOpen] = useState(true)
     
//     // }
  
//     render() {
//         console.log(this.state)
//         // const isOpen = false;
//         // const setOpen = false;

//         // const [isOpen, setOpen] = useState(true)
//         // const toggle = () => this.setOpen(!this.isOpen)
//         // const toggle = false;
//         // const toggle = () => this.setOpen(!this.state.isOpen)

//         return (
//             <div>
//                 <SideBar toggle={() =>  this.state.isOpen} isOpen={this.state.isOpen} />
//                 <Content toggle={() =>  this.state.isOpen} isOpen={this.state.isOpen} />
//              </div>
//         );
//     }
// }

// function mapStateToProps(state) {
//     const { setOpen, isOpen } = state;

//     return {
//         isOpen,
//         setOpen
//           };
// }

// const connectedHomePage = connect(mapStateToProps)(HomePage);
// export { connectedHomePage as HomePage };


export default () => {

    const [isOpen, setOpen] = useState(true)
    const toggle = () => setOpen(!isOpen)
    console.log(isOpen);
    console.log(setOpen);
    console.log(toggle);
    return (
    //   <Router history={history}>
        <div className="App wrapper">
          <SideBar toggle={toggle} isOpen={isOpen}/>
          <Content toggle={toggle} isOpen={isOpen}/>
        </div>
    //   </Router>
    );
  }