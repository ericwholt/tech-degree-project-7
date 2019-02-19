import React from 'react';
import Jpg from './Jpg';
import NoJpgs from './NoJpgs';
import Loading from './Loading';

const Results = (props) => {

    const loading = props.loading;
    const results = props.data;
    let jpgs;
    let title = props.title;


    if (results.length > 0) {
        jpgs = results.map(jpg => <Jpg url={`https://farm${ jpg.farm }.staticflickr.com/${ jpg.server }/${ jpg.id }_${ jpg.secret }.jpg`} key={jpg.id} />);
    }

    return (
        < div className="photo-container" >

            {loading &&
                <Loading />
            }
            {!loading
                && (results.length > 0)
                && <h2>{title}</h2>
                &&
                <ul>
                    {jpgs}
                </ul>
            }
            {!loading
                && (results.length === 0)
                && <NoJpgs />
            }
        </div >
    );
}

export default Results;