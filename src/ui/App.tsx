import QRCodeCanvas from './QRCode';

const App = () => {
  const isPWA = !matchMedia('(display-mode: browser)').matches;
  const params = new URLSearchParams(location.search);

  const targetURL = params.get('url');

  return targetURL ? (
    <QRCodeCanvas text={targetURL} />
  ) : isPWA ? (
    <QRCodeCanvas label="You can now use Web Share to share as QR code." text={location.href} />
  ) : (
    <QRCodeCanvas label="Please install our app to share as QR Code." text={location.href} />
  );
};

export default App;
