import React, { Component } from 'react';
import Skills from '../skills/skill.component';
import './class-detail.css';

class ClassDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    componentDidMount() {
    }

    render(){
        return(
            <Skills {...this.props}/>
        )
    }
}

export default ClassDetails