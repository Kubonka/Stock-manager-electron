import './assets/main.css'
import React from 'react'
import ReactDOM from 'react-dom/client'
//import { Router, Routes ,R} from './routes'
import Menu from './components/menu/Menu'
import { Routes, Route, HashRouter } from 'react-router-dom'
import Sales from './routes/Sales'
import Stock from './routes/Stock'
import Categories from './routes/Categories'
import { Toaster } from './components/ui/toaster'
import Developer from './routes/Developer'
import SaleInspector from './routes/SaleInspector'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <div className="box-border w-screen h-screen bg-slate-300 relative flex flex-col">
      <HashRouter>
        <Toaster />
        <Menu />
        <Routes>
          <Route path="/" element={<Sales />} />
          <Route path="/sale-inspector" element={<SaleInspector />} />
          <Route path="/stock" element={<Stock />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/developer" element={<Developer />} />
        </Routes>
      </HashRouter>
    </div>
  </React.StrictMode>
)
