import * as os from 'os';
import * as fs from 'fs-extra';
import * as path from 'path';
import * as puppeteer from 'puppeteer';
import { uniqueid } from './uniqueid.util';

const tmpdir = path.join(os.tmpdir(), '/poster/');

export async function createImage({ html, width, height, ratio, ext = 'png' }) {
  width = Math.ceil(width);
  height = Math.ceil(height);
  const filepath = path.join(tmpdir, `${uniqueid()}.${ext}`);
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });
  const page = await browser.newPage();
  await page.setViewport({
    width,
    height,
    deviceScaleFactor: ratio,
  });
  await page.setContent(html);
  fs.ensureDir(tmpdir);
  await page.screenshot({
    path: filepath,
    fullPage: true,
  });
  await browser.close();
  return { filepath, buffer: fs.createReadStream(filepath), size: fs.statSync(filepath).size };
}
