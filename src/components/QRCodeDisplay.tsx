import React from "react";
import { Card } from "@/components/ui/card";
import { Download, Share } from "lucide-react";
import { Button } from "@/components/ui/button";

interface TouristData {
  name: string;
  email: string;
  phone: string;
  passport: string;
  destination: string;
  duration: string;
}

interface QRCodeDisplayProps {
  touristData: TouristData;
}

const QRCodeDisplay: React.FC<QRCodeDisplayProps> = ({ touristData }) => {
  // Generate QR code data string
  const qrData = JSON.stringify(touristData);
  
  // For now, we'll use a placeholder QR code. In a real app, you'd use a QR code library
  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(qrData)}`;

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = qrCodeUrl;
    link.download = `tourist-qr-${touristData.name.replace(/\s+/g, '-').toLowerCase()}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Tourist QR Code',
          text: `Tourist registration for ${touristData.name}`,
          url: qrCodeUrl,
        });
      } catch (error) {
        console.log('Error sharing:', error);
      }
    } else {
      // Fallback for browsers that don't support Web Share API
      navigator.clipboard.writeText(qrCodeUrl);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-center">
        <Card className="p-4 bg-white shadow-card">
          <img 
            src={qrCodeUrl} 
            alt="Tourist QR Code"
            className="w-48 h-48 object-contain"
          />
        </Card>
      </div>

      <div className="text-center space-y-2">
        <h3 className="font-semibold text-foreground">Tourist Information</h3>
        <div className="grid grid-cols-2 gap-2 text-sm text-muted-foreground">
          <div><strong>Name:</strong> {touristData.name}</div>
          <div><strong>Destination:</strong> {touristData.destination}</div>
          <div><strong>Duration:</strong> {touristData.duration}</div>
          <div><strong>Passport:</strong> {touristData.passport}</div>
        </div>
      </div>

      <div className="flex gap-3">
        <Button 
          onClick={handleDownload}
          variant="outline"
          className="flex-1 border-primary/30 hover:border-primary transition-smooth"
        >
          <Download className="w-4 h-4 mr-2" />
          Download
        </Button>
        <Button 
          onClick={handleShare}
          variant="outline"
          className="flex-1 border-accent/30 hover:border-accent transition-smooth"
        >
          <Share className="w-4 h-4 mr-2" />
          Share
        </Button>
      </div>
    </div>
  );
};

export default QRCodeDisplay;