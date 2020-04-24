import { useState } from "react";

function ObjectsinHooks() {
    const [name, setName] = useState({ firstName: "", lastName: "" });

    return (
        <>
            {/* here we need to use ...name(spread operator) becasue
                wihtout using hooks the state will be preserved and old state obejcts will be retained
                in hooks, in this syntax, we must manually set the state or preserve the old state by using the
                spread operator .....
            */}
            <h4> Hooks demo using objects </h4>
            <input type="text"
                value={name.firstName}
                onChange={e => setName({ ...name, firstName: e.target.value })}
            />
            <input type="text"
                value={name.lastName}
                onChange={e => setName({ ...name, lastName: e.target.value })}
            />

            <div>
                Firstname : {name.firstName} ---  LastName : {name.lastName}
            </div>



        </>

    )
}

export default ObjectsinHooks;