// src/services/export.js
export const exportService = {
  // Експорт в текстовий формат
  toText(story) {
    return `
ОЗЕРО: Історія успіху

Ситуація:
${story.situation}

Задача:
${story.task}

Дії:
${story.action}

Результат:
${story.result}

Створено: ${new Date().toLocaleDateString("uk-UA")}
    `.trim();
  },

  // Експорт в HTML формат
  toHTML(story) {
    return `
<!DOCTYPE html>
<html lang="uk">
<head>
    <meta charset="UTF-8">
    <title>ОЗЕРО: Історія успіху</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            max-width: 800px;
            margin: 2rem auto;
            padding: 0 1rem;
            line-height: 1.6;
        }
        h1 { color: #2563eb; }
        h2 { color: #4b5563; margin-top: 2rem; }
        .section { margin-bottom: 2rem; }
        .meta { color: #6b7280; font-size: 0.875rem; }
    </style>
</head>
<body>
    <h1>ОЗЕРО: Історія успіху</h1>
    
    <div class="section">
        <h2>Ситуація</h2>
        <p>${story.situation}</p>
    </div>
    
    <div class="section">
        <h2>Задача</h2>
        <p>${story.task}</p>
    </div>
    
    <div class="section">
        <h2>Дії</h2>
        <p>${story.action}</p>
    </div>
    
    <div class="section">
        <h2>Результат</h2>
        <p>${story.result}</p>
    </div>
    
    <div class="meta">
        <p>Створено: ${new Date().toLocaleDateString("uk-UA")}</p>
    </div>
</body>
</html>
    `.trim();
  },

  // Експорт в Markdown
  toMarkdown(story) {
    return `
# ОЗЕРО: Історія успіху

## Ситуація
${story.situation}

## Задача
${story.task}

## Дії
${story.action}

## Результат
${story.result}

---
Створено: ${new Date().toLocaleDateString("uk-UA")}
    `.trim();
  },

  // Генерація імені файлу
  generateFileName(story, format) {
    const date = new Date().toISOString().split("T")[0];
    const title = story.situation.slice(0, 30).replace(/[^a-zA-Z0-9]/g, "_");
    return `ozero_${title}_${date}.${format}`;
  },

  // Завантаження файлу
  downloadFile(content, filename) {
    const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();
    window.URL.revokeObjectURL(url);
  },
};

// src/services/share.js
export const shareService = {
  // Підготовка тексту для шарингу
  prepareShareText(story) {
    const text = `
📝 Моя історія успіху:

🎯 Ситуація:
${story.situation.slice(0, 100)}...

✨ Результат:
${story.result.slice(0, 100)}...

#ОзероІсторія #УспіхРазом
    `.trim();

    return text;
  },

  // Шаринг через веб Share API
  async shareStory(story) {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "ОЗЕРО: Історія успіху",
          text: this.prepareShareText(story),
          url: window.location.href,
        });
        return true;
      } catch (error) {
        console.error("Помилка шарингу:", error);
        return false;
      }
    }
    return false;
  },

  // Копіювання в буфер обміну
  async copyToClipboard(story) {
    try {
      await navigator.clipboard.writeText(this.prepareShareText(story));
      return true;
    } catch (error) {
      console.error("Помилка копіювання:", error);
      return false;
    }
  },
};
