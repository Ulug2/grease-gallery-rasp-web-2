import { createWorker, ImageLike } from 'tesseract.js';

export async function recognizeText(image: ImageLike) {
    const worker = await createWorker('eng', 1, {
      logger: (m) => console.log(m),
    });
    const ret = await worker.recognize(image); // test image: 'https://tesseract.projectnaptha.com/img/eng_bw.png'
    console.log("Text: " + ret.data.text);
    await worker.terminate();
    return ret.data.text;
  };