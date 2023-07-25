import { Router, Request, Response } from 'express';
import userRoutes from './api/user';
import bookRouter from './api/book';
import categoryRouter from './api/category';
import fs from 'fs';

import fileRouter from './api/file';
import { genAudio, getAppRootDir, mergeAudio } from './api/chatgpt';
import path from 'path';
const route = Router();

route.post(
  '/api/health-check',
  async (_: Request, res: Response): Promise<Response> => {
    return res.json({
      success: true
    });
  }
);

route.post('/api/generate', async (__: Request, res: Response) => {
  try {
    const texts = [
      'You can check out the GitHub repo for the full example using the just_audio plugin. There is no requirement to use just_audio or even a StreamBuilder, though.',
      ' You can use any audio or video player that provides updates about the current play location. Just rebuild the ProgressBar widget with the new Duration states.',
      "You'll probably want to add other buttons like start and pause, but these are not included with this package. They aren't hard to build, though, and you can find an example in the GitHub repo"
    ];
    const name = 'test';
    await genAudio(texts, name);

    const merged_audio = await mergeAudio(name);
    console.log(merged_audio);

    const exists = fs.existsSync(merged_audio);
    console.log(exists, merged_audio);

    if (!exists) {
      res.json({
        success: false,
        message: 'amjiltgui'
      });
    } else {
      const stat = fs.statSync(merged_audio);
      res.writeHead(200, {
        'Content-Type': 'audio/mpeg',
        'Content-Length': stat.size
      });

      const readStream = fs.createReadStream(merged_audio);
      readStream.pipe(res);
    }
  } catch (err) {
    return res.json({
      success: false,
      message: err.message
    });
  }
});

route.get('/get/audio', async (__: Request, res: Response) => {
  const rootDirName = getAppRootDir();
  const name = 'test.mp3';
  const audioPath = `/audio/merged/${name}`;
  const filePath = path.join(rootDirName, audioPath);
  const exists = fs.existsSync(filePath);
  if (!exists) {
    res.json({
      success: false,
      message: 'amjiltgui'
    });
  } else {
    const stat = fs.statSync(filePath);
    res.writeHead(200, {
      'Content-Type': 'audio/mpeg',
      'Content-Length': stat.size
    });

    const readStream = fs.createReadStream(filePath);
    readStream.pipe(res);
  }
});

route.use('/api', userRoutes);
route.use('/api', bookRouter);
route.use('/api', categoryRouter);
route.use('/api', fileRouter);
export default route;
