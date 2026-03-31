import { useEffect, useState } from "react";
import './CategoryFilter.css';

function CategoryFilter ()
{
    const [categories, setCategories] = useState<string[]>([]);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await fetch(
                    'https://localhost:5000/Water/GetProjectTypes'
                );
            const data = await response.json();
            setCategories(data);
            } catch (error) {
                console.error('Error fetching categories', error);
            }
        }

        fetchCategories();
    }, []);

    return (
        <div className="category-filter">
            <h5>Project Types</h5>
            <div className="category-list">
                {categories.map((c) => (
                    <div key={c} className="category-item">
                    <input type="checkbox" id={c} value={c} className="category-checkbox" />
                    <label htmlFor={c}>{c}</label>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default CategoryFilter;