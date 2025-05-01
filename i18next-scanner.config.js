"use strict";
const fs = require("fs");

module.exports = {
  input: ['./src/**/*.ts', './src/**/*.tsx'], // Glob patterns to match your source code files.
  output: './',
  options: {
    lngs: ['ru', 'uz', 'en'],
    debug: true,
    sort: true,
    plural: true,
    defaultNs: 'common',
    ns: ['common', 'validation'],
    resource: {
      loadPath: 'public/locales/{{lng}}/{{ns}}.json',
      savePath: 'public/locales/{{lng}}/{{ns}}.json',
      jsonIndent: 2,
      lineEnding: '\n',
    },
    defaultValue: (lng, ns, key) => (lng === 'en' ? key : ''),
    func: {
      list: ['t'], // This should match the function you use for translations in your code (e.g., 't' or 'i18n.t').
      extensions: ['.ts', '.tsx'],
    },
  },
  transform: function customTransform(file, enc, done) {
    const content = fs.readFileSync(file.path, enc);
    const useTranslationRegex =
      /useTranslation\(\s*(?:['"]([^'"]+)['"]|\[([^\]]+)\])\s*\)/g;
    const detectedNamespaces = [];
    let match;

    // useTranslation ichidagi namespace larni topish
    while ((match = useTranslationRegex.exec(content)) !== null) {
      if (match[1]) {
        detectedNamespaces.push(match[1]); // Agar bitta namespace ko'rsatilgan bo'lsa, uni ro'yxatga qo'shamiz
      }
      if (match[2]) {
        match[2].split(',').forEach(ns => {
          detectedNamespaces.push(ns.trim().replace(/['"]/g, '')); // Bir nechta namespace lar bo'lsa, ularni ajratib olish
        });
      }
    }

    // Agar fayl 'schema.ts' bo'lsa, "validation" namespace ni qo'shamiz
    if (/schema\.ts$/i.test(file.path)) {
      detectedNamespaces.push('validation');
    }

    // Agar detectedNamespaces bo'sh bo'lsa, 'common' qo'shamiz
    if (detectedNamespaces.length === 0) {
      detectedNamespaces.push('common');
    }

    // Faol namespace'larni ko'rsatuvchi debug logi
    console.log(file.path, 'Namespaces detected:', detectedNamespaces);

    // Agar namespace'lar mavjud bo'lsa, ularni ishlatamiz
    this.parser.options.ns = detectedNamespaces;

    // Har bir namespace uchun tarjimalarni ajratib saqlaymiz
    detectedNamespaces.forEach(ns => {
      this.parser.options.defaultNs = ns; // Har bir namespace uchun alohida saqlash
      this.parser.parseFuncFromString(content);
    });

    done();
  },
};
