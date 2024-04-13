import React, { FC } from "react"
import '../styles/loader.style.css'

const Loader: FC = () => {
    return <div className="loader-container">
        <div className="loader"></div>
    </div>
}

export default React.memo(Loader)