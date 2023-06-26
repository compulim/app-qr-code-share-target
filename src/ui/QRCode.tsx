import { toCanvas } from 'qrcode';
import { Fragment, useEffect, useRef, useState } from 'react';

function toCanvasPromise(element: HTMLCanvasElement, text: string, { signal }: { signal: AbortSignal }): Promise<void> {
  return new Promise((resolve, reject) => {
    toCanvas(element, text, error =>
      error ? reject(error) : signal.aborted ? reject(new Error('Aborted.')) : resolve()
    );
  });
}

type Props = { label?: string; text: string };

const QRCodeCanvas = ({ label, text }: Props) => {
  const [error, setError] = useState<true | undefined>();
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const abortController = new AbortController();

    (async function () {
      const { current: canvas } = canvasRef;

      if (!canvas) {
        return;
      }

      setError(undefined);

      try {
        await toCanvasPromise(canvas, text, { signal: abortController.signal });
      } catch (error) {
        setError(true);
      }
    })();

    return () => abortController.abort();
  }, [canvasRef]);

  label ||= text;

  return (
    <div className="qr-code-canvas">
      {error ? (
        <div className="qr-code-canvas__error">Failed to render QR code.</div>
      ) : (
        <div className="qr-code-canvas__box">
          <canvas className="qr-code-canvas__canvas" ref={canvasRef} />
          <caption className="qr-code-canvas__caption" title={label}>
            {label}
          </caption>
        </div>
      )}
    </div>
  );
};

export default QRCodeCanvas;
