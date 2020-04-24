import { Component } from "react";
import { Button } from "antd";
import HooksAsFunction from "./hooksAsFunction";


export default class MyHooks extends Component {

    constructor(props) {
        super(props);
        this.state = {
            conterValue: 0
        }
    }

    //we get a preval from states and which always holds the preveious val
    //i.e passed as an argumet to get the prev val and count is increment from then.
    //the same logic but different syntax can be seen in functional hooks component.
    incrementCounter = () => {
        this.setState(prevVal => {
            return { conterValue: prevVal.conterValue + 1 }
        })
    }

    render() {
        return (
            <>
                <div>We cannot hooks here as this is a class component.</div>
                <Button onClick={this.incrementCounter}> Counter + </Button>
                <h4>Counter Value = {this.state.conterValue}</h4>
                <hr />
                <div>How and where hooks work ?</div>
                <HooksAsFunction />


            </>
        )
    }

}