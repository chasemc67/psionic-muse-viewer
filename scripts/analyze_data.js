/**
 * Simple script to analyze your collected data for patterns
 * Run with: node analyze_data.js
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load the data
const data = JSON.parse(
  fs.readFileSync(path.join(__dirname, '../data/sample_items.json'), 'utf8'),
);
const items = data.items;

// Analysis functions
function analyzeCategories() {
  const categoryCount = {};
  const itemsWithMultipleCategories = [];

  items.forEach(item => {
    if (!item.possible_categories) return;

    if (item.possible_categories.length > 1) {
      itemsWithMultipleCategories.push({
        name: item.name,
        categories: item.possible_categories,
      });
    }

    item.possible_categories.forEach(category => {
      categoryCount[category] = (categoryCount[category] || 0) + 1;
    });
  });

  console.log('=== CATEGORY ANALYSIS ===');
  console.log('Category counts:', categoryCount);
  console.log('Items with multiple categories:', itemsWithMultipleCategories);
  console.log('\n');
}

function analyzeTags() {
  const tagCount = {};
  const tagCooccurrence = {};

  items.forEach(item => {
    if (!item.possible_tags) return;

    // Count individual tags
    item.possible_tags.forEach(tag => {
      tagCount[tag] = (tagCount[tag] || 0) + 1;

      // Track which tags appear together
      item.possible_tags.forEach(otherTag => {
        if (tag === otherTag) return;

        tagCooccurrence[tag] = tagCooccurrence[tag] || {};
        tagCooccurrence[tag][otherTag] =
          (tagCooccurrence[tag][otherTag] || 0) + 1;
      });
    });
  });

  console.log('=== TAG ANALYSIS ===');
  console.log('Tag counts:', tagCount);
  console.log('Common tag pairs:');

  // Show common tag pairs
  Object.keys(tagCooccurrence).forEach(tag => {
    const coTags = tagCooccurrence[tag];
    const sortedCoTags = Object.entries(coTags)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3);

    if (sortedCoTags.length > 0) {
      console.log(`  Tags commonly used with "${tag}":`);
      sortedCoTags.forEach(([coTag, count]) => {
        console.log(`    - "${coTag}" (appears together ${count} times)`);
      });
    }
  });
  console.log('\n');
}

function analyzeCategoryTagRelationships() {
  const categoryTagRelationships = {};

  items.forEach(item => {
    if (!item.possible_categories || !item.possible_tags) return;

    item.possible_categories.forEach(category => {
      categoryTagRelationships[category] =
        categoryTagRelationships[category] || {};

      item.possible_tags.forEach(tag => {
        categoryTagRelationships[category][tag] =
          (categoryTagRelationships[category][tag] || 0) + 1;
      });
    });
  });

  console.log('=== CATEGORY-TAG RELATIONSHIPS ===');
  Object.keys(categoryTagRelationships).forEach(category => {
    const tags = categoryTagRelationships[category];
    const sortedTags = Object.entries(tags)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5);

    if (sortedTags.length > 0) {
      console.log(`Common tags in category "${category}":`);
      sortedTags.forEach(([tag, count]) => {
        console.log(`  - "${tag}" (appears ${count} times)`);
      });
    }
  });
}

// Run the analysis
analyzeCategories();
analyzeTags();
analyzeCategoryTagRelationships();

console.log(
  'Analysis complete! Use these patterns to help decide on your schema design.',
);
