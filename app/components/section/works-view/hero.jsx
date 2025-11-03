const Hero = ({ project }) => {
  return (
    <section className="h-screen flex items-center justify-center">
      <h2 className="text-[4em] text-p "> {project.slug?.current}</h2>
      <h2 className="text-[4em] text-p "> {project.title?.current}</h2>
    </section>
  );
};

export default Hero;
