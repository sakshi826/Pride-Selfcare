import fs from 'fs';
import path from 'path';

let content = fs.readFileSync('src/features/pride/dynamic/identity-exploration/components/explore/ExploreIdentity.tsx', 'utf-8');

// 1. Wrap title and subtitle props
content = content.replace(/(title|subtitle)="([^"]+)"/g, '$1={t("$2")}');

// 2. Wrap Bubble and QuestionBubble children
content = content.replace(/<(Bubble|QuestionBubble)([^>]*)>([\s\S]*?)<\/\1>/g, (match, tag, attrs, children) => {
    const trimmed = children.trim();
    if (!trimmed || trimmed.includes('{') || trimmed.includes('<')) return match;
    return `<${tag}${attrs}>{t("${trimmed.replace(/"/g, '\\"')}")}</${tag}>`;
});

// 3. Wrap array elements in q1, q2, opts
content = content.replace(/const (q1|q2|opts) = \[\s*([\s\S]*?)\s*\];/g, (match, name, elements) => {
    const wrappedElements = elements.split(',').map(el => {
        const trimmed = el.trim();
        if (trimmed.startsWith('"') && trimmed.endsWith('"')) {
            return `t(${trimmed})`;
        }
        return el;
    }).join(', ');
    return `const ${name} = [${wrappedElements}];`;
});

// 4. Wrap Btn children
content = content.replace(/<Btn([^>]*)>([^<]+)<\/Btn>/g, '<Btn$1>{t("$2")}</Btn>');

// 5. Wrap specific tags
content = content.replace(/<([hH][1-6]|[pP])([^>]*)>([\s\S]*?)<\/\1>/g, (match, tag, attrs, children) => {
    const trimmed = children.trim();
    if (!trimmed || trimmed.includes('{') || trimmed.includes('<')) return match;
    return `<${tag}${attrs}>{t("${trimmed.replace(/"/g, '\\"')}")}</${tag}>`;
});

// 6. Wrap span children if they are just text
content = content.replace(/<span>([^<]+)<\/span>/g, '<span>{t("$1")}</span>');

// 7. Wrap object labels in fields array
content = content.replace(/label: "([^"]+)"/g, 'label: t("$1")');

// 8. Wrap strings in cards array (S8)
content = content.replace(/(title|text): "([^"]+)"/g, '$1: t("$2")');

// 9. Wrap strings in tips array (S9)
content = content.replace(/const tips = \[\s*([\s\S]*?)\s*\];/g, (match, elements) => {
    const wrappedElements = elements.split(',').map(el => {
        const trimmed = el.trim();
        if (trimmed.startsWith('"') && trimmed.endsWith('"')) {
            return `t(${trimmed})`;
        }
        return el;
    }).join(', ');
    return `const tips = [${wrappedElements}];`;
});

fs.writeFileSync('src/features/pride/dynamic/identity-exploration/components/explore/ExploreIdentity.tsx', content);
