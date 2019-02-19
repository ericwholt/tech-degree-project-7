import React from 'react';
import Jpg from './Jpg';
import NoJpgs from './NoJpgs';

const Results = (props) => {


    const results = props.data;

    let jpgs;
    let title = props.title;
    if (results.length > 0) {
        jpgs = results.map(jpg => <Jpg url={`https://farm${ jpg.farm }.staticflickr.com/${ jpg.server }/${ jpg.id }_${ jpg.secret }.jpg`} key={jpg.id} />);
    } else {
        title = ''
        jpgs = <NoJpgs />
    }

    return (
        < div className="photo-container" >
            <h2>{title}</h2>
            <ul>
                {jpgs}
            </ul>
        </div >
    );
}

export default Results;