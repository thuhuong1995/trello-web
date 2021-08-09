import React from 'react'
import 'App.scss'

//  custom component
import Header from 'components/Header/Header'
import BoardBar from 'components/BoardBar/BoardBar'
import BoardContent from 'components/BoardContent/BoardContent'

function App() {
  return (
    <div className="trello">
      {/*  header */}
      <Header />
      {/* bar */}
      <BoardBar />
      {/* content */}
      <BoardContent />
    </div >
  )
}

export default App
