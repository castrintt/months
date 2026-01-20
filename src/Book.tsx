import React, { useState, useEffect, useRef } from 'react';
import './App.css';

// Conteúdo das páginas
const pagesContent = [
  {
    id: 1,
    text: "Era uma vez, em um reino Tão Tão Distante... Um nobre Príncipe e uma bela Princesa que, por ventura do destino, cruzaram seus caminhos através de um joguinho bobo e encantado. Ali, uma grande amizade floresceu nos jardins de seus corações, aguardando ansiosamente o momento de seu primeiro encontro real.",
    draw: (ctx: CanvasRenderingContext2D, width: number, height: number, frame: number) => {
      // Fundo
      ctx.fillStyle = "#87CEEB"; // Céu azul
      ctx.fillRect(0, 0, width, height);
      
      // Grama
      ctx.fillStyle = "#228B22";
      ctx.fillRect(0, height * 0.7, width, height * 0.3);

      // Castelo simples
      ctx.fillStyle = "#C0C0C0";
      ctx.fillRect(width * 0.6, height * 0.4, width * 0.3, height * 0.3);
      ctx.beginPath();
      ctx.moveTo(width * 0.6, height * 0.4);
      ctx.lineTo(width * 0.75, height * 0.2);
      ctx.lineTo(width * 0.9, height * 0.4);
      ctx.fillStyle = "#FF0000";
      ctx.fill();

      // Animação: Bonecos se aproximando (Mais devagar)
      const offset = Math.sin(frame * 0.02) * 10;

      // Príncipe e Princesa (bonecos palito estilizados)
      ctx.strokeStyle = "#000";
      ctx.lineWidth = 3;
      
      // Príncipe
      ctx.beginPath();
      ctx.arc(width * 0.3 + offset, height * 0.6, 20, 0, Math.PI * 2); // Cabeça
      ctx.moveTo(width * 0.3 + offset, height * 0.6 + 20);
      ctx.lineTo(width * 0.3 + offset, height * 0.8); // Corpo
      ctx.moveTo(width * 0.3 + offset, height * 0.7);
      ctx.lineTo(width * 0.25 + offset, height * 0.75); // Braço
      ctx.moveTo(width * 0.3 + offset, height * 0.7);
      ctx.lineTo(width * 0.35 + offset, height * 0.75); // Braço
      ctx.moveTo(width * 0.3 + offset, height * 0.8);
      ctx.lineTo(width * 0.25 + offset, height * 0.9); // Perna
      ctx.moveTo(width * 0.3 + offset, height * 0.8);
      ctx.lineTo(width * 0.35 + offset, height * 0.9); // Perna
      ctx.stroke();
      // Coroa
      ctx.fillStyle = "gold";
      ctx.beginPath();
      ctx.moveTo(width * 0.28 + offset, height * 0.58);
      ctx.lineTo(width * 0.3 + offset, height * 0.55);
      ctx.lineTo(width * 0.32 + offset, height * 0.58);
      ctx.fill();

      // Princesa
      ctx.beginPath();
      ctx.arc(width * 0.45 - offset, height * 0.6, 20, 0, Math.PI * 2); // Cabeça
      ctx.moveTo(width * 0.45 - offset, height * 0.6 + 20);
      ctx.lineTo(width * 0.45 - offset, height * 0.8); // Corpo
      ctx.moveTo(width * 0.45 - offset, height * 0.8);
      ctx.lineTo(width * 0.4 - offset, height * 0.9); // Perna
      ctx.moveTo(width * 0.45 - offset, height * 0.8);
      ctx.lineTo(width * 0.5 - offset, height * 0.9); // Perna
      ctx.stroke();
      // Vestido
      ctx.fillStyle = "pink";
      ctx.beginPath();
      ctx.moveTo(width * 0.45 - offset, height * 0.65);
      ctx.lineTo(width * 0.4 - offset, height * 0.85);
      ctx.lineTo(width * 0.5 - offset, height * 0.85);
      ctx.fill();
    }
  },
  {
    id: 2,
    text: "Desde o instante em que seus olhos se encontraram pela primeira vez e caminharam juntos sob o sol, a Princesa tornou-se, sem sombra de dúvidas, uma das figuras mais preciosas em toda a existência do Príncipe.",
    draw: (ctx: CanvasRenderingContext2D, width: number, height: number, frame: number) => {
      // Sol radiante pulsando (Mais devagar)
      const sunScale = 1 + Math.sin(frame * 0.02) * 0.1;
      
      ctx.fillStyle = "#FFD700";
      ctx.beginPath();
      ctx.arc(width * 0.8, height * 0.2, 40 * sunScale, 0, Math.PI * 2);
      ctx.fill();

      // Caminho
      ctx.fillStyle = "#DEB887";
      ctx.beginPath();
      ctx.moveTo(width * 0.2, height);
      ctx.lineTo(width * 0.8, height);
      ctx.lineTo(width * 0.6, height * 0.6);
      ctx.lineTo(width * 0.4, height * 0.6);
      ctx.fill();

      // Corações flutuando (Mais devagar)
      const heartY = Math.sin(frame * 0.04) * 10;
      ctx.fillStyle = "red";
      ctx.font = "30px Arial";
      ctx.fillText("❤️", width * 0.45, height * 0.4 + heartY);
      ctx.fillText("❤️", width * 0.55, height * 0.35 - heartY);
    }
  },
  {
    id: 3,
    text: "Houve encontros e desencontros em suas jornadas. E, em um desses fatídicos momentos, uma sombra pairou sobre o reino: o Príncipe, em seu tormento, temeu jamais vislumbrar a face da Princesa novamente. De todos os erros cometidos em sua vida, aquele parecia o mais terrível fardo, pois ameaçava impedi-lo de estar ao lado daquela que se revelaria o grande amor de sua vida.",
    draw: (ctx: CanvasRenderingContext2D, width: number, height: number, frame: number) => {
      // Fundo cinza/triste
      ctx.fillStyle = "#708090";
      ctx.fillRect(0, 0, width, height);

      // Nuvem escura movendo (Mais devagar)
      const cloudX = Math.sin(frame * 0.01) * 20;
      ctx.fillStyle = "#2F4F4F";
      ctx.beginPath();
      ctx.arc(width * 0.5 + cloudX, height * 0.2, 60, 0, Math.PI * 2);
      ctx.arc(width * 0.6 + cloudX, height * 0.25, 50, 0, Math.PI * 2);
      ctx.arc(width * 0.4 + cloudX, height * 0.25, 50, 0, Math.PI * 2);
      ctx.fill();

      // Chuva caindo (Mais devagar)
      ctx.strokeStyle = "#ADD8E6";
      ctx.lineWidth = 2;
      const rainOffset = (frame * 2) % 20;
      for(let i=0; i<20; i++) {
        const x = (i * 30) % width;
        const y = (Math.random() * height * 0.5 + height * 0.3 + rainOffset) % (height * 0.8);
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(x - 5, y + 10);
        ctx.stroke();
      }

      // Príncipe triste
      ctx.strokeStyle = "#000";
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.arc(width * 0.5, height * 0.7, 20, 0, Math.PI * 2);
      ctx.stroke();
      // Boca triste
      ctx.beginPath();
      ctx.arc(width * 0.5, height * 0.75, 10, Math.PI, 0);
      ctx.stroke();
    }
  },
  {
    id: 4,
    text: "Invernos e verões se passaram, até que a escolha mais curiosa e trivial que o destino poderia oferecer guiou o Príncipe de volta à sua amada: o uso de um pergaminho mágico conhecido como... Tinder. Desde o momento em que a reviu, uma única certeza foi cravada na alma do Príncipe: ele, de forma alguma, permitiria que a Princesa escapasse de suas mãos outra vez.",
    draw: (ctx: CanvasRenderingContext2D, width: number, height: number, frame: number) => {
      // Fundo
      ctx.fillStyle = "#FFE4E1";
      ctx.fillRect(0, 0, width, height);

      // Celular / Pergaminho
      ctx.fillStyle = "#333";
      ctx.fillRect(width * 0.3, height * 0.2, width * 0.4, height * 0.6);
      ctx.fillStyle = "#FFF";
      ctx.fillRect(width * 0.32, height * 0.22, width * 0.36, height * 0.5);

      // Logo Tinder (fogo simplificado) pulsando (Mais devagar)
      const scale = 1 + Math.sin(frame * 0.04) * 0.1;
      ctx.fillStyle = "#FF4500";
      ctx.beginPath();
      ctx.arc(width * 0.5, height * 0.45, 30 * scale, 0, Math.PI * 2);
      ctx.fill();
      
      // Texto "Match!" piscando (Mais devagar)
      if (Math.floor(frame / 60) % 2 === 0) {
        ctx.fillStyle = "#000";
        ctx.font = "20px Arial";
        ctx.fillText("It's a Match!", width * 0.35, height * 0.6);
      }
    }
  },
  {
    id: 5,
    text: "E vejam só onde o destino os trouxe agora: celebrando seis luas cheias — seis meses — desde o verdadeiro início de sua grandiosa lenda juntos.",
    draw: (ctx: CanvasRenderingContext2D, width: number, height: number, frame: number) => {
      // Céu noturno
      ctx.fillStyle = "#191970";
      ctx.fillRect(0, 0, width, height);

      // Lua cheia brilhando (Mais devagar)
      const glow = 40 + Math.sin(frame * 0.02) * 5;
      ctx.fillStyle = "#FFFACD";
      ctx.beginPath();
      ctx.arc(width * 0.8, height * 0.2, glow, 0, Math.PI * 2);
      ctx.fill();

      // Estrelas cintilando (Mais devagar)
      ctx.fillStyle = "#FFF";
      for(let i=0; i<30; i++) {
        const alpha = Math.abs(Math.sin(frame * 0.02 + i));
        ctx.globalAlpha = alpha;
        ctx.beginPath();
        const x = (i * 123) % width;
        const y = (i * 456) % height;
        ctx.arc(x, y, 2, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1.0;

      // Texto 6 Meses
      ctx.fillStyle = "#FFF";
      ctx.font = "bold 40px Arial";
      ctx.textAlign = "center";
      ctx.fillText("6 Meses", width * 0.5, height * 0.6);
    }
  },
  {
    id: 6,
    text: "O coração do Príncipe transborda de gratidão por ter a Princesa ao seu lado. Ele é grato por sua infinita paciência, por cada chamada de atenção real, por cada risada que ecoa no castelo e por cada precioso momento que compartilham em união.",
    draw: (ctx: CanvasRenderingContext2D, width: number, height: number, frame: number) => {
      // Coração gigante batendo (Mais devagar)
      const beat = 1 + Math.sin(frame * 0.05) * 0.1;
      
      ctx.save();
      ctx.translate(width * 0.5, height * 0.4);
      ctx.scale(beat, beat);
      ctx.translate(-width * 0.5, -height * 0.4);

      ctx.fillStyle = "#FF69B4";
      ctx.beginPath();
      ctx.moveTo(width * 0.5, height * 0.3);
      ctx.bezierCurveTo(width * 0.5, height * 0.25, width * 0.4, height * 0.2, width * 0.3, height * 0.3);
      ctx.bezierCurveTo(width * 0.1, height * 0.5, width * 0.5, height * 0.8, width * 0.5, height * 0.8);
      ctx.bezierCurveTo(width * 0.5, height * 0.8, width * 0.9, height * 0.5, width * 0.7, height * 0.3);
      ctx.bezierCurveTo(width * 0.6, height * 0.2, width * 0.5, height * 0.25, width * 0.5, height * 0.3);
      ctx.fill();
      ctx.restore();

      // Notas musicais (risadas) subindo (Mais devagar)
      const noteY = (frame * 0.8) % 50;
      ctx.fillStyle = "#000";
      ctx.font = "30px Arial";
      ctx.fillText("♫", width * 0.2, height * 0.2 - noteY + 20);
      ctx.fillText("♪", width * 0.8, height * 0.3 - noteY + 20);
    }
  },
  {
    id: 7,
    text: "E que este capítulo seja apenas o prelúdio de uma longa, majestosa e linda história...",
    draw: (ctx: CanvasRenderingContext2D, width: number, height: number, frame: number) => {
      // Estrada infinita
      ctx.fillStyle = "#87CEEB";
      ctx.fillRect(0, 0, width, height * 0.5);
      ctx.fillStyle = "#228B22";
      ctx.fillRect(0, height * 0.5, width, height * 0.5);

      ctx.fillStyle = "#DEB887";
      ctx.beginPath();
      ctx.moveTo(width * 0.45, height * 0.5);
      ctx.lineTo(width * 0.55, height * 0.5);
      ctx.lineTo(width * 0.8, height);
      ctx.lineTo(width * 0.2, height);
      ctx.fill();

      // Sol no horizonte subindo (Mais devagar)
      const sunY = height * 0.5 - Math.min(frame * 0.05, 50);
      ctx.fillStyle = "#FFA500";
      ctx.beginPath();
      ctx.arc(width * 0.5, sunY, 30, Math.PI, 0);
      ctx.fill();
    }
  },
  {
    id: 8,
    text: "Continua...",
    draw: (ctx: CanvasRenderingContext2D, width: number, height: number, frame: number) => {
      // Texto Continua
      ctx.fillStyle = "#000";
      ctx.font = "bold 30px Arial";
      ctx.textAlign = "center";
      ctx.fillText("Continua...", width * 0.5, height * 0.5);
      
      // Reticências animadas (Mais devagar)
      const dots = ".".repeat(Math.floor(frame / 40) % 4);
      ctx.fillText(dots, width * 0.5, height * 0.6);
    }
  }
];

const Book: React.FC = () => {
  const [currentSheet, setCurrentSheet] = useState(0);
  const totalSheets = pagesContent.length + 1;
  const isScrolling = useRef(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const handleScroll = (e: WheelEvent) => {
      if (isScrolling.current) return;

      if (e.deltaY > 0) {
        if (currentSheet < totalSheets) {
          isScrolling.current = true;
          setCurrentSheet((prev) => prev + 1);
          setTimeout(() => { isScrolling.current = false; }, 1000);
        }
      } else {
        if (currentSheet > 0) {
          isScrolling.current = true;
          setCurrentSheet((prev) => prev - 1);
          setTimeout(() => { isScrolling.current = false; }, 1000);
        }
      }
    };

    window.addEventListener('wheel', handleScroll);
    return () => window.removeEventListener('wheel', handleScroll);
  }, [currentSheet, totalSheets]);

  useEffect(() => {
    const audio = new Audio("/music/cant_help_falling_in_love.mp3");
    audio.loop = true;
    audio.volume = 0.3;
    
    const playPromise = audio.play();
    if (playPromise !== undefined) {
      playPromise.catch(error => {
        console.log("Autoplay prevented:", error);
      });
    }
    
    audioRef.current = audio;

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  const getZIndex = (index: number, flipped: boolean) => {
    const baseZ = 50;
    return flipped ? baseZ + index : baseZ - index;
  };

  return (
    <div className="book-wrapper">
      <div className="scroll-hint">
        <p>Scrolle para ler a história</p>
        <div className="arrow-down"></div>
      </div>

      <div className="book-floater">
        <div className={`book ${currentSheet > 0 ? 'open' : ''}`}>
          
          <div className="static-page right-base">
             <div className="page-content end-page">
               <h2>Fim... por enquanto.</h2>
             </div>
          </div>

          {pagesContent.map((page, index) => {
            const sheetIndex = index + 1;
            const flipped = currentSheet > sheetIndex; 
            const zIndex = getZIndex(sheetIndex, flipped);
            
            const backPage = index + 1 < pagesContent.length ? pagesContent[index + 1] : null;

            return (
              <div 
                key={sheetIndex} 
                className={`sheet ${flipped ? 'flipped' : ''}`} 
                style={{ zIndex: zIndex }}
              >
                <div className="front">
                  <div className="page-border">
                    <p className="page-text">{page.text}</p>
                    <span className="page-number">{index + 1}</span>
                  </div>
                </div>
                <div className="back">
                  <div className="page-border">
                    <div className="image-page">
                      {backPage ? (
                         <CanvasDraw draw={backPage.draw} />
                      ) : (
                         <div className="final-decoration">❦</div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          }).reverse()} 

          <div 
            className={`sheet cover-sheet ${currentSheet >= 1 ? 'flipped' : ''}`} 
            style={{ zIndex: getZIndex(0, currentSheet >= 1) }}
          >
            <div className="front cover-front">
              <div className="cover-border">
                <h1>Nossa História</h1>
                <div className="decoration">❦</div>
                <p>6 Meses</p>
              </div>
            </div>
            <div className="back cover-back">
              <div className="page-border">
                <div className="image-page">
                   <CanvasDraw draw={pagesContent[0].draw} />
                </div>
              </div>
            </div>
          </div>

        </div>
        <div className="book-shadow"></div>
      </div>
    </div>
  );
};

// Componente auxiliar para desenhar no Canvas com animação
const CanvasDraw: React.FC<{ draw: (ctx: CanvasRenderingContext2D, w: number, h: number, frame: number) => void }> = ({ draw }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const frameRef = useRef(0);
  const animationRef = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const render = () => {
      frameRef.current += 1;
      
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      
      ctx.scale(dpr, dpr);
      
      // Limpar canvas
      ctx.clearRect(0, 0, rect.width, rect.height);
      
      // Desenhar com frame atual
      draw(ctx, rect.width, rect.height, frameRef.current);
      
      animationRef.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      if (animationRef.current !== null) cancelAnimationFrame(animationRef.current);
    };
  }, [draw]);

  return <canvas ref={canvasRef} style={{ width: '100%', height: '100%' }} />;
};

export default Book;
