import { useState, useEffect } from 'react';
import { IoIosAddCircle, IoIosFunnel } from "react-icons/io";
import { FaSearch } from "react-icons/fa";
import Filter from './Filter';
import "../Styles/FooterStyle.css";

export default function MobileFooter() {
    const [visible, setVisible] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);
    const [showFilters, setShowFilters] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;

            if (currentScrollY > lastScrollY) {
                setVisible(false);
            } else if (currentScrollY < lastScrollY && currentScrollY > 100) {
                setVisible(true);
            }

            setLastScrollY(currentScrollY);
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, [lastScrollY]);

    return (
        <>
            <div className={`MobileFooter ${visible ? 'visible' : 'hidden'}`}>
                <button className="mobile-footer-btn filter-btn" onClick={() => setShowFilters(!showFilters)}>
                    <IoIosFunnel />
                    <span>Фильтры</span>
                </button>

                <button className="mobile-footer-btn">
                    <FaSearch />
                    <span>Поиск</span>
                </button>

                <button className="mobile-footer-btn add-btn">
                    <IoIosAddCircle />
                    <span>Добавить</span>
                </button>
            </div>

            <div className={`creat-task-btn ${visible ? 'hidden' : 'visible'}`}>
                    <IoIosAddCircle/>
            </div>


            {showFilters && (
                <div className="mobile-filters-overlay">
                    <div className="mobile-filters-content">
                        <Filter filter="Интересные"/>
                        <Filter filter="Популярные"/>
                        <Filter filter="За неделю"/>
                        <Filter filter="За месяц"/>
                        <Filter filter="Алгоритм"/>
                        <Filter filter="Технология"/>
                        <Filter filter="Развития"/>
                        <button
                            className="close-filters-btn"
                            onClick={() => setShowFilters(false)}
                        >
                            Закрыть
                        </button>
                    </div>
                </div>
            )}
        </>
    );
}