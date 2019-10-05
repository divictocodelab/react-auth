import React, { useState, Component } from 'react';
import SideBar from './sidebar/SideBar';
import Content from './content/Content';
import { render } from 'react-dom';
export class MainComponent extends Component {

    render(){

    // const [isOpen, setOpen] = useState(true)
    // const toggle = () => setOpen(!isOpen)

        return (
            <div>
                test
                {/* <SideBar toggle={toggle} isOpen={isOpen} />
                <Content toggle={toggle} isOpen={isOpen} /> */}
            </div>
        );
    }

}

