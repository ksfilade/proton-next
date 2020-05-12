import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'

function SinglePlan(props) {

    return (
        <div className="single_plan">
        <div className="single_plan__popular center">
                {props.data.title.toLowerCase() =='plus' && <h4>Most popular</h4>}
            </div>
            <div className="single_plan__title center">
                <h4>{props.data.title}</h4>
            </div>
            <div className="single_plan__price center">
                <h5>{props.symbol}</h5>
                <h3>{props.data.price[props.pricing] / 100}</h3>
                {props.pricing == '1' && <h5>/mo</h5>}
                {props.pricing == '12' && <h5>/yr</h5>}
                {props.pricing == '24' && <h5>/2 yr</h5>}

            </div>
            <div className='center single_plan__price_annualy'>
            {props.pricing == '1' && props.data.title.toLowerCase() != 'free' && 
             <p> billed as {props.symbol+ props.data.price["12"] / 100} per year</p>
             } </div>
            <div className="single_plan__description center">
                <p>{props.data.description} </p>
            </div>

            <div className='single_plan__details'>
                <div className="single_plan__details__item">
                    <FontAwesomeIcon icon={faArrowRight} />
                    <p>{props.data.users} users </p>
                </div>
                <div className="single_plan__details__item">
                    <FontAwesomeIcon icon={faArrowRight} />
                    <p>{props.data.storage}</p>
                </div>
                <div className="single_plan__details__item">
                    <FontAwesomeIcon icon={faArrowRight} />
                    <p>{props.data.address} addresses </p>
                </div>
                <div className="single_plan__details__item">
                    <FontAwesomeIcon icon={faArrowRight} />
                    <p>{props.data.domain > 0 ? 'Support ' + props.data.domain + ' domains' : 'no domain support'} </p>
                </div>
                {props.data.feauters != null && <div className="single_plan__details__item  ">
                    <FontAwesomeIcon icon={faArrowRight} />
                    <p className=''>{props.data.feauters} </p>
                </div>}
                {props.data.includeProtonVpn && <div className="single_plan__details__item">
                    <FontAwesomeIcon icon={faArrowRight} />
                    <p>Priority support </p>
                </div>}
                <div className="single_plan__details__item">
                    <FontAwesomeIcon icon={faArrowRight} />
                    <p>{props.data.includeProtonVpn ? 'Includes Proton VPN' : 'ProtonVPN(optional)'} </p>
                </div>
            </div>

            <div className='single_plan__button'>
                <button className=''>Select</button>
            </div>

        </div>
    );
}

export default SinglePlan;
