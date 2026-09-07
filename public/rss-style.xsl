<?xml version="1.0" encoding="utf-8"?>
<xsl:stylesheet version="3.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
                xmlns:atom="http://www.w3.org/2005/Atom">
  <xsl:output method="html" version="1.0" encoding="UTF-8" indent="yes"/>
  <xsl:template match="/">
    <html xmlns="http://www.w3.org/1999/xhtml" lang="hi">
      <head>
        <title><xsl:value-of select="/rss/channel/title"/> | Web Feed</title>
        <meta charset="utf-8"/>
        <meta name="viewport" content="width=device-width, initial-scale=1"/>
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <style>
          :root {
            --bg-color: #0b0f19;
            --card-bg: rgba(17, 24, 39, 0.7);
            --border-color: rgba(255, 255, 255, 0.08);
            --text-main: #f3f4f6;
            --text-muted: #9ca3af;
            --accent: #3b82f6;
            --accent-gradient: linear-gradient(135deg, #3b82f6, #6366f1);
          }
          * { box-sizing: border-box; margin: 0; padding: 0; }
          body {
            background-color: var(--bg-color);
            color: var(--text-main);
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
            line-height: 1.6;
            padding: 2rem 1rem;
          }
          .container {
            max-width: 800px;
            margin: 0 auto;
          }
          header {
            text-align: center;
            padding-bottom: 2rem;
            margin-bottom: 2rem;
            border-bottom: 1px solid var(--border-color);
          }
          .badge {
            display: inline-flex;
            align-items: center;
            gap: 0.5rem;
            padding: 0.35rem 0.85rem;
            border-radius: 9999px;
            background: rgba(59, 130, 246, 0.15);
            border: 1px solid rgba(59, 130, 246, 0.3);
            color: #60a5fa;
            font-size: 0.85rem;
            font-weight: 600;
            margin-bottom: 1rem;
          }
          h1 {
            font-size: 2.2rem;
            font-weight: 900;
            margin-bottom: 0.5rem;
            background: linear-gradient(to right, #60a5fa, #a78bfa);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
          }
          .subtitle {
            color: var(--text-muted);
            font-size: 1.05rem;
            max-width: 600px;
            margin: 0 auto 1.5rem;
          }
          .info-banner {
            background: rgba(30, 58, 138, 0.25);
            border: 1px solid rgba(59, 130, 246, 0.3);
            border-radius: 1rem;
            padding: 1.25rem;
            margin-bottom: 2rem;
            text-align: left;
            font-size: 0.95rem;
            color: #cbd5e1;
          }
          .info-banner strong { color: #93c5fd; }
          .actions {
            display: flex;
            flex-wrap: wrap;
            gap: 0.75rem;
            margin-top: 1rem;
          }
          .btn {
            display: inline-flex;
            align-items: center;
            gap: 0.5rem;
            padding: 0.6rem 1.2rem;
            border-radius: 0.5rem;
            font-weight: 600;
            font-size: 0.9rem;
            text-decoration: none;
            cursor: pointer;
            transition: all 0.2s ease;
          }
          .btn-primary {
            background: var(--accent-gradient);
            color: #ffffff;
            border: none;
          }
          .btn-primary:hover { opacity: 0.9; transform: translateY(-1px); }
          .btn-secondary {
            background: rgba(255, 255, 255, 0.06);
            color: #e2e8f0;
            border: 1px solid var(--border-color);
          }
          .btn-secondary:hover { background: rgba(255, 255, 255, 0.1); }
          .feed-list {
            display: flex;
            flex-direction: column;
            gap: 1.25rem;
          }
          .feed-item {
            background: var(--card-bg);
            border: 1px solid var(--border-color);
            border-radius: 1rem;
            padding: 1.5rem;
            transition: border-color 0.2s ease, transform 0.2s ease;
          }
          .feed-item:hover {
            border-color: rgba(59, 130, 246, 0.4);
            transform: translateY(-2px);
          }
          .item-title {
            font-size: 1.25rem;
            font-weight: 700;
            margin-bottom: 0.5rem;
          }
          .item-title a {
            color: #ffffff;
            text-decoration: none;
          }
          .item-title a:hover {
            color: #60a5fa;
          }
          .item-meta {
            font-size: 0.85rem;
            color: var(--text-muted);
            margin-bottom: 0.75rem;
            display: flex;
            gap: 1rem;
            flex-wrap: wrap;
          }
          .item-desc {
            color: #d1d5db;
            font-size: 0.95rem;
            line-height: 1.5;
          }
          footer {
            text-align: center;
            margin-top: 3rem;
            padding-top: 1.5rem;
            border-top: 1px solid var(--border-color);
            font-size: 0.85rem;
            color: var(--text-muted);
          }
        </style>
      </head>
      <body>
        <div class="container">
          <header>
            <div class="badge">📡 TechVerse RSS 2.0 Web Feed</div>
            <h1><xsl:value-of select="/rss/channel/title"/></h1>
            <p class="subtitle"><xsl:value-of select="/rss/channel/description"/></p>
            
            <div class="info-banner">
              <p>
                <strong>ℹ️ Yeh kya hai?</strong> Yeh TechVerse ki official <strong>RSS / Atom Feed</strong> hai. Iska use karke aap Feedly, Inoreader, ya kisi bhi RSS Reader app me humare naye blog posts automatically receive kar sakte hain.
              </p>
              <div class="actions">
                <a href="/" class="btn btn-secondary">🏠 Home Page Par Jao</a>
                <a href="/blog" class="btn btn-primary">📖 Saare Blogs Padho</a>
              </div>
            </div>
          </header>

          <main class="feed-list">
            <xsl:for-each select="/rss/channel/item">
              <article class="feed-item">
                <h2 class="item-title">
                  <a target="_blank">
                    <xsl:attribute name="href">
                      <xsl:value-of select="link"/>
                    </xsl:attribute>
                    <xsl:value-of select="title"/>
                  </a>
                </h2>
                <div class="item-meta">
                  <span>📅 <xsl:value-of select="pubDate" /></span>
                </div>
                <p class="item-desc">
                  <xsl:value-of select="description" />
                </p>
              </article>
            </xsl:for-each>
          </main>

          <footer>
            <p>© 2026 TechVerse • Tech ki Duniya, Hinglish Mein!</p>
          </footer>
        </div>
      </body>
    </html>
  </xsl:template>
</xsl:stylesheet>
