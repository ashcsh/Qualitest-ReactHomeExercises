import { useState, useEffect, FC } from "react"
import { UserCard } from "../UserCard/UserCard"
import { Button } from "../Button/Button"
import { UserData } from "../../interfaces/Interfaces"

interface Props {
    users: UserData
}
export const Slideshow: FC<Props> = ({ users }) => {
    const [currentSlide, setCurrentSlide] = useState(0)
    const [play, setPlay] = useState(false)

    useEffect(() => {
        let timer: number | undefined;
        if (play && users.data.length > 0) {
            timer = window.setInterval(() => {
                setCurrentSlide((prevState) => (prevState + 1) % users.data.length)
            }, 2000)
        }
        return () => {
            if (timer !== undefined) {
                clearInterval(timer)
            }
        }
    }, [play, users])

    const startSlideshow = () => {
        setPlay(true)
    }
    const stopSlideshow = () => {
        setPlay(false)
    }

    return (
        <div id="slideshow-container">
            <div id="slideshow-card-container">
                {users.data.length > 0 && (
                    <div id="user-card" 
                    style={{ backgroundColor: `${users.data[currentSlide].gender === "male" ? "#6ca0dc" : "#ff00ff"}` }}
                    >
                        <UserCard user={users.data[currentSlide]} />
                    </div>
                )}
            </div>
            <div style={{marginTop:"50px"}}>
                {!play && (
                    <Button ariaLabel="Start Slideshow" variant="primary" onClick={startSlideshow}>Start</Button>
                )}
                {play && (
                    <Button ariaLabel="Stop Slideshow" variant="secondary" onClick={stopSlideshow}>Stop</Button>
                )}
            </div>

        </div>
    )
}
