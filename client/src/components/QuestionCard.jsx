import React from 'react';
import { motion } from 'framer-motion';
import RatingInput from './RatingInput';

const QuestionCard = ({ question, value, onChange, onNext, onPrev, isFirst, isLast, isValid }) => {
    return (
        <motion.div
            className="question-card"
            initial={{ x: 300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -300, opacity: 0 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
        >
            <div className="question-text">
                {question.text}
            </div>

            <div className="answer-area">
                {question.type === 'rating' ? (
                    <RatingInput value={value} onChange={onChange} />
                ) : (
                    <textarea
                        className="text-input"
                        value={value || ''}
                        onChange={(e) => onChange(e.target.value)}
                        placeholder="Escribe tu comentario aquí..."
                    />
                )}
            </div>

            <div className="question-labels" style={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px', fontSize: '0.8rem', color: '#888' }}>
                {question.type === 'rating' && (
                    <>
                        <span>{question.minLabel}</span>
                        <span>{question.maxLabel}</span>
                    </>
                )}
            </div>
        </motion.div>
    );
};

export default QuestionCard;
