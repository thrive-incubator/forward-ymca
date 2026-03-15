import { Routes, Route } from 'react-router-dom'
import Layout from '@/components/Layout'
import PrototypeSelector from '@/components/PrototypeSelector'
import Prototype1 from '@/prototype-1/Prototype1'
import Prototype2 from '@/prototype-2/Prototype2'
import Prototype3 from '@/prototype-3/Prototype3'
import Prototype4 from '@/prototype-4/Prototype4'
import Demo from '@/demo/Demo'

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<PrototypeSelector />} />
        <Route path="prototype-1/*" element={<Prototype1 />} />
      </Route>
      <Route path="prototype-2/*" element={<Prototype2 />} />
      <Route path="prototype-3/*" element={<Prototype3 />} />
      <Route path="prototype-4/*" element={<Prototype4 />} />
      <Route path="demo/*" element={<Demo />} />
    </Routes>
  )
}
