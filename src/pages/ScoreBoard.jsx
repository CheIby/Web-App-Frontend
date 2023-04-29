import React, { Fragment } from 'react'
import { Navbar } from '../components/Navbar'
import { ScoreBoardBox } from '../components/ScoreBoardBox'

function ScoreBoard() {
  return (
    <Fragment>
      <Navbar/>
      <div className='h-20'></div>
      <ScoreBoardBox/>
    </Fragment>
    
  )
}

export default ScoreBoard