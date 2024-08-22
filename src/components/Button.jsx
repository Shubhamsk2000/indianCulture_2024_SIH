import '../css/navigation.css';
import { motion } from 'framer-motion';

export default function Button({ isOpen, setIsOpen}) {
    return (
        <div
            className="menu-btn"
            onClick={() => setIsOpen(!isOpen)}>
            <motion.div
                className="slider"
                animate={{ top: isOpen ? "-100%" : "0" }}
                transition={{ duration: 0.5, type: "tween", ease: [0.76, 0, 0.24, 1]}}
            >
                        <div className="el" >
                            <ButtonText label={"menu"} />
                        </div>
                        <div className="el" >
                            <ButtonText label={"close"} />
                        </div>

            </motion.div>
        </div>
    )
}

function ButtonText({ label }) {
    return (
        <div className="button-text">
            <p>{label}</p>
            <p>{label}</p>
        </div>
    )
}
export {
    ButtonText
}