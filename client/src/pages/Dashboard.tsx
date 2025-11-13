import { useEffect, useState } from "react";
import { toast } from "../helpers/toast";

export const Dashboard = () => {
  const [temperature, setTemperature] = useState<number | null>(null);
  const [history, setHistory] = useState<{ temp: number; ts: string }[]>([]);

  useEffect(() => {
    // Construye la URL del WebSocket usando la variable de entorno VITE_WS_URL (Vite)
    const hostname =
      (globalThis as unknown as { location?: { hostname?: string } }).location
        ?.hostname ?? "localhost";
    const env = import.meta.env as { VITE_WS_URL?: string } & Record<
      string,
      unknown
    >;
    const wsUrl = env.VITE_WS_URL ?? `ws://${hostname}:8080`;
    const ws = new WebSocket(wsUrl);

    ws.onopen = () => {
      console.log("WebSocket conectado a:", wsUrl);
      toast.success("Conectado al servidor de WebSocket");
    };

    ws.onmessage = (event) => {
      // Log en consola
      console.log("Mensaje WS recibido:", event.data);

      // Extraer el número (temperatura) del mensaje, por ejemplo: "Temperatura en la ciudad: 45°"
      const text = String(event.data);
      const match = /(-?\d+)/.exec(text);
      if (match) {
        const temp = Number.parseInt(match[1], 10);
        setTemperature(temp);
        const ts = new Date().toLocaleTimeString();
        setHistory((prev) => [{ temp, ts }, ...prev]);
      }
    };

    ws.onclose = () => {
      console.log("WebSocket desconectado");
    };

    ws.onerror = (err) => {
      console.error("Error en WebSocket:", err);
    };

    // Cleanup al desmontar el componente
    return () => {
      ws.close();
    };
  }, []);

  const getTemperatureColor = (temp: number | null): string => {
    if (temp === null) return "#666";
    if (temp >= 30) return "#f04a4aff";
    if (temp <= 15) return "#4a90e2ff";
    return "#666";
  };

  const shouldShake = (temp: number | null): string => {
    if (temp === null) return "";
    if (temp >= 30) return "shake-hot";
    if (temp <= 15) return "shake-cold";
    return "";
  };

  const sliced = history.slice(0, 10);

  return (
    <div style={{ margin: 0 }}>
      <br />
      <h1>Weather - WS - App</h1>
      <h3 style={{ fontStyle: "italic" }}>by Ricdeo</h3>

      <style>{`
        @keyframes shakeHorizontal {
          0%, 100% {
            transform: translateX(0);
          }
          10%, 30%, 50%, 70%, 90% {
            transform: translateX(-2px);
          }
          20%, 40%, 60%, 80% {
            transform: translateX(2px);
          }
        }

        @keyframes shakeVertical {
          0%, 100% {
            transform: translateY(0);
          }
          10%, 30%, 50%, 70%, 90% {
            transform: translateY(-2px);
          }
          20%, 40%, 60%, 80% {
            transform: translateY(2px);
          }
        }

        .container {
          transition: all 0.3s ease;
        }

        .container.shake-hot {
          animation: shakeHorizontal 1.2s ease-in-out infinite;
        }

        .container.shake-cold {
          animation: shakeVertical 1.2s ease-in-out infinite;
        }
      `}</style>

      <div style={{ marginTop: 16 }}>
        <div
          style={{
            display: "inline-block",
            padding: 12,
            border: "1px solid #e0e0e0",
            borderRadius: 8,
            borderColor: getTemperatureColor(temperature),
          }}
          className={`container ${shouldShake(temperature)}`}
        >
          <h3 style={{ margin: "0 0 8px 0" }}>Temperatura actual</h3>
          <div
            style={{
              fontSize: 32,
              fontWeight: 600,
              color: getTemperatureColor(temperature),
            }}
          >
            {temperature === null ? <Loader /> : `${temperature}°`}
          </div>
          {history[0] && (
            <div style={{ color: "#666", marginTop: 6 }}>
              Última lectura: {history[0].ts}
            </div>
          )}

          {history.length > 0 && (
            <div style={{ marginTop: 10 }}>
              <strong>Últimas {sliced.length} lecturas</strong>
              <ol style={{ margin: 6, paddingLeft: 18 }}>
                {sliced.map((h) => (
                  <li key={`${h.ts}-${h.temp}`}>
                    {h.temp}° — {h.ts}
                  </li>
                ))}
              </ol>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const Loader = () => {
  return (
    <>
      <style>{`
        .loader {
          width: 60px;
          text-align: center;
          margin: 0 auto;
          display: block;
          aspect-ratio: 2;
          --_g: no-repeat radial-gradient(circle closest-side,#666 90%,#0000);
          background:
            var(--_g) 0%   50%,
            var(--_g) 50%  50%,
            var(--_g) 100% 50%;
          background-size: calc(100%/3) 50%;
          animation: l3 1s infinite linear;
        }
        @keyframes l3 {
            20%{background-position:0%   0%, 50%  50%,100%  50%}
            40%{background-position:0% 100%, 50%   0%,100%  50%}
            60%{background-position:0%  50%, 50% 100%,100%   0%}
            80%{background-position:0%  50%, 50%  50%,100% 100%}
        }
      `}</style>
      <div className="loader"></div>
    </>
  );
};
