import '../css/home.css'
import Transition from '../Transition'
import ArtStyle from './ArtStyle';
import { NavLink, Link } from 'react-router-dom';
function Home() {
    return (
        <Transition>
            <div className="home">
                <div className="home-content">
                    <div className="heading">
                        <h3>THIS IS</h3>
                        <h1>INDIA</h1>
                    </div>

                    <NavLink to={"/map"}>
                        <button className="explore-btn">
                            Explore
                        </button>
                    </NavLink>
                </div>
                <div className="green-div"></div>
                <div className="chatbot">
                    <Link to={'/chatbot'}>
                        Chat
                    </Link>
                </div>
            </div>
            <section style={{height:"100vh"}}>
                <ArtStyle/>
            </section>
        </Transition>

    )
}

export default Home;
