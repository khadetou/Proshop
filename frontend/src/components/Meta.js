import React from 'react';
import {Helmet} from 'react-helmet';
const Meta = ({keyword, description, title }) => {
    return (
        <Helmet>
            <title>{title}</title> 
            <meta name='description' content= {description} />
            <meta name='keywords' content= {keyword} />
        </Helmet>
    )
}

Meta.defaultProps={
    title: 'Welcome To Proshop',
    description:'We sell the best product for cheep price',
    keyword: 'Electronics, buy electronics'
}

export default Meta;
