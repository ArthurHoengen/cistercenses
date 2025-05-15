import type { NextApiRequest, NextApiResponse } from 'next';
import { IncomingForm, File } from 'formidable';
import { spawn } from 'child_process';
import path from 'path';
import fs from 'fs';

export const config = {
  api: {
    bodyParser: false, // necessário para lidar com uploads de arquivos
  },
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método não permitido' });
  }

  const form = new IncomingForm();

  form.parse(req, async (err, fields, files) => {
    if (err) {
      return res.status(500).json({ error: 'Erro ao processar imagem' });
    }

    if(!files.file) {
      return res.status(400).json({ error: 'Arquivo não enviado corretamente' });
    }
  
    const file = files.file[0] as File; // ajuste para o nome correto
  
    if (!file || !file.filepath) {
      return res.status(400).json({ error: 'Arquivo não enviado corretamente' });
    }
  
    const filepath = file.filepath;
  
    const scriptPath = path.join(process.cwd(), 'python', 'recognize_cistercian.py');
  
    const pythonProcess = spawn('python3', [scriptPath, filepath]);
  
    let result = '';
    let error = '';
  
    pythonProcess.stdout.on('data', (data) => {
      result += data.toString();
    });
  
    pythonProcess.stderr.on('data', (data) => {
      error += data.toString();
    });
  
    pythonProcess.on('close', (code) => {
      if (filepath) {
        fs.unlink(filepath, () => {});
      }
  
      if (code !== 0 || error) {
        return res.status(500).json({ error: 'Erro ao executar script Python', details: error });
      }

      console.log(result)
  
      const recognizedNumber = parseInt(result.trim(), 10);
      return res.status(200).json({ number: recognizedNumber });
    });
  });
}