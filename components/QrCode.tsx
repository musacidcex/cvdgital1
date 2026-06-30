"use client";
import { QRCodeSVG } from "qrcode.react";

export default function QrCode({ value, size = 100 }: { value: string; size?: number }) {
  return <QRCodeSVG value={value} size={size} fgColor="#0c0f14" bgColor="#ffffff" />;
}
