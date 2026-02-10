import React from 'react';
import { FaRegTired, FaRegFrown, FaRegMeh, FaRegSmile, FaRegLaughBeam } from 'react-icons/fa';

const RatingInput = ({ value, onChange }) => {
    const ratings = [
        { value: 1, icon: FaRegTired, color: '#ff4d4d', label: '1' },
        { value: 2, icon: FaRegFrown, color: '#ffad33', label: '2' },
        { value: 3, icon: FaRegMeh, color: '#ffd700', label: '3' },
        { value: 4, icon: FaRegSmile, color: '#a3cf62', label: '4' },
        { value: 5, icon: FaRegLaughBeam, color: '#4CAF50', label: '5' },
    ];

    return (
        <div className="options-container">
            {ratings.map((rating) => {
                const Icon = rating.icon;
                const isSelected = value === rating.value;

                return (
                    <div
                        key={rating.value}
                        className="rating-option"
                        onClick={() => onChange(rating.value)}
                    >
                        <div
                            className="rating-circle"
                            style={{
                                backgroundColor: isSelected ? rating.color : 'transparent',
                            }}
                        >
                            <Icon
                                className="face-icon"
                                style={{
                                    color: isSelected ? '#fff' : rating.color,
                                }}
                            />
                        </div>
                        <span className="rating-label" style={{ fontWeight: isSelected ? 'bold' : 'normal' }}>
                            {rating.value}
                        </span>
                    </div>
                );
            })}
        </div>
    );
};

export default RatingInput;
