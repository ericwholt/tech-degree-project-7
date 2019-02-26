import React from 'react';
import { Consumer } from './Context';

// Component Imports
import Jpg from './Jpg';
import NoJpgs from './NoJpgs';
import Loading from './Loading';

const Results = (props) => {
    return (
        <Consumer>
            {
                context => {
                    const results = context.data;
                    let jpgs;
                    let title = context.searchTerm;

                    if (results.length > 0) {
                        jpgs = results.map(jpg => <Jpg url={`https://farm${ jpg.farm }.staticflickr.com/${ jpg.server }/${ jpg.id }_${ jpg.secret }.jpg`} key={jpg.id} />);
                    }

                    if (context.loading) {
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
                    } else if (props.fromSearch) {
                        return (
                            < div className="photo-container" >
                                <h3>Woah there I am not sure what you want to see. Search or choose a link!</h3>
                            </div>
                        )
                    } else {
                        return (
                            < div className="photo-container" >
                                <NoJpgs />
                            </div>
                        )
                    }
                }
            }
        </Consumer>
    )
}

export default Results;