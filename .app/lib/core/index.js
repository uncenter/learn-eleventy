import { markdownLibrary } from "./md.library.js";
import { EleventyHtmlBasePlugin } from "@11ty/eleventy";

export const core = {
  configObj: {
    pathPrefix: process.env.ELEVENTY_NOTES_PATH_PREFIX || undefined,
    markdownTemplateEngine: false,
  },

  /**
   * Sets up the core.
   * @param {import("@11ty/eleventy").UserConfig} config
   */
  async setup(config) {
    config.setLibrary("md", await markdownLibrary(config));

    config.addPlugin(EleventyHtmlBasePlugin);

    config.setServerOptions({
      watch: ["dist/app.js", "dist/app.*.css"],
    });

    config.setInputDirectory("./../");
    config.setOutputDirectory("dist");
    config.setDataDirectory(".app/_data");
    config.setIncludesDirectory(".app/lib");

    config.addWatchTarget("./../app.mjs");
  },
};
