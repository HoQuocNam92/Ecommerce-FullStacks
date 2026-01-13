import React, { useEffect, useRef, useState } from 'react'

const LazyLoad = ({ src, alt, className }) => {
    const [isVisible, setIsVisible] = useState(false);
    const imgRef = useRef();

    useEffect(() => {

        const observer = new IntersectionObserver((entris, obs) => {
            entris.forEach((entry) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    obs.disconnect();
                }
            })
        }, { rootMargin: "100px" })

        if (imgRef.current) observer.observe(imgRef.current);
        return () => observer.disconnect();
    }, [])
    return (

        <img ref={imgRef}
            src={isVisible ? src : 'loading.jpg'}
            alt={alt}
            className={`${className}  transition-opacity duration-300 ${isVisible ? "opacity-100" : "opacity-0"}`}
        />

    )
}

export default LazyLoad