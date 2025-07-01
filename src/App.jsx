import { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import './App.css'
import HomePage from './components/HomePage'
import ArticlesList from './components/article components/ArticlesList'
import ArticlePage from './components/article components/ArticlePage'
import Header from './components/Header'
import TopicPage from './components/TopicPage'
import NotFoundPage from './components/NotFoundPage'
import PostArticle from './components/article components/PostArticle'
import DevLogin from './components/Login'
import Profile from './components/Profile'

function App() {
  const [articles, setArticles] = useState([]);

  return (
    <>
      <Header />
      <Routes>
        <Route path='*' element={<NotFoundPage />} />
        <Route path='/' element={<HomePage />} />
        <Route path='/articles' element={<ArticlesList articles={articles} setArticles={setArticles} />} />
        <Route path='/articles/:article_id' element={<ArticlePage />} />
        <Route path='/topics/:topic' element={<TopicPage articles={articles} setArticles={setArticles} />} />
        <Route path='/articles/post' element={<PostArticle />} />
        <Route path='/dev-login' element={<DevLogin />} />
        <Route path='/profile' element={<Profile />} />
      </Routes>
    </>
  )
}

export default App
