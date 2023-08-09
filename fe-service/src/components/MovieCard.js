import React from "react";
import {Card} from "react-bootstrap";
import {LazyLoadImage} from "react-lazy-load-image-component";
import {IMAGE_UNAVAILABLE_PLACEHOLDER} from "../constants";
import {useNavigate} from "react-router-dom";
import {motion} from "framer-motion";


export const MovieCard = ({movie}) => {
    const navigate = useNavigate();

    return (
        <motion.div
            initial={{scale: 0, opacity: 0}}
            animate={{opacity: 1, scale: 1}}
            transition={{
                type: "spring",
                stiffness: 260,
                damping: 40,
            }}

        >
            <Card
                style={{
                    width: "100%",
                    background: "#161616",
                    color: "white",
                    borderRadius: 6,
                    position: "relative",
                }}
                className=" movie-card"
            >
                <Card.Body>
                    <LazyLoadImage
                        src={movie.images.length ? movie.images[0].url : IMAGE_UNAVAILABLE_PLACEHOLDER}
                        width={"100%"}
                        height={350}
                        alt="movie"
                        effect="blur"
                        style={{objectFit: "cover"}}
                    />
                    <Card.Title
                        onClick={() => navigate(`/edit/${movie.id}`)}
                        className="text-center mt-3"
                        style={{cursor: "pointer"}}
                    >
                        {movie.name || movie.title}
                    </Card.Title>
                </Card.Body>
            </Card>
        </motion.div>
    );
};
