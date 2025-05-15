"use client"

import { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";

type FormInputs = {
  numberInput: string;
  imageInput: FileList;
};

export default function Home() {
  const { register, handleSubmit } = useForm<FormInputs>();
  const [result, setResult] = useState<string | null>(null);
  const [generatedImageUrl, setGeneratedImageUrl] = useState<string | null>(null);

  const onSubmit = async (data: FormInputs) => {
    setResult(null);
    setGeneratedImageUrl(null);

    if (data.imageInput && data.imageInput.length > 0) {
      // Envio de imagem para reconhecimento
      const formData = new FormData();
      formData.append("file", data.imageInput[0]);

      const res = await axios.post("/api/recognize", formData);
      setResult(`Número reconhecido: ${res.data.number}`);
    } else if (data.numberInput) {
      // Envio do número para gerar imagem
      const res = await axios.get("/api/generate-image", {
        params: { number: data.numberInput },
        responseType: "blob", // para receber imagem
      });

      const imageUrl = URL.createObjectURL(res.data);
      setGeneratedImageUrl(imageUrl);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Conversor Cisterciense</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block font-medium mb-1">Enviar imagem:</label>
          <input type="file" {...register("imageInput")} accept="image/*" />
        </div>

        <div>
          <label className="block font-medium mb-1">Ou digite um número (0–9999):</label>
          <input
            type="number"
            min={0}
            max={9999}
            {...register("numberInput")}
            className="border px-2 py-1 rounded w-full"
          />
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Enviar
        </button>
      </form>

      <div className="mt-6">
        {result && <p className="text-lg">{result}</p>}
        {generatedImageUrl && (
          <div className="mt-4">
            <p className="mb-2 font-medium">Imagem cisterciense:</p>
            <img src={generatedImageUrl} alt="Número cisterciense" className="w-48 h-auto" />
          </div>
        )}
      </div>
    </div>
  );
}
