import { useState, useEffect } from "react";
import { render } from "react-dom";
import ObjectsinHooks from "../containers/objectsinHooks"
import ArraysinHooks from "../containers/arraysinhooks";


function hooksAsFunction() {

    const initialVal = 0;
    const [counterValue, incrementCounter] = useState(initialVal)


    //behaves as componentDidMount , DidUpdate & WillUnmount for functional components
    useEffect(() => {
        document.title = "Title - " + counterValue

        return () => {
            //this return statement will act as a componentWillUnmount method.
        }

    }, [counterValue])
    //this array of counterval is used, to check, the value of previuos state and current state
    // it renders only if its different. If the value iis same it will not render.
    // meanwhile, passing an empty [] as parameter it means - compDidMount type only once it will be called

    const incrementBy5 = () => {

        for (var i = 0; i < 5; i++) {
            incrementCounter(prevVal => prevVal + 1)
        }

        //this is not called when everytime the component is rendered
        document.title = "Title - " + counterValue

    }


    return (
        <>
            <div> Only here since this is a functional component - we can use hooks </div>>

            <button onClick={() => incrementCounter(prevVal => prevVal + 1)}>Counter +</button>
            <button onClick={() => incrementCounter(prevVal => prevVal - 1)}>Counter -</button>
            <button onClick={() => incrementCounter(initialVal)}>Counter 0</button>

            <button onClick={incrementBy5}>Counter +5</button>

            <button onClick={() => incrementCounter(counterValue + 1)}>Use Effect Demo</button>

            <h4> {counterValue} </h4>

            <hr />
            <ObjectsinHooks />
            <hr />
            <ArraysinHooks />
        </>
    )


}

export default hooksAsFunction;