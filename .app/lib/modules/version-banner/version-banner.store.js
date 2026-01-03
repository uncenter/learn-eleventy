/**
 * Creates the store for the dismissable version banner.
 *
 * @param {import('alpinejs').Alpine} Alpine The alpine instance.
 */
export default function (Alpine) {
  Alpine.store("versionBanner", {
    hidden: Alpine.$persist(false).as("hide-version-banner"),
    hide() {
      this.hidden = true;
    },
  });
}
