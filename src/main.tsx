import React from 'react'
import ReactDOM from 'react-dom/client'
import Layout from "@/components/layout"
import DataFetching from '@/components/data'
import './index.css'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <DataFetching>
      <Layout />
    </DataFetching>
  </React.StrictMode>
)
