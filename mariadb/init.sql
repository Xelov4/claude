CREATE DATABASE IF NOT EXISTS video_ia_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE video_ia_db;

CREATE USER IF NOT EXISTS 'video_ia_user'@'%' IDENTIFIED BY 'Thunder23**';
GRANT ALL PRIVILEGES ON video_ia_db.* TO 'video_ia_user'@'%';
FLUSH PRIVILEGES;

-- Création des tables (categories, tools, tags, etc.)
CREATE TABLE categories (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    slug VARCHAR(100) NOT NULL UNIQUE,
    description TEXT,
    parent_id INT NULL,
    order_position INT DEFAULT 0,
    is_visible BOOLEAN DEFAULT TRUE,
    meta_title VARCHAR(255),
    meta_description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (parent_id) REFERENCES categories(id) ON DELETE SET NULL
);

CREATE TABLE tools (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    slug VARCHAR(100) NOT NULL UNIQUE,
    short_description VARCHAR(255) NOT NULL,
    long_description TEXT,
    logo_url VARCHAR(255),
    image_url VARCHAR(255),
    website_url VARCHAR(255),
    rating DECIMAL(3,2) DEFAULT 0.0,
    review_count INT DEFAULT 0,
    category_id INT,
    pricing_type ENUM('Gratuit', 'Freemium', 'Payant', 'Essai Gratuit'),
    price_details VARCHAR(255),
    last_updated DATE,
    is_featured BOOLEAN DEFAULT FALSE,
    twitter_url VARCHAR(255),
    linkedin_url VARCHAR(255),
    instagram_url VARCHAR(255),
    is_visible BOOLEAN DEFAULT TRUE,
    meta_title VARCHAR(255),
    meta_description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE SET NULL
);

CREATE TABLE tags (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) NOT NULL UNIQUE,
    slug VARCHAR(50) NOT NULL UNIQUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE tool_tags (
    tool_id INT NOT NULL,
    tag_id INT NOT NULL,
    PRIMARY KEY (tool_id, tag_id),
    FOREIGN KEY (tool_id) REFERENCES tools(id) ON DELETE CASCADE,
    FOREIGN KEY (tag_id) REFERENCES tags(id) ON DELETE CASCADE
);

CREATE TABLE features (
    id INT AUTO_INCREMENT PRIMARY KEY,
    tool_id INT NOT NULL,
    title VARCHAR(100) NOT NULL,
    description TEXT,
    order_position INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (tool_id) REFERENCES tools(id) ON DELETE CASCADE
);

CREATE TABLE use_cases (
    id INT AUTO_INCREMENT PRIMARY KEY,
    tool_id INT NOT NULL,
    title VARCHAR(100) NOT NULL,
    description TEXT,
    image_url VARCHAR(255),
    order_position INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (tool_id) REFERENCES tools(id) ON DELETE CASCADE
);

CREATE TABLE target_audiences (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE,
    slug VARCHAR(100) NOT NULL UNIQUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE tool_audiences (
    tool_id INT NOT NULL,
    audience_id INT NOT NULL,
    description TEXT,
    PRIMARY KEY (tool_id, audience_id),
    FOREIGN KEY (tool_id) REFERENCES tools(id) ON DELETE CASCADE,
    FOREIGN KEY (audience_id) REFERENCES target_audiences(id) ON DELETE CASCADE
);

CREATE TABLE reviews (
    id INT AUTO_INCREMENT PRIMARY KEY,
    tool_id INT NOT NULL,
    user_name VARCHAR(100) NOT NULL,
    rating INT NOT NULL CHECK (rating BETWEEN 1 AND 5),
    comment TEXT,
    review_date DATE DEFAULT (CURRENT_DATE),
    is_verified BOOLEAN DEFAULT FALSE,
    is_visible BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (tool_id) REFERENCES tools(id) ON DELETE CASCADE
);

-- Insérer des exemples de données (categories)
INSERT INTO categories (name, slug, description, parent_id, order_position, is_visible, meta_title, meta_description) VALUES
('Vidéo IA', 'video-ia', 'Catégorie principale pour tous les outils d''intelligence artificielle liés à la vidéo.', NULL, 1, 1, 'Vidéo IA : Les Meilleurs Outils IA pour la Vidéo', 'Découvrez les meilleurs outils d''IA pour la création, l''édition et l''analyse vidéo.'),
('Génération vidéo', 'generation-video', 'Outils pour créer des vidéos à partir de texte, d''images ou d''autres médias.', 1, 1, 1, 'Génération Vidéo IA : Créez Facilement des Vidéos', 'Créez des vidéos professionnelles en quelques minutes grâce à l''IA.'),
('Édition vidéo', 'edition-video', 'Outils pour modifier et améliorer des vidéos existantes.', 1, 2, 1, 'Édition Vidéo IA : Simplifiez le Montage Vidéo', 'Améliorez et transformez vos vidéos avec l''aide de l''intelligence artificielle.');

-- Insérer des exemples de données (tools)
INSERT INTO tools (name, slug, short_description, long_description, logo_url, image_url, website_url, rating, review_count, category_id, pricing_type, price_details, last_updated, is_featured, twitter_url, linkedin_url, instagram_url, is_visible, meta_title, meta_description) VALUES
('Synthesia', 'synthesia', 'Créez des vidéos IA avec des avatars réalistes.', 'Synthesia est une plateforme de création vidéo IA qui vous permet de créer des vidéos professionnelles sans avoir besoin de caméras, de micros ou d''acteurs. Utilisez des avatars IA réalistes pour présenter vos messages.', '/logos/synthesia.png', '/images/synthesia.jpg', 'https://www.synthesia.io', 4.5, 125, 2, 'Payant', 'Abonnement mensuel à partir de 30 $.', '2024-06-28', 1, NULL, NULL, NULL, 1, 'Synthesia : Créez des Vidéos IA avec Avatars', 'Créez facilement des vidéos professionnelles avec des avatars IA réalistes. Testez Synthesia gratuitement !'),
('Pictory', 'pictory', 'Transformez vos articles de blog en vidéos engageantes.', 'Pictory est un outil qui vous permet de créer des vidéos à partir de vos articles de blog, de vos scripts ou de vos présentations. Il utilise l''IA pour identifier les moments clés de votre contenu et les transformer en scènes vidéo attrayantes.', '/logos/pictory.png', '/images/pictory.jpg', 'https://pictory.ai/', 4.2, 88, 2, 'Freemium', 'Version gratuite limitée. Abonnement payant à partir de 19 $ par mois.', '2024-06-29', 0, NULL, NULL, NULL, 1, 'Pictory : Transformez vos Articles en Vidéo', 'Transformez vos articles de blog en vidéos engageantes en quelques clics.'),
('Descript', 'descript', 'Éditeur audio et vidéo tout-en-un avec IA.', 'Descript est un éditeur audio et vidéo qui utilise l''IA pour faciliter le processus de montage. Il transcrit automatiquement votre audio et votre vidéo, vous permettant de modifier votre contenu en modifiant simplement le texte. Il offre également des fonctionnalités d''IA pour supprimer les mots de remplissage, améliorer la qualité audio, etc.', '/logos/descript.png', '/images/descript.jpg', 'https://www.descript.com/', 4.7, 210, 3, 'Freemium', 'Version gratuite limitée. Abonnement payant à partir de 12 $ par mois.', '2024-06-30', 1, NULL, NULL, NULL, 1, 'Descript : L''Éditeur Audio/Vidéo IA Ultime', 'Éditez vos vidéos et votre audio comme un pro grâce à l''IA. Transcription, suppression des mots de remplissage et bien plus encore !');

-- Insérer des exemples de données (tags)
INSERT INTO tags (name, slug) VALUES
('IA Générative', 'ia-generative'),
('Avatars IA', 'avatars-ia'),
('Montage vidéo', 'montage-video');

-- Insérer des exemples de données (tool_tags)
INSERT INTO tool_tags (tool_id, tag_id) VALUES
(1, 1),
(1, 2),
(2, 1);

-- Insérer des exemples de données (target_audiences)
INSERT INTO target_audiences (name, slug) VALUES
('Marketeurs', 'marketeurs'),
('Créateurs de contenu', 'createurs-contenu'),
('Entreprises', 'entreprises');

-- Insérer des exemples de données (tool_audiences)
INSERT INTO tool_audiences (tool_id, audience_id, description) VALUES
(1, 1, 'Idéal pour les marketeurs qui veulent créer des vidéos rapidement.'),
(2, 2, 'Parfait pour les créateurs de contenu qui cherchent à automatiser la création.'),
(3, 3, 'Convient aux entreprises de toutes tailles.');

-- Insérer des exemples de données (features)
INSERT INTO features (tool_id, title, description, order_position) VALUES
(1, 'Avatars IA réalistes', 'Choisissez parmi une variété d''avatars IA réalistes pour représenter votre marque.', 1),
(1, 'Synthèse vocale de haute qualité', 'Convertissez votre texte en voix off naturelle en quelques clics.', 2),
(2, 'Transformation automatique en vidéo', 'Transformez automatiquement vos articles de blog en vidéos engageantes.', 1);

-- Insérer des exemples de données (use_cases)
INSERT INTO use_cases (tool_id, title, description, image_url, order_position) VALUES
(1, 'Vidéos marketing', 'Créez des vidéos marketing percutantes pour promouvoir votre entreprise.', '/use-cases/synthesia-marketing.jpg', 1),
(2, 'Vidéos de formation', 'Formez vos employés avec des vidéos interactives.', '/use-cases/pictory-formation.jpg', 1),
(3, 'Podcasts vidéo', 'Créez des podcasts vidéo de qualité professionnelle.', '/use-cases/descript-podcast.jpg', 1);

-- Insérer des exemples de données (reviews)
INSERT INTO reviews (tool_id, user_name, rating, comment, review_date, is_verified, is_visible) VALUES
(1, 'John Doe', 5, 'Synthesia est incroyable ! J''ai pu créer une vidéo professionnelle en quelques minutes.', '2024-06-29', 1, 1),
(2, 'Jane Smith', 4, 'Pictory est un excellent outil pour transformer mes articles de blog en vidéos. Je recommande !', '2024-06-28', 0, 1),
(3, 'Peter Jones', 5, 'Descript a changé ma façon de monter des vidéos. L''IA est vraiment impressionnante et me fait gagner un temps précieux.', '2024-06-27', 1, 1);