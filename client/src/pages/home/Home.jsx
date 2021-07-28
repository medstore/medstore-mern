import './home.css'

export default function Home() {
    return (
        <div className="home">
            <div className="homeWrapper">
                <div className="homeLeft">
                    <div className="leftWrapper">
                        <div className="inputItem">
                            <i class="fas fa-search"></i>
                            <input className="inputProduct" placeholder="Search products here..." />
                        </div>
                    </div>
                </div>
                <div className="homeRight"></div>
            </div>
        </div>
    )
}