import { QRCodeCanvas, QRCodeSVG } from "qrcode.react";

const Qr = () => {
  return (
    <div>
      <QRCodeCanvas
        value={"https://realestway.com"}
        width={500}
        errorCorrectionLevel="H"
      />
    </div>
  );
};

export default Qr;
