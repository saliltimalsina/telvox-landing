// Local stand-in for the "esm-env" package's browser build, since this file
// tree is served as-is (no bundler) and can't resolve bare specifiers or
// package.json export conditions. This embed only ever runs in a real
// browser, so these are hardcoded rather than detected.
export const BROWSER = true;
export const DEV = false;
export const NODE = false;
