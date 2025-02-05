// src/services/export.js

export const exportService = {
  // Експорт в Markdown
  toMarkdown(story, options = {}) {
    const {
      includeDate = true,
      includeMetadata = true,
      includeToc = true,
      includeStats = true,
    } = options;

    let content = `# ОЗЕРО: Історія успіху\n\n`;

    if (includeMetadata) {
      content += `> Створено: ${new Date().toLocaleDateString('uk-UA')}\n\n`;
    }

    if (includeToc) {
      content += `## Зміст\n\n`;
      content += `- [Ситуація](#ситуація)\n`;
      content += `- [Задача](#задача)\n`;
      content += `- [Дії](#дії)\n`;
      content += `- [Результат](#результат)\n\n`;
    }

    content += `## Ситуація\n\n${story.situation || ''}\n\n`;
    content += `## Задача\n\n${story.task || ''}\n\n`;
    content += `## Дії\n\n${story.action || ''}\n\n`;
    content += `## Результат\n\n${story.result || ''}\n\n`;

    if (includeStats) {
      const wordCounts = {
        situation: (story.situation || '').split(/\s+/).length,
        task: (story.task || '').split(/\s+/).length,
        action: (story.action || '').split(/\s+/).length,
        result: (story.result || '').split(/\s+/).length,
      };

      content += `---\n\n`;
      content += `## Статистика\n\n`;
      content += `- Всього слів: ${Object.values(wordCounts).reduce((a, b) => a + b, 0)}\n`;
      content += `- Слів у ситуації: ${wordCounts.situation}\n`;
      content += `- Слів у задачі: ${wordCounts.task}\n`;
      content += `- Слів у діях: ${wordCounts.action}\n`;
      content += `- Слів у результаті: ${wordCounts.result}\n`;
    }

    return content;
  },

  // Експорт в JSON
  toJSON(story, options = {}) {
    const {
      includeMetadata = true,
      includeStats = true,
      pretty = true,
    } = options;

    const data = {
      ...story,
    };

    if (includeMetadata) {
      data.metadata = {
        createdAt: new Date().toISOString(),
        version: '1.0',
      };
    }

    if (includeStats) {
      data.stats = {
        wordCount: {
          situation: (story.situation || '').split(/\s+/).length,
          task: (story.task || '').split(/\s+/).length,
          action: (story.action || '').split(/\s+/).length,
          result: (story.result || '').split(/\s+/).length,
        },
        charCount: {
          situation: (story.situation || '').length,
          task: (story.task || '').length,
          action: (story.action || '').length,
          result: (story.result || '').length,
        },
      };

      data.stats.total = {
        words: Object.values(data.stats.wordCount).reduce((a, b) => a + b, 0),
        chars: Object.values(data.stats.charCount).reduce((a, b) => a + b, 0),
      };
    }

    return pretty ? JSON.stringify(data, null, 2) : JSON.stringify(data);
  },

  // Генерація імені файлу
  generateFileName(story, format = 'md') {
    const date = new Date().toISOString().split('T')[0];
    const title = story.situation
      ? story.situation.slice(0, 30).replace(/[^a-zA-Z0-9а-яА-ЯіїєґІЇЄҐ]/g, '_')
      : 'нова_історія';

    return `ozero_${title}_${date}.${format}`;
  },

  // Завантаження файлу
  downloadFile(content, filename) {
    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  },
};
