import { ArrowUp } from "lucide-react";
import React, { useState, useEffect } from "react";

const ScrollToTop: React.FC = () => {
    const [isVisible, setIsVisible] = useState<boolean>(false);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    const handleScroll = () => {
        if (window.scrollY > 400) {
            setIsVisible(true);
        } else {
            setIsVisible(false);
        }
    };

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    return (
        isVisible && (
            <button
                onClick={scrollToTop}
                className="fixed bottom-14 right-7 z-40 rounded bg-yellow-400 p-1 text-white transition hover:bg-yellow-500 xl:bottom-24 xl:right-10 xl:p-2 xl:px-3 "
            >
                <ArrowUp />
            </button>
        )
    );
};

export default ScrollToTop;
