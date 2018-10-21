import React, { Fragment } from 'react'
import { Route, Link } from 'react-router-dom'
import Writer from './Writer'
import { NotFound } from '../Errors'

export default ({ match: { url }, writers }) =>
    // console.log (props) || 
    <Fragment>
        <ul>
            {writers.map(({ id, name }) =>
                <li key={id}>
                    <Link to={`${url}/${id}`}>{name}</Link>
                </li>
            )}
        </ul>


        <Route exact path={url} render={() => <h3> Please select a writer </h3>} />

        <Route path={`${url}/:writerId`} render={

            props => {

                const writer = writers.find(writer => writer.id === props.match.params.writerId)
                console.log('this writer: ', writer)
                if (!writer)
                    return <NotFound />

                return <Writer {...props} {...writer} />

            }
        } />
    </Fragment>