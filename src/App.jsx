import { useState } from 'react'
import './App.css'
import HomePage from './components/HomePage'
import { Route, Routes } from 'react-router-dom'
import ArticlesList from './components/ArticlesList'

function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/articles' element={<ArticlesList />} />
      </Routes>
    </>
  )
}

export default App
