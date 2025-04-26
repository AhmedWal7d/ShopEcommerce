'use client'

import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  // تم تمديد الإعدادات الخاصة بـ Next.js و TypeScript
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  // تعطيل قاعدة @typescript-eslint/no-explicit-any
  {
    rules: {
      "@typescript-eslint/no-explicit-any": "off", // إيقاف القاعدة التي تمنع استخدام any
    },
  },
];

export default eslintConfig;
