import { createRoot } from 'react-dom/client'
import Mainpage from './components/Mainpage.tsx'
import { BrowserRouter,Routes,Route } from 'react-router-dom'
createRoot(document.getElementById('root')!).render(
    <BrowserRouter>
        <Routes>
            <Route path='/' element={<Mainpage/>}></Route>
        </Routes>
    </BrowserRouter>
)
