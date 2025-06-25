import { TbArrowBigUpFilled } from "react-icons/tb";
import { useRef, useEffect } from "react";

export default function UpButton() {
    const wrapperRef = useRef<HTMLDivElement>(null);
    const intervalRef = useRef<NodeJS.Timeout | null>(null);

    const createSnowflake = () => {
        if (!wrapperRef.current) return;

        const wrapper = wrapperRef.current;
        const flake = document.createElement("div");
        flake.className = "snowflake";
        flake.style.left = Math.random() * 100 + "%";
        flake.style.animationDuration = (1 + Math.random() * 0.1) + "s";
        flake.style.opacity = Math.random().toString();
        wrapper.appendChild(flake);

        setTimeout(() => flake.remove(), 5000);
    };

    const handleMouseEnter = () => {
        if (!intervalRef.current) {
            intervalRef.current = setInterval(createSnowflake, 20);
        }
    };

    const handleMouseLeave = () => {
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
        }
    };

    useEffect(() => {
        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
        };
    }, []);

    return (
        <div
            className="icon-snow-wrapper"
            ref={wrapperRef}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <TbArrowBigUpFilled className="icon-main" />
        </div>
    );
}