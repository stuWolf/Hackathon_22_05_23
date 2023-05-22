import React, {Component} from 'react';
// import React from "react"
import Clock from "./Clock";
// import { METHODS } from 'http';
// import { tsConstructorType } from '@babel/types';

// functional component only can have props (read only), 
// read and write  -  state : class components

// App component is created
// Make an API call to retriecr location, since this is acynchronous
// code continues and the html element is returned, at this point in time the position is null


// const App = (prop) => {
//     const App = () => {
//         let position = null
//     // make an api call -  use a web api to get the location
//     window.navigator.geolocation.getCurrentPosition(
//         position =>  console.log(position),
//         err => console.log(err)
//     )
//     return (
//         <div>
//             <p>{position}</p>
//             <Clock
//                 icon="sun.jpeg"
//                 timezone={"Sydney/Australia"}
//                 date={new Date()}
//             />
//         </div>
//     )
// }

// class Component
// 1. every class component must have a render method, which returns html
class App extends Component {
    // initialse state
    constructor(props) {
        super(props);
        // define state
        this.state = {latitude: null, errorMessage:''}
        
        console.log("Constructor Runs first")
    }

isItWarm(){
    const {latitude} = this.state
    const month = new Date().getMonth()

    if (((month > 4 && month <=9) || latitude > 0) || ((month <=4 && month >9) || latitude <0) || latitude === 0){
        return true
    }
    return false
}

getClockIcon(){
    if(this.isItWarm()){
        console.log('summer')
        return "Summer.png"
    }
    console.log('winter')
    return "winter.ipg"
}

tick(){
    this.setState({date: new Date()})
}

componentDidMount(){

    // make the api call in the tsConstructorType, in future we will be using life cycle methods
    window.navigator.geolocation.getCurrentPosition(
        // API call
    position =>  this.setState({latitude: position.coords.latitude}),
    // never update state variable directly
    // position => this.state.latitude = position.coords.latitue,
    // each time this is updated, the page reloads
    // error => console.log(error)
    error =>  this.setState({errorMessage: error.message})
)
    console.log("3. component did mount runs after first render")
}

componentDidUpdate( prevState){
    console.log("4. component did UPDATE runs after SUBSEQUENT renders, not first render")
    if(prevState.date !== this.state.date){ // if state has changed
        this.timerId = setInterval(() => this.tick(), 1000)
    }
}

componentWillUnmount(){
    console.log("5. component WILL UNMOUNT runs towards end of component lifecycle")

    clearInterval(this.timerId) // to make sure it doesn't keep runing in the background
}



    render() {
        console.log("2. render runs second")
        // destruction of state
        const {latitude, errorMessage} = this.state
            return (
                
            <div>
                {/* <p>{this.state.latitude}</p> */}
                {/* render component based on state value */}
                <h1>{latitude}</h1>
                {errorMessage || 
                <Clock 
                date={new Date()}
                
                icon = {latitude ? this.getClockIcon() : null} // else  return null
                // icon = {"Summer.png"}
                // pass icon to Clock defined as style in props, clock js
                />
                
                
                }
                {/* <Clock
                    icon="sun.jpeg"
                    // timezone={"Sydney/Australia"}
                    // date={new Date()}
                /> */}
            </div>
        )
    }
} // end class

export default App;
