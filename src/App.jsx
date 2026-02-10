import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import axios from 'axios';
import QuestionCard from './components/QuestionCard';
import './index.css';
import { FaCheckCircle, FaClipboardList } from 'react-icons/fa';

const questions = [
  {
    id: 1,
    text: "¿En qué medida el centro de instrumentación científica cumple con los requisitos acordados para la prestación del servicio (alcance, plazos y condiciones)?",
    type: 'rating',
    minLabel: "No cumple",
    maxLabel: "Cumple totalmente"
  },
  {
    id: 2,
    text: "¿Cómo evalúa la competencia técnica del personal del centro para la operación de los equipos y la interpretación de resultados?",
    type: 'rating',
    minLabel: "Muy baja",
    maxLabel: "Muy alta"
  },
  {
    id: 3,
    text: "¿El centro asegura la confiabilidad y trazabilidad de los resultados entregados, considerando la calibración y el mantenimiento de los equipos?",
    type: 'rating',
    minLabel: "Nunca",
    maxLabel: "Siempre"
  },
  {
    id: 4,
    text: "¿Qué tan eficaz considera la comunicación con el usuario antes, durante y después de la prestación del servicio?",
    type: 'rating',
    minLabel: "Muy ineficaz",
    maxLabel: "Muy eficaz"
  },
  {
    id: 5,
    text: "En términos generales, ¿qué tan satisfecho/a está con la calidad del servicio brindado por el centro de instrumentación científica?",
    type: 'rating',
    minLabel: "Muy insatisfecho/a",
    maxLabel: "Muy satisfecho/a"
  },
  {
    id: 6,
    text: "Si lo desea puede comentar en el siguiente apartado cualquier consideración que nos ayude a mejorar",
    type: 'text'
  }
];

function App() {
  const [currentStep, setCurrentStep] = useState(0); // 0 = Welcome, 1..6 = Questions, 7 = Thank You
  const [answers, setAnswers] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const handleStart = () => setCurrentStep(1);

  const handleAnswer = (val) => {
    setAnswers({ ...answers, [currentStep]: val });
  };

  const handleNext = async () => {
    if (currentStep < questions.length) {
      setCurrentStep(currentStep + 1);
    } else {
      await submitSurvey();
    }
  };

  const handlePrev = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const submitSurvey = async () => {
    setIsSubmitting(true);
    setError(null);
    try {
      // Prepare data for Google Sheet (array of values)
      // Assuming columns are: Timestamp, Q1, Q2, Q3, Q4, Q5, Comments
      const row = [
        new Date().toISOString(),
        answers[1] || '',
        answers[2] || '',
        answers[3] || '',
        answers[4] || '',
        answers[5] || '',
        answers[6] || ''
      ];

      const apiBase = import.meta.env.VITE_API_URL || '';
      let url = '';

      if (apiBase.includes('script.google.com')) {
        url = apiBase;
        // GAS doesn't handle CORS preflight (OPTIONS). 'text/plain' avoids it.
        await axios.post(url, JSON.stringify({ answers: row }), {
          headers: { 'Content-Type': 'text/plain' }
        });
      } else {
        url = apiBase.endsWith('/') ? `${apiBase}api/submit` : `${apiBase}/api/submit`;
        await axios.post(url, { answers: row });
      }
      setCurrentStep(questions.length + 1); // Thank you screen
    } catch (err) {
      console.error(err);
      setError('Hubo un error al enviar. Por favor intenta de nuevo.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const currentQuestion = questions[currentStep - 1];

  // Progress calculation
  const progress = currentStep > 0 && currentStep <= questions.length
    ? ((currentStep - 1) / questions.length) * 100
    : 100;

  return (
    <div className="survey-container">
      {currentStep > 0 && currentStep <= questions.length && (
        <div className="progress-bar">
          <div className="progress-fill" style={{ width: `${progress}%` }}></div>
        </div>
      )}

      <AnimatePresence mode="wait">
        {currentStep === 0 && (
          <div className="welcome-screen" key="welcome">
            <div className="logo-container">
              <img src="logocic.png" alt="CIC Logo" className="logo" />
            </div>
            <h1>Encuesta de Satisfacción</h1>
            <p>Son solo 6 preguntas breves para conocer tu opinión.</p>
            <p style={{ fontSize: '0.9rem', color: '#666' }}>Te tomará menos de 1 minuto.</p>
            <button className="btn btn-primary" onClick={handleStart} style={{ marginTop: '20px' }}>
              Comenzar
            </button>
          </div>
        )}

        {currentStep > 0 && currentStep <= questions.length && (
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }} key={`q-${currentStep}`}>
            <QuestionCard
              question={currentQuestion}
              value={answers[currentStep]}
              onChange={handleAnswer}
            />

            <div className="nav-buttons">
              <button
                className="btn btn-secondary"
                onClick={handlePrev}
                disabled={currentStep === 1}
                style={{ visibility: currentStep === 1 ? 'hidden' : 'visible' }}
              >
                Anterior
              </button>

              <button
                className="btn btn-primary"
                onClick={handleNext}
                disabled={!answers[currentStep] && currentQuestion.type === 'rating'}
              >
                {currentStep === questions.length ? (isSubmitting ? 'Enviando...' : 'Finalizar') : 'Siguiente'}
              </button>
            </div>
            {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}
          </div>
        )}

        {currentStep > questions.length && (
          <div className="thank-you-screen" key="thanks">
            <FaCheckCircle className="big-icon" style={{ color: '#4CAF50' }} />
            <h1>¡Gracias!</h1>
            <p>Tus respuestas han sido registradas.</p>
            <button className="btn btn-secondary" onClick={() => window.location.reload()} style={{ marginTop: '20px' }}>
              Nueva Encuesta
            </button>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
