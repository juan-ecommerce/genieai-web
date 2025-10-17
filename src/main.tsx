import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './index.css'
import Layout from './components/Layout.tsx'
import Home from './pages/Home.tsx'
import AIAgents from './pages/AIAgents.tsx'
import Automation from './pages/Automation.tsx'
import DataScience from './pages/DataScience.tsx'
import About from './pages/About.tsx'
import RAG from './pages/RAG.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="ai-agents" element={<AIAgents />} />
          <Route path="automation" element={<Automation />} />
          <Route path="data-science" element={<DataScience />} />
          <Route path="about" element={<About />} />
          <Route path="rag" element={<RAG />} />
        </Route>
      </Routes>
    </Router>
  </StrictMode>,
);
