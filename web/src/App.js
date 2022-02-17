import DashboardView from './views/DashboardView'
import NewUser from './views/NewUser'

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

function App() {
    return (
        <>
            <Router>
                <Routes>
                    <Route exact path="/" element={<DashboardView />} />
                    <Route exact path="/newuser" element={<NewUser />} />
                </Routes>
            </Router>
        </>
    )
}

export default App
