import { createHashRouter } from "react-router-dom"
import Home from "./pages/Home"
import Detection from "./pages/Detection"
const router = createHashRouter([
    {
        path: "",
        element: <Home />,
    },
    {
        path: "/Detection",
        element: <Detection />,
    }
])
export default router