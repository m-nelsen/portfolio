import Head from "next/head";
import localFont from "next/font/local";

// const fontRobotoRegular = localFont({ src: "../fonts/Roboto-Regular.ttf" });
const fontRobotoRegular = localFont({ src: "../fonts/Roboto-Light.ttf" });

export default function Home() {
  const links = [
    { href: "/resume.pdf", description: "Resume" },
    { href: "https://github.com/m-nelsen", description: "GitHub" },
    {
      href: "https://www.linkedin.com/in/matthew-nelsen/",
      description: "Linkedin",
    },
  ];

  const svgContainer = Array(7).fill({});

  return (
    <>
      <Head>
        <title>Matt Nelsen</title>
        <meta
          name="description"
          content="Matt Nelsen Web Developer Portfolio"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={fontRobotoRegular.className}>
        <section>
          <h1>Matt Nelsen</h1>
          <h2>Web Developer</h2>
        </section>
        <section>
          <ul>
            {links.map((link, index) => {
              const { href, description } = link;

              return (
                <li key={index}>
                  <a href={href} target="_blank">
                    {description}
                  </a>
                </li>
              );
            })}
          </ul>
        </section>
      </main>
      <div>
        <ul className="animated-svg-container">
          {svgContainer.map((e, index) => {
            const height = Math.random() * 100 + 50;
            const width = Math.random() * 100 + 50;

            return (
              <svg
                key={index}
                width={width}
                height={height}
                className="svg-rect-wrapper"
                style={{
                  animationDelay: `${index}s`,
                  left: `${Math.random() * 90 + 10}%`,
                }}
              >
                <rect
                  width={width}
                  height={height}
                  className="svg-rect"
                  fill="#2c334c"
                />
              </svg>
            );
          })}
        </ul>
      </div>
    </>
  );
}
