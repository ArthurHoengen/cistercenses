import type { NextApiRequest, NextApiResponse } from 'next';
import { createCanvas } from 'canvas';

// Desenha os traços das UNIDADES (superior direita)
function drawUnits(ctx: any, digit: number, cx: number, cy: number) {
  ctx.strokeStyle = '#000';
  ctx.lineWidth = 6;
  const size = 30;

  const x = cx;
  const y = cy - 57;

  ctx.beginPath();

  switch (digit) {
    case 0:
      break;
    case 1:
      ctx.moveTo(x, y - 30);
      ctx.lineTo(x + size, y - 30);
      break;
    case 2:
      ctx.moveTo(x, y);
      ctx.lineTo(x + size, y);
      break;
    case 3:
      ctx.moveTo(x, y - 30);
      ctx.lineTo(x + size, y);
      break;
    case 4:
      ctx.moveTo(x, y);
      ctx.lineTo(x + size, y - 30);
      break;
    case 5:
      ctx.moveTo(x, y - 30);
      ctx.lineTo(x + size, y - 30);
      ctx.moveTo(x, y);
      ctx.lineTo(x + size, y - 30);
      break;
    case 6:
      ctx.moveTo(x + size, y);
      ctx.lineTo(x + size, y - 30);
      break;
    case 7:
      ctx.moveTo(x + size, y);
      ctx.lineTo(x + size, y - 30);
      ctx.lineTo(x, y - 30);
      break;
    case 8:
      ctx.moveTo(x + size, y - 30);
      ctx.lineTo(x + size, y);
      ctx.lineTo(x, y);
      break;
    case 9:
      ctx.moveTo(x, y - 30);
      ctx.lineTo(x + size, y - 30);
      ctx.lineTo(x + size, y);
      ctx.lineTo(x, y);
      break;
  }

  ctx.stroke();
}

// Desenha os traços das DEZENAS (superior esquerda)
function drawTens(ctx: any, digit: number, cx: number, cy: number) {
  ctx.strokeStyle = '#000';
  ctx.lineWidth = 6;
  const size = 30;

  const x = cx;
  const y = cy - 57;

  ctx.beginPath();

  switch (digit) {
    case 0:
      break;
    case 1:
      ctx.moveTo(x, y - 30);
      ctx.lineTo(x - size, y - 30);
      break;
    case 2:
      ctx.moveTo(x, y);
      ctx.lineTo(x - size, y);
      break;
    case 3:
      ctx.moveTo(x, y - 30);
      ctx.lineTo(x - size, y);
      break;
    case 4:
      ctx.moveTo(x, y);
      ctx.lineTo(x - size, y - 30);
      break;
    case 5:
      ctx.moveTo(x, y - 30);
      ctx.lineTo(x - size, y - 30);
      ctx.moveTo(x, y);
      ctx.lineTo(x - size, y - 30);
      break;
    case 6:
      ctx.moveTo(x - size, y);
      ctx.lineTo(x - size, y - 30);
      break;
    case 7:
      ctx.moveTo(x - size, y);
      ctx.lineTo(x - size, y - 30);
      ctx.lineTo(x, y - 30);
      break;
    case 8:
      ctx.moveTo(x - size, y - 30);
      ctx.lineTo(x - size, y);
      ctx.lineTo(x, y);
      break;
    case 9:
      ctx.moveTo(x, y - 30);
      ctx.lineTo(x - size, y - 30);
      ctx.lineTo(x - size, y);
      ctx.lineTo(x, y);
      break;
  }

  ctx.stroke();
}

// Desenha os traços das CENTENAS (inferior direita)
function drawHundreds(ctx: any, digit: number, cx: number, cy: number) {
  ctx.strokeStyle = '#000';
  ctx.lineWidth = 6;
  const size = 30;

  const x = cx;
  const y = cy + 47;

  ctx.beginPath();

  switch (digit) {
    case 0:
      break;
    case 1:
      ctx.moveTo(x, y);
      ctx.lineTo(x + size, y);
      break;
    case 2:
      ctx.moveTo(x, y - 30);
      ctx.lineTo(x + size, y - 30);
      break;
    case 3:
      ctx.moveTo(x, y);
      ctx.lineTo(x + size, y - 30);
      break;
    case 4:
      ctx.moveTo(x, y - 30);
      ctx.lineTo(x + size, y);
      break;
    case 5:
      ctx.moveTo(x, y);
      ctx.lineTo(x + size, y);
      ctx.moveTo(x, y - 30);
      ctx.lineTo(x + size, y - 30);
      break;
    case 6:
      ctx.moveTo(x + size, y);
      ctx.lineTo(x + size, y - 30);
      break;
    case 7:
      ctx.moveTo(x + size, y);
      ctx.lineTo(x + size, y - 30);
      ctx.lineTo(x, y - 30);
      break;
    case 8:
      ctx.moveTo(x + size, y - 30);
      ctx.lineTo(x + size, y);
      ctx.lineTo(x, y);
      break;
    case 9:
      ctx.moveTo(x, y);
      ctx.lineTo(x + size, y);
      ctx.lineTo(x + size, y - 30);
      ctx.lineTo(x, y - 30);
      break;
  }

  ctx.stroke();
}

// Desenha os traços dos MILHARES (inferior esquerda)
function drawThousands(ctx: any, digit: number, cx: number, cy: number) {
  ctx.strokeStyle = '#000';
  ctx.lineWidth = 6;
  const size = 30;

  const x = cx;
  const y = cy + 47;

  ctx.beginPath();

  switch (digit) {
    case 0:
      break;
    case 1:
      ctx.moveTo(x, y);
      ctx.lineTo(x - size, y);
      break;
    case 2:
      ctx.moveTo(x, y - 30);
      ctx.lineTo(x - size, y - 30);
      break;
    case 3:
      ctx.moveTo(x, y);
      ctx.lineTo(x - size, y - 30);
      break;
    case 4:
      ctx.moveTo(x, y - 30);
      ctx.lineTo(x - size, y);
      break;
    case 5:
      ctx.moveTo(x, y);
      ctx.lineTo(x - size, y);
      ctx.moveTo(x, y - 30);
      ctx.lineTo(x - size, y - 30);
      break;
    case 6:
      ctx.moveTo(x - size, y);
      ctx.lineTo(x - size, y - 30);
      break;
    case 7:
      ctx.moveTo(x - size, y);
      ctx.lineTo(x - size, y - 30);
      ctx.lineTo(x, y - 30);
      break;
    case 8:
      ctx.moveTo(x - size, y - 30);
      ctx.lineTo(x - size, y);
      ctx.lineTo(x, y);
      break;
    case 9:
      ctx.moveTo(x, y);
      ctx.lineTo(x - size, y);
      ctx.lineTo(x - size, y - 30);
      ctx.lineTo(x, y - 30);
      break;
  }

  ctx.stroke();
}

// API handler
export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { number } = req.query;
  const n = Number(number);

  if (isNaN(n) || n < 0 || n > 9999) {
    return res.status(400).json({ error: 'Número inválido. Use de 0 a 9999.' });
  }

  const units = n % 10;
  const tens = Math.floor(n / 10) % 10;
  const hundreds = Math.floor(n / 100) % 10;
  const thousands = Math.floor(n / 1000) % 10;

  const canvas = createCanvas(200, 200);
  const ctx = canvas.getContext('2d');

  // fundo branco
  ctx.fillStyle = '#fff';
  ctx.fillRect(0, 0, 200, 200);

  // haste central
  ctx.beginPath();
  ctx.strokeStyle = '#000';
  ctx.lineWidth = 6;
  ctx.moveTo(100, 30);
  ctx.lineTo(100, 170);
  ctx.stroke();

  // desenha milhares (inferior esquerdo), centenas (inferior direito), dezenas (superior esquerda) e unidades (superior direita)
  drawThousands(ctx, thousands, 100, 120);
  drawHundreds(ctx, hundreds, 100, 120);
  drawTens(ctx, tens, 100, 120);
  drawUnits(ctx, units, 100, 120);

  const buffer = canvas.toBuffer('image/png');
  res.setHeader('Content-Type', 'image/png');
  res.status(200).send(buffer);
}
