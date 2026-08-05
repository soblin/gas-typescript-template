const config = {
  "*.{js,ts,tsx,mjs}": ["prettier --write", "eslint --fix", "eslint"],
  "*.{json,}": ["prettier --write"],
};

export default config;
