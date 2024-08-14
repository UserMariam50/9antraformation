const mongoose = require("mongoose");

const qrCodeSchema = new mongoose.Schema(
  {
    content: { type: String, required: true },
  },
  { timestamps: true }
);

qrCodeSchema.post("save", function (doc, next) {
  console.log("New QR code was created & saved successfully:", doc);
  next();
});

const QRCode = mongoose.model("QRCode", qrCodeSchema);
module.exports = QRCode;
