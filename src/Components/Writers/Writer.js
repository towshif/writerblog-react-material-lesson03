import React, { Fragment } from 'react'
import { Route, Link } from 'react-router-dom'
import { NotFound } from '../Errors'
import Text from './Texts'

export default ({ match: { url }, name, born, deceased, image, description, texts }) =>
    // console.log(props) ||
    console.log(name, born, deceased, image, description) ||
    <Fragment>
        <div>

            <img src={image} alt={name} style={{ maxWidth: 200 }} />

            <h1>{name}</h1>

            <h3>{born} &mdash; {deceased} </h3>

            <p>{description}</p>

            <ul>
                {texts.map(({ id, title }) =>
                    <li key={id}>
                        <Link to={`${url}/texts/${id}`}>
                            {title}
                        </Link>
                    </li>
                )}
            </ul>
        </div>
        <Route path={`${url}/texts/:textId`} render={

            props => {

                // const text = texts.find(text => text.id === props.match.params.textId)

                const text = texts.find(({ id }) => id === props.match.params.textId)

                console.log('this writer: ', text)
                if (!text)
                    return <NotFound />
                // return <h3> {text.id}, {text.description}. {text.title} </h3>
                return <Text {...props} {...text} />
            }
        } />


    </Fragment>