import puppeteer from 'puppeteer-core'
import fs from 'fs'
import path from 'path'

const CHROME_PATH =
  process.platform === 'darwin'
    ? '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
    : process.platform === 'win32'
      ? 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe'
      : '/usr/bin/google-chrome'

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  let browser = null

  try {
    const htmlPath = path.join(process.cwd(), 'src', 'data', 'resume.html')
    const htmlContent = fs.readFileSync(htmlPath, 'utf-8')

    browser = await puppeteer.launch({
      executablePath: CHROME_PATH,
      headless: 'new',
      args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu'],
    })

    const page = await browser.newPage()
    await page.setContent(htmlContent, { waitUntil: 'networkidle0' })

    const pdfBuffer = await page.pdf({
      format: 'A4',
      printBackground: true,
      margin: { top: '0', right: '0', bottom: '0', left: '0' },
    })

    const buffer = Buffer.from(pdfBuffer)

    res.setHeader('Content-Type', 'application/pdf')
    res.setHeader('Content-Disposition', 'attachment; filename=Manish-Kumar-Resume.pdf')
    res.setHeader('Content-Length', buffer.length)
    res.end(buffer)
  } catch (error) {
    console.error('PDF generation error:', error)
    res.status(500).json({
      error: 'Failed to generate PDF',
      details: error.message,
    })
  } finally {
    if (browser) {
      await browser.close()
    }
  }
}

export const config = {
  api: {
    responseLimit: false,
  },
}
