import fs from 'fs';
import xlsx from 'xlsx';
import { Pest } from '../models/Pest.js';

export const importPestSpreadsheet = async (file: any) => {
  const { createReadStream, filename } = await file;
  const tempPath = `./uploads/${Date.now()}-${filename}`;
  await new Promise((resolve, reject) => {
    const stream = createReadStream();
    const out = fs.createWriteStream(tempPath);
    stream.pipe(out);
    out.on('finish', resolve);
    out.on('error', reject);
  });

  const workbook = xlsx.readFile(tempPath);
  const sheet = workbook.Sheets[workbook.SheetNames[0]];
  const jsonData = xlsx.utils.sheet_to_json(sheet);

  const formatted = jsonData.map((item: any) => ({
    commonName: item.commonName || '',
    latinName: item.latinName || '',
    description: item.description || '',
    distribution: item.distribution?.split(',').map((s: string) => s.trim()) || [],
    economicThreshold: Number(item.economicThreshold) || 0,
    treatment: item.treatment || '',
    hardToDetect: item.hardToDetect === 'true' || item.hardToDetect === true,
    singleDetectionSevere: item.singleDetectionSevere === 'true' || item.singleDetectionSevere === true,
    imageURL: item.imageURL || '',
  }));

  await Pest.insertMany(formatted);
  fs.unlinkSync(tempPath);

  return `✅ Successfully import ${formatted.length} records`;
};

export const exportPestSpreadsheet = async (jsonData: any[], format = 'xlsx') => {
  const allKeys = [...new Set(jsonData.flatMap(obj => Object.keys(obj)))];
  const unified = jsonData.map(item =>
    Object.fromEntries(allKeys.map(key => [key, item[key] ?? '']))
  );

  const worksheet = xlsx.utils.json_to_sheet(unified);
  const workbook = xlsx.utils.book_new();
  xlsx.utils.book_append_sheet(workbook, worksheet, 'Export');

  const ext = format === 'csv' ? 'csv' : 'xlsx';
  const filePath = `./exports/pest-export-${Date.now()}.${ext}`;
  const buffer = xlsx.write(workbook, { type: 'buffer', bookType: ext });

  fs.writeFileSync(filePath, buffer);
  return filePath;
};