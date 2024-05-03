import React, { useRef, useState } from 'react';
import { Link } from "react-router-dom";
import { getUserRole } from "../util/auth";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import classes from "../css/style.css";

import "../css/categorylist.css"; // Importez votre fichier CSS pour les styles personnalisés

function CategoryList({ category }) {
    const userRole = getUserRole();
    const [currentIndex, setCurrentIndex] = useState(0);
    const containerRef = useRef(null);

    const handleNext = () => {
        setCurrentIndex(prevIndex => (prevIndex + 1) % category.length);
    }

    const handlePrevious = () => {
        setCurrentIndex(prevIndex => (prevIndex - 1 + category.length) % category.length);
    }

    return (
        <div className="category-container">
            <h1 style={{ textDecoration: 'underline'}}>Categories List</h1>
            <div className="category-scroll">
                <button className="scroll-button" onClick={handlePrevious}><FontAwesomeIcon icon={faArrowLeft} /></button>
                <div className="category-list" ref={containerRef}>
                    <div key={category[currentIndex].id} className="category-card">
                        <h2>{category[currentIndex].name}</h2>
                        <img src={`data:image/png;base64,${category[currentIndex].image}`} alt={category[currentIndex].name} />
                        {userRole === 'Admin' && (
                            <div className="category-actions">
                                <Link to={`/editcategory/${category[currentIndex].id}`} className="btn btn-primary">Edit</Link>
                                <Link to={`/deletecategory/${category[currentIndex].id}`} className="btn btn-danger">Delete</Link>
                            </div>
                        )}
                    </div>
                </div>
                <button className="scroll-button" onClick={handleNext}><FontAwesomeIcon icon={faArrowRight} /></button>
            </div>
        </div>
    );
}

export default CategoryList;
