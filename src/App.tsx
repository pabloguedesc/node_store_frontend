import "./index.css"
import { AppRoutes } from "./routes/Routes"
import { Toaster } from 'react-hot-toast'
function App() {
  return (
    <div>
      <AppRoutes />
      <Toaster />
    </div>
  )
}

export default App
