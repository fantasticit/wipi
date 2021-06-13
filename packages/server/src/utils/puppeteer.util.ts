import * as os from 'os';
import * as fs from 'fs-extra';
import * as path from 'path';
import * as puppeteer from 'puppeteer';
import { uniqueid } from './uniqueid.util';

const tmpdir = path.join(os.tmpdir(), '/poster/');

export async function createImage({ html, width, height, ratio, ext = 'png' }) {
  width = Math.ceil(width + 16);
  height = Math.ceil(height + Math.ceil(height / width) * 16);
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.setViewport({
    width,
    height,
    deviceScaleFactor: ratio,
  });
  await page.setContent(html);
  fs.ensureDir(tmpdir);
  const filepath = path.join(tmpdir, `${uniqueid()}.png`);
  await page.screenshot({
    path: filepath,
    fullPage: false,
  });
  browser.close();
  return { filepath, buffer: fs.createReadStream(filepath), size: fs.statSync(filepath).size };
}
