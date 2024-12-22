import React, { useEffect, useRef, useState } from "react";
import { Stage, Layer, Image as KonvaImage } from 'react-konva';
import { Button } from "../ui/button";
import { Slider } from "../ui/slider"; // Assuming a slider component exists

interface ImageEditorProps {
  processedImage: string;
  onImageUpdate: (newImage: string) => void;
}

export const ImageEditor = ({ processedImage, onImageUpdate }: ImageEditorProps) => {
  const [image, setImage] = useState<HTMLImageElement | null>(null);
  const [brightness, setBrightness] = useState(0);
  const [contrast, setContrast] = useState(0);
  const imageRef = useRef<KonvaImage>(null);

  useEffect(() => {
    const img = new window.Image();
    img.src = processedImage;
    img.onload = () => {
      setImage(img);
    };
  }, [processedImage]);

  const handleSave = () => {
    if (imageRef.current) {
      const dataUrl = imageRef.current.toDataURL();
      onImageUpdate(dataUrl);
    }
  };

  return (
    <div className="space-y-4 w-full max-w-md mx-auto p-4 md:p-6 lg:p-8 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold text-gray-900">Edit Image</h2>
      <Stage width={window.innerWidth} height={window.innerHeight}>
        <Layer>
          {image && <KonvaImage image={image} ref={imageRef} />}
        </Layer>
      </Stage>

      <div className="flex flex-col space-y-4">
        <div>
          <label className="text-sm font-medium">Brightness</label>
          <Slider min={-100} max={100} value={brightness} onChange={setBrightness} />
        </div>
        <div>
          <label className="text-sm font-medium">Contrast</label>
          <Slider min={-100} max={100} value={contrast} onChange={setContrast} />
        </div>
        <Button onClick={handleSave} className="w-full bg-green-500 hover:bg-green-600">
          Apply Changes
        </Button>
      </div>
    </div>
  );
};