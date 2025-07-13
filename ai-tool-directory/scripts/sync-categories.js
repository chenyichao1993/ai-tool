"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = __importDefault(require("fs"));
var path_1 = __importDefault(require("path"));
// 预设emoji池，icon不重复
var emojiPool = [
    '📝', '🎨', '🎬', '🎵', '💼', '💻', '🔍', '📦', '🧠', '🌐', '🤖', '📊', '🗂️', '🛠️', '📚', '🧩', '🧰', '🗃️', '📈', '🧾', '🗒️', '📅', '🧮', '🧑‍💻', '🧑‍🏫', '🧑‍🔬', '🧑‍🎨', '🧑‍💼', '🧑‍🚀', '🧑‍⚖️', '🧑‍🍳', '🧑‍🔧', '🧑‍🌾', '🧑‍🎤', '🧑‍🎓', '🧑‍✈️', '🧑‍🚒', '🧑‍🚗', '🧑‍🔬', '🧑‍🎨', '🧑‍💻', '🧑‍🏫', '🧑‍🔧', '🧑‍🍳', '🧑‍🚀', '🧑‍⚖️', '🧑‍🌾', '🧑‍🎤', '🧑‍🎓', '🧑‍✈️', '🧑‍🚒', '🧑‍🚗'
];
// AI风格desc生成
function genDesc(category) {
    return "AI tools for ".concat(category.toLowerCase(), ".");
}
var root = process.cwd();
var aiToolPath = path_1.default.join(root, 'public', 'AI tool.json');
var categoriesPath = path_1.default.join(root, 'public', 'categories.json');
var metaPath = path_1.default.join(root, 'public', 'categories-meta.json');
var tools = JSON.parse(fs_1.default.readFileSync(aiToolPath, 'utf-8'));
var seen = new Set();
var categories = [];
// 按首次出现顺序收集所有唯一分类
for (var _i = 0, tools_1 = tools; _i < tools_1.length; _i++) {
    var tool = tools_1[_i];
    if (tool.category && !seen.has(tool.category)) {
        seen.add(tool.category);
        categories.push(tool.category);
    }
}
// 生成icon和desc，icon不重复
var meta = {};
var emojiIdx = 0;
var _loop_1 = function (cat) {
    var icon = emojiPool[emojiIdx % emojiPool.length];
    // 保证icon唯一
    while (Object.values(meta).some(function (m) { return m.icon === icon; })) {
        emojiIdx++;
        icon = emojiPool[emojiIdx % emojiPool.length];
    }
    meta[cat] = {
        icon: icon,
        desc: genDesc(cat)
    };
    emojiIdx++;
};
for (var _a = 0, categories_1 = categories; _a < categories_1.length; _a++) {
    var cat = categories_1[_a];
    _loop_1(cat);
}
// 写入categories.json
fs_1.default.writeFileSync(categoriesPath, JSON.stringify(categories, null, 2));
// 写入categories-meta.json
fs_1.default.writeFileSync(metaPath, JSON.stringify(meta, null, 2));
console.log('分类同步完成！');
