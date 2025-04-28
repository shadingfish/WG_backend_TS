// src/controllers/pestSpreadsheetController.ts

import fs from "node:fs";
import path from "node:path";
import { pipeline } from "node:stream/promises";
import xlsx from "xlsx";
import Papa from "papaparse";
import { Pest } from "../models/Pest.js";

const EXPORT_DIR  = "./exports";
const UPLOAD_DIR = path.resolve(process.cwd(), "uploads");

const ensureDir = (dir: string) =>
  fs.existsSync(dir) || fs.mkdirSync(dir, { recursive: true });

export const importPestSpreadsheet = async (upload: any) => {
  /** 1. Interpret upload Object */
  ensureDir(UPLOAD_DIR);
  const { filename, mimetype, createReadStream, encoding} = await upload;
  console.log(`[Import] ⏳ Start importing ${filename}`);

  /** 2. Save to temp files */
  const ext       = path.extname(filename).toLowerCase() || ".tmp";
  const tempPath  = path.join(
    UPLOAD_DIR,
    `${Date.now()}-${Math.random().toString(16).slice(2)}${ext}`
  );

  try {
    await pipeline(createReadStream(), fs.createWriteStream(tempPath));

    /** 3. Conclude different spreadsheet format into JSON */
    let rows: any[] = [];

    if (mimetype === "text/csv" || ext === ".csv") {
      // ---- CSV ----
      const csvText = fs.readFileSync(tempPath, "utf8");
      const { data } = Papa.parse(csvText, { header: true, skipEmptyLines: true });
      rows = data as any[];
    } else {
      // ---- XLS / XLSX ----
      const workbook = xlsx.readFile(tempPath);
      const sheet    = workbook.Sheets[workbook.SheetNames[0]];
      rows           = xlsx.utils.sheet_to_json(sheet, { defval: "" });
    }

    /** 4. standardize and write to MongoDB */
    const docs = rows.map((r) => ({
      commonName:            r.commonName ?? "",
      latinName:             r.latinName ?? "",
      description:           r.description ?? "",
      distribution:          (r.distribution ?? "")
                              .toString()
                              .split(",")
                              .map((s: string) => s.trim())
                              .filter(Boolean),
      economicThreshold:     Number(r.economicThreshold) || 0,
      treatment:             r.treatment ?? "",
      hardToDetect:          String(r.hardToDetect).toLowerCase() === "true",
      singleDetectionSevere: String(r.singleDetectionSevere).toLowerCase() === "true",
      imageURL:              r.imageURL ?? "",
    }));

    const result = await Pest.insertMany(docs, { ordered: false });
    console.log(`[Import] ✅ ${filename} importing finished, length: ${result.length}`);

    return `✅  Successfully imported ${result.length} lines of record, skipped ${
      docs.length - result.length
    } lines of duplicated or invalid data`;
  } finally {
    /** 5. Delete temp file no matter success or not */
    fs.existsSync(tempPath) && fs.unlinkSync(tempPath);
  }
};

export const exportPestSpreadsheet = async (jsonData: any[], format = "xlsx") => {
  ensureDir(EXPORT_DIR);

  const allKeys   = [...new Set(jsonData.flatMap((o) => Object.keys(o)))];
  const unified   = jsonData.map((o) =>
    Object.fromEntries(allKeys.map((k) => [k, o[k] ?? ""]))
  );

  const ws  = xlsx.utils.json_to_sheet(unified);
  const wb  = xlsx.utils.book_new();
  xlsx.utils.book_append_sheet(wb, ws, "Export");

  const ext      = format === "csv" ? "csv" : "xlsx";
  const filePath = path.join(EXPORT_DIR, `pest-export-${Date.now()}.${ext}`);

  if (ext === "csv") {
    const csv = xlsx.utils.sheet_to_csv(ws);
    fs.writeFileSync(filePath, csv);
  } else {
    xlsx.writeFile(wb, filePath);
  }
  return filePath; // Frontend auto-download
};

// import fs from 'fs';
// import { finished } from 'stream/promises';
// import xlsx from 'xlsx';
// import { Pest } from '../models/Pest.js';

// // 注意：file 是 Promise<Upload>，我们需要 await file
// export const importPestSpreadsheet = async (file: any) => {
//   // 1. 解构出 createReadStream 和其他字段
//   const { createReadStream, filename, mimetype, encoding } = await file;

//   // 2. 创建可读流
//   const stream = createReadStream();
  
//   // 3. 构造临时文件路径
//   const tempPath = `./uploads/${Date.now()}-${filename}`;
//   const out = fs.createWriteStream(tempPath);
//   stream.pipe(out);

//   // 4. 等待写入完毕
//   await finished(out);

//   // 5. 解析 Excel
//   const workbook = xlsx.readFile(tempPath);
//   const sheet = workbook.Sheets[workbook.SheetNames[0]];
//   const jsonData = xlsx.utils.sheet_to_json(sheet);

//   // 6. 格式化数据
//   const formatted = jsonData.map((item: any) => ({
//     commonName: item.commonName || '',
//     latinName: item.latinName || '',
//     description: item.description || '',
//     distribution: item.distribution?.split(',').map((s: string) => s.trim()) || [],
//     economicThreshold: Number(item.economicThreshold) || 0,
//     treatment: item.treatment || '',
//     hardToDetect:
//       typeof item.hardToDetect === 'string'
//         ? item.hardToDetect.toLowerCase() === 'true'
//         : item.hardToDetect === true,
//     singleDetectionSevere:
//       typeof item.singleDetectionSevere === 'string'
//         ? item.singleDetectionSevere.toLowerCase() === 'true'
//         : item.singleDetectionSevere === true,
//     imageURL: item.imageURL || '',
//   }));

//   // 7. 写入数据库
//   await Pest.insertMany(formatted);

//   // 8. 删除临时文件
//   fs.unlinkSync(tempPath);

//   // 9. 返回提示
//   return `✅ Successfully import ${formatted.length} records`;
// };

// export const exportPestSpreadsheet = async (jsonData: any[], format = 'xlsx') => {
//   const allKeys = [...new Set(jsonData.flatMap(obj => Object.keys(obj)))];
//   const unified = jsonData.map(item =>
//     Object.fromEntries(allKeys.map(key => [key, item[key] ?? '']))
//   );

//   const worksheet = xlsx.utils.json_to_sheet(unified);
//   const workbook = xlsx.utils.book_new();
//   xlsx.utils.book_append_sheet(workbook, worksheet, 'Export');

//   const ext = format === 'csv' ? 'csv' : 'xlsx';
//   const filePath = `./exports/pest-export-${Date.now()}.${ext}`;
//   const buffer = xlsx.write(workbook, { type: 'buffer', bookType: ext });

//   fs.writeFileSync(filePath, buffer);
//   return filePath;
// };

// export const importPestSpreadsheet = async (file: any) => {
//   const { createReadStream, filename } = await file;
//   const tempPath = `./uploads/${Date.now()}-${filename}`;
//   await new Promise((resolve, reject) => {
//     const stream = createReadStream();
//     const out = fs.createWriteStream(tempPath);
//     stream.pipe(out);
//     out.on('finish', resolve);
//     out.on('error', reject);
//   });

//   const workbook = xlsx.readFile(tempPath);
//   const sheet = workbook.Sheets[workbook.SheetNames[0]];
//   const jsonData = xlsx.utils.sheet_to_json(sheet);

//   const formatted = jsonData.map((item: any) => ({
//     commonName: item.commonName || '',
//     latinName: item.latinName || '',
//     description: item.description || '',
//     distribution: item.distribution?.split(',').map((s: string) => s.trim()) || [],
//     economicThreshold: Number(item.economicThreshold) || 0,
//     treatment: item.treatment || '',
//     hardToDetect:
//     typeof item.hardToDetect === 'string'
//       ? item.hardToDetect.toLowerCase() === 'true'
//       : item.hardToDetect === true,
//     singleDetectionSevere:
//       typeof item.singleDetectionSevere === 'string'
//         ? item.singleDetectionSevere.toLowerCase() === 'true'
//         : item.singleDetectionSevere === true,
//     imageURL: item.imageURL || '',
//   }));

//   await Pest.insertMany(formatted);
//   fs.unlinkSync(tempPath);

//   return `✅ Successfully import ${formatted.length} records`;
// };