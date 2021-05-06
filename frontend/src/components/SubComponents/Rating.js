import React from 'react';
import {IoStar } from "react-icons/io5";
import {IoStarHalf} from "react-icons/io5";
import {IoStarOutline } from "react-icons/io5";
import PropTypes from 'prop-types';

const Rating = ({value, text}) => {
    return (
        <div className='Rating'>
            <span>
    
            
               {value >= 1?
                  <IoStar className="text-warning"/>: 
                  value>= 0.5? 
                  <IoStarHalf className="text-warning"/>:
                  <IoStarOutline className="text-warning"/>
                  }
               {value >= 2?
                  <IoStar className="text-warning"/>: 
                  value>= 1.5? 
                  <IoStarHalf className="text-warning"/>:
                  <IoStarOutline className="text-warning"/>
                  }
               {value >= 3?
                  <IoStar className="text-warning"/>: 
                  value>= 2.5? 
                  <IoStarHalf className="text-warning"/>:
                  <IoStarOutline className="text-warning"/>
                  }
               {value >= 4?
                  <IoStar className="text-warning"/>: 
                  value>= 3.5? 
                  <IoStarHalf className="text-warning"/>:
                  <IoStarOutline className="text-warning"/>
                  }
               {value >= 5?
                  <IoStar className="text-warning"/>: 
                  value>= 4.5? 
                  <IoStarHalf className="text-warning"/>:
                  <IoStarOutline className="text-warning"/>
                  }
                  
                
            </span>
            <span className="ms-2">{text && text}</span>
        </div>
    )
}


Rating.prototype={
    value: PropTypes.number.isRequired,
    text: PropTypes.string.isRequired
}
export default Rating;
