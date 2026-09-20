import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const projectSrcDir = path.join(rootDir, 'project');
const certSrcDir = path.join(rootDir, 'certificate');

const projectDestDir = path.join(rootDir, 'public', 'uploads', 'project');
const certDestDir = path.join(rootDir, 'public', 'uploads', 'certificate');
const dataDestDir = path.join(rootDir, 'src', 'data');
const publicDataDestDir = path.join(rootDir, 'public', 'data');

const GLOBE_ANCHORS = [
    { name: 'Tangerang', location: [-6.2361, 106.5186] },
    { name: 'Tokyo', location: [35.6762, 139.6503] },
    { name: 'San Francisco', location: [37.7749, -122.4194] },
    { name: 'London', location: [51.5074, -0.1278] },
    { name: 'Sydney', location: [-33.8688, 151.2093] },
    { name: 'New York', location: [40.7128, -74.0060] },
    { name: 'Berlin', location: [52.5200, 13.4050] },
    { name: 'Singapore', location: [1.3521, 103.8198] },
    { name: 'Seoul', location: [37.5665, 126.9780] },
    { name: 'Toronto', location: [43.6532, -79.3832] },
    { name: 'Dubai', location: [25.2048, 55.2708] },
    { name: 'São Paulo', location: [-23.5505, -46.6333] }
];

const ROTATIONS = ['-3deg', '4deg', '-2deg', '3deg', '-4deg', '2deg', '-5deg'];
const VALID_IMG_EXT = new Set(['.png', '.jpg', '.jpeg', '.webp', '.svg']);

function ensureDirs() {
    [projectSrcDir, certSrcDir, projectDestDir, certDestDir, dataDestDir, publicDataDestDir].forEach(dir => {
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }
    });
}

function cleanTitle(str) {
    return str
        .replace(/^[0-9]+[-_]/, '')
        .replace(/[-_]/g, ' ')
        .replace(/\b\w/g, char => char.toUpperCase());
}

function slugify(str) {
    return str
        .replace(/^[0-9]+[-_]/, '')
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');
}

function copyDirRecursive(src, dest) {
    if (!fs.existsSync(dest)) fs.mkdirSync(dest, { recursive: true });
    const entries = fs.readdirSync(src, { withFileTypes: true });
    for (let entry of entries) {
        const srcPath = path.join(src, entry.name);
        const destPath = path.join(dest, entry.name);
        if (entry.isDirectory()) {
            copyDirRecursive(srcPath, destPath);
        } else {
            fs.copyFileSync(srcPath, destPath);
        }
    }
}

function syncProjects() {
    if (!fs.existsSync(projectSrcDir)) return { showcaseItems: [], projectsMap: [] };

    const entries = fs.readdirSync(projectSrcDir, { withFileTypes: true });
    const showcaseItems = [];
    const projectsMap = {};
    let anchorIdx = 0;

    for (let entry of entries) {
        if (entry.name.startsWith('.')) continue;

        const entryPath = path.join(projectSrcDir, entry.name);

        if (entry.isDirectory()) {
            const folderSlug = slugify(entry.name);
            const targetFolder = path.join(projectDestDir, folderSlug);
            copyDirRecursive(entryPath, targetFolder);

            // Read info.json if present
            let info = {
                id: folderSlug,
                title: cleanTitle(entry.name),
                tags: ['Full Stack'],
                link: '#',
                descriptionEn: `<p>${cleanTitle(entry.name)} project details.</p>`,
                descriptionId: `<p>Detail proyek ${cleanTitle(entry.name)}.</p>`
            };

            const infoFile = path.join(entryPath, 'info.json');
            if (fs.existsSync(infoFile)) {
                try {
                    const parsed = JSON.parse(fs.readFileSync(infoFile, 'utf8'));
                    info = { ...info, ...parsed };
                } catch (e) {
                    console.error(`Warning: could not parse ${infoFile}:`, e);
                }
            }

            // Find cover image
            const dirFiles = fs.readdirSync(entryPath);
            let coverFile = dirFiles.find(f => /^cover\./i.test(f) && VALID_IMG_EXT.has(path.extname(f).toLowerCase()))
                || dirFiles.find(f => VALID_IMG_EXT.has(path.extname(f).toLowerCase()));

            const coverUrl = coverFile ? `/uploads/project/${folderSlug}/${coverFile}` : '/images/project1.png';

            // Find screenshots
            const images = [coverUrl];
            const screenshotsDir = path.join(entryPath, 'screenshots');
            if (fs.existsSync(screenshotsDir)) {
                const screenFiles = fs.readdirSync(screenshotsDir)
                    .filter(f => VALID_IMG_EXT.has(path.extname(f).toLowerCase()))
                    .map(f => `/uploads/project/${folderSlug}/screenshots/${f}`);
                images.push(...screenFiles);
            }

            info.images = images;
            info.cover = coverUrl;
            projectsMap[info.id] = info;

            if (info.showOnGlobe !== false) {
                const anchor = GLOBE_ANCHORS[anchorIdx % GLOBE_ANCHORS.length];
                showcaseItems.push({
                    id: `project-${info.id}`,
                    slug: info.id,
                    title: info.showcaseTitle || info.title,
                    type: 'project',
                    image: coverUrl,
                    location: info.location || anchor.location,
                    anchorName: info.anchorName || anchor.name,
                    rotation: info.rotation || ROTATIONS[anchorIdx % ROTATIONS.length]
                });
                anchorIdx++;
            }

        } else if (entry.isFile() && VALID_IMG_EXT.has(path.extname(entry.name).toLowerCase())) {
            // Standalone image in project/
            const fileSlug = slugify(entry.name);
            const destPath = path.join(projectDestDir, entry.name);
            fs.copyFileSync(entryPath, destPath);

            const coverUrl = `/uploads/project/${entry.name}`;
            const title = cleanTitle(entry.name);

            projectsMap[fileSlug] = {
                id: fileSlug,
                title: title,
                tags: ['Project'],
                link: '#',
                cover: coverUrl,
                images: [coverUrl],
                descriptionEn: `<p>${title} showcase project.</p>`,
                descriptionId: `<p>Proyek portofolio ${title}.</p>`
            };

            const anchor = GLOBE_ANCHORS[anchorIdx % GLOBE_ANCHORS.length];
            showcaseItems.push({
                id: `project-${fileSlug}`,
                slug: fileSlug,
                title: title,
                type: 'project',
                image: coverUrl,
                location: anchor.location,
                anchorName: anchor.name,
                rotation: ROTATIONS[anchorIdx % ROTATIONS.length]
            });
            anchorIdx++;
        }
    }

    return { showcaseItems, projectsMap };
}

function syncCertificates(startAnchorIdx) {
    if (!fs.existsSync(certSrcDir)) return [];

    const files = fs.readdirSync(certSrcDir).filter(f => {
        const ext = path.extname(f).toLowerCase();
        return VALID_IMG_EXT.has(ext);
    });

    const certItems = [];
    files.forEach((file, idx) => {
        const srcPath = path.join(certSrcDir, file);
        const destPath = path.join(certDestDir, file);
        fs.copyFileSync(srcPath, destPath);

        const anchor = GLOBE_ANCHORS[(startAnchorIdx + idx) % GLOBE_ANCHORS.length];
        const slug = slugify(file);
        const title = cleanTitle(file);

        certItems.push({
            id: `cert-${slug}`,
            slug: slug,
            title: title,
            type: 'certificate',
            filename: file,
            image: `/uploads/certificate/${file}`,
            location: anchor.location,
            anchorName: anchor.name,
            rotation: ROTATIONS[(startAnchorIdx + idx) % ROTATIONS.length]
        });
    });

    return certItems;
}

function main() {
    console.log('🔄 Syncing projects & certificates to portfolio...');
    ensureDirs();

    const { showcaseItems: projectShowcase, projectsMap } = syncProjects();
    const certShowcase = syncCertificates(projectShowcase.length);

    const showcaseData = {
        updatedAt: new Date().toISOString(),
        totalItems: projectShowcase.length + certShowcase.length,
        projects: projectShowcase,
        certificates: certShowcase,
        items: [...projectShowcase, ...certShowcase]
    };

    // Save showcase data for Globe
    const showcaseJson = JSON.stringify(showcaseData, null, 2);
    fs.writeFileSync(path.join(dataDestDir, 'showcase.json'), showcaseJson);
    fs.writeFileSync(path.join(publicDataDestDir, 'showcase.json'), showcaseJson);

    // Save projects data for Project Modals
    const projectsJson = JSON.stringify(projectsMap, null, 2);
    fs.writeFileSync(path.join(dataDestDir, 'projects.json'), projectsJson);
    fs.writeFileSync(path.join(publicDataDestDir, 'projects.json'), projectsJson);

    console.log(`✅ Sync successful!`);
    console.log(`   📁 Projects: ${projectShowcase.length} folders/items synced`);
    console.log(`   📜 Certificates: ${certShowcase.length} files synced`);
    console.log(`   📦 Generated: src/data/showcase.json & src/data/projects.json`);
}

main();
