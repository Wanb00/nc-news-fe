import { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import './App.css'
import HomePage from './components/HomePage'
import ArticlesList from './components/ArticlesList'
import ArticlePage from './components/ArticlePage'
import Header from './components/Header'

function App() {

  return (
    <>
      <Header />
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/articles' element={<ArticlesList />} />
        <Route path='/articles/:article_id' element={<ArticlePage />} />
      </Routes>
    </>
  )
}

export default App
