/* eslint-disable */
import React, { Component } from 'react'
import { Button, FormLabel } from 'react-bootstrap'
import Zones from '../Account/Zones/Zones'

export default class EditTaskZone extends Component {

    state = {
        showZoneInput: false
    }

    render() {
        return (
            <div>
            
            <Button onClick={()=>{this.props.selectZone("home")}} variant={"outline-info"} name="home" active={this.props.active==="home" ? "active" : ""}>Home</Button>
            <Button onClick={()=>{this.props.selectZone("work")}} variant={"outline-info"} name="work"  active={this.props.active==="work" ? "active" : ""}>Work</Button>
            <Button onClick={()=>{this.props.selectZone("custom")}} variant={"outline-info"} disabled >Custom (coming soon)</Button>
            {this.props.showZoneInput ? ( 
                <Zones userObj={this.props.userObj} zoneName={this.props.active} />
                ) : "" }
            </div>
        )
    }
}
