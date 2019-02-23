import React from 'react';
import Jpg from './Jpg';
import NoJpgs from './NoJpgs';
import Loading from './Loading';

const Results = (props) => {

    const loading = props.loading;
    const results = props.data;
    let jpgs;
    let title = props.title;
    // let props = props.length;


    if (results.length > 0) {
        jpgs = results.map(jpg => <Jpg url={`https://farm${ jpg.farm }.staticflickr.com/${ jpg.server }/${ jpg.id }_${ jpg.secret }.jpg`} key={jpg.id} />);
    }

    if (loading) {
        return (
            < div className="photo-container" >
                <Loading />
            </div>
        )
    } else if (results.length) {
        return (
            < div className="photo-container" >
                <h2>{title}</h2>

                <ul>
                    {jpgs}
                </ul>
            </div >
        )
    } else {
        return (
            < div className="photo-container" >
                <NoJpgs searchTerm={props.searchTerm} />
            </div>
        )
    }

}

export default Results;