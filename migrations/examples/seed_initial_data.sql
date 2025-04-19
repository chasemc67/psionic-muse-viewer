-- Seed Categories
INSERT INTO categories (name, slug, description, icon) VALUES
('Online Fretboard Tools', 'online-fretboard-tools', 'Interactive tools for learning and exploring the guitar fretboard', 'fretboard-icon'),
('Music Theory Tools', 'music-theory-tools', 'Applications and resources for understanding music theory', 'theory-icon'),
('Backing Tracks', 'backing-tracks', 'Resources for practice and jam tracks', 'tracks-icon'),
('Online Lessons', 'online-lessons', 'Video and interactive guitar lesson platforms', 'lessons-icon'),
('Virtual Teachers', 'virtual-teachers', 'Instructors offering remote lessons via Zoom or similar platforms', 'virtual-teacher-icon'),
('Local Teachers', 'local-teachers', 'In-person guitar instructors by location', 'local-teacher-icon'),
('Lutherie', 'lutherie', 'Guitar repair, building, and customization', 'luthier-icon'),
('Guitar Stores', 'guitar-stores', 'Physical and online retailers of guitars and equipment', 'store-icon'),
('Tablature & Chord Resources', 'tablature-chord-resources', 'Websites and apps for finding tabs and chords', 'tab-icon');

-- Seed Tag Types
INSERT INTO tags (name, slug, type, description) VALUES
-- Format tags
('Tool', 'tool', 'format', 'Software or hardware tools'),
('App', 'app', 'format', 'Mobile or desktop applications'),
('Website', 'website', 'format', 'Web-based resources'),
('Service', 'service', 'format', 'Human-delivered services'),
('Physical Product', 'physical-product', 'format', 'Tangible items'),

-- Platform tags
('Web', 'web', 'platform', 'Accessible via web browser'),
('iOS', 'ios', 'platform', 'Available on iPhone/iPad'),
('Android', 'android', 'platform', 'Available on Android devices'),
('Desktop', 'desktop', 'platform', 'Desktop software'),

-- Pricing tags
('Free', 'free', 'pricing', 'No cost to use'),
('Freemium', 'freemium', 'pricing', 'Basic features free, premium features paid'),
('Paid', 'paid', 'pricing', 'Requires payment'),
('Subscription', 'subscription', 'pricing', 'Recurring payment model'),
('One-time Purchase', 'one-time-purchase', 'pricing', 'Single payment'),

-- Skill level tags
('Beginner', 'beginner', 'skill-level', 'Suitable for beginners'),
('Intermediate', 'intermediate', 'skill-level', 'For players with some experience'),
('Advanced', 'advanced', 'skill-level', 'For experienced players'),

-- Guitar type tags
('Electric', 'electric', 'guitar-type', 'For electric guitars'),
('Acoustic', 'acoustic', 'guitar-type', 'For acoustic guitars'),
('Classical', 'classical', 'guitar-type', 'For classical/nylon string guitars'),
('Bass', 'bass', 'guitar-type', 'For bass guitars'),
('Lefty', 'lefty', 'guitar-type', 'Left-handed friendly'); 