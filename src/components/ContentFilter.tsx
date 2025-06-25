import React from 'react'
import Filter from './Filter';

interface FilterElements {
    [key: string]: boolean;
}

export default function ContentFilter() {
    const [elements, setElements] = React.useState<FilterElements>({
        "Интересные": false,
        "Популярные": false,
        "За неделю": false,
        "За месяц": false,
        "Алгоритм": false,
        "Технология": false,
        "Развития": false,
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, checked } = e.target;
        setElements(prev => ({ ...prev, [name]: checked }));
    }

    return (
        <div className={'ContentFilter'}>
            <ul className={'filter-list'}>
                {Object.keys(elements).map((filter) => (
                    <Filter
                        key={filter}
                        filter={filter}
                        checked={elements[filter]}
                        onChange={handleChange}
                    />
                ))}
            </ul>
            <input className={"filter-search"} placeholder="найти..."/>
        </div>
    )
}