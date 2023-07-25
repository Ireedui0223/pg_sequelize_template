import { PathLike } from 'fs';

const axios = require('axios');
const fs = require('fs');
const path = require('path');

const ffmpeg = require('fluent-ffmpeg');
const command = ffmpeg();

export const getAppRootDir = () => {
  let currentDir = __dirname;
  while (!fs.existsSync(path.join(currentDir, 'package.json'))) {
    currentDir = path.join(currentDir, '..');
  }
  return currentDir;
};

function _getFiles(dir, files: Array<string> = []) {
  const fileList = fs.readdirSync(dir);
  for (const file of fileList) {
    const name = `${dir}/${file}`;
    if (fs.statSync(name).isDirectory()) {
      _getFiles(name, files);
    } else {
      files.push(name);
    }
  }
  return files;
}

export const genAudio = async (texts: Array<string>, name: string) => {
  let success_count = 0;
  return new Promise<void>((resolve, reject) => {
    texts.map((text, index) => {
      const ENDPOINT = 'https://tiktok-tts.weilnet.workers.dev/api/generation';
      const voice = 'en_uk_001';
      axios
        .post(
          ENDPOINT,
          {
            text,
            voice
          },
          {
            headers: {
              'Content-Type': 'application/json'
            }
          }
        )
        .then(async (response) => {
          const base64 = response?.data;
          const buffer = Buffer.from(base64?.data, 'base64');
          const rootDirName = getAppRootDir();

          try {
            if (!fs.existsSync(`${rootDirName}/audio/${name}`)) {
              await fs.mkdirSync(`${rootDirName}/audio/${name}`);
            }
            await fs.writeFileSync(
              `${rootDirName}/audio/${name}/${index}.mp3`,
              buffer
            );
            console.log(
              `${rootDirName}/audio/${name}/${index} has finished generated size: ${buffer.byteLength.toLocaleString()}`
            );
            success_count++;
            if (success_count == texts.length) {
              resolve();
            }
          } catch (err) {
            reject(err);
          }
        })
        .catch((err) => {
          reject(err);
        });
    });
  });
};

export const mergeAudio = async (name) => {
  return new Promise<PathLike>((resolve, reject) => {
    const rootDirName = getAppRootDir();
    const files = _getFiles(`${rootDirName}/audio/${name}`);
    const outputDir = `${rootDirName}/audio/merged/${name}.mp3`;
    files.map((file) => {
      command.input(file);
    });

    command.outputFormat('mp3');

    command
      .mergeToFile(outputDir)
      .on('end', () => {
        resolve(outputDir);
      })
      .on('error', (err) => {
        reject(err);
      });
  });
};
