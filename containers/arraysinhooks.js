import { useState } from "react";

function ArraysinHooks() {

    const [myArray, setArrayValues] = useState([])


    const addItem = () => {
        console.log("hi")
        setArrayValues([...myArray, {
            id: myArray.length,
            value: Math.floor(Math.random() * 10) + 1
        }])
        console.log("hi", myArray)
    }
    const tempArr = [
        { id: "1", val: "aaaa" },
        { id: "2", val: "bbbb" },
        { id: "3", val: "cccc" },
        { id: "4", val: "dddd" },
        { id: "5", val: "eeee" },
    ]
    return (
        <>
            <hr />
            <div>Hooks demo using array</div>

            <button onClick={addItem}> Submit </button>
            <div>
                <ul>
                    {myArray.map(item =>
                        <li key={item.id}> {item.val}</li>
                    )}
                </ul>
                {/* <ul>
                    {tempArr.map(item =>
                        <li key={item.id}> {item.val}</li>
                    )}
                </ul> */}
            </div>
        </>
    )

}

export default ArraysinHooks;