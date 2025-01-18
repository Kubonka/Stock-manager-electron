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
import Statistics from './routes/Statistics'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <div className="box-border w-screen h-screen bg-background relative flex flex-col p-2  overflow-hidden">
      <HashRouter>
        <Toaster />
        <Menu />
        <Routes>
          <Route path="/" element={<Sales />} />
          <Route path="/sale-inspector" element={<SaleInspector />} />
          <Route path="/stock" element={<Stock />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/statistics" element={<Statistics />} />
          <Route path="/developer" element={<Developer />} />
        </Routes>
      </HashRouter>
    </div>
  </React.StrictMode>
)

//todo calcular el alto de la ventana y en base a eso decidir cuantos elementos se muestran en la tabla de stock
