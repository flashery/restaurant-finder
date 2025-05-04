import fs from 'fs';
import path from 'path';
import csv from 'csv-parser';

export interface Category {
  id: string;
  name: string;
  label: string;
}

// ---- INTERNAL STORE ----
let categoryList: Category[] = [];
let categoryMap: Record<string, string> = {};

export async function loadCategories(): Promise<Category[]> {
  const csvPath = path.resolve(__dirname, '../../../shared/data/fs-categories.csv');
  const categories: Category[] = [];

  return new Promise((resolve, reject) => {
    fs.createReadStream(csvPath)
      .pipe(csv())
      .on('data', (row) => {
        const name = row.category_name.toLowerCase();
        const id = row.category_id;
        const label = row.category_label;

        const category: Category = { id, name: row.category_name, label };
        categories.push(category);

        categoryMap[name] = id;
      })
      .on('end', () => {
        categoryList = categories; // store globally
        resolve(categories);
      })
      .on('error', reject);
  });
}

export const resolveCategoryId = (action: string): string | undefined => {
  const base = action.replace(/_search$/, '').replace(/_/g, '').toLowerCase();

  if (categoryMap[base]) return categoryMap[base];

  for (const category of categoryList) {
    if (
      category.name.toLowerCase().includes(base) ||
      category.label.toLowerCase().includes(base)
    ) {
      return category.id;
    }
  }

  return undefined;
};
