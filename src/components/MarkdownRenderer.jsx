import React from 'react';

/**
 * Parses inline markdown formatting (bold, italic, code).
 * Converts **bold**, *bold*, __bold__, and `code` into HTML nodes without displaying asterisks.
 */
export function renderInlineMarkdown(text, isUser = false) {
  if (!text) return null;

  // Regex to match ***bold italic***, **bold**, __bold__, `code`, or *bold/italic*
  const regex = /(\*\*\*[\s\S]+?\*\*\*|\*\*[\s\S]+?\*\*|___[\s\S]+?___|__[\s\S]+?__|`[^`]+`|\*[^\s\*][^\*]*?\*)/g;

  const parts = text.split(regex);

  return parts.map((part, index) => {
    if (!part) return null;

    // ***bold italic***
    if (part.startsWith('***') && part.endsWith('***') && part.length >= 6) {
      const inner = part.slice(3, -3);
      return (
        <strong key={index} className={isUser ? "font-bold italic text-white" : "font-bold italic text-slate-900"}>
          {inner}
        </strong>
      );
    }

    // **bold**
    if (part.startsWith('**') && part.endsWith('**') && part.length >= 4) {
      const inner = part.slice(2, -2);
      return (
        <strong key={index} className={isUser ? "font-bold text-white" : "font-semibold text-slate-900"}>
          {inner}
        </strong>
      );
    }

    // __bold__
    if (part.startsWith('__') && part.endsWith('__') && part.length >= 4) {
      const inner = part.slice(2, -2);
      return (
        <strong key={index} className={isUser ? "font-bold text-white" : "font-semibold text-slate-900"}>
          {inner}
        </strong>
      );
    }

    // *bold/italic* (e.g. *Student Name:* or *text*)
    if (part.startsWith('*') && part.endsWith('*') && part.length >= 2 && !part.slice(1, -1).includes('*')) {
      const inner = part.slice(1, -1);
      return (
        <strong key={index} className={isUser ? "font-bold text-white" : "font-semibold text-slate-900"}>
          {inner}
        </strong>
      );
    }

    // `code`
    if (part.startsWith('`') && part.endsWith('`') && part.length >= 2) {
      const inner = part.slice(1, -1);
      return (
        <code
          key={index}
          className={
            isUser
              ? "px-1.5 py-0.5 bg-sky-600 border border-sky-400 text-white rounded text-xs font-mono"
              : "px-1.5 py-0.5 bg-slate-100 border border-slate-200 text-pink-600 rounded text-xs font-mono"
          }
        >
          {inner}
        </code>
      );
    }

    return part;
  });
}

/**
 * Checks if a line contains table column delimiters (|)
 */
function isTableLine(line) {
  if (!line) return false;
  const trimmed = line.trim();
  return trimmed.includes('|');
}

/**
 * Checks if a line is a table header separator line (e.g., |---|---| or ---|---)
 */
function isTableSeparatorLine(line) {
  if (!line) return false;
  const trimmed = line.trim();
  return /^\|?\s*:?-{2,}:?\s*(\|\s*:?-{2,}:?\s*)*\|?$/.test(trimmed);
}

/**
 * Render Markdown Content with Table and Bold support
 */
export default function MarkdownRenderer({ content, isUser = false }) {
  if (!content) return null;

  const lines = content.split('\n');
  const blocks = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];

    // 1. Code block handling (```)
    if (line.trim().startsWith('```')) {
      const language = line.trim().slice(3).trim();
      const codeLines = [];
      i++;
      while (i < lines.length && !lines[i].trim().startsWith('```')) {
        codeLines.push(lines[i]);
        i++;
      }
      if (i < lines.length) i++; // skip closing ```
      blocks.push({
        type: 'code',
        language,
        code: codeLines.join('\n')
      });
      continue;
    }

    // 2. Table handling
    if (isTableLine(line)) {
      const tableLines = [];
      let j = i;
      let hasSeparator = false;

      while (j < lines.length && isTableLine(lines[j])) {
        if (isTableSeparatorLine(lines[j])) {
          hasSeparator = true;
        }
        tableLines.push(lines[j]);
        j++;
      }

      if (tableLines.length >= 2 || (tableLines.length >= 1 && hasSeparator)) {
        blocks.push({
          type: 'table',
          lines: tableLines
        });
        i = j;
        continue;
      }
    }

    // 3. Unordered List handling (- or * at start of line)
    if (/^\s*[-*+]\s+/.test(line)) {
      const listItems = [];
      while (i < lines.length && /^\s*[-*+]\s+/.test(lines[i])) {
        listItems.push(lines[i].replace(/^\s*[-*+]\s+/, ''));
        i++;
      }
      blocks.push({
        type: 'unordered-list',
        items: listItems
      });
      continue;
    }

    // 4. Ordered List handling (1. 2. etc.)
    if (/^\s*\d+\.\s+/.test(line)) {
      const listItems = [];
      while (i < lines.length && /^\s*\d+\.\s+/.test(lines[i])) {
        listItems.push(lines[i].replace(/^\s*\d+\.\s+/, ''));
        i++;
      }
      blocks.push({
        type: 'ordered-list',
        items: listItems
      });
      continue;
    }

    // 5. Header handling (# ## ###)
    if (/^\s*#{1,6}\s+/.test(line)) {
      const level = line.trim().match(/^#+/)[0].length;
      const text = line.replace(/^\s*#{1,6}\s+/, '');
      blocks.push({
        type: 'header',
        level,
        text
      });
      i++;
      continue;
    }

    // 6. Normal paragraph / line
    blocks.push({
      type: 'paragraph',
      text: line
    });
    i++;
  }

  return (
    <div className="space-y-1.5">
      {blocks.map((block, index) => {
        if (block.type === 'code') {
          return (
            <div key={index} className="my-3 rounded-lg overflow-hidden border border-slate-700 bg-slate-900 text-slate-100 text-xs">
              {block.language && (
                <div className="bg-slate-800 px-3 py-1.5 text-[11px] font-mono text-slate-400 border-b border-slate-700 flex justify-between items-center">
                  <span>{block.language}</span>
                </div>
              )}
              <pre className="p-3 overflow-x-auto font-mono leading-relaxed">
                <code>{block.code}</code>
              </pre>
            </div>
          );
        }

        if (block.type === 'table') {
          return renderTableBlock(block.lines, index, isUser);
        }

        if (block.type === 'unordered-list') {
          return (
            <ul key={index} className="list-disc pl-5 my-1.5 space-y-1">
              {block.items.map((item, itemIdx) => (
                <li key={itemIdx}>{renderInlineMarkdown(item, isUser)}</li>
              ))}
            </ul>
          );
        }

        if (block.type === 'ordered-list') {
          return (
            <ol key={index} className="list-decimal pl-5 my-1.5 space-y-1">
              {block.items.map((item, itemIdx) => (
                <li key={itemIdx}>{renderInlineMarkdown(item, isUser)}</li>
              ))}
            </ol>
          );
        }

        if (block.type === 'header') {
          const Tag = `h${Math.min(block.level + 2, 6)}`;
          return (
            <Tag key={index} className={isUser ? "font-bold text-white mt-2 mb-1" : "font-bold text-slate-900 mt-2 mb-1"}>
              {renderInlineMarkdown(block.text, isUser)}
            </Tag>
          );
        }

        if (block.type === 'paragraph') {
          if (!block.text.trim()) {
            return <div key={index} className="h-1" />;
          }
          return (
            <p key={index} className="leading-relaxed">
              {renderInlineMarkdown(block.text, isUser)}
            </p>
          );
        }

        return null;
      })}
    </div>
  );
}

function renderTableBlock(lines, blockIndex, isUser) {
  const cleanLines = lines.filter((l) => l.trim().length > 0);
  if (cleanLines.length === 0) return null;

  const sepIndex = cleanLines.findIndex((l) => isTableSeparatorLine(l));

  let headerLines = [];
  let dataLines = [];

  if (sepIndex > 0) {
    headerLines = cleanLines.slice(0, sepIndex);
    dataLines = cleanLines.slice(sepIndex + 1);
  } else {
    headerLines = [cleanLines[0]];
    dataLines = cleanLines.slice(1);
  }

  const parseRow = (line) => {
    let trimmed = line.trim();
    if (trimmed.startsWith('|')) trimmed = trimmed.slice(1);
    if (trimmed.endsWith('|')) trimmed = trimmed.slice(0, -1);
    return trimmed.split('|').map((cell) => cell.trim());
  };

  const headers = headerLines.flatMap(parseRow);
  const rows = dataLines.map(parseRow);

  return (
    <div key={blockIndex} className="overflow-x-auto my-3 rounded-xl border border-slate-200/90 shadow-2xs bg-white text-slate-800">
      <table className="w-full text-left border-collapse text-xs sm:text-sm">
        {headers.length > 0 && (
          <thead className="bg-slate-100 text-slate-800 font-semibold border-b border-slate-200">
            <tr>
              {headers.map((header, idx) => (
                <th key={idx} className="px-3.5 py-2.5 border-r last:border-r-0 border-slate-200 font-semibold text-slate-800 whitespace-nowrap">
                  {renderInlineMarkdown(header, false)}
                </th>
              ))}
            </tr>
          </thead>
        )}
        <tbody className="divide-y divide-slate-200 text-slate-700">
          {rows.map((row, rIdx) => (
            <tr key={rIdx} className="hover:bg-slate-50/80 transition-colors odd:bg-white even:bg-slate-50/50">
              {row.map((cell, cIdx) => (
                <td key={cIdx} className="px-3.5 py-2.5 border-r last:border-r-0 border-slate-200 align-top break-words">
                  {renderInlineMarkdown(cell, false)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
