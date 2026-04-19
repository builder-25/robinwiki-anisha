-- Rename wiki type: goal → objective
UPDATE wikis SET type = 'objective' WHERE type = 'goal';
UPDATE wiki_types SET slug = 'objective', name = 'Objective' WHERE slug = 'goal';

-- Rename wiki type: principle → principles
UPDATE wikis SET type = 'principles' WHERE type = 'principle';
UPDATE wiki_types SET slug = 'principles', name = 'Principles' WHERE slug = 'principle';
