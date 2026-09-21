// Use public static assets by path instead of importing from @public
const homeHero = "/home-hero-desktop.webp";
const homeHeroMobile = "/home-hero-mobile.webp";

export function HeroBackground() {
  return (
    <>
      <div aria-hidden="true" className="ei-home-hero-base" />

      <picture
        aria-hidden="true"
        className="ei-home-hero-picture"
      >
        <source media="(max-width: 768px)" srcSet={homeHeroMobile} />

        <img
          src={homeHero}
          alt=""
          className="ei-home-hero-image"
        />
      </picture>

      <div aria-hidden="true" className="ei-home-hero-wash" />
      <div aria-hidden="true" className="ei-home-hero-orbit" />
      <div aria-hidden="true" className="ei-home-hero-frame" />
    </>
  );
}
