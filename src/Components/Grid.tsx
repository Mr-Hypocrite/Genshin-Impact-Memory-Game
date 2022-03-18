import React from 'react'
import './Grid.css';

export default function Grid(props:any) {
    
    return (
        <div className='grid-comp'>

            <div className='grid'>
                {props.children}
            </div>

        </div>
    )
}
