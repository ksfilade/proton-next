import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleRight } from '@fortawesome/free-solid-svg-icons'

function Dropdown(props) {
    let arr = ['monthly', 'annualy', '2 years']
    const [showDropDown, stateShowDropDown] = useState(false)
    const [selected, stateSelected] = useState(props.data[0])

    return (
        <div className="dropdown" onClick={() => stateShowDropDown(!showDropDown)}>
            <div className="dropdown__button">
                <h5>{selected}</h5>
                <FontAwesomeIcon className='dropdown__button__right' icon={faAngleRight} />
            </div>
            {showDropDown && <div className="dropdown__content">
                {
                    props.data.filter(x => x != selected).map(el => (
                        <h6 key={el} onClick ={ () =>{ stateSelected(el); props.selected(el) } }>{el}</h6>
                    ))
                }
            </div>}

        </div>
    );
}

export default Dropdown;
