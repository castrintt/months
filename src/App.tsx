import React, { useState, useEffect, useCallback } from 'react';
import './App.css';
import Book from './Book';

// Importando as imagens da pasta assets
import img1 from './assets/1.jpg';
import img2 from './assets/2.jpg';
import img3 from './assets/3.jpg';
import img4 from './assets/4.jpg';
import img5 from './assets/5.jpg';
import img6 from './assets/6.jpg';
import img7 from './assets/7.jpg';
import img8 from './assets/8.jpg';
import img9 from './assets/9.jpg';
import img10 from './assets/10.jpg';

function App() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [hearts, setHearts] = useState<{ id: number; left: number; duration: number; scale: number }[]>([]);
  const [showBook, setShowBook] = useState(false);

  // Array de slides com as imagens importadas
  const slides = [
    { id: 1, content: <img src={img1} alt="Nós 1" /> },
    { id: 2, content: <img src={img2} alt="Nós 2" /> },
    { id: 3, content: <img src={img3} alt="Nós 3" /> },
    { id: 4, content: <img src={img4} alt="Nós 4" /> },
    { id: 5, content: <img src={img5} alt="Nós 5" /> },
    { id: 6, content: <img src={img6} alt="Nós 6" /> },
    { id: 7, content: <img src={img7} alt="Nós 7" /> },
    { id: 8, content: <img src={img8} alt="Nós 8" /> },
    { id: 9, content: <img src={img9} alt="Nós 9" /> },
    { id: 10, content: <img src={img10} alt="Nós 10" /> },
  ];

  const totalSlides = slides.length;

  const moveSlide = useCallback((direction: number) => {
    setCurrentSlide((prev) => (prev + direction + totalSlides) % totalSlides);
  }, [totalSlides]);

  // Auto play carousel
  useEffect(() => {
    if (showBook) return; // Stop carousel if book is showing
    const interval = setInterval(() => {
      moveSlide(1);
    }, 3000);
    return () => clearInterval(interval);
  }, [showBook, moveSlide]);

  // Generate Floating Hearts
  useEffect(() => {
    if (showBook) return; // Stop hearts if book is showing (optional, maybe keep them?)
    
    const createHeart = () => {
      const newHeart = {
        id: Date.now(),
        left: Math.random() * 100,
        duration: Math.random() * 3 + 7,
        scale: Math.random() * 0.5 + 0.5,
      };
      setHearts((prev) => [...prev, newHeart]);

      setTimeout(() => {
        setHearts((prev) => prev.filter((h) => h.id !== newHeart.id));
      }, 10000);
    };

    const heartInterval = setInterval(createHeart, 300);
    return () => clearInterval(heartInterval);
  }, [showBook]);

  if (showBook) {
    return <Book />;
  }

  return (
    <div className="App">
      <div className="hearts">
        {hearts.map((heart) => (
          <div
            key={heart.id}
            className="heart"
            style={{
              left: `${heart.left}vw`,
              animationDuration: `${heart.duration}s`,
              transform: `rotate(45deg) scale(${heart.scale})`,
            }}
          />
        ))}
      </div>

      <div className="container">
        <h1>Feliz 6 Meses! ❤️</h1>
        <p>Cada momento ao seu lado é um presente. Te amo!</p>

        <div className="carousel">
          <div
            className="carousel-inner"
            style={{ transform: `translateX(-${currentSlide * 100}%)` }}
          >
            {slides.map((slide) => (
              <div key={slide.id} className="carousel-item">
                {slide.content}
              </div>
            ))}
          </div>
          <button className="carousel-control prev" onClick={() => moveSlide(-1)}>&#10094;</button>
          <button className="carousel-control next" onClick={() => moveSlide(1)}>&#10095;</button>
        </div>

        <button className="btn-love" onClick={() => setShowBook(true)}>
          Nossa história juntos
        </button>
      </div>
    </div>
  );
}

export default App;
