import React from 'react'
import AddNote from './AddNote';
import Notes from './Notes';

const Home = (props) => {

    return (
        <div>
            <AddNote showAlert={props.showAlert} />
            <Notes showAlert={props.showAlert} search={props.search} />
        </div>
    )
}

export default Home
